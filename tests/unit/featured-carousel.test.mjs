import assert from "node:assert/strict"
import test from "node:test"
import {
  canAutoAdvance,
  wrapProjectIndex,
} from "../../src/lib/featured-carousel.ts"

test("project indexes wrap in both directions", () => {
  assert.equal(wrapProjectIndex(5, 5), 0)
  assert.equal(wrapProjectIndex(-1, 5), 4)
  assert.equal(wrapProjectIndex(2, 5), 2)
  assert.throws(() => wrapProjectIndex(0, 0), /positive/)
})

test("automatic rotation stops for every approved pause condition", () => {
  const active = {
    userPaused: false,
    hovered: false,
    focusWithin: false,
    documentHidden: false,
    reducedMotion: false,
  }

  assert.equal(canAutoAdvance(active), true)
  for (const key of Object.keys(active)) {
    assert.equal(canAutoAdvance({ ...active, [key]: true }), false, key)
  }
})
