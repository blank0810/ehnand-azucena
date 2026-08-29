const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

/** The token Cloudflare's documented test site keys always produce. */
export const TURNSTILE_DUMMY_TOKEN = "XXXX.DUMMY.TOKEN.XXXX"

interface SiteverifyResponse {
  success?: boolean
  "error-codes"?: string[]
}

export interface TurnstileOutcome {
  ok: boolean
  reason: string
}

/**
 * Verifies a widget token against Cloudflare. A network failure is treated as a
 * rejection rather than a pass: an unverifiable submission is not a trusted one.
 */
export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp: string | null,
): Promise<TurnstileOutcome> {
  if (token.length === 0) return { ok: false, reason: "missing token" }

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set("remoteip", remoteIp)

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    })

    if (!response.ok) {
      return { ok: false, reason: "siteverify responded " + String(response.status) }
    }

    const result = (await response.json()) as SiteverifyResponse
    if (result.success === true) return { ok: true, reason: "verified" }

    return { ok: false, reason: (result["error-codes"] ?? ["unknown"]).join(",") }
  } catch (cause) {
    return { ok: false, reason: "siteverify unreachable: " + String(cause) }
  }
}

/**
 * Local stand-in for siteverify.
 *
 * `workerd` has no outbound network in the containerised development
 * environment, so the documented dummy token is checked in process instead of
 * over the wire. Reachable only while CONTACT_DRY_RUN is on, which the
 * committed configuration pins to "false"; a real token is still refused.
 */
export function verifyDummyToken(token: string): TurnstileOutcome {
  if (token.length === 0) return { ok: false, reason: "missing token" }
  if (token === TURNSTILE_DUMMY_TOKEN) {
    return { ok: true, reason: "dry run: dummy token accepted" }
  }
  return { ok: false, reason: "dry run: not the dummy token" }
}
