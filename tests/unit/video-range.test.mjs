import assert from "node:assert/strict"
import test from "node:test"

import { parseRange, serveVideo } from "../../worker/video.ts"

const FILE = new Uint8Array(Array.from({ length: 100 }, (_, i) => i))

function env(status = 200) {
  const requests = []
  return {
    requests,
    ASSETS: {
      async fetch(request) {
        requests.push(request)
        if (status !== 200) return new Response("not found", { status })
        return new Response(FILE, { headers: { "content-type": "video/mp4", etag: '"v1"' } })
      },
    },
  }
}

function get(headers = {}, method = "GET") {
  return new Request("https://ehnand.com/videos/agentic-coding-101/02-scopes.mp4", { method, headers })
}

test("parseRange reads the three single-range forms", () => {
  assert.deepEqual(parseRange("bytes=0-9", 100), { start: 0, end: 9 })
  assert.deepEqual(parseRange("bytes=90-", 100), { start: 90, end: 99 })
  assert.deepEqual(parseRange("bytes=-10", 100), { start: 90, end: 99 })
})

test("parseRange clamps an end past the file and rejects a start past it", () => {
  assert.deepEqual(parseRange("bytes=95-500", 100), { start: 95, end: 99 })
  assert.equal(parseRange("bytes=100-", 100), "unsatisfiable")
  assert.equal(parseRange("bytes=20-10", 100), "unsatisfiable")
  assert.equal(parseRange("bytes=-0", 100), "unsatisfiable")
})

test("parseRange sends the whole file for no header or a form it does not handle", () => {
  assert.equal(parseRange(null, 100), null)
  assert.equal(parseRange("bytes=0-1,5-6", 100), null)
  assert.equal(parseRange("items=0-1", 100), null)
  assert.equal(parseRange("bytes=-", 100), null)
})

test("a range request gets 206 with exactly the requested bytes", async () => {
  const response = await serveVideo(get({ range: "bytes=10-19" }), env())

  assert.equal(response.status, 206)
  assert.equal(response.headers.get("content-range"), "bytes 10-19/100")
  assert.equal(response.headers.get("content-length"), "10")
  assert.equal(response.headers.get("accept-ranges"), "bytes")
  assert.equal(response.headers.get("content-type"), "video/mp4")
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), FILE.slice(10, 20))
})

test("a plain request gets the whole file and advertises ranges", async () => {
  const response = await serveVideo(get(), env())

  assert.equal(response.status, 200)
  assert.equal(response.headers.get("accept-ranges"), "bytes")
  assert.equal(response.headers.get("content-length"), "100")
  assert.equal(response.headers.get("cache-control"), "public, max-age=86400")
  assert.equal((await response.arrayBuffer()).byteLength, 100)
})

test("the assets binding is asked for the whole file, without the client's Range", async () => {
  const bindings = env()
  await serveVideo(get({ range: "bytes=0-1" }), bindings)

  assert.equal(bindings.requests.length, 1)
  assert.equal(bindings.requests[0].headers.get("range"), null)
})

test("a range past the end gets 416 with the file size", async () => {
  const response = await serveVideo(get({ range: "bytes=500-" }), env())

  assert.equal(response.status, 416)
  assert.equal(response.headers.get("content-range"), "bytes */100")
})

test("HEAD gets the headers without a body", async () => {
  const response = await serveVideo(get({ range: "bytes=0-9" }, "HEAD"), env())

  assert.equal(response.status, 206)
  assert.equal(response.headers.get("content-length"), "10")
  assert.equal((await response.arrayBuffer()).byteLength, 0)
})

test("a missing video passes the asset's 404 through", async () => {
  const response = await serveVideo(get(), env(404))

  assert.equal(response.status, 404)
})

test("other methods are refused", async () => {
  const response = await serveVideo(get({}, "POST"), env())

  assert.equal(response.status, 405)
  assert.equal(response.headers.get("allow"), "GET, HEAD")
})
