/**
 * Asset-only Worker with one exception.
 *
 * Everything except `POST /api/contact` is handed straight to the static assets
 * binding, so the prerendered Astro output is served exactly as it was before
 * this Worker existed.
 */

import { handleContact } from "./contact"
import type { Env } from "./types"

const CONTACT_PATH = "/api/contact"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === CONTACT_PATH) {
      if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: { allow: "POST" } })
      }
      return handleContact(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
