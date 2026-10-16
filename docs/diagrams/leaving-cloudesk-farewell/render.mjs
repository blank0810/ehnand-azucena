// Renders the farewell scene (src/lib/farewell-scene.ts) to PNG without a browser.
// Default: the no-script still at public/ + FAREWELL_STILL, at 8x.
// With --review <dir>: a handful of frames across the loop, for review.
//
//   docker compose run --rm --no-deps app node docs/diagrams/leaving-cloudesk-farewell/render.mjs
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { deflateSync } from "node:zlib"
import {
  FAREWELL_STILL,
  HEIGHT,
  STILL_TIME,
  WIDTH,
  renderFrame,
} from "../../../src/lib/farewell-scene.ts"

const SCALE = 8
const STILL_PATH = `public${FAREWELL_STILL}`
const REVIEW_TIMES = [0.5, 2, 4, 5.7, 7]

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(bytes) {
  let c = 0xffffffff
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 255] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, "ascii"), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

function encodePng(rgba, width, height) {
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8
  header[9] = 2
  const rows = Buffer.alloc((width * 3 + 1) * height)
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 3 + 1)
    for (let x = 0; x < width; x += 1) {
      const from = (y * width + x) * 4
      const to = rowStart + 1 + x * 3
      rows[to] = rgba[from]
      rows[to + 1] = rgba[from + 1]
      rows[to + 2] = rgba[from + 2]
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(rows, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

function renderScaled(seconds) {
  const frame = new Uint8ClampedArray(WIDTH * HEIGHT * 4)
  renderFrame(frame, seconds)
  const width = WIDTH * SCALE
  const scaled = new Uint8ClampedArray(width * HEIGHT * SCALE * 4)
  for (let y = 0; y < HEIGHT * SCALE; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const from = (Math.floor(y / SCALE) * WIDTH + Math.floor(x / SCALE)) * 4
      scaled.set(frame.subarray(from, from + 4), (y * width + x) * 4)
    }
  }
  return encodePng(scaled, width, HEIGHT * SCALE)
}

function write(path, seconds) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, renderScaled(seconds))
  console.log(`${path} (t=${seconds}s)`)
}

const reviewIndex = process.argv.indexOf("--review")
if (reviewIndex === -1) {
  write(STILL_PATH, STILL_TIME)
} else {
  const directory = process.argv[reviewIndex + 1]
  for (const seconds of REVIEW_TIMES) {
    write(join(directory, `farewell-${String(seconds).replace(".", "_")}s.png`), seconds)
  }
}
