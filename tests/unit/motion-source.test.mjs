import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const css = await readFile("src/styles/global.css", "utf8")
const motion = await readFile("src/scripts/site-motion.ts", "utf8").catch(
  () => "",
)

test("site motion is progressive and one-time", () => {
  assert.match(motion, /IntersectionObserver/)
  assert.match(motion, /prefers-reduced-motion: reduce/)
  assert.match(motion, /observer\.unobserve/)
  assert.match(css, /html\[data-motion="ready"\]/)
  assert.match(css, /\.is-reveal-pending/)
  assert.match(css, /\.is-revealed/)
})

test("view transitions and reduced motion have explicit policies", () => {
  assert.match(css, /@view-transition/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(css, /::view-transition-old\(root\)/)
  assert.match(css, /::view-transition-new\(root\)/)
})
