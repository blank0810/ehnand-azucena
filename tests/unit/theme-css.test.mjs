import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const css = await readFile("src/styles/global.css", "utf8")

function rgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function luminance(hex) {
  const channels = rgb(hex).map((value) => {
    const normalized = value / 255
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background))
  const darker = Math.min(luminance(foreground), luminance(background))
  return (lighter + 0.05) / (darker + 0.05)
}

test("neutral light and dark palettes replace the warm paper palette", () => {
  assert.match(css, /--paper:\s*#f6f7f8/)
  assert.match(css, /html\[data-theme="dark"\][\s\S]*--paper:\s*#0d1117/)
  for (const warm of [
    "#f3f4f1",
    "#fafaf7",
    "#e2e5e1",
    "#e3e6e2",
    "#e4e6e2",
    "#e7e9e5",
  ]) {
    assert.equal(css.includes(warm), false, `${warm} remains in the active stylesheet`)
  }
})

test("core text pairs meet WCAG AA contrast", () => {
  assert.ok(contrast("#15191f", "#f6f7f8") >= 4.5)
  assert.ok(contrast("#4e5763", "#ffffff") >= 4.5)
  assert.ok(contrast("#f0f3f6", "#0d1117") >= 4.5)
  assert.ok(contrast("#b4bdc8", "#161b22") >= 4.5)
  assert.ok(contrast("#10358c", "#f6f7f8") >= 4.5)
  assert.ok(contrast("#b8d1ff", "#0d1117") >= 4.5)
  assert.ok(contrast("#974400", "#ffffff") >= 4.5)
  assert.ok(contrast("#ffb45f", "#161b22") >= 4.5)
})

test("filled actions and focus accents retain sufficient contrast", () => {
  assert.ok(contrast("#ffffff", "#164bc5") >= 4.5)
  assert.ok(contrast("#0d1117", "#8ab4ff") >= 4.5)
  assert.ok(contrast("#164bc5", "#f6f7f8") >= 3)
  assert.ok(contrast("#8ab4ff", "#0d1117") >= 3)
})

test("inverse contact focus indicators meet non-text contrast", () => {
  assert.ok(contrast("#ffffff", "#15191f") >= 3)
  assert.ok(contrast("#f0f3f6", "#05070a") >= 3)
  assert.match(
    css,
    /\.contact :focus-visible\s*\{[^}]*outline-color:\s*var\(--inverse-text\)/,
  )
})

test("article filter controls retain a 44px minimum touch target", () => {
  const rule = css.match(
    /\.article-filter__button,\s*\.article-reset\s*\{([^}]*)\}/,
  )?.[1]
  const minimumRem = Number(rule?.match(/min-height:\s*([\d.]+)rem/)?.[1])

  assert.ok(minimumRem >= 2.75)
})
