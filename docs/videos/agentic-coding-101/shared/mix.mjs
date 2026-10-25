// Lays a music bed under a clip's narration and writes one mixed track.
// The bed follows a volume curve drawn from timing.json: it sits low under the
// voice and rises in the pauses between scenes, with half-second ramps. There
// is no compressor, ducking or loudness pass: every automatic level stage tried
// on this series was heard as static, so every gain here is fixed or scripted.
//
//   node ../shared/mix.mjs <music file> [--start=<s>] [--out=<file>]
//
// Run from the clip folder, after voice.mjs. --start skips into the track,
// --out defaults to assets/vo/mix.wav (what index.html plays).
import { execFileSync, spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { join, resolve } from "node:path"

const UNDER_VOICE = -14 // bed loudness while the voice speaks, in LU below the voice
const IN_PAUSES = -6 // bed loudness in pauses of at least OPEN_GAP seconds
const OPEN_GAP = 0.8 // shorter pauses (between lines) keep the bed low
const RAMP = 0.5 // seconds to rise or settle

const arg = (name, fallback) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback
const music = resolve(process.argv[2] || "")
const start = Number(arg("start", 0))
const clip = process.cwd()
const voice = join(clip, "assets/vo/narration.wav")
const out = resolve(arg("out", join(clip, "assets/vo/mix.wav")))
const timing = JSON.parse(readFileSync(join(clip, "timing.json"), "utf8"))

const seconds = (path) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).toString())
// loudnorm reports its measurement as JSON on stderr; used to measure only.
const measure = (path, extra = []) =>
  JSON.parse(spawnSync("ffmpeg", ["-hide_banner", ...extra, "-i", path, "-af", "loudnorm=print_format=json", "-f", "null", "-"]).stderr.toString().match(/\{[\s\S]*\}/)[0])

const length = seconds(voice)
if (seconds(music) < start + length) throw new Error(`${music} is shorter than ${start + length}s; loop it or pick an earlier --start`)

// 1. Where the voice is silent long enough for the music to come up.
const lines = Object.values(timing.lines).map(([s, e]) => [s, e]).sort((a, b) => a[0] - b[0])
const open = [[0, lines[0][0]]]
for (let k = 1; k < lines.length; k += 1) {
  if (lines[k][0] - lines[k - 1][1] >= OPEN_GAP) open.push([lines[k - 1][1], lines[k][0]])
}
open.push([lines.at(-1)[1], length])

// 2. Bed gains from measured loudness, then the curve as an ffmpeg expression:
//    low + (high - low) * the strongest open-window ramp at time t.
const voiceLufs = Number(measure(voice).input_i)
const musicLufs = Number(measure(music, ["-ss", String(start), "-t", String(length)]).input_i)
const low = 10 ** ((voiceLufs + UNDER_VOICE - musicLufs) / 20)
const high = 10 ** ((voiceLufs + IN_PAUSES - musicLufs) / 20)
const ramps = open.map(([s, e]) => `clip(min((t-${s.toFixed(3)})/${RAMP},(${e.toFixed(3)}-t)/${RAMP}),0,1)`)
const window = ramps.reduce((a, b) => `max(${a},${b})`)
const curve = `${low.toFixed(5)}+${(high - low).toFixed(5)}*${window}`

const graph = [
  `[1:a]aresample=48000:resampler=soxr:precision=28,aformat=channel_layouts=stereo,volume='${curve}':eval=frame,afade=t=in:d=1,afade=t=out:st=${(length - 3).toFixed(3)}:d=3[bed]`,
  "[0:a]aformat=channel_layouts=stereo[v]",
  "[v][bed]amix=inputs=2:duration=first:normalize=0[mix]",
].join(";")
const encode = out.endsWith(".mp3") ? ["-c:a", "libmp3lame", "-b:a", "192k"] : ["-c:a", "pcm_s16le"]
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", voice, "-ss", String(start), "-t", String(length), "-i", music, "-filter_complex", graph, "-map", "[mix]", "-ar", "48000", ...encode, out])

const result = measure(out)
if (Number(result.input_tp) > -0.5) console.warn(`warning: mix peaks at ${result.input_tp} dBTP`)
console.log(`${out}: ${length.toFixed(1)}s, bed ${UNDER_VOICE} LU under the voice, ${IN_PAUSES} in ${open.length} pauses, ${result.input_i} LUFS, peak ${result.input_tp} dBTP`)
