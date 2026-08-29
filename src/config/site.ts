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

/**
 * Turnstile's public site key. The default is Cloudflare's documented
 * always-passes test key so local and containerised runs work untouched; a real
 * key must be supplied at build time for production.
 */
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA"

export const TURNSTILE_SITE_KEY =
  import.meta.env.TURNSTILE_SITE_KEY ?? TURNSTILE_TEST_SITE_KEY

if (import.meta.env.PROD && TURNSTILE_SITE_KEY === TURNSTILE_TEST_SITE_KEY) {
  console.warn(
    "[contact] Building with the Turnstile test site key. Set TURNSTILE_SITE_KEY before deploying or the contact form will reject every submission.",
  )
}
