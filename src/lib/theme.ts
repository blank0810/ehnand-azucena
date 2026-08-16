export const THEME_STORAGE_KEY = "ehnand-theme"

export type Theme = "light" | "dark"

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark"
}

export function resolveTheme(
  storedTheme: string | null,
  prefersDark: boolean,
): Theme {
  if (isTheme(storedTheme)) return storedTheme
  return prefersDark ? "dark" : "light"
}

export function toggleTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark"
}
