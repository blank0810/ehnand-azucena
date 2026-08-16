import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const css = await readFile("src/styles/global.css", "utf8")

function declarationBlock(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`))
  assert.ok(match, `${selector} is missing`)
  return match[1]
}

test("bounded vertical archives cannot create horizontal scrollbars", () => {
  for (const selector of [".projects-register", ".article-library__results"]) {
    const block = declarationBlock(selector)
    assert.match(block, /overflow-y:\s*auto/)
    assert.match(block, /overflow-x:\s*hidden/)
  }
})

test("archive grid cells are allowed to shrink within their tracks", () => {
  assert.match(
    css,
    /\.project-record > \*,\s*\.article-library-record > \*\s*\{[^}]*min-width:\s*0/,
  )
})

test("featured project slides overlap in one grid slot", () => {
  const track = declarationBlock(".hero-showcase__track")
  const slide = declarationBlock(".hero-record")

  assert.match(track, /grid-template-columns:\s*minmax\(0,\s*1fr\)/)
  assert.match(slide, /grid-area:\s*1\s*\/\s*1/)
  assert.doesNotMatch(slide, /grid-column:\s*auto/)
})

test("commissioning trace positioning excludes nested icon SVGs", () => {
  assert.match(css, /\.commissioning__trace > svg\s*\{/)
  assert.doesNotMatch(css, /\.commissioning__trace svg\s*\{/)
})
