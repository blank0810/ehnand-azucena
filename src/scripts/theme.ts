import {
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
  type Theme,
} from "@/lib/theme"

const root = document.documentElement
const media = window.matchMedia("(prefers-color-scheme: dark)")
const toggles = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".theme-toggle"),
)

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

function applyTheme(theme: Theme): void {
  root.dataset.theme = theme
  root.style.colorScheme = theme

  for (const button of toggles) {
    const next = toggleTheme(theme)
    button.setAttribute("aria-pressed", String(theme === "dark"))
    button.setAttribute("aria-label", `Switch to ${next} theme`)

    const label = button.querySelector<HTMLElement>("[data-theme-label]")
    if (label) label.textContent = theme === "dark" ? "Dark" : "Light"
  }
}

function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

const initial = isTheme(root.dataset.theme)
  ? root.dataset.theme
  : resolveTheme(readStoredTheme(), media.matches)

applyTheme(initial)

for (const button of toggles) {
  button.addEventListener("click", () => {
    const current = isTheme(root.dataset.theme) ? root.dataset.theme : "light"
    const next = toggleTheme(current)
    storeTheme(next)
    applyTheme(next)
  })
}

media.addEventListener("change", (event) => {
  if (!isTheme(readStoredTheme())) {
    applyTheme(event.matches ? "dark" : "light")
  }
})
