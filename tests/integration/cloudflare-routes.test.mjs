import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8787"

async function request(pathname, init) {
  return fetch(baseUrl + pathname, init)
}

test("asset server returns security headers", async () => {
  const response = await request("/")
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("x-content-type-options"), "nosniff")
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  )
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), geolocation=(), microphone=()",
  )
})

test("legacy article URLs redirect with 308", async () => {
  const archive = await request("/blog", { redirect: "manual" })
  assert.equal(archive.status, 308)
  assert.equal(new URL(archive.headers.get("location"), baseUrl).pathname, "/articles")

  const detail = await request("/blog/utility-billing-ledger", {
    redirect: "manual",
  })
  assert.equal(detail.status, 308)
  assert.equal(
    new URL(detail.headers.get("location"), baseUrl).pathname,
    "/articles/utility-billing-ledger",
  )
})

test("draft is direct-preview only", async () => {
  const draft = await request("/articles/__integration-draft")
  assert.equal(draft.status, 200)
  const draftHtml = await draft.text()
  assert.match(draftHtml, /noindex,nofollow/)
  assert.match(draftHtml, /Draft/)

  for (const path of ["/", "/articles", "/rss.xml", "/sitemap.xml"]) {
    const body = await request(path).then((response) => response.text())
    assert.doesNotMatch(body, /__integration-draft/)
  }
})

test("unknown and unpublished ERP routes use the custom 404", async () => {
  for (const path of [
    "/missing-record",
    "/projects/multi-tenant-erp-backend",
  ]) {
    const response = await request(path)
    assert.equal(response.status, 404)
    assert.match(await response.text(), /Record not found/i)
  }
})

test("first-party CV is viewable but excluded from indexing", async () => {
  const response = await request("/files/Ehnand-Azucena-CV.pdf")
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("content-type"), "application/pdf")
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/)
  assert.match(response.headers.get("x-robots-tag") ?? "", /noarchive/)
})
