# Articles Knowledge Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mismatched `/blog` article feed with a canonical, searchable, categorized `/articles` knowledge-base index that stays compact with 50 or more articles.

**Architecture:** Next.js server routes continue reading published MDX through `getArticles()` and render all article metadata for crawlability. A focused client component owns local metadata search, category filters, and the bounded results scroller. Next.js permanent redirects preserve every legacy `/blog` URL while sitemap, RSS, canonicals, JSON-LD, and internal links move directly to `/articles`.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, MDX frontmatter via gray-matter, Tailwind CSS, Node's built-in test runner, Docker Compose.

## Global Constraints

- The project is Ehnand Azucena's personal portfolio and proof-of-work publishing surface; preserve its crawlable, production-experience focus from `CLAUDE.md`.
- Run development and verification only through the already-running Docker Compose service on `http://localhost:3001`.
- Do not rebuild the Docker image or run a production build unless the owner separately asks.
- Use pnpm only; add no dependency for this feature.
- Do not commit or push unless the owner explicitly asks. This overrides the generic commit steps normally used by this planning workflow.
- Preserve unrelated untracked or modified files, including `.vscode/` and `AGENTS.md`.
- Do not edit the unused `components/blog-section.tsx`.
- Use `Articles` for navigation, `Technical Articles` for the visible heading, and `Technical Articles | Ehnand Azucena` for the metadata title.
- `/articles` and `/articles/[slug]` are canonical. Legacy `/blog` paths exist only as direct permanent redirects.
- Keep Schema.org types `Blog` and `BlogPosting`.
- Search only title, summary, primary category, and tags. Do not index MDX bodies.
- Keep all published article links in the default server render.
- Use a native vertically scrollable results region with `max-height: min(70dvh, 48rem)`; do not add pagination, infinite loading, virtualization, or a horizontal article carousel.
- Show only populated categories in the filter rail, in the approved editorial order.

---

## File Map

**Create**

- `app/articles/page.tsx` — canonical server-rendered article index and listing JSON-LD.
- `app/articles/[slug]/page.tsx` — canonical server-rendered article detail route.
- `components/article-library.tsx` — client-side search, category controls, result count, empty state, and bounded result list.
- `lib/article-categories.ts` — category vocabulary plus the serializable article-list item type.
- `lib/article-filter.mjs` — dependency-free, runtime-safe metadata filtering function.
- `lib/article-filter.d.mts` — TypeScript declaration for the `.mjs` filter.
- `tests/article-filter.test.mjs` — pure search and category behavior tests.

**Modify**

- `next.config.mjs` — direct permanent legacy redirects.
- `components/navigation.tsx` — point desktop and mobile Articles links at `/articles`.
- `lib/content.ts` — require an approved category in article frontmatter and update route documentation.
- `content/articles/*.mdx` — assign one approved primary category to each existing article.
- `app/sitemap.ts` — advertise only canonical article URLs.
- `app/rss.xml/route.ts` — emit canonical article URLs.
- `tests/articles-menu.test.mjs` — exercise canonical routes, legacy redirects, metadata, server-rendered content, and discovery endpoints.

**Delete after canonical replacements exist**

- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

---

### Task 1: Migrate canonical routes and preserve legacy URLs

**Files:**

- Create: `app/articles/page.tsx`
- Create: `app/articles/[slug]/page.tsx`
- Modify: `next.config.mjs`
- Modify: `components/navigation.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/rss.xml/route.ts`
- Modify: `lib/content.ts`
- Modify: `tests/articles-menu.test.mjs`
- Delete: `app/blog/page.tsx`
- Delete: `app/blog/[slug]/page.tsx`

**Interfaces:**

- Consumes: existing `getArticles(): Article[]`, `getArticle(slug): Article | null`, and `getArticleSlugs(): string[]` from `lib/content.ts`.
- Produces: canonical `/articles` and `/articles/[slug]` pages; direct HTTP 308 redirects from matching `/blog` paths.

- [ ] **Step 1: Replace the route expectations with failing canonical-route tests**

Keep the published-title array already present in `tests/articles-menu.test.mjs`, split request and body helpers so redirects can be observed, and add these behaviors:

