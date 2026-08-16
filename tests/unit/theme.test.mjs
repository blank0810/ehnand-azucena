import assert from "node:assert/strict"
import test from "node:test"
import {
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
} from "../../src/lib/theme.ts"

test("a valid saved theme overrides the operating-system preference", () => {
  assert.equal(THEME_STORAGE_KEY, "ehnand-theme")
  assert.equal(resolveTheme("light", true), "light")
  assert.equal(resolveTheme("dark", false), "dark")
})

test("an absent or invalid saved theme follows the operating system", () => {
  assert.equal(resolveTheme(null, true), "dark")
  assert.equal(resolveTheme("invalid", false), "light")
  assert.equal(isTheme("dark"), true)
  assert.equal(isTheme("system"), false)
})

test("theme toggling switches between the rendered themes", () => {
  assert.equal(toggleTheme("light"), "dark")
  assert.equal(toggleTheme("dark"), "light")
})
