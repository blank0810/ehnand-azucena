# ehnand.com

Ehnand Azucena's professional portfolio and technical-writing site. It presents verified full-stack systems work, project evidence, career history, and weekly engineering articles to prospective clients and employers.

Live site: [ehnand.com](https://ehnand.com)

## Stack

- Astro static output with strict TypeScript
- MDX content collections for articles and case studies
- Plain CSS using the Production Trace system in `DESIGN.md`
- Cloudflare Workers Static Assets with no Worker runtime entry
- pnpm, Node 22, and Docker Compose for local operation

## Interface and evidence

- Neutral light and dark themes follow the operating system on first visit; a header control persists an explicit visitor choice.
- The first viewport progressively rotates through Adam AI, REPSShield, Water Billing System, MemberPulse, and Swiss Energy Platform Suite. All five records and fallback links remain in the generated HTML.
- `/projects` keeps all published project records in a named, keyboard-focusable bounded register so a growing archive does not extend the page indefinitely.
- The current CV is served first-party at `/files/Ehnand-Azucena-CV.pdf`, with separate view and download actions.
- Entry, project-state, and native page transitions are removed for visitors who prefer reduced motion.

## Local development

Run every Node, Astro, pnpm, build, and test command through Docker Compose. Do not install or build on the host.

```bash
docker compose up
docker compose up --build
```

The development site is available at [http://localhost:3001](http://localhost:3001). Docker maps port `3001` to Astro's container port `4321`.

### Verification commands

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
```

The integration suite temporarily copies a known draft fixture into the article collection, builds the site, verifies it through local Wrangler, removes only that fixture, and rebuilds clean production output.

Use pnpm only. `pnpm-lock.yaml` is authoritative.

## Content workflow

### Articles

Add articles to `content/articles/<slug>.mdx`. The filename becomes `/articles/<slug>`.

```yaml
---
title: "Visible article headline"
seoTitle: "Optional concise document title"
date: 2026-08-16
updated: 2026-08-20 # optional; never earlier than date
category: "Engineering Practice & Reliability"
tags: [testing, reliability]
summary: "A specific summary used in listings and metadata."
draft: false
syndicated: # optional
  devto: "https://dev.to/example"
  hashnode: "https://example.hashnode.dev/post"
---
```

Valid categories are defined in `src/data/article-categories.ts`. Draft pages build for direct local review with `noindex,nofollow`, but drafts stay out of the homepage, article archive, related articles, RSS, and sitemap.

The layout supplies the page `h1`; article bodies should begin below that level. GFM tables are supported.

### Projects and case studies

Project metadata lives in `src/data/projects.ts` and feeds the homepage, project archive, detail routes, schema, internal links, and sitemap. Do not duplicate it in components.

An optional narrative lives at `content/case-studies/<project-slug>.mdx`; its filename must match a slug in `src/data/projects.ts`. A project without a case study falls back to its verified long description or description.

## Cloudflare Workers setup

`wrangler.jsonc` deploys `dist/` as asset-only Workers Static Assets. `_redirects` and `_headers` are copied from `public/` during the build.

For the production handoff:

1. Confirm `ehnand.com` is an active Cloudflare zone and preserve all mail records, especially MX, SPF, DKIM, and DMARC.
2. Connect the GitHub repository under Cloudflare Workers Builds.
3. Set `main` as the production branch.
4. Set the build command to `pnpm build`.
5. Let `wrangler.jsonc` deploy the generated `dist/` directory.
6. Add `SITE_URL=https://ehnand.com` and optional `GOOGLE_SITE_VERIFICATION` build variables.
7. Verify the generated `workers.dev` deployment before attaching the domain.
8. Add `ehnand.com` as the apex custom domain and configure a permanent `www`-to-apex redirect that preserves paths and query strings.
9. Verify TLS, email delivery, `/robots.txt`, `/sitemap.xml`, `/rss.xml`, and Search Console.
10. Remove old Vercel routing only after the Cloudflare domain is verified.

A local `pnpm deploy` script exists, but do not run it without explicit owner authorization and valid Cloudflare credentials. Local deploy commands must still run through Docker Compose.

## Public routes

- `/`
- `/projects` and `/projects/<slug>`
- `/articles` and `/articles/<slug>`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`
- `/blog` and `/blog/*` as permanent redirects to `/articles`

## License

Personal project. Not licensed for reuse.
