// Voices a clip's script.json with Kokoro af_heart, one line at a time, so
// every line's start is exact. Writes, inside the clip folder:
//   assets/vo/narration.wav   one track, lines joined with fixed gaps, -16 LUFS
//   assets/timing.js          window.__vo: line and scene windows, in seconds
//   captions.vtt              cues from the same times; "|" in a line's text
//                             splits it into cues, timed by share of characters
// Unchanged lines are reused from .voice-cache, so edits only re-voice what changed.
//
//   node ../shared/voice.mjs            (run from the clip folder)
//
// A line's "say" overrides "text" for the voice only (file names spelled out);
// captions always use "text".
import { createHash } from "node:crypto"
import { execFileSync, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const VOICE = "af_heart"
const SPEED = Number(process.env.SPEED || 1)
const LEAD = 0.6 // silence before the first line
const LINE_GAP = 0.35 // between lines in a scene
const SCENE_GAP = 1.4 // between scenes, so a scene's last reveal can be read before the cut (01 and 02 shipped with 0.9)
const SCENE_LEAD = 0.45 // a scene opens this long before its first line
const TAIL = 1.8 // hold after the last line
const PYTHON = process.env.HYPERFRAMES_PYTHON || resolve(process.env.HOME, "Desktop/Projects/Cloudesk/agentic-coding-field-guide/.venv/bin/python")

const clip = process.cwd()
const script = JSON.parse(readFileSync(join(clip, "script.json"), "utf8"))
const cache = join(clip, ".voice-cache")
const vo = join(clip, "assets/vo")
mkdirSync(cache, { recursive: true })
mkdirSync(vo, { recursive: true })

const seconds = (path) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).toString())
const round = (n) => Math.round(n * 1000) / 1000

// 1. Voice each line, reusing cached audio when the words are unchanged.
const lines = []
for (const [s, scene] of script.scenes.entries()) {
  for (const [i, line] of scene.lines.entries()) {
    const say = line.say || line.text.replaceAll("|", " ")
    const hash = createHash("sha256").update(`${VOICE}|${SPEED}|${say}`).digest("hex").slice(0, 12)
    const wav = join(cache, `${line.id}-${hash}.wav`)
    if (!existsSync(wav)) {
      execFileSync("npx", ["--yes", "hyperframes@0.8.192", "tts", say, "-v", VOICE, "-s", String(SPEED), "-o", wav, "--json"], {
        env: { ...process.env, HYPERFRAMES_PYTHON: PYTHON },
        stdio: ["ignore", "ignore", "inherit"],
      })
      console.log(`voiced ${line.id}`)
    }
    const last = s === script.scenes.length - 1 && i === scene.lines.length - 1
    const gap = last ? TAIL : i === scene.lines.length - 1 ? SCENE_GAP : LINE_GAP
    lines.push({ ...line, say, scene: scene.id, wav, len: seconds(wav), gap })
  }
}

// 2. Line windows, then scene windows around them.
let at = LEAD
for (const line of lines) {
  line.start = round(at)
  line.end = round(at + line.len)
  at += line.len + line.gap
}
const total = round(at)
const scenes = script.scenes.map((scene, k) => {
  const first = lines.find((l) => l.scene === scene.id)
  return { id: scene.id, label: scene.label, start: k === 0 ? 0 : round(first.start - SCENE_LEAD) }
})
scenes.forEach((scene, k) => (scene.end = k === scenes.length - 1 ? total : scenes[k + 1].start))

// 3. One narration track: lead-in, each line padded with its gap, normalised
//    to -16 LUFS in two passes so the level matches across all ten clips.
const raw = join(cache, "narration-raw.wav")
const inputs = ["-f", "lavfi", "-t", String(LEAD), "-i", "anullsrc=r=24000:cl=mono", ...lines.flatMap((l) => ["-i", l.wav])]
const pads = lines.map((l, k) => `[${k + 1}]aresample=24000,aformat=channel_layouts=mono,apad=pad_dur=${l.gap}[a${k}]`).join(";")
const chain = `[0]${lines.map((_, k) => `[a${k}]`).join("")}concat=n=${lines.length + 1}:v=0:a=1[out]`
execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", `${pads};${chain}`, "-map", "[out]", raw])
const target = "I=-16:TP=-1.5:LRA=11"
// loudnorm reports its measurement as JSON on stderr.
const loudness = (path) =>
  JSON.parse(spawnSync("ffmpeg", ["-hide_banner", "-i", path, "-af", `loudnorm=${target}:print_format=json`, "-f", "null", "-"]).stderr.toString().match(/\{[\s\S]*\}/)[0])
const measured = loudness(raw)
const second = `loudnorm=${target}:measured_I=${measured.input_i}:measured_TP=${measured.input_tp}:measured_LRA=${measured.input_lra}:measured_thresh=${measured.input_thresh}:offset=${measured.target_offset}:linear=true`
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-af", second, "-ar", "48000", "-ac", "1", join(vo, "narration.wav")])

// 4. Timing for the compositions.
const timing = {
  duration: total,
  // [start, end, spoken words]: a scene finds when a word is said by its share of the line.
  lines: Object.fromEntries(lines.map((l) => [l.id, [l.start, l.end, l.say]])),
  scenes: Object.fromEntries(scenes.map((s) => [s.id, [s.start, s.end]])),
}
writeFileSync(join(clip, "assets/timing.js"), `// Generated by shared/voice.mjs from script.json. Do not edit by hand.\nwindow.__vo = ${JSON.stringify(timing)}\n`)
writeFileSync(join(clip, "timing.json"), JSON.stringify({ ...timing, words: lines.map((l) => ({ id: l.id, text: l.text.replaceAll("|", " ") })) }, null, 2))

// 5. Captions: split cues at "|", each part timed by its share of characters.
const stamp = (t) => {
  const ms = Math.round(t * 1000)
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0")
  const m = String(Math.floor(ms / 60000) % 60).padStart(2, "0")
  const s = String(Math.floor(ms / 1000) % 60).padStart(2, "0")
  return `${h}:${m}:${s}.${String(ms % 1000).padStart(3, "0")}`
}
const cues = []
for (const line of lines) {
  const parts = line.text.split("|").map((p) => p.trim())
  const chars = parts.reduce((n, p) => n + p.length, 0)
  let t = line.start
  for (const part of parts) {
    const len = (part.length / chars) * (line.end - line.start)
    cues.push(`${stamp(t)} --> ${stamp(t + len)}\n${part}`)
    t += len
  }
}
writeFileSync(join(clip, "captions.vtt"), `WEBVTT\n\n${cues.join("\n\n")}\n`)

const out = loudness(join(vo, "narration.wav"))
const words = lines.reduce((n, l) => n + l.text.replaceAll("|", " ").split(/\s+/).length, 0)
console.log(`${script.id}: ${total.toFixed(1)}s, ${lines.length} lines, ${words} words, ${out.input_i} LUFS`)
for (const s of scenes) console.log(`  ${s.id.padEnd(8)} ${s.start.toFixed(2)} to ${s.end.toFixed(2)} (${(s.end - s.start).toFixed(1)}s)`)
