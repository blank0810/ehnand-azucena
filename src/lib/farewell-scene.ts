// A 160x90 pixel-art farewell to the ClouDesk team, drawn as a pure function
// of time: the same moment always gives the same pixels. The browser loops it,
// a script renders the no-script still from it, and tests check the loop seam.

export const WIDTH = 160
export const HEIGHT = 90
export const LOOP_SECONDS = 8
export const FRAMES_PER_SECOND = 12
/** The moment shown under reduced motion and in the no-script image. */
export const STILL_TIME = 4

/** The no-script, reduced-motion and social-preview still, rendered at 8x. */
export const FAREWELL_STILL = "/images/articles/leaving-cloudesk-farewell.png"

export const FAREWELL_ALT =
  "Pixel animation: a small figure in a blue hoodie bows, then waves goodbye beside the ClouDesk cloud logo, under the words Thank you, while fireworks burst in a night sky."

export interface AnimationState {
  userPaused: boolean
  offscreen: boolean
  documentHidden: boolean
  reducedMotion: boolean
}

export function canAnimate(state: AnimationState): boolean {
  return !Object.values(state).some(Boolean)
}

type Rgb = readonly [number, number, number]
type Sprite = readonly string[]
type Palette = Readonly<Record<string, Rgb>>

function hex(value: string): Rgb {
  const n = Number.parseInt(value.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mix(from: Rgb, to: Rgb, amount: number): Rgb {
  return [
    Math.round(from[0] + (to[0] - from[0]) * amount),
    Math.round(from[1] + (to[1] - from[1]) * amount),
    Math.round(from[2] + (to[2] - from[2]) * amount),
  ]
}

function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor
}

// ClouDesk's own colours (cloudesk.co): its blues and pink accent.
const SKY_TOP = hex("#0a0f1f")
const SKY_LOW = hex("#0e1630")
const GROUND = hex("#1b2340")
const GROUND_EDGE = hex("#2a355c")
const SHADOW = hex("#121831")
const WHITE = hex("#ffffff")
const BLUE = hex("#4a83fd")
const BRIGHT_BLUE = hex("#006bff")
const LIGHT_BLUE = hex("#8ab4ff")
const PINK = hex("#e90497")
const GOLD = hex("#ffd166")
const STAR = hex("#c7ced6")
const STAR_DIM = hex("#4d5765")

const GROUND_Y = 76

function plot(buffer: Uint8ClampedArray, x: number, y: number, color: Rgb): void {
  const px = Math.round(x)
  const py = Math.round(y)
  if (px < 0 || py < 0 || px >= WIDTH || py >= HEIGHT) return
  const index = (py * WIDTH + px) * 4
  buffer[index] = color[0]
  buffer[index + 1] = color[1]
  buffer[index + 2] = color[2]
  buffer[index + 3] = 255
}

function stamp(
  buffer: Uint8ClampedArray,
  sprite: Sprite,
  left: number,
  top: number,
  palette: Palette,
  scale = 1,
): void {
  sprite.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const color = palette[row[x]]
      if (!color) continue
      for (let dy = 0; dy < scale; dy += 1) {
        for (let dx = 0; dx < scale; dx += 1) {
          plot(buffer, left + x * scale + dx, top + y * scale + dy, color)
        }
      }
    }
  })
}

// A seeded generator, so stars and sparks land in the same places every loop.
function random(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

// ---- sky and ground ------------------------------------------------------

const STARS = (() => {
  const next = random(7)
  return Array.from({ length: 26 }, () => ({
    x: Math.floor(next() * WIDTH),
    y: Math.floor(next() * 48),
    phase: Math.floor(next() * 24),
  }))
})()

function drawSky(buffer: Uint8ClampedArray, frame: number): void {
  for (let y = 0; y < GROUND_Y; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      const low = y > 44 || (y === 44 && x % 2 === 0)
      plot(buffer, x, y, low ? SKY_LOW : SKY_TOP)
    }
  }
  for (const star of STARS) {
    const twinkle = (frame + star.phase) % 24 < 4
    plot(buffer, star.x, star.y, twinkle ? STAR_DIM : STAR)
  }
}

