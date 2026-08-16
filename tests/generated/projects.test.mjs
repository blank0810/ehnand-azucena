import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

const { PROJECTS } = await import("../../src/data/projects.ts")

test("project archive server-renders all 15 records", async () => {
  const html = await readGenerated("/projects")
  assert.match(html, /<title>Full Stack Projects \| Ehnand Azucena<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/projects"/)
  assert.equal((html.match(/data-project-record=/g) ?? []).length, 15)
  assert.match(html, /data-scroll-region="projects"/)
  assert.match(html, /<section class="projects-register"/)
  assert.match(html, /aria-label="Project records"/)
  assert.match(html, /data-scroll-region="projects"[^>]*tabindex="0"/)
  assert.match(html, /Scroll to browse all 15 records/)

  for (const project of PROJECTS) {
    assert.match(html, new RegExp('href="/projects/' + project.slug + '"'))
    assert.ok(html.includes(project.title))
  }
})

test("every project detail has canonical metadata and SoftwareApplication schema", async () => {
  for (const project of PROJECTS) {
    const html = await readGenerated("/projects/" + project.slug)
    assert.ok(html.includes(project.title))
    assert.match(
      html,
      new RegExp(
        'rel="canonical" href="https://ehnand.com/projects/' + project.slug + '"',
      ),
    )
    const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
    const software = graph.find((item) => item["@type"] === "SoftwareApplication")
    assert.equal(software.author["@id"], "https://ehnand.com/#person")
  }
})

test("ERP project is absent and Adam case study remains rendered", async () => {
  await assert.rejects(readFile("dist/projects/multi-tenant-erp-backend/index.html"))
  const adam = await readGenerated("/projects/adam-ai")
  assert.match(adam, /Module Marketplace/)
  assert.doesNotMatch(adam, /TRACE ID/)
})

test("Water Billing uses the new title on the stable canonical route", async () => {
  const html = await readGenerated("/projects/initao-water-billing-system")
  assert.match(html, /<h1[^>]*>Water Billing System<\/h1>/)
  assert.match(
    html,
    /rel="canonical" href="https:\/\/ehnand\.com\/projects\/initao-water-billing-system"/,
  )
  assert.match(html, />Back to all projects<\/a>/)
})
