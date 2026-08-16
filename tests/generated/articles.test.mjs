import assert from "node:assert/strict"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"
import { readArticleSources } from "../helpers/article-sources.mjs"

const articles = (await readArticleSources()).filter((article) => !article.draft)

test("article archive server-renders all published entries and controls", async () => {
  const html = await readGenerated("/articles")
  assert.match(html, /<title>Technical Articles \| Ehnand Azucena<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/articles"/)
  assert.match(html, /type="search"/)
  assert.match(html, /aria-label="Filter articles by category"/)
  assert.match(html, /aria-label="Article results"/)
  assert.match(html, /data-scroll-region="articles"/)
  assert.match(
    html,
    /<script type="module">[\s\S]*data-article-library[\s\S]*<\/script>/,
  )
  assert.equal((html.match(/data-article-record=/g) ?? []).length, 9)

  for (const article of articles) {
    assert.ok(html.includes(article.title))
  }
})

test("every published article renders canonical metadata and BlogPosting schema", async () => {
  for (const article of articles) {
    const slug = article.slug
    const html = await readGenerated("/articles/" + slug)
    assert.ok(html.includes(article.title))
    assert.match(
      html,
      new RegExp(
        'rel="canonical" href="https://ehnand.com/articles/' + slug + '"',
      ),
    )
    const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
    const post = graph.find((item) => item["@type"] === "BlogPosting")
    assert.equal(post.author["@id"], "https://ehnand.com/#person")
    assert.equal(post.articleSection, article.category)

    const documentTitle = html.match(/<title>(.*?)<\/title>/)?.[1] ?? ""
    assert.ok(documentTitle.length <= 70, `${slug} title is ${documentTitle.length} characters`)
    assert.doesNotMatch(documentTitle, /—/)
  }
})

test("GFM table is semantic and the ERP article has no project link", async () => {
  const memory = await readGenerated("/articles/durable-ai-memory-obsidian-mocs")
  assert.match(memory, /<table/)
  assert.match(memory, /<thead/)
  assert.match(memory, /<th[^>]*>Store<\/th>/)
  assert.match(memory, /<th[^>]*>Best use<\/th>/)
  assert.match(memory, /aria-label="Scrollable data table"/)

  const erp = await readGenerated("/articles/fastapi-erp-terraform-aws-lambda")
  assert.doesNotMatch(erp, /\/projects\/multi-tenant-erp-backend/)
  assert.match(erp, /Python 3\.14/)
})

test("article code blocks are named keyboard-scroll regions", async () => {
  const html = await readGenerated("/articles/fastapi-erp-terraform-aws-lambda")
  const codeBlocks = html.match(/<pre\b[^>]*>/g) ?? []

  assert.ok(codeBlocks.length > 0)
  for (const codeBlock of codeBlocks) {
    assert.match(codeBlock, /tabindex="0"/)
    assert.match(codeBlock, /aria-label="Scrollable code block"/)
  }
})

test("RSS, sitemap, and robots advertise canonical published URLs", async () => {
  const rss = await readGenerated("/rss.xml")
  const sitemap = await readGenerated("/sitemap.xml")
  const robots = await readGenerated("/robots.txt")

  assert.match(rss, /https:\/\/ehnand\.com\/articles\//)
  assert.match(sitemap, /https:\/\/ehnand\.com\/articles\//)
  assert.match(sitemap, /https:\/\/ehnand\.com\/projects\//)
  assert.match(robots, /Sitemap: https:\/\/ehnand\.com\/sitemap\.xml/)
  assert.doesNotMatch(rss, /\/blog(?:\/|<)/)
  assert.doesNotMatch(sitemap, /\/blog(?:\/|<)/)
  assert.doesNotMatch(sitemap, /multi-tenant-erp-backend/)
})
