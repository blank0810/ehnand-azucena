# CLAUDE.md

Guidance for Claude Code and other coding agents working in this repository.

## Project Overview

This is Ehnand Azucena's personal professional portfolio at `ehnand.com`. Its purpose is to turn verified production experience, technical writing, work history, and credentials into credible evidence for prospective clients and employers.

Optimize changes for credibility, clear proof, accessibility, performance, search/AI discoverability, and direct contact conversion. Public copy is reputation-sensitive: never invent or embellish employers, clients, outcomes, metrics, dates, credentials, testimonials, contact details, or technical experience. If the repository or owner does not support a claim, flag it instead of guessing.

The positioning is engineer-directed and AI-augmented. Ehnand owns discovery, architecture, technical decisions, review, and production accountability. Claude Code and Codex assist research, scaffolding, implementation, tests, documentation, CI/CD, and infrastructure as code.

## Architecture

Astro statically generates every public page. There is no React application, framework hydration runtime, server adapter, or Worker runtime entry.

```text
src/pages/                  Static routes and XML/text endpoints
src/layouts/                Shared page, article, and project layouts
src/components/             Focused Astro presentation components
src/data/                   Verified portfolio, career, FAQ, and taxonomy data
src/lib/                    Content queries, schemas, dates, filters, and validation
src/styles/global.css       Active stylesheet
content/articles/           MDX technical articles
content/case-studies/       Optional MDX project narratives
public/                     Evidence images, headers, redirects, verification file
```

Browser-authored interactions are deliberately limited to the progressively enhanced `/articles` search and category filter, system-aware theme selection, the five-project featured rotation, and one-time section reveals. Every article and project record, including all five featured projects, is present in generated HTML; static fallback paths remain available without JavaScript.

## Sources of truth

- `src/data/projects.ts` feeds project records, project detail routes, related articles, schemas, and sitemap URLs. Do not duplicate project metadata in components or case-study frontmatter.
- `content/case-studies/<project-slug>.mdx` must match an existing project slug. Detail pages fall back to verified project descriptions when no case study exists.
- `content/articles/*.mdx` is validated by `src/content.config.ts`. Drafts remain directly buildable for local review but are excluded from listings, related articles, RSS, and sitemap and use `noindex,nofollow`.
- `src/data/article-categories.ts` owns the four article categories.
- `src/data/faq.ts` feeds both visible FAQ content and homepage `FAQPage` JSON-LD.
- `src/config/site.ts` owns `SITE_URL`, site identity, and the canonical Person id `${SITE_URL}/#person`.
- `src/data/profile.ts` and `src/data/career.ts` own contact, history, education, skills, and credential evidence.

The FastAPI Python 3.14 ERP article is published, but there is no public ERP project. Do not add `/projects/multi-tenant-erp-backend`, project schema, project sitemap entries, or internal project links until the owner publishes complete resources.

## Routes and discovery

Canonical public routes are `/`, `/projects`, `/projects/[slug]`, `/articles`, `/articles/[slug]`, `/rss.xml`, `/sitemap.xml`, and `/robots.txt`. `public/_redirects` permanently maps `/blog` and `/blog/*` to the corresponding `/articles` paths.

`BaseLayout.astro` emits one canonical Person entity. Page-specific Blog, BlogPosting, SoftwareApplication, BreadcrumbList, WebSite, ProfilePage, and FAQPage schemas reference that Person id rather than duplicating a person object.

Use evidence dates for sitemap `lastmod`: article `updated` then `date`, and explicit project or case-study update dates only. Never stamp routes with the build time or infer modification from a project's start period.

## Visual system

`DESIGN.md` is the durable authority for Production Trace: neutral light/dark technical surfaces, graphite ink, cobalt working marks, amber live status, ruled evidence records, IBM Plex Sans/Mono, restrained entry and state motion, and the commissioning trace. `src/styles/global.css` is the only application stylesheet.

Preserve semantic headings, keyboard navigation, visible focus, meaningful alternative text, WCAG AA contrast, responsive one-column behavior, table overflow access, and reduced motion. Do not introduce gradients, glass panels, generic card grids, a second visual language, or unsupported evidence.

## Docker-only workflow

Run every Node, Astro, pnpm, lint, test, build, preview, and deploy command through Docker Compose. Never install or build on the host. Use pnpm only.

```bash
docker compose up
docker compose up --build

docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
```

Development is at `http://localhost:3001`, mapped to Astro port `4321`. Compose named volumes isolate `/app/node_modules`, `/app/.astro`, and `/app/dist`; host installs are ignored by the container.

`Dockerfile.dev` uses Node 22 Bookworm Slim because Wrangler's `workerd` binary requires glibc. Keep the explicit production environment override in the documented build command so local and integration builds use the same mode.

## Cloudflare

`wrangler.jsonc` configures asset-only Cloudflare Workers Static Assets for `dist/`. It intentionally has no `main`, server adapter, database, storage binding, account id, route, or secret. `public/_headers` supplies conservative response headers; do not add a Content Security Policy without a complete asset and external-origin inventory plus browser verification.

Deployment, custom domains, DNS changes, old Vercel removal, and Cloudflare credentials are owner-controlled actions. Do not run `wrangler deploy`, modify DNS, or remove the prior deployment unless explicitly asked.

## Change discipline

- Keep pages and content static by default. Do not add a React island unless separately justified by functionality that cannot be delivered with semantic HTML or a small vanilla script.
- Keep content-source consumers synchronized across listings, details, metadata, JSON-LD, sitemap, RSS, and internal links.
- Follow the repository style: `@/...` aliases, double quotes, no semicolons, two-space indentation, and focused components.
- Add dependencies only when their value justifies bundle size and maintenance cost.
- Keep secrets and private operational or vault material out of Git and public MDX.
- Files in `docs/superpowers/` and `docs/plans/` are decision records, not automatic evidence that work remains pending.

## Git workflow

Work directly on `main`; do not create branches or pull requests for this solo repository. Commit or push only when the owner explicitly asks. Never force-push, never commit secrets, and preserve unrelated owner changes in a dirty worktree.
