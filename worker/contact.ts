/**
 * Orchestrates one contact submission.
 *
 * Checks run cheapest first, so a bot never costs an outbound request. The
 * visitor-facing vocabulary is fixed here and deliberately narrow: per-field
 * guidance, or one generic line that always offers an action they can take now.
 * The real cause is logged and never rendered.
 */

import { isHoneypotTripped, validateSubmission } from "./validate"
import { sendNotification } from "./notify"
import { verifyDummyToken, verifyTurnstile } from "./turnstile"
import type { Env } from "./types"

const THANK_YOU_PATH = "/thank-you"
const UNSENT_PATH = "/?contact=unsent#contact"
const MAX_BODY_BYTES = 32_768

const ACCEPTED_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
]

function genericMessage(env: Env): string {
  return (
    "Your message didn't go through. Email " +
    env.CONTACT_TO +
    " directly and it'll reach me."
  )
}

function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("application/json")
}

function seeOther(location: string): Response {
  return new Response(null, { status: 303, headers: { location } })
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  })
}

function succeed(request: Request): Response {
  return wantsJson(request) ? json(200, { ok: true }) : seeOther(THANK_YOU_PATH)
}

/** One line, no cause, always actionable. The reason goes to the log instead. */
function fail(
  request: Request,
  env: Env,
  status: number,
  requestId: string,
  reason: string,
): Response {
  console.error("contact: " + reason, { requestId, status })
  return wantsJson(request)
    ? json(status, { ok: false, message: genericMessage(env) })
    : seeOther(UNSENT_PATH)
}

function failFields(
  request: Request,
  errors: Record<string, string>,
  requestId: string,
): Response {
  console.error("contact: validation rejected", {
    requestId,
    fields: Object.keys(errors),
  })
  return wantsJson(request)
    ? json(400, { ok: false, errors })
    : seeOther(UNSENT_PATH)
}

export async function handleContact(
  request: Request,
  env: Env,
): Promise<Response> {
  const requestId = crypto.randomUUID()
  const contentType = request.headers.get("content-type") ?? ""

  if (!ACCEPTED_CONTENT_TYPES.some((type) => contentType.includes(type))) {
    return fail(request, env, 400, requestId, "unsupported content type")
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0")
  if (declaredLength > MAX_BODY_BYTES) {
    return fail(request, env, 400, requestId, "body exceeds size cap")
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch (cause) {
    return fail(request, env, 400, requestId, "unreadable body: " + String(cause))
  }

  // A filled honeypot gets the success path. Never tell a bot it was caught.
  if (isHoneypotTripped(form.get("website"))) {
    console.log("contact: honeypot tripped", { requestId })
    return succeed(request)
  }

  const validation = validateSubmission({
    name: form.get("name"),
    email: form.get("email"),
    company: form.get("company"),
    message: form.get("message"),
  })

  if (!validation.ok) return failFields(request, validation.errors, requestId)

  const token = String(form.get("cf-turnstile-response") ?? "")
  const turnstile = env.CONTACT_DRY_RUN === "true"
    ? verifyDummyToken(token)
    : await verifyTurnstile(
        env.TURNSTILE_SECRET_KEY,
        token,
        request.headers.get("cf-connecting-ip"),
      )

  if (!turnstile.ok) {
    return fail(request, env, 403, requestId, "turnstile: " + turnstile.reason)
  }

  const rateKey = request.headers.get("cf-connecting-ip") ?? "unknown"
  const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: rateKey })
  if (!success) {
    return fail(request, env, 429, requestId, "rate limit reached")
  }

  try {
    await sendNotification(env, validation.value, new Date())
  } catch (cause) {
    return fail(request, env, 502, requestId, "send failed: " + String(cause))
  }

  console.log("contact: delivered", { requestId })
  return succeed(request)
}
