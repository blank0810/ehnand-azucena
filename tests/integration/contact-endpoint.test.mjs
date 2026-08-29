import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8787"
const ENDPOINT = "/api/contact"

// Cloudflare's documented dummy token, accepted only by the test secret key
// that the integration runner passes to wrangler.
const DUMMY_TOKEN = "XXXX.DUMMY.TOKEN.XXXX"

function submit(fields, init = {}) {
  const body = new URLSearchParams({
    email: "client@example.com",
    message: "We need a billing system that survives an audit.",
    "cf-turnstile-response": DUMMY_TOKEN,
    ...fields,
  })

  return fetch(baseUrl + ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    redirect: "manual",
    ...init,
  })
}

function asJson(fields) {
  return submit(fields, { headers: { accept: "application/json" } })
}

test("the contact endpoint only answers POST", async () => {
  const response = await fetch(baseUrl + ENDPOINT, { redirect: "manual" })
  assert.equal(response.status, 405)
  assert.equal(response.headers.get("allow"), "POST")
})

test("every other route still comes straight off the assets binding", async () => {
  const home = await fetch(baseUrl + "/")
  assert.equal(home.status, 200)
  assert.match(await home.text(), /Full-stack systems delivery/)
})

test("a valid submission redirects to the thank-you page", async () => {
  const response = await submit({})
  assert.equal(response.status, 303)
  assert.equal(
    new URL(response.headers.get("location"), baseUrl).pathname,
    "/thank-you",
  )
})

test("the thank-you page is generated and kept out of the index", async () => {
  const page = await fetch(baseUrl + "/thank-you")
  assert.equal(page.status, 200)
  const html = await page.text()
  assert.match(html, /noindex,nofollow/)
  assert.match(html, /Your message reached me/)
})

test("a valid submission answers JSON when JSON is asked for", async () => {
  const response = await asJson({})
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true })
})

test("field problems come back per field and stay non-technical", async () => {
  const response = await asJson({ email: "not-an-address", message: "hi" })
  assert.equal(response.status, 400)

  const body = await response.json()
  assert.equal(body.ok, false)
  assert.deepEqual(Object.keys(body.errors).sort(), ["email", "message"])

  for (const message of Object.values(body.errors)) {
    assert.doesNotMatch(
      message,
      /\b(turnstile|worker|binding|regex|payload|status|http|error|invalid|failed|token|\d{3})\b/i,
    )
  }
})

test("a filled honeypot is answered as success and never explains why", async () => {
  const response = await submit({ website: "http://spam.example" })
  assert.equal(response.status, 303)
  assert.equal(
    new URL(response.headers.get("location"), baseUrl).pathname,
    "/thank-you",
  )
})

test("a rejected challenge gives one generic line with no cause", async () => {
  const response = await asJson({ "cf-turnstile-response": "" })
  assert.equal(response.status, 403)

  const body = await response.json()
  assert.equal(body.ok, false)
  assert.equal(body.errors, undefined)
  assert.match(body.message, /didn't go through/)
  assert.match(body.message, /contact@ehnand\.com/)
  assert.doesNotMatch(
    body.message,
    /\b(turnstile|challenge|captcha|verify|403|worker|binding)\b/i,
  )
})

test("the native failure path redirects to a neutral marker", async () => {
  const response = await submit({ "cf-turnstile-response": "" })
  assert.equal(response.status, 303)

  const location = new URL(response.headers.get("location"), baseUrl)
  assert.equal(location.pathname, "/")
  assert.equal(location.searchParams.get("contact"), "unsent")
  assert.equal(location.hash, "#contact")
})

test("a body that is not a form is refused without detail", async () => {
  const response = await fetch(baseUrl + ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ email: "client@example.com", message: "hello there" }),
    redirect: "manual",
  })

  assert.equal(response.status, 400)
  const body = await response.json()
  assert.match(body.message, /didn't go through/)
  assert.equal(body.errors, undefined)
})
