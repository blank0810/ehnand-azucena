import { PROFILE } from "@/data/profile"

export const SITE_URL = (import.meta.env.SITE_URL ?? "https://ehnand.com").replace(
  /\/+$/,
  "",
)
export const SITE_LAST_UPDATED = "2026-08-16"
export const PERSON_ID = SITE_URL + "/#person"
export const SITE_NAME = "Ehnand Azucena"
export { PROFILE }

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path
  if (path === "/") return SITE_URL + "/"
  return SITE_URL + "/" + path.replace(/^\/+|\/+$/g, "")
}
