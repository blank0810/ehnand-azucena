import assert from "node:assert/strict"
import { access } from "node:fs/promises"
import test from "node:test"
import {
  FAREWELL_STILL,
  HEIGHT,
  LOOP_SECONDS,
  STILL_TIME,
  WIDTH,
  canAnimate,
  frameAt,
  poseAt,
  renderFrame,
} from "../../src/lib/farewell-scene.ts"

function frame(seconds) {
  const buffer = new Uint8ClampedArray(WIDTH * HEIGHT * 4)
  renderFrame(buffer, seconds)
  return buffer
}

test("the same moment always draws the same pixels", () => {
  assert.deepEqual(frame(3.7), frame(3.7))
})

test("the loop is seamless: time wraps to the start", () => {
  assert.deepEqual(frame(LOOP_SECONDS), frame(0))
  assert.deepEqual(frame(LOOP_SECONDS * 3 + 1.5), frame(1.5))
  assert.equal(frameAt(LOOP_SECONDS), 0)
})

test("every pixel of a frame is painted and opaque", () => {
  const buffer = frame(5.2)
  for (let index = 3; index < buffer.length; index += 4) {
    assert.equal(buffer[index], 255)
  }
})

test("the scene moves: a bow and a wave are different frames", () => {
  assert.notDeepEqual(frame(2), frame(STILL_TIME))
  assert.equal(poseAt(2), "deep-bow")
  assert.match(poseAt(STILL_TIME), /^wave-/)
})

test("animation stops for every pause condition", () => {
  const running = {
    userPaused: false,
    offscreen: false,
    documentHidden: false,
    reducedMotion: false,
  }
  assert.equal(canAnimate(running), true)
  for (const key of Object.keys(running)) {
    assert.equal(canAnimate({ ...running, [key]: true }), false, key)
  }
})

test("the no-script still is committed", async () => {
  await access(`public${FAREWELL_STILL}`)
})