```js
async function request(pathname, init) {
  return fetch(`${baseUrl}${pathname}`, init)
}

async function getPage(pathname) {
  const response = await request(pathname)
  assert.equal(response.status, 200, `${pathname} should render successfully`)
  return response.text()
}

test("the portfolio navigation links to Articles at its canonical route", async () => {
  const html = await getPage("/")
  const articleLinks = Array.from(
    html.matchAll(/<a\b[^>]*href="\/articles"[^>]*>([\s\S]*?)<\/a>/g),
  )

  assert.ok(articleLinks.length >= 1, "the server-rendered navigation should link to /articles")
  assert.ok(
    articleLinks.every(([, contents]) => textContent(contents).includes("Articles")),
    "every /articles navigation link should be labelled Articles",
  )
  assert.doesNotMatch(html, /href="\/blog"/)
})

test("legacy article routes permanently redirect to the matching canonical routes", async () => {
  const listing = await request("/blog", { redirect: "manual" })
  assert.equal(listing.status, 308)
  assert.equal(new URL(listing.headers.get("location"), baseUrl).pathname, "/articles")

  const detail = await request("/blog/utility-billing-ledger", { redirect: "manual" })
  assert.equal(detail.status, 308)
  assert.equal(
    new URL(detail.headers.get("location"), baseUrl).pathname,
    "/articles/utility-billing-ledger",
  )
})

test("the canonical Articles page displays every published article", async () => {
  const html = await getPage("/articles")

  assert.match(html, /<title>Technical Articles \| Ehnand Azucena<\/title>/)
  assert.match(html, /<h1\b[^>]*>Technical Articles<\/h1>/)
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/articles"/)
  assert.equal((html.match(/<article\b/g) ?? []).length, publishedTitles.length)

  for (const title of publishedTitles) {
    assert.ok(html.includes(title), `missing published article: ${title}`)
  }
})

test("canonical discovery endpoints advertise only /articles URLs", async () => {
  const [sitemap, rss] = await Promise.all([getPage("/sitemap.xml"), getPage("/rss.xml")])

  assert.ok(sitemap.includes("https://ehnand.com/articles"))
  assert.ok(rss.includes("https://ehnand.com/articles"))
  assert.doesNotMatch(sitemap, /https:\/\/ehnand\.com\/blog(?:\/|<)/)
  assert.doesNotMatch(rss, /https:\/\/ehnand\.com\/blog(?:\/|<)/)
})
```

- [ ] **Step 2: Run the route tests and verify the intended red state**

Run:

```bash
docker compose exec -T app node --test tests/articles-menu.test.mjs
```

Expected: assertion failures because the navigation still links to `/blog`, `/articles` returns 404, and `/blog` returns content instead of 308.

- [ ] **Step 3: Create the canonical listing route**

Copy the current listing route into `app/articles/page.tsx`, then make these exact semantic changes:

```tsx
export const metadata: Metadata = {
  title: "Technical Articles | Ehnand Azucena",
  description:
    "Writing on Laravel, Symfony, multi-tenant SaaS, AI pipelines, and database design — drawn from production systems built for clients in Australia, Switzerland, the UAE, and the US.",
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    title: "Technical Articles | Ehnand Azucena",
    description: "Writing on Laravel, Symfony, multi-tenant SaaS, AI pipelines, and database design.",
    url: `${SITE_URL}/articles`,
  },
}
```

Every listing and JSON-LD URL must use `/articles`:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Ehnand Azucena Technical Articles",
  url: `${SITE_URL}/articles`,
  author: { "@id": `${SITE_URL}/#person` },
  blogPost: articles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    url: `${SITE_URL}/articles/${article.slug}`,
    author: { "@id": `${SITE_URL}/#person` },
  })),
}
```

Keep the current list markup temporarily in this task, but change every article link to `/articles/${article.slug}`. Task 3 replaces the list markup with the knowledge-base component.

- [ ] **Step 4: Create the canonical detail route**

Copy the current detail route into `app/articles/[slug]/page.tsx` and replace every route-bearing value:

```tsx
const path = `/articles/${article.slug}`

