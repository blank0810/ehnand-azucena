# Content & Publishing Capability — Design

**Date:** 2026-07-11
**Status:** Approved, pending implementation

## Problem

ehnand.com is technically well-optimized and completely invisible. As of 2026-07-11:

- `site:ehnand.com` returns zero pages — the site is not indexed.
- Searching "Ehnand Azucena" surfaces LinkedIn, Himalayas, ZoomInfo, and GitHub, but never ehnand.com. The site does not rank for its owner's own name.
- AI search engines synthesize answers about Ehnand entirely from those third-party profiles and never cite his domain.

Technical SEO is not the bottleneck and never was. Visibility needs three inputs; the site has one:

| Input | State |
|---|---|
| Crawlable, well-marked-up site | Solved |
| Inbound links and corroboration | Near zero |
| Content worth citing | **Zero** |

The site is a brochure — hero, projects, skills, contact. It has no surface anyone would link to or quote, and no capability to publish one. LLMs cite sources; a brochure is not a source.

Head terms like "full stack developer" are unwinnable and, more importantly, carry the wrong intent — that SERP is Coursera, AWS, and W3Schools, and its searchers are aspiring developers, not clients. The winnable tier is experience-backed long-tail content, which is also exactly what LLMs retrieve and cite.

## Goals

1. Give the site a publishing surface for two content types: **case studies** (convert clients) and **technical articles** (earn citations).
2. Make published content extraction-friendly, so AI search can quote it.
3. Consolidate the site's schema around a single `Person` entity so crawlers and LLMs resolve one author, not several.
4. Route syndication through dev.to with canonicals home, so articles get discovered on a domain that is actually crawled.

Non-goal: ranking for competitive head terms. Explicitly abandoned.

## Decisions

Three forks, settled with the owner:

- **Cadence:** roughly one piece every two weeks (~12 in six months).
- **Content types:** both case studies and technical articles. They do different jobs.
- **Authoring:** MDX. Long-form prose inside TypeScript template strings (the current `longDescription` pattern) is miserable enough to kill the writing cadence, which is the one thing the whole plan depends on.
- **URLs:** deepen the existing `/projects/[slug]` routes in place; add a new `/blog`. No 301s, no URL churn.

## Content model

```
content/
  articles/*.mdx      -> /blog/[slug]
  case-studies/*.mdx  -> /projects/[slug]   (long-form body only)
```

**The metadata/prose split.** `lib/projects.ts` remains the single source of truth for project *metadata* — title, technologies, period, role, status, category, image, links — because it already feeds three consumers (cards, detail pages, sitemap). Duplicating that into frontmatter would create drift.

MDX becomes the source of truth for the long-form *narrative*. A case study is matched to its project by filename: `content/case-studies/adam-ai.mdx` pairs with `slug: "adam-ai"`.

The existing `longDescription` field in `lib/projects.ts` is retired. Projects with no matching MDX file continue to render from `description` alone, so nothing breaks on day one and projects convert one at a time.

Articles are self-contained: all metadata lives in their frontmatter.

```yaml
---
title: "Laravel Multi-Tenancy: Subdomain vs Single-DB"
date: 2026-07-20
updated: 2026-07-22
tags: [laravel, multi-tenancy, postgres]
summary: "Why I chose single-database tenancy for MemberPulse, and where it broke."
syndicated:
  devto: https://dev.to/blank0810/...
---
```

## Rendering

`next-mdx-remote/rsc` + `gray-matter`. Two dependencies, no codegen step, works directly in server components — which matters, because the pages are already RSC and must stay server-rendered for crawlers. Content is read from disk at build time; everything remains statically generated.

Rejected: **Contentlayer** (effectively unmaintained) and **Velite** (adds codegen and a watcher for typed frontmatter, a benefit that does not justify the machinery at this scale).

## Routes

