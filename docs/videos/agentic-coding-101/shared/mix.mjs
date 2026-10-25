// Lays a music bed under a clip's narration and writes one mixed track:
// the bed is levelled, faded in and out, and ducked whenever the voice
// speaks (sidechain), then the mix is normalised to -16 LUFS.
//
//   node ../shared/mix.mjs <music file> [--start=<s>] [--bed=<dB>] [--out=<file>]
//
// Run from the clip folder, after voice.mjs. --start skips into the track,
// --bed sets the bed's level against the voice (default -19 dB), --out
// defaults to assets/vo/mix.wav (what index.html plays).
import { execFileSync, spawnSync } from "node:child_process"
import { join, resolve } from "node:path"

const arg = (name, fallback) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback
const music = resolve(process.argv[2] || "")
const start = Number(arg("start", 0))
const bed = Number(arg("bed", -19))
const clip = process.cwd()
const voice = join(clip, "assets/vo/narration.wav")
const out = resolve(arg("out", join(clip, "assets/vo/mix.wav")))
const target = "I=-16:TP=-1.5:LRA=11"

const seconds = (path) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).toString())
// loudnorm reports its measurement as JSON on stderr.
const loudness = (path) =>
  JSON.parse(spawnSync("ffmpeg", ["-hide_banner", "-i", path, "-af", `loudnorm=${target}:print_format=json`, "-f", "null", "-"]).stderr.toString().match(/\{[\s\S]*\}/)[0])

const length = seconds(voice)
if (seconds(music) < start + length) throw new Error(`${music} is shorter than ${start + length}s; loop it or pick an earlier --start`)

// 1. Bed under voice, ducked a further few dB while the voice speaks.
const raw = `${out}.raw.wav`
const graph = [
  `[1:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=${target},volume=${bed}dB,afade=t=in:d=1.2,afade=t=out:st=${(length - 3).toFixed(3)}:d=3[bed]`,
  "[0:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[v][key]",
  "[bed][key]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=400[ducked]",
  "[v][ducked]amix=inputs=2:duration=first:normalize=0[mix]",
].join(";")
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", voice, "-ss", String(start), "-t", String(length), "-i", music, "-filter_complex", graph, "-map", "[mix]", "-ar", "48000", raw])

// 2. Two-pass loudness so every clip lands at the same level.
const m = loudness(raw)
const second = `loudnorm=${target}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`
const encode = out.endsWith(".mp3") ? ["-c:a", "libmp3lame", "-b:a", "192k"] : []
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", raw, "-af", second, "-ar", "48000", ...encode, out])
execFileSync("rm", ["-f", raw])
console.log(`${out}: ${length.toFixed(1)}s, bed ${bed} dB from ${start}s, ${loudness(out).input_i} LUFS`)