function drawGround(buffer: Uint8ClampedArray): void {
  for (let y = GROUND_Y; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      plot(buffer, x, y, y === GROUND_Y ? GROUND_EDGE : GROUND)
    }
  }
}

// ---- fireworks -------------------------------------------------------------

interface Burst {
  start: number
  x: number
  y: number
  color: Rgb
  seed: number
}

const RISE_SECONDS = 0.6
const SPARK_SECONDS = 1.5
const SPARKS = 18

const BURSTS: readonly Burst[] = [
  { start: 0.2, x: 34, y: 32, color: BLUE, seed: 11 },
  { start: 1.6, x: 128, y: 26, color: PINK, seed: 23 },
  { start: 2.9, x: 78, y: 36, color: GOLD, seed: 37 },
  { start: 4.1, x: 146, y: 38, color: LIGHT_BLUE, seed: 41 },
  { start: 5.3, x: 20, y: 24, color: PINK, seed: 53 },
  { start: 6.6, x: 104, y: 30, color: BRIGHT_BLUE, seed: 67 },
]

function sparkPosition(
  burst: Burst,
  angle: number,
  speed: number,
  age: number,
): [number, number] {
  // Sparks slow as they spread, then gravity pulls them down.
  const drag = 1.8
  const distance = (speed * (1 - Math.exp(-drag * age))) / drag
  return [
    burst.x + Math.cos(angle) * distance,
    burst.y + Math.sin(angle) * distance + 7 * age * age,
  ]
}

function drawBurst(
  buffer: Uint8ClampedArray,
  burst: Burst,
  age: number,
  frame: number,
): void {
  if (age < RISE_SECONDS) {
    const progress = age / RISE_SECONDS
    const eased = 1 - (1 - progress) ** 2
    const y = GROUND_Y + (burst.y - GROUND_Y) * eased
    plot(buffer, burst.x, y, GOLD)
    plot(buffer, burst.x, y + 1, mix(GOLD, SKY_LOW, 0.4))
    plot(buffer, burst.x, y + 2, mix(GOLD, SKY_LOW, 0.7))
    return
  }

  const sparkAge = age - RISE_SECONDS
  if (sparkAge >= SPARK_SECONDS) return

  if (sparkAge < 0.17) {
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        plot(buffer, burst.x + dx, burst.y + dy, WHITE)
      }
    }
  }

  const faded = mix(burst.color, SKY_TOP, 0.5)
  const next = random(burst.seed)
  for (let index = 0; index < SPARKS; index += 1) {
    const angle = (index / SPARKS) * Math.PI * 2 + (next() - 0.5) * 0.35
    const speed = 16 + next() * 12
    if (sparkAge > 1.1 && (frame + index) % 2 === 0) continue

    const color = sparkAge < 0.6 ? burst.color : faded
    if (sparkAge < 1) {
      const [tailX, tailY] = sparkPosition(burst, angle, speed, Math.max(0, sparkAge - 0.1))
      plot(buffer, tailX, tailY, faded)
    }
    const [x, y] = sparkPosition(burst, angle, speed, sparkAge)
    const spark = sparkAge < 0.3 ? mix(color, WHITE, 0.45) : color
    // Bright sparks match the figure's two-pixel grid; fading ones shrink to one.
    const size = sparkAge < 0.7 ? 2 : 1
    for (let dy = 0; dy < size; dy += 1) {
      for (let dx = 0; dx < size; dx += 1) plot(buffer, x + dx, y + dy, spark)
    }
  }
}

function drawFireworks(buffer: Uint8ClampedArray, time: number, frame: number): void {
  for (const burst of BURSTS) {
    // Ages wrap around the loop, so a burst late in the loop finishes at its start.
    const age = mod(time - burst.start, LOOP_SECONDS)
    if (age < RISE_SECONDS + SPARK_SECONDS) drawBurst(buffer, burst, age, frame)
  }
}

// ---- ClouDesk mark and text -----------------------------------------------

