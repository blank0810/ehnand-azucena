import assert from "node:assert/strict"
import { access, readFile } from "node:fs/promises"
import test from "node:test"

const {
  PROJECTS,
  getProjectBySlug,
  getProjectStartDate,
} = await import("../../src/data/projects.ts")
const { ARTICLE_CATEGORIES } = await import("../../src/data/article-categories.ts")
const { FAQ_ITEMS } = await import("../../src/data/faq.ts")
const { parseProjectNarrative } = await import("../../src/lib/project-narrative.ts")

test("project inventory is complete, unique, and excludes the unpublished ERP", async () => {
  assert.equal(PROJECTS.length, 15)
  assert.equal(new Set(PROJECTS.map((project) => project.slug)).size, 15)
  assert.equal(getProjectBySlug("multi-tenant-erp-backend"), undefined)

  for (const project of PROJECTS) {
    assert.ok(project.image.width > 0)
    assert.ok(project.image.height > 0)
    assert.ok(project.image.alt.length > 0)
    await access("public" + project.image.src)
  }
})

test("project chronology remains UTC-safe and evidence based", () => {
  assert.equal(getProjectStartDate(getProjectBySlug("adam-ai")), "2026-01")
  assert.equal(getProjectStartDate(getProjectBySlug("file-repository-system")), "2023-06")
})

test("article taxonomy and AI workflow FAQ are canonical", () => {
  assert.deepEqual(ARTICLE_CATEGORIES, [
    "Business Systems & Data Integrity",
    "SaaS, Cloud & Security",
    "AI & Automation",
    "Engineering Practice & Reliability",
  ])
  assert.ok(FAQ_ITEMS.some((item) => item.question.includes("Claude Code and Codex")))
})

test("fallback narratives produce escaped typed records with inline emphasis", () => {
  const records = parseProjectNarrative(
    "Overview **verified** paragraph.\n\n**Capabilities:**\n\n• Safe item",
  )
  assert.deepEqual(records, [
    {
      kind: "paragraph",
      parts: [
        { text: "Overview ", strong: false },
        { text: "verified", strong: true },
        { text: " paragraph.", strong: false },
      ],
    },
    {
      kind: "heading",
      parts: [{ text: "Capabilities", strong: false }],
    },
    {
      kind: "bullet",
      parts: [{ text: "Safe item", strong: false }],
    },
  ])
})

test("all related article slugs exist and the ERP article has no project owner", async () => {
  const files = await import("node:fs/promises").then(({ readdir }) =>
    readdir("content/articles"),
  )
  const slugs = new Set(
    files.filter((file) => file.endsWith(".mdx")).map((file) => file.slice(0, -4)),
  )

  for (const project of PROJECTS) {
    for (const slug of project.relatedArticleSlugs) {
      assert.ok(slugs.has(slug), project.slug + " references missing article " + slug)
    }
  }

  const erp = await readFile(
    "content/articles/fastapi-erp-terraform-aws-lambda.mdx",
    "utf8",
  )
  assert.doesNotMatch(erp, /\/projects\/multi-tenant-erp-backend/)
})
