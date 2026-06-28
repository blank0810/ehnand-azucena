// Single source of truth for the site's absolute base URL.
//
// Set NEXT_APP_URL per environment (e.g. in Vercel project settings). It's read
// server-side only — used in metadata, JSON-LD, robots.ts and sitemap.ts — so it
// does NOT need the NEXT_PUBLIC_ prefix and stays out of the client bundle.
// Falls back to the production domain so local dev and env-less builds still
// produce valid absolute URLs. Trailing slashes are stripped for safe concatenation.
export const SITE_URL = (process.env.NEXT_APP_URL ?? "https://www.ehnand.com").replace(/\/+$/, "")
