import assert from "node:assert/strict"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

test("root shell has canonical metadata and the direction contract", async () => {
  const html = await readGenerated("/")
  assert.match(
    html,
    /<title>Full Stack Systems Engineer \| Ehnand Azucena<\/title>/,
  )
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/"/)
  assert.match(html, /dc307738/)
  assert.equal(
    (html.match(/href="\/projects"[^>]*>Projects<\/a>/g) ?? []).length,
    3,
  )
  assert.doesNotMatch(html, /href="\/projects"[^>]*>Work<\/a>/)
  assert.match(html, /href="\/articles"[^>]*>Articles<\/a>/)
  assert.match(html, /ehnand-theme/)
  assert.equal((html.match(/data-theme-toggle/g) ?? []).length, 2)
  assert.match(html, /data-theme-label/)
  assert.match(html, /prefers-color-scheme: dark/)
  assert.match(html, /data-motion-root/)
  assert.doesNotMatch(html, /\/_next\//)
})

test("root shell emits one canonical Person entity", async () => {
  const html = await readGenerated("/")
  const jsonLd = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
  const people = jsonLd.filter((item) => item["@type"] === "Person")
  assert.equal(people.length, 1)
  assert.equal(people[0]["@id"], "https://ehnand.com/#person")
  assert.equal(people[0].email, "contact@ehnand.com")
})