| Route | What | Rendering |
|---|---|---|
| `/blog` | Article listing, newest first | SSG |
| `/blog/[slug]` | Article | SSG via `generateStaticParams` |
| `/projects` | Project hub — **currently 404s** | SSG |
| `/projects/[slug]` | Existing; now renders the MDX narrative | SSG (unchanged) |

The `/projects` hub matters more than it looks. Fifteen project URLs currently have no page linking to them, so a crawler's only path in is the sitemap. A hub gives real internal-link paths and is itself rankable.

## Structured data

Articles emit `BlogPosting`; case studies emit `Article`. Both carry `headline`, `datePublished`, `dateModified`, `author`, `image`, and `mainEntityOfPage`.

**The entity consolidation is the point.** The `Person` schema gets a stable `@id` of `${SITE_URL}/#person`, and every article references that `@id` as its author rather than inlining a duplicate Person object. Today, project pages emit a *second* Person blob — so a crawler sees two entities where there should be one. A canonical `@id` is what lets a search engine resolve "author of these 12 articles" and "the person in this portfolio" as the same entity. That confidence is precisely what an LLM needs before it will name someone.

## Sitemap, feed, and a bug

`app/sitemap.ts` picks up `/blog`, `/projects`, and every article automatically from the MDX files.

While there: `lastModified: new Date()` currently stamps *every* URL with build time on *every* deploy. Google detects untrustworthy `lastmod` and discards it. Replace with real per-content dates from frontmatter.

Add `/rss.xml`. Cheap, and it is how dev aggregators and some AI crawlers discover new posts.

## Syndication

Publish on ehnand.com first. Wait 2–3 days so Google crawls the original. Then repost to dev.to with `canonical_url` pointing home.

Dev.to is already indexed, constantly crawled, and retrieved by LLMs. ehnand.com is none of those. The canonical sends ranking credit home while discovery happens on a domain people actually read. For a zero-authority domain this is the single most effective distribution lever available.

Hashnode works the same way and is a reasonable second target. **Medium is skipped** — worse canonical handling, and it keeps the ranking.

## Writing workflow

The infrastructure can be built without the owner. The articles cannot.

What makes writing citable is exactly what an assistant cannot invent: the thing that broke in production, the number before and after, the decision that was regretted. Generic Laravel content earns zero citations.

Workflow per piece: **Ehnand brain-dumps** (messy notes, bullets, whatever) → **Claude shapes it** into an extraction-friendly article: question-shaped H2s, the answer in the first two sentences under each, tables for comparisons, concrete numbers, visible dates.

## First content slate

Drawn from real production work, which is what makes these defensible and un-fakeable.

**Case studies** (rewrite existing project pages as problem → constraint → decision → result):

1. `adam-ai` — multi-tenant document intelligence; the module marketplace and the 8 matching algorithms.
2. `initao-water-billing-system` — a municipal utility platform won through competitive government bidding.
3. `swiss-energy-platform-suite` — consolidating 20 reconciliation services into one mono-repo.

**Articles:**

1. *Laravel Multi-Tenancy: Subdomain vs. Single-Database — What I Chose and Why* — decision content, backed by MemberPulse.
2. *How to Structure a Utility Billing Database (Meter Reads, Arrears, Partial Payments)* — almost nobody has written this well; backed by Initao.
3. *Doctrine N+1 Queries: How to Find and Kill Them in Symfony 7* — high-volume long-tail with a real fix.
4. *Working with Australian and Swiss Clients from UTC+8: The Overlap Playbook* — nobody has written this well, and it sits directly on hiring intent.

## Out of scope

- A `/hire` page with `Service` schema (worth doing; separate change).
- A proper 1200×630 OG image (the current one is an 800×800 portrait).
- Fixing or `noindex`ing the 8 thin project pages that are ~150-word stubs.

## What this does not fix

None of this gets the site indexed. Indexing is gated on inbound links — chiefly the dead LinkedIn website link pointing at a 404'd GitHub Pages URL. That fix is worth more than everything in this document. This design is what makes the site *worth* citing once it is finally crawled.
