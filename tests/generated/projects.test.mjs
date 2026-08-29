import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

const { PROJECTS } = await import("../../src/data/projects.ts")

test("project archive server-renders all published records", async () => {
  const html = await readGenerated("/projects")
  assert.match(html, /<title>Full Stack Projects \| Ehnand Azucena<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/projects"/)
  assert.equal(
    (html.match(/data-project-record=/g) ?? []).length,
    PROJECTS.length,
  )
  assert.match(html, /data-scroll-region="projects"/)
  assert.match(html, /<section class="projects-register"/)
  assert.match(html, /aria-label="Project records"/)
  assert.match(html, /data-scroll-region="projects"[^>]*tabindex="0"/)
  assert.match(
    html,
    new RegExp("Scroll to browse all " + PROJECTS.length + " records"),
  )

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

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&#38;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

test("every project without a case study renders its narrative body", async () => {
  const caseStudySlugs = new Set(["adam-ai"])

  for (const project of PROJECTS) {
    const html = await readGenerated("/projects/" + project.slug)

    if (caseStudySlugs.has(project.slug)) {
      assert.match(
        html,
        /class="prose"/,
        project.slug + " has a case study and must render it",
      )
      continue
    }

    assert.match(
      html,
      /class="[^"]*\bproject-narrative\b[^"]*"/,
      project.slug + " must render its narrative body",
    )

    const opening = (project.longDescription ?? project.description)
      .trim()
      .split(/\r?\n/)[0]
      .trim()
      .slice(0, 40)
    assert.ok(
      html.includes(escapeHtml(opening)) || html.includes(opening),
      project.slug + " must include its opening narrative text",
    )
  }
})
