import assert from "node:assert/strict"
import test from "node:test"

import { verifyTurnstile } from "../../worker/turnstile.ts"

const SECRET = "test-secret"
const TOKEN = "XXXX.DUMMY.TOKEN.XXXX"

function stubFetch(handler) {
  const original = globalThis.fetch
  globalThis.fetch = handler
  return () => {
    globalThis.fetch = original
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

test("an empty token is refused without reaching the network", async () => {
  const restore = stubFetch(() => {
    throw new Error("siteverify should not be called")
  })

  try {
    const outcome = await verifyTurnstile(SECRET, "", null)
    assert.equal(outcome.ok, false)
  } finally {
    restore()
  }
})

test("a verified token passes and the secret is sent form-encoded", async () => {
  let seen
  const restore = stubFetch(async (url, init) => {
    seen = { url, body: init.body }
    return jsonResponse({ success: true })
  })

  try {
    const outcome = await verifyTurnstile(SECRET, TOKEN, "203.0.113.7")
    assert.equal(outcome.ok, true)
    assert.match(seen.url, /siteverify$/)
    assert.equal(seen.body.get("secret"), SECRET)
    assert.equal(seen.body.get("response"), TOKEN)
    assert.equal(seen.body.get("remoteip"), "203.0.113.7")
  } finally {
    restore()
  }
})

test("a missing client ip is simply omitted", async () => {
  let seen
  const restore = stubFetch(async (_url, init) => {
    seen = init.body
    return jsonResponse({ success: true })
  })

  try {
    await verifyTurnstile(SECRET, TOKEN, null)
    assert.equal(seen.has("remoteip"), false)
  } finally {
    restore()
  }
})

test("a rejected token fails and keeps the reason for the log", async () => {
  const restore = stubFetch(async () =>
    jsonResponse({ success: false, "error-codes": ["invalid-input-response"] }),
  )

  try {
    const outcome = await verifyTurnstile(SECRET, TOKEN, null)
    assert.equal(outcome.ok, false)
    assert.match(outcome.reason, /invalid-input-response/)
  } finally {
    restore()
  }
})

test("an unreachable verifier fails closed rather than open", async () => {
  const restore = stubFetch(async () => {
    throw new Error("connect ECONNREFUSED")
  })

  try {
    const outcome = await verifyTurnstile(SECRET, TOKEN, null)
    assert.equal(outcome.ok, false, "an unverifiable submission is not trusted")
  } finally {
    restore()
  }
})

test("a non-200 from the verifier fails closed", async () => {
  const restore = stubFetch(async () => jsonResponse({}, 502))

  try {
    const outcome = await verifyTurnstile(SECRET, TOKEN, null)
    assert.equal(outcome.ok, false)
  } finally {
    restore()
  }
})

test("the dry-run verifier accepts only the documented dummy token", async () => {
  const { TURNSTILE_DUMMY_TOKEN, verifyDummyToken } = await import(
    "../../worker/turnstile.ts"
  )

  assert.equal(verifyDummyToken(TURNSTILE_DUMMY_TOKEN).ok, true)
  assert.equal(verifyDummyToken("").ok, false)
  assert.equal(
    verifyDummyToken("a-real-looking-token").ok,
    false,
    "dry run must not wave through a token it cannot check",
  )
})
