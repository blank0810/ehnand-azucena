/**
 * Byte ranges for the article videos under `/videos/`.
 *
 * Static assets on this site answer a `Range` request with the whole file and
 * a `200`, and Safari will not play a video without `206` partial responses.
 * `wrangler.jsonc` routes only `/videos/*` through the Worker
 * (`run_worker_first`), and this module answers single byte ranges itself.
 *
 * Workers Caching would also slice ranges, but enabling it bills every static
 * asset request on the site against the Workers request limit, so it stays off.
 * The clips are a few megabytes each, so the whole file is read and sliced:
 * that keeps `Content-Length` exact without streaming tricks.
 */

import type { Env } from "./types"

// A day: long enough to spare repeat downloads, short enough that a
// re-rendered clip reaches viewers without renaming the file.
const CACHE_CONTROL = "public, max-age=86400"
const SINGLE_RANGE = /^bytes=(\d*)-(\d*)$/

export type ByteRange = { start: number; end: number }

/**
 * Reads a `Range` header against a file of `size` bytes. Returns the inclusive
 * range to send, `"unsatisfiable"` for a range past the end, or `null` when the
 * whole file should be sent (no header, or a form this does not handle, such
 * as several ranges at once).
 */
export function parseRange(header: string | null, size: number): ByteRange | "unsatisfiable" | null {
  if (!header) return null
  const match = SINGLE_RANGE.exec(header.trim())
  if (!match) return null
  const [, from, to] = match
  if (from === "" && to === "") return null

  if (from === "") {
    // A suffix range: the last N bytes.
    const length = Number(to)
    if (length === 0 || size === 0) return "unsatisfiable"
    return { start: Math.max(0, size - length), end: size - 1 }
  }

  const start = Number(from)
  const end = to === "" ? size - 1 : Math.min(Number(to), size - 1)
  if (start >= size || start > end) return "unsatisfiable"
  return { start, end }
}

export async function serveVideo(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } })
  }

  // Ask for the whole file, without the client's Range or validators.
  const asset = await env.ASSETS.fetch(new Request(request.url))
  if (!asset.ok) return asset

  const body = await asset.arrayBuffer()
  const size = body.byteLength
  const headers = new Headers(asset.headers)
  headers.set("accept-ranges", "bytes")
  headers.set("cache-control", CACHE_CONTROL)

  const range = parseRange(request.headers.get("range"), size)
  if (range === "unsatisfiable") {
    return new Response(null, { status: 416, headers: { "content-range": `bytes */${size}` } })
  }

  const head = request.method === "HEAD"
  if (!range) {
    headers.set("content-length", String(size))
    return new Response(head ? null : body, { status: 200, headers })
  }

  headers.set("content-range", `bytes ${range.start}-${range.end}/${size}`)
  headers.set("content-length", String(range.end - range.start + 1))
  return new Response(head ? null : body.slice(range.start, range.end + 1), { status: 206, headers })
}
