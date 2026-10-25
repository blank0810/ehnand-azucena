/**
 * Asset-only Worker with two exceptions.
 *
 * `POST /api/contact` sends the contact form, and `/videos/*` is answered with
 * byte ranges so article clips play in Safari (see `video.ts`). Everything else
 * is handed straight to the static assets binding. Only `/api/*` and
 * `/videos/*` reach this Worker at all (`run_worker_first` in `wrangler.jsonc`).
 */

import { handleContact } from "./contact"
import type { Env } from "./types"
import { serveVideo } from "./video"

const CONTACT_PATH = "/api/contact"
const VIDEO_PREFIX = "/videos/"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === CONTACT_PATH) {
      if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: { allow: "POST" } })
      }
      return handleContact(request, env)
    }

    if (url.pathname.startsWith(VIDEO_PREFIX)) {
      return serveVideo(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