// Breadcrumb entry
{ "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles` }

// Back link
<Link href="/articles">Back to articles</Link>

```

Inside the existing `others.map(...)` block, replace `href={`/blog/${other.slug}`}` with `href={`/articles/${other.slug}`}`. Keep its title, summary, date, and CSS classes unchanged.

Retain `BlogPosting`, draft `noindex` behavior, `generateStaticParams()`, author `@id` references, and the existing article prose renderer unchanged.

- [ ] **Step 5: Add direct permanent redirects and remove duplicate route files**

Add a `redirects` function to `next.config.mjs` without altering the existing image, ESLint, or TypeScript settings:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/articles/:slug*",
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
```

After both `app/articles` files exist, delete the two `app/blog` page files. The redirect configuration becomes the only owner of legacy paths.

- [ ] **Step 6: Update every first-party URL producer**

Make these replacements:

```text
components/navigation.tsx
  href="/blog"                         -> href="/articles"  (desktop and mobile)

app/sitemap.ts
  ${SITE_URL}/blog                    -> ${SITE_URL}/articles
  ${SITE_URL}/blog/${article.slug}    -> ${SITE_URL}/articles/${article.slug}
  comments describing /blog           -> comments describing /articles

app/rss.xml/route.ts
  ${SITE_URL}/blog                    -> ${SITE_URL}/articles
  ${SITE_URL}/blog/${article.slug}    -> ${SITE_URL}/articles/${article.slug}

lib/content.ts
  content/articles/*.mdx -> /blog/[slug]  -> content/articles/*.mdx -> /articles/[slug]
```

Do not replace Schema.org `Blog` or `BlogPosting` strings.

- [ ] **Step 7: Restart the existing service and wait for readiness**

`next.config.mjs` changes require a clean dev-server restart, not an image rebuild:

```bash
docker compose restart app
curl --silent --show-error --retry 30 --retry-connrefused --retry-delay 1 --output /dev/null http://localhost:3001/articles
```

- [ ] **Step 8: Run the route tests and verify green**

```bash
docker compose exec -T app node --test tests/articles-menu.test.mjs
```

Expected: every route, redirect, title, canonical, sitemap, and RSS test passes.

- [ ] **Step 9: Review the task diff without committing**

```bash
git diff --check
git status --short
git diff -- next.config.mjs components/navigation.tsx app/articles app/blog app/sitemap.ts app/rss.xml/route.ts lib/content.ts tests/articles-menu.test.mjs
```

Confirm that `.vscode/`, `AGENTS.md`, and unrelated files were not modified. Do not commit.

---

### Task 2: Add primary categories and a tested metadata filter

**Files:**

- Create: `lib/article-categories.ts`
- Create: `lib/article-filter.mjs`
- Create: `lib/article-filter.d.mts`
- Create: `tests/article-filter.test.mjs`
- Modify: `lib/content.ts`
- Modify: `content/articles/document-matching-strategies.mdx`
- Modify: `content/articles/llm-provider-failover.mdx`
- Modify: `content/articles/offline-first-laravel.mdx`
- Modify: `content/articles/utc8-overlap-playbook.mdx`
- Modify: `content/articles/utility-billing-ledger.mdx`

**Interfaces:**

- Produces `ARTICLE_CATEGORIES`, `ArticleCategory`, and `ArticleListItem` for the content reader, listing route, and client component.
- Produces `filterArticles(articles, query, category): ArticleListItem[]` for the client component.

- [ ] **Step 1: Write the failing filter behavior tests**

Create `tests/article-filter.test.mjs`:

```js
import assert from "node:assert/strict"
import test from "node:test"
import { filterArticles } from "../lib/article-filter.mjs"

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

test("search is trimmed and case-insensitive across titles", () => {
  assert.deepEqual(filterArticles(articles, "  LEDGER ", "All").map((item) => item.slug), ["ledger"])
})

test("search matches summaries", () => {
  assert.deepEqual(filterArticles(articles, "circuit breakers", "All").map((item) => item.slug), ["failover"])
})

test("search matches categories", () => {
  assert.deepEqual(filterArticles(articles, "data integrity", "All").map((item) => item.slug), ["ledger"])
})

test("search matches tags", () => {
  assert.deepEqual(filterArticles(articles, "reliability", "All").map((item) => item.slug), ["failover"])
})

test("category and query filters combine", () => {
  assert.deepEqual(filterArticles(articles, "reliability", "Business Systems & Data Integrity"), [])
  assert.deepEqual(filterArticles(articles, "laravel", "Business Systems & Data Integrity").map((item) => item.slug), [
    "ledger",
  ])
})
```

- [ ] **Step 2: Run the pure filter tests and verify red**

```bash
docker compose exec -T app node --test tests/article-filter.test.mjs
```

Expected: FAIL because `lib/article-filter.mjs` does not exist yet.

- [ ] **Step 3: Define the shared category and list-item types**

Create `lib/article-categories.ts`:

```ts
export const ARTICLE_CATEGORIES = [
  "Business Systems & Data Integrity",
  "SaaS, Cloud & Security",
  "AI & Automation",
  "Engineering Practice & Reliability",
] as const

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]
export type ArticleCategoryFilter = "All" | ArticleCategory

export interface ArticleListItem {
  slug: string
  title: string
  date: string
  summary: string
  category: ArticleCategory
  tags: string[]
}
```

In `lib/content.ts`, import `ArticleCategory` as a type and require it in `ArticleFrontmatter`:

```ts
import type { ArticleCategory } from "@/lib/article-categories"

export interface ArticleFrontmatter {
  title: string
  date: string
  updated?: string
  category: ArticleCategory
  tags: string[]
  summary: string
  draft?: boolean
  syndicated?: {
    devto?: string
    hashnode?: string
  }
}
```

- [ ] **Step 4: Implement the minimal dependency-free filter**

Create `lib/article-filter.mjs`:

```js
/**
 * @typedef {import("./article-categories").ArticleCategoryFilter} ArticleCategoryFilter
 * @typedef {import("./article-categories").ArticleListItem} ArticleListItem
 */

/**
 * @param {ArticleListItem[]} articles
 * @param {string} query
 * @param {ArticleCategoryFilter} category
 * @returns {ArticleListItem[]}
 */
export function filterArticles(articles, query, category) {
  const normalizedQuery = query.trim().toLowerCase()

  return articles.filter((article) => {
    const matchesCategory = category === "All" || article.category === category
    if (!matchesCategory) return false
    if (!normalizedQuery) return true

    return [article.title, article.summary, article.category, ...article.tags].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    )
  })
}
```

Create `lib/article-filter.d.mts`:

```ts
import type { ArticleCategoryFilter, ArticleListItem } from "./article-categories"

export function filterArticles(
  articles: ArticleListItem[],
  query: string,
  category: ArticleCategoryFilter,
): ArticleListItem[]
```

- [ ] **Step 5: Assign the approved categories in MDX frontmatter**

Add `category` immediately after `date` in each file:

```yaml
# utility-billing-ledger.mdx
category: "Business Systems & Data Integrity"

# document-matching-strategies.mdx
category: "Business Systems & Data Integrity"

# llm-provider-failover.mdx
category: "AI & Automation"

# offline-first-laravel.mdx
category: "Engineering Practice & Reliability"

# utc8-overlap-playbook.mdx
category: "Engineering Practice & Reliability"
```

Do not alter titles, summaries, tags, dates, or article bodies.

- [ ] **Step 6: Run the filter tests and verify green**

```bash
docker compose exec -T app node --test tests/article-filter.test.mjs
```

Expected: 6 tests pass with zero failures.

- [ ] **Step 7: Re-run the canonical-route tests**

```bash
docker compose exec -T app node --test tests/articles-menu.test.mjs
```

Expected: all route tests remain green and all five articles still render.

- [ ] **Step 8: Review the task diff without committing**

```bash
git diff --check
git diff -- lib/article-categories.ts lib/article-filter.mjs lib/article-filter.d.mts lib/content.ts content/articles tests/article-filter.test.mjs
```

Confirm no article prose changed. Do not commit.

---

### Task 3: Build the searchable, categorized, bounded article library

**Files:**

- Create: `components/article-library.tsx`
- Modify: `app/articles/page.tsx`
- Modify: `tests/articles-menu.test.mjs`

**Interfaces:**

- Consumes `ArticleListItem[]` and `ARTICLE_CATEGORIES` from `lib/article-categories.ts`.
- Consumes `filterArticles(articles, query, category)` from `lib/article-filter.mjs`.
- Produces the interactive listing rendered by `app/articles/page.tsx`.

- [ ] **Step 1: Extend the listing smoke test before changing the UI**

Add these assertions inside the canonical listing test in `tests/articles-menu.test.mjs`:

```js
assert.match(html, /<input\b[^>]*type="search"[^>]*aria-label="Search technical articles"/)
assert.ok(html.includes("All"))
assert.ok(html.includes("Business Systems &amp; Data Integrity"))
assert.ok(html.includes("AI &amp; Automation"))
assert.ok(html.includes("Engineering Practice &amp; Reliability"))
assert.ok(!html.includes("SaaS, Cloud &amp; Security"))
assert.match(html, /aria-label="Article results"/)
```

Keep the existing five-title and five-`<article>` assertions.

- [ ] **Step 2: Run the listing test and verify red**

```bash
docker compose exec -T app node --test tests/articles-menu.test.mjs
```

Expected: FAIL because the current listing has no search input, category controls, or labelled result region.

- [ ] **Step 3: Create the client-side article library**

Create `components/article-library.tsx` with this structure and behavior:

```tsx
"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Search, X } from "lucide-react"
import {
  ARTICLE_CATEGORIES,
  type ArticleCategoryFilter,
  type ArticleListItem,
} from "@/lib/article-categories"
import { filterArticles } from "@/lib/article-filter.mjs"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function ArticleLibrary({ articles }: { articles: ArticleListItem[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<ArticleCategoryFilter>("All")

  const populatedCategories = useMemo(
    () => ARTICLE_CATEGORIES.filter((candidate) => articles.some((article) => article.category === candidate)),
    [articles],
  )
  const filteredArticles = useMemo(
    () => filterArticles(articles, query, category),
    [articles, query, category],
  )
  const isFiltering = query.trim() !== "" || category !== "All"

  function clearFilters() {
    setQuery("")
    setCategory("All")
  }

  return (
    <>
      <div className="mb-8">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, summary, category, or tag…"
            aria-label="Search technical articles"
            className="w-full rounded-xl border border-gray-700 bg-gray-900/70 py-3.5 pl-12 pr-12 text-gray-100 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear article search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0"
          aria-label="Filter articles by category"
        >
          {(["All", ...populatedCategories] as ArticleCategoryFilter[]).map((candidate) => {
            const isActive = category === candidate
            return (
              <button
                key={candidate}
                type="button"
                onClick={() => setCategory(candidate)}
                aria-pressed={isActive}
                className={`flex-shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "border-primary/60 bg-primary/20 text-primary"
                    : "border-gray-700 bg-gray-900/60 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                }`}
              >
                {candidate}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4 text-sm text-gray-400">
        <p aria-live="polite">
          {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          {isFiltering ? " found" : ""}
        </p>
        {isFiltering && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredArticles.length > 0 ? (
        <div
          role="region"
          aria-label="Article results"
          tabIndex={0}
          className="max-h-[min(70dvh,48rem)] space-y-3 overflow-y-auto overscroll-contain pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          {filteredArticles.map((article) => (
            <article key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="group block rounded-xl border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-gray-500">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                  </span>
                </div>

                <h2 className="font-poppins text-xl font-bold text-white transition-colors group-hover:text-primary md:text-2xl">
                  {article.title}
                </h2>
                <p className="mt-2 line-clamp-2 leading-relaxed text-gray-300">{article.summary}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{article.tags.length - 3} more</span>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/40 px-6 py-14 text-center">
          <p className="text-gray-300">No articles match your search and category.</p>
          <button type="button" onClick={clearFilters} className="mt-4 text-primary hover:underline">
            View all articles
          </button>
        </div>
      )}
    </>
  )
}
```

Before editing this UI, follow the applicable Impeccable refinement guidance and its craft floor. Preserve the incumbent portfolio visual system.

- [ ] **Step 4: Pass serializable metadata from the server listing**

In `app/articles/page.tsx`:

```tsx
import ArticleLibrary from "@/components/article-library"
import type { ArticleListItem } from "@/lib/article-categories"