// The cloud from cloudesk.co's logo: downsampled to 22x13, then the two domes
// separated by hand so it keeps the logo's silhouette.
const CLOUD: Sprite = [
  "......#####...........",
  ".....#######..........",
  "....#########.####....",
  "....###############...",
  "...#################..",
  ".####################.",
  "######################",
  "######################",
  "######################",
  "######################",
  "######################",
  ".####################.",
  "..##################..",
]

const GLYPHS: Readonly<Record<string, Sprite>> = {
  " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
  "!": ["..#..", "..#..", "..#..", "..#..", "..#..", ".....", "..#.."],
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  C: [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  e: [".....", ".....", ".###.", "#...#", "#####", "#....", ".###."],
  k: ["#....", "#....", "#..#.", "#.#..", "##...", "#.#..", "#..#."],
  s: [".....", ".....", ".####", "#....", ".###.", "....#", "####."],
}

function textWidth(text: string, scale: number): number {
  return text.length * 6 * scale - scale
}

function drawText(
  buffer: Uint8ClampedArray,
  text: string,
  left: number,
  top: number,
  color: Rgb,
  scale = 1,
): void {
  Array.from(text).forEach((character, index) => {
    const glyph = GLYPHS[character] ?? GLYPHS[" "]
    stamp(buffer, glyph, left + index * 6 * scale, top, { "#": color }, scale)
  })
}

const TITLE = "THANK YOU!"
const WORDMARK = "CLOUDesk"

function drawTitle(buffer: Uint8ClampedArray): void {
  const left = Math.round((WIDTH - textWidth(TITLE, 2)) / 2)
  drawText(buffer, TITLE, left + 1, 7, PINK, 2)
  drawText(buffer, TITLE, left, 6, WHITE, 2)
}

function drawLogo(buffer: Uint8ClampedArray, time: number): void {
  // The cloud and its name float together, one rise and fall per four seconds.
  const lift = Math.sin((time / 4) * Math.PI * 2) > 0 ? 0 : 2
  const left = 12
  const top = 37 + lift
  stamp(buffer, CLOUD, left, top + 2, { "#": BRIGHT_BLUE }, 2)
  stamp(buffer, CLOUD, left, top, { "#": WHITE }, 2)
  const wordmarkLeft = Math.round(left + CLOUD[0].length - textWidth(WORDMARK, 1) / 2)
  drawText(buffer, WORDMARK, wordmarkLeft, top + 30, WHITE)
}

// ---- the figure -------------------------------------------------------------

const FIGURE: Palette = {
  h: hex("#2b1d16"),
  k: hex("#e0ac7e"),
  e: hex("#15191f"),
  m: hex("#a4553a"),
  b: BLUE,
  B: hex("#2f5fd0"),
  p: hex("#2a2f45"),
  s: hex("#0f1320"),
}

const HEAD_OPEN: Sprite = [
  "..hhhhhh..",
  ".hhhhhhhh.",
  "hhhhhhhhhh",
  "hhkkkkhkhh",
  "hkkkkkkkkh",
  "hkekkkkekh",
  "hkkkkkkkkh",
  "hkkkmmkkkh",
  ".kkkkkkkk.",
  "..kkkkkk..",
]

const HEAD_CLOSED: Sprite = [
  "..hhhhhh..",
  ".hhhhhhhh.",
  "hhhhhhhhhh",
  "hhkkkkhkhh",
  "hkkkkkkkkh",
  "hkeekkeekh",
  "hkkkkkkkkh",
  "hkkkmmkkkh",
  ".kkkkkkkk.",
  "..kkkkkk..",
]

// A deep bow from the front shows the top of the head.
const HEAD_TOP: Sprite = [
  "..hhhhhh..",
  ".hhhhhhhh.",
  "hhhhhhhhhh",
  "hhhhhhhhhh",
  "hhhhhhhhhh",
  "hhhkkkkhhh",
  ".hkkkkkkh.",
  "..kkkkkk..",
]

const LEGS: Sprite = [
  "...pppp..pppp...",
  "...pppp..pppp...",
  "...ssss..ssss...",
]

const BODY_STAND: Sprite = [
  "......kkkk......",
  "...bbbbbbbbbb...",
  "..bbbbbbbbbbbb..",
  "..bbbbbBBbbbbb..",
  "..bbbbbBBbbbbb..",
  "..kbbbbbbbbbbk..",
  "...BBBBBBBBBB...",
  ...LEGS,
]

const BODY_BOW: Sprite = [
  "......kkkk......",
  "...bbbbbbbbbb...",
  "..bbbbbbbbbbbb..",
  "..bbbbbBBbbbbb..",
  "..bbbbbkkbbbbb..",
  "..bbbbbbbbbbbb..",
  "...BBBBBBBBBB...",
  ...LEGS,
]

const BODY_WAVE: Sprite = [
  "......kkkk......",
  "...bbbbbbbbbbb..",
  "..bbbbbbbbbbb...",
  "..bbbbbBBbbbb...",
  "..bbbbbBBbbbb...",
  "..kbbbbbbbbbb...",
  "...BBBBBBBBBB...",
  ...LEGS,
]

// The raised arm, in figure coordinates: the sleeve rises from the shoulder
// and the hand rocks between two positions.
const ARM_OUT: Sprite = [
  "..............kk",
  "..............kk",
  "..............b.",
  "..............b.",
  ".............b..",
  ".............b..",
]

const ARM_IN: Sprite = [
  "................",
  ".............kk.",
  ".............kk.",
  ".............b..",
  ".............b..",
  ".............b..",
]

type Pose = "stand" | "blink" | "bow" | "deep-bow" | "wave-out" | "wave-in"

export function poseAt(time: number): Pose {
  if (time < 1.2) return time >= 0.8 && time < 0.9 ? "blink" : "stand"
  if (time < 1.5) return "bow"
  if (time < 2.6) return "deep-bow"
  if (time < 2.9) return "bow"
  if (time < 3.4) return "stand"
  if (time < 6.2) {
    return Math.floor((time - 3.4) / 0.25) % 2 === 0 ? "wave-out" : "wave-in"
  }
  return time >= 7.2 && time < 7.3 ? "blink" : "stand"
}

function drawFigure(buffer: Uint8ClampedArray, time: number): void {
  // Drawn at twice the scene's pixel size, so the figure reads as the lead.
  const scale = 2
  const left = 106
  const top = GROUND_Y - 20 * scale
  const pose = poseAt(time)
  const at = (x: number, y: number, sprite: Sprite) =>
    stamp(buffer, sprite, left + x * scale, top + y * scale, FIGURE, scale)

  for (let x = left + 3 * scale; x < left + 13 * scale; x += 1) {
    plot(buffer, x, GROUND_Y + 1, SHADOW)
  }

  if (pose === "wave-out" || pose === "wave-in") {
    at(0, 10, BODY_WAVE)
    at(0, 5, pose === "wave-out" ? ARM_OUT : ARM_IN)
    at(3, 0, HEAD_OPEN)
    return
  }

  if (pose === "bow" || pose === "deep-bow") {
    at(0, 10, BODY_BOW)
    if (pose === "bow") at(3, 2, HEAD_CLOSED)
    else at(3, 6, HEAD_TOP)
    return
  }

  at(0, 10, BODY_STAND)
  at(3, 0, pose === "blink" ? HEAD_CLOSED : HEAD_OPEN)
}

// ---- the frame --------------------------------------------------------------

/** Draws the scene at `seconds` into an RGBA buffer of WIDTH x HEIGHT pixels. */
export function renderFrame(buffer: Uint8ClampedArray, seconds: number): void {
  const frame = frameAt(seconds)
  const time = frame / FRAMES_PER_SECOND

  drawSky(buffer, frame)
  drawFireworks(buffer, time, frame)
  drawGround(buffer)
  drawLogo(buffer, time)
  drawFigure(buffer, time)
  drawTitle(buffer)
}

/** The frame index `seconds` falls on, so a caller can skip redrawing the same frame. */
export function frameAt(seconds: number): number {
  return Math.floor(mod(seconds, LOOP_SECONDS) * FRAMES_PER_SECOND)
}
