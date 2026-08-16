import { readFile } from "node:fs/promises"

export async function readGenerated(pathname) {
  const directAsset = /\.(?:xml|txt)$/.test(pathname)
  const clean = pathname === "/"
    ? "index.html"
    : pathname.replace(/^\//, "") + (directAsset ? "" : "/index.html")
  return readFile(new URL("../../dist/" + clean, import.meta.url), "utf8")
}

export function extractJsonLd(html) {
  return Array.from(
    html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ([, source]) => JSON.parse(source),
  )
}