export default function ArticlesPage() {
  const articles = getArticles()
  const articleItems: ArticleListItem[] = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: new Date(article.date).toISOString(),
    summary: article.summary,
    category: article.category,
    tags: article.tags,
  }))
}
```

Keep the existing JSON-LD script, heading, description, and footer. Replace the current listing conditional with this exact block:

```tsx
{articleItems.length === 0 ? (
  <p className="text-gray-400">No articles published yet. Check back soon.</p>
) : (
  <ArticleLibrary articles={articleItems} />
)}
```

Do not pass `article.content`, `draft`, or syndication data into the client component.

- [ ] **Step 5: Run both test files and verify green**

```bash
docker compose exec -T app node --test tests/article-filter.test.mjs tests/articles-menu.test.mjs
```

Expected: the six filter tests and every route/listing smoke test pass.

- [ ] **Step 6: Check the live no-results behavior**

If a browser surface is available, open `http://localhost:3001/articles`, search for `zzzz-no-match`, and verify:

- result count reads `0 articles found`;
- the empty-state message appears;
- `View all articles` restores all five rows;
- selecting `AI & Automation` shows only the LLM failover article;
- clearing filters restores `All`.

If no browser surface is available, report that limitation instead of substituting a different browser-control mechanism.

- [ ] **Step 7: Review the task diff without committing**

