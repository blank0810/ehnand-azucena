# Articles Knowledge Base and Route Migration — Design

**Date:** 2026-08-15
**Status:** Approved in conversation; written specification awaiting owner review

## Purpose

Ehnand Azucena's portfolio needs an article library that remains useful as weekly publishing grows from five articles to 50 or more. The current `/blog` page is a long feed with no search or primary grouping, while the navigation already calls the section **Articles**.

This change turns that publishing surface into a compact technical knowledge base without changing how articles are authored. It preserves the portfolio's role as a crawlable record of Ehnand's production experience while making the library faster for prospective clients and engineers to scan.

This specification supersedes only the `/blog` route and listing decisions in `docs/plans/2026-07-11-content-publishing-design.md`. Its MDX authoring, structured-data, RSS, sitemap, and syndication principles remain in force.

## Goals

1. Make the public route and the navigation label agree on **Articles**.
2. Preserve existing links and search signals during the URL migration.
3. Make 50 or more articles searchable and browsable without producing an extremely long page.
4. Introduce one primary editorial category per article while retaining granular tags.
5. Keep every published article discoverable in server-rendered HTML.

## Non-goals

- Full-body or fuzzy search.
- Dedicated, indexable category pages.
- Pagination, infinite loading, virtualization, or a horizontal article carousel.
- Rewriting the five existing article bodies.
- Redesigning individual article reading pages beyond route and navigation-copy consistency.
- Adding a hosted search service or search dependency.

## Naming and routes

| Surface | Result |
|---|---|
| Navigation label | `Articles` |
| Listing heading | `Technical Articles` |
| Browser/metadata title | `Technical Articles \| Ehnand Azucena` |
| Canonical listing | `/articles` |
| Canonical detail | `/articles/[slug]` |
| Legacy listing | `/blog` permanently redirects to `/articles` |
| Legacy detail | `/blog/[slug]` permanently redirects to `/articles/[slug]` |

The legacy paths will not remain duplicate pages. Next.js will return a server-side permanent redirect, and all first-party links will point directly to `/articles` so users and crawlers do not encounter redirect hops during ordinary navigation.

Canonical metadata, Open Graph URLs, JSON-LD URLs, breadcrumbs, sitemap entries, RSS item links, and source comments will all use `/articles`. Schema types remain `Blog` and `BlogPosting`; those vocabulary names describe the content type and do not dictate the public URL.

## Content model and categories

Article frontmatter gains one required `category` field. It represents the article's primary editorial home; `tags` continue to describe narrower technologies and concepts.

The category vocabulary is fixed initially to:

1. `Business Systems & Data Integrity`
2. `SaaS, Cloud & Security`
3. `AI & Automation`
4. `Engineering Practice & Reliability`

Existing articles map as follows:

| Article slug | Category |
|---|---|
| `utility-billing-ledger` | Business Systems & Data Integrity |
| `document-matching-strategies` | Business Systems & Data Integrity |
| `llm-provider-failover` | AI & Automation |
| `offline-first-laravel` | Engineering Practice & Reliability |
| `utc8-overlap-playbook` | Engineering Practice & Reliability |

The category rail shows only categories represented by published articles, in the editorial order defined above. `SaaS, Cloud & Security` therefore remains part of the accepted vocabulary but stays hidden until its first article is published. This prevents an empty filter from looking broken.

## Knowledge-base listing

The `/articles` server page continues to call `getArticles()`, which excludes drafts and returns newest-first content. It passes only article metadata—not MDX bodies—to an interactive article-library component. The default server render contains all published article links and metadata, so enabling search does not hide the library from crawlers or users without JavaScript.

The page is organized in this order:

1. Back-to-home link.
2. `Technical Articles` heading and short library description.
3. Search field with a clear action.
4. Horizontally scrollable category capsules beginning with `All`.
5. Live result count and, while filtering, a clear-filters action.
6. A bounded, vertically scrollable results region.

Search and category controls stay outside the results scroller so they remain visible while browsing. On narrow screens the capsule rail scrolls horizontally; on wider screens it may wrap when every populated category fits comfortably.

## Search and filtering behavior

Search is local, immediate, case-insensitive, and limited to:

- title;
- summary;
- primary category;
- tags.

Leading and trailing whitespace is ignored. The selected category and search query combine with logical AND: an article must belong to the chosen category and match the query. `All` removes the category constraint. An empty query matches every article in the selected category.

Search state is intentionally session-local. It does not create query-string URLs or indexable result pages in this basic version. Reloading `/articles` resets the interface to `All` with no query.

## Result-row design and scrolling

Articles use compact knowledge-base rows rather than the current large stacked cards. Each row contains:

- category capsule;
- publication date;
- title;
- summary limited visually to two lines;
- the first three tags, followed by a remaining-tag count when necessary;
- a clear link affordance to the article.

The result region uses `max-height: min(70dvh, 48rem)` and its own vertical scroll, with overscroll contained so 50 articles do not lengthen the document indefinitely. The region is keyboard-focusable and labelled as article results. Native scrolling is retained; no custom scrollbar or carousel behavior is introduced.

The existing dark gray surface, blue primary accent, green secondary accent, Inter body type, and Poppins headings remain unchanged. This is an information-architecture refinement, not a visual-world replacement.

## States and accessibility

- The search input has a visible label or an equivalent accessible name.
- Category buttons expose selection with `aria-pressed`.
- The active capsule is distinguishable without relying only on subtle color changes.
- Result-count changes are announced through a polite live region.
- The scrollable results region is keyboard reachable and has an accessible name.
- When nothing matches, the page explains that no articles were found and offers one action to clear all filters.
- Focus rings remain visible on the search field, capsules, clear buttons, and article links.
- Draft articles never appear in categories, counts, search results, sitemap entries, or RSS.

## SEO and discovery

- `/articles` and `/articles/[slug]` are the only canonical, sitemap-advertised article URLs.
- `/blog` and matching detail paths return direct permanent redirects to their corresponding final URLs.
- The listing retains `Blog` JSON-LD containing every published `BlogPosting`.
- Every published article remains linked in the initial server response even though the visible region is bounded.
- RSS continues at `/rss.xml`, but its channel and item links point to `/articles`.
- No filter state creates duplicate or thin category URLs.

## Verification

Implementation follows a red-green workflow using the running Docker service on port 3001. Automated checks will cover:

1. The navigation links to `/articles` and is labelled `Articles`.
2. `/articles` renders `Technical Articles`, the search control, populated category controls, and all five published titles.
3. `/blog` permanently redirects directly to `/articles`.
4. A legacy article URL permanently redirects to the same slug under `/articles`.
5. New article pages, canonical metadata, sitemap output, and RSS links use `/articles`.
6. Basic search matches title, summary, category, and tags; category and query filters combine correctly.
7. Empty search results expose the reset action.

Verification will use the already-running Docker container. No Docker image rebuild or production build is part of this change unless the owner separately requests it.

## Success criteria

- Visitors encounter `Articles` consistently in the menu, headings, breadcrumbs, and URLs.
- Existing `/blog` links reach the corresponding `/articles` page through one permanent redirect.
- The five existing articles appear under their agreed primary categories.
- A visitor can find an article using any word present in its title, summary, category, or tags.
- Fifty article rows can be browsed inside the bounded results region without creating a 50-card document.
- Published content remains fully represented in server-rendered HTML, the sitemap, RSS, and structured data.
