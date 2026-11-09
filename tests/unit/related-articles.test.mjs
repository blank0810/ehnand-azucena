import assert from "node:assert/strict"
import test from "node:test"

import { selectRelatedArticles } from "../../src/lib/related-articles.ts"

function article(id, category, tags) {
  return { id, data: { category, tags } }
}

const ids = (articles) => articles.map((entry) => entry.id)

test("a shared rare tag outranks a shared common tag", () => {
  const source = article("source", "A", ["testing", "byte-ranges"])
  const published = [
    article("newest-common", "A", ["testing"]),
    article("also-common", "A", ["testing"]),
    article("older-rare", "A", ["byte-ranges"]),
    source,
  ]

  assert.equal(selectRelatedArticles(source, published, 1)[0].id, "older-rare")
})

test("a shared tag outranks a same-category article with none", () => {
  const source = article("source", "A", ["cloudflare"])
  const published = [
    article("newest-same-category", "A", ["unrelated"]),
    article("other-category-shared-tag", "B", ["cloudflare"]),
    source,
  ]

  assert.deepEqual(ids(selectRelatedArticles(source, published, 1)), [
    "other-category-shared-tag",
  ])
})

test("the same category breaks a tie between equal tag overlap", () => {
  const source = article("source", "A", ["laravel"])
  const published = [
    article("other-category", "B", ["laravel"]),
    article("same-category", "A", ["laravel"]),
    source,
  ]

  assert.deepEqual(ids(selectRelatedArticles(source, published, 2)), [
    "same-category",
    "other-category",
  ])
})

test("publication order breaks any remaining tie", () => {
  const source = article("source", "A", ["laravel"])
  const published = [
    article("newest", "A", ["laravel"]),
    article("older", "A", ["laravel"]),
    source,
  ]

  assert.deepEqual(ids(selectRelatedArticles(source, published, 2)), [
    "newest",
    "older",
  ])
})

test("with no shared tags it falls back to the same category, then the rest", () => {
  const source = article("source", "A", ["only-here"])
  const published = [
    article("other-category", "B", ["x"]),
    article("same-category", "A", ["y"]),
    source,
  ]

  assert.deepEqual(ids(selectRelatedArticles(source, published, 2)), [
    "same-category",
    "other-category",
  ])
})

test("it never returns the article itself and honours the limit", () => {
  const source = article("source", "A", ["laravel"])
  const published = [
    source,
    article("one", "A", ["laravel"]),
    article("two", "A", ["laravel"]),
    article("three", "A", ["laravel"]),
  ]
  const related = selectRelatedArticles(source, published, 2)

  assert.equal(related.length, 2)
  assert.ok(!ids(related).includes("source"))
})

test("it leaves the input order untouched", () => {
  const source = article("source", "A", ["rare"])
  const published = [
    article("first", "B", ["x"]),
    article("second", "A", ["rare"]),
    source,
  ]
  const before = ids(published)

  selectRelatedArticles(source, published, 2)

  assert.deepEqual(ids(published), before)
})