```bash
git diff --check
git diff -- components/article-library.tsx app/articles/page.tsx tests/articles-menu.test.mjs
```

Confirm the result panel uses native overflow, all links use `/articles`, and no article body enters client props. Do not commit.

---

### Task 4: Run bounded quality and regression verification

**Files:**

- Verify: all files listed in the File Map.
- Modify only if a check exposes a defect within the approved scope.

**Interfaces:**

- Consumes the completed canonical routes, frontmatter categories, pure filter, and article-library component.
- Produces fresh verification evidence and a concise handoff.

- [ ] **Step 1: Run the complete automated suite fresh**

```bash
docker compose exec -T app node --test tests/article-filter.test.mjs tests/articles-menu.test.mjs
```

Expected: every test passes with zero failures.

- [ ] **Step 2: Exercise live canonical and legacy endpoints**

```bash
curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' http://localhost:3001/articles
curl --silent --show-error --output /dev/null --write-out '%{http_code} %{redirect_url}\n' http://localhost:3001/blog
curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' http://localhost:3001/articles/utility-billing-ledger
```

Expected:

```text
200
308 http://localhost:3001/articles
200
```

- [ ] **Step 3: Run the design detector once across changed UI targets**

```bash
node /home/blank/.codex/skills/impeccable/scripts/detect.mjs --json components/navigation.tsx components/article-library.tsx app/articles/page.tsx 'app/articles/[slug]/page.tsx'
```

