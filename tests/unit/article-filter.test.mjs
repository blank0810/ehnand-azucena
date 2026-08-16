import assert from "node:assert/strict"
import test from "node:test"
import { filterArticles } from "../../src/lib/article-filter.ts"

const articles = [
  {
    slug: "ledger",
    title: "Designing a Double-Entry Ledger",
    date: "2026-07-11",
    summary: "A reliable utility billing model.",
    category: "Business Systems & Data Integrity",
    tags: ["laravel", "accounting"],
  },
  {
    slug: "failover",
    title: "Multi-Provider LLM Failover",
    date: "2026-07-11",
    summary: "Circuit breakers across inference providers.",
    category: "AI & Automation",
    tags: ["llm", "reliability"],
  },
]

test("blank search with All returns every article", () => {
  assert.deepEqual(filterArticles(articles, "   ", "All"), articles)
})

test("search is case-insensitive across metadata", () => {
  assert.deepEqual(
    filterArticles(articles, "  CIRCUIT BREAKERS ", "All").map(
      (item) => item.slug,
    ),
    ["failover"],
  )
  assert.deepEqual(
    filterArticles(articles, "data integrity", "All").map((item) => item.slug),
    ["ledger"],
  )
  assert.deepEqual(
    filterArticles(articles, "reliability", "All").map((item) => item.slug),
    ["failover"],
  )
})

test("category and query filters combine", () => {
  assert.deepEqual(
    filterArticles(articles, "reliability", "Business Systems & Data Integrity"),
    [],
  )
  assert.deepEqual(
    filterArticles(articles, "laravel", "Business Systems & Data Integrity").map(
      (item) => item.slug,
    ),
    ["ledger"],
  )
})