Classify findings as introduced or pre-existing. Fix introduced findings in one bounded batch; do not broaden scope to unrelated existing navigation motion or legacy components.

- [ ] **Step 4: Perform one desktop and mobile visual pass if Browser is available**

Inspect `/articles` at approximately 1440×900 and 390×844 in the same pass. Verify:

- search, category rail, and result count have clear hierarchy;
- capsules wrap on desktop and scroll horizontally on mobile;
- the article region scrolls vertically without horizontal overflow;
- row summaries clamp without hiding titles or link affordances;
- keyboard focus is visible;
- the mobile drawer links to `/articles` and reads `Articles`.

Fix all in-scope findings in one batch, then perform at most one confirmation pass. If Browser is unavailable, record that explicitly.

- [ ] **Step 5: Audit redirects and canonical references**

```bash
rg -n '/blog|Blog|blog' app components lib tests next.config.mjs --glob '!components/blog-section.tsx'
```

Allowed remaining `Blog` text:

- Schema.org `"@type": "Blog"`;
- `"@type": "BlogPosting"`;
- legacy redirect sources in `next.config.mjs`;
- tests that exercise legacy redirects;
- the unused legacy `.blog-card` selector and its comment in `app/globals.css`;
- historical design documents.

No navigation, canonical, sitemap, RSS, breadcrumb, or current source comment may advertise `/blog`.

- [ ] **Step 6: Run final whitespace and worktree checks**

```bash
git diff --check
git status --short
```

The status must retain the owner's unrelated work. No `.pnpm-store/`, host `node_modules`, or host `.next` artifact may be introduced.

- [ ] **Step 7: Provide the handoff without committing**

Report:

- canonical `/articles` URL and legacy redirect behavior;
- the category mapping;
- metadata search fields;
- the bounded scrolling behavior;
- exact passing test counts;
- any unavailable lint, typecheck, or browser verification with its existing root cause;
- that no Docker image/build, commit, or push was performed.
