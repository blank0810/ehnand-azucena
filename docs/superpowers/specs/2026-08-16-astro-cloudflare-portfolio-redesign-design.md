# Astro and Cloudflare Portfolio Redesign Design

**Date:** 2026-08-16

**Status:** Approved in conversation

**Approved visual direction:** Production Trace

**Approved homepage composition:** Horizontal commissioning rail

**Production domain:** `https://ehnand.com`

## Decision summary

Replace the existing Next.js application with a static-first Astro site and deploy the generated `dist/` directory through Cloudflare Workers Static Assets. This is a complete migration, not a parallel implementation: after feature, content, route, and SEO parity are verified, the repository will no longer contain a Next.js runtime, React application, `.next` workflow, Vercel deployment configuration, or compatibility copy of the old site.

The redesign uses the approved Production Trace visual world: cold technical paper, graphite text, cobalt working marks, one amber live-status accent, numbered evidence records, and a horizontal trace from Problem to Production. The visual system must make Ehnand's work inspectable without turning the portfolio into a dashboard or generic card grid.

The positioning is **engineer-directed and AI-augmented**. Ehnand owns discovery, architecture, technical decisions, review, and production accountability. Claude Code and Codex accelerate research, scaffolding, implementation, testing, documentation, CI/CD, and infrastructure-as-code work. Public copy must never suggest that an agent owns the architecture or replaces engineering judgment.

## Product source of truth

Implementation must remain grounded in:

- `CLAUDE.md` for the repository's product purpose, evidence boundaries, and operating history.
- `AGENTS.md` for the current architecture, publishing, SEO, Docker, accessibility, and Git constraints.
- `PRODUCT.md` for the approved audience, positioning, public capabilities, and migration intent.
- `lib/projects.ts`, `lib/faq.ts`, current portfolio components, `content/articles/`, `content/case-studies/`, and `public/` for claims and public evidence.
- `.impeccable/mocks/homepage/option-2-horizontal-ai-workflow.png` for the approved composition and visual hierarchy.

The generated comp is not a factual source. Its invented trace identifier, incidental labels, typographic errors, and mock content must not ship. Every employer, client, outcome, metric, date, role, project status, contact detail, technology, and credential must be copied from repository evidence or explicitly supplied by the owner.

## Goals

1. Make Ehnand's full-stack systems-delivery offer clear within the first viewport.
2. Lead with a small set of verified production projects while preserving a complete project archive.
3. Explain the role of Claude Code and Codex as part of a disciplined delivery workflow.
4. Preserve all published projects, articles, case studies, RSS discovery, canonical URLs, redirects, and structured data.
5. Make weekly MDX publishing simple and independent of hand-built page components.
6. Improve performance by shipping static HTML, local CSS, local fonts, and only narrowly scoped progressive JavaScript.
7. Meet WCAG 2.2 AA behavior for keyboard access, focus, contrast, semantic structure, touch targets, and reduced motion.
8. Deploy through Cloudflare Workers Static Assets with no production application runtime.
9. Remove all Next.js-specific code and dependencies after the Astro site passes the migration acceptance checks.

## Non-goals

- No Cloudflare Pages deployment.
- No server-side rendering, Worker API handler, D1, KV, Durable Objects, R2 binding, authentication, or contact-form backend.
- No second Next.js application, fallback runtime, or long-lived compatibility layer.
- No CMS or database-backed publishing workflow.
- No React island unless a later, separately approved feature cannot be delivered accessibly with static HTML and a small vanilla script.
- No dark-mode toggle in this redesign. The approved light technical-paper world is the single authored theme.
- No Three.js scene, decorative 3D object, blanket scroll-reveal system, parallax, animated cursor, or continuous ambient motion.
- No new ERP project entry or `/projects/...` route. The Python 3.14 FastAPI ERP article remains published without a portfolio-project link.
- No invented project screenshots, testimonials, performance scores, business outcomes, or conversion claims.

## Direction contract

The base layout will include the following implementation contract as the first child of `<body>` so the chosen direction remains inspectable during implementation:

```html
<!--
THESIS: Production Trace makes delivery inspectable and refuses the generic dark hero and card-grid portfolio.
OWN-WORLD: Cold technical paper, graphite ink, cobalt working marks, one amber live accent, grotesk plus mono type, numbered records, calibration rules, and sharp or clipped corners.
STORY: A visitor understands the service, sees proof, understands AI's role and human accountability, then contacts Ehnand.
FIRST VIEWPORT: Navigation; large service statement left; verified Adam AI record right; horizontal Problem to Production rail; primary Discuss a project action.
FORM: Horizontal commissioning rail from grounded candidate 4, seed dc307738.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->
```

## Information architecture

### Global navigation

The primary navigation is consistent on every page:

| Label | Destination | Purpose |
|---|---|---|
| Work | `/projects` | Complete project archive |
| Services | `/#services` | Client problems and delivery capabilities |
| Articles | `/articles` | Complete technical-writing archive |
| About | `/#about` | Experience, credentials, and résumé |
| Discuss a project | `/#contact` | Primary conversion action |

The logo/name links to `/`. A skip link targets the main content. On narrow screens, the navigation collapses into an accessible `<details>` disclosure so it needs no client framework.

The public label and endpoint are both **Articles**. `Blog` remains only the correct Schema.org type for the publication collection; it is never used as a menu label or canonical route.

### Route parity

| Public URL | Astro source | Required behavior |
|---|---|---|
| `/` | `src/pages/index.astro` | Static homepage with Person and FAQ structured data |
| `/projects` | `src/pages/projects/index.astro` | Complete, crawlable project archive |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | One prebuilt page for every entry in project data |
| `/articles` | `src/pages/articles/index.astro` | Server-rendered article library with progressive search and category filters |
| `/articles/[slug]` | `src/pages/articles/[slug].astro` | One prebuilt page for every article, including locally reachable drafts |
| `/rss.xml` | `src/pages/rss.xml.ts` | Published articles only |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | Canonical published URLs and real dates only |
| `/robots.txt` | `src/pages/robots.txt.ts` | Sitemap reference and crawl policy |
| `/404.html` | `src/pages/404.astro` | Custom, useful not-found page |
| `/blog` | `public/_redirects` | Permanent `308` redirect to `/articles` |
| `/blog/*` | `public/_redirects` | Permanent `308` redirect to `/articles/:splat` |

Astro uses `trailingSlash: "never"`. Cloudflare uses `html_handling: "drop-trailing-slash"` so `/articles/` normalizes to `/articles` and canonical URLs remain stable.

## Astro architecture

### Build model

- Astro uses `output: "static"` and a production `site` value derived from `SITE_URL`, defaulting to `https://ehnand.com`.
- No Cloudflare adapter is installed because the production output is static assets.
- Dynamic project and article routes are generated with `getStaticPaths()`.
- Pages and layouts are Astro components by default. Shared interactive behavior is plain TypeScript compiled to browser JavaScript only where required.
- The production build must not depend on a network request for content, fonts, icons, metadata, or structured data.
- All environment-specific values are build-time values. There are no Worker secrets or runtime environment bindings in this scope.

### Target repository structure

```text
src/
  components/
    articles/
    home/
    projects/
    site/
  config/
    site.ts
  data/
    article-categories.ts
    faq.ts
    projects.ts
  layouts/
    BaseLayout.astro
    ArticleLayout.astro
    ProjectLayout.astro
  lib/
    content.ts
    dates.ts
    schema.ts
  pages/
    404.astro
    index.astro
    articles/
      index.astro
      [slug].astro
    projects/
      index.astro
      [slug].astro
    robots.txt.ts
    rss.xml.ts
    sitemap.xml.ts
  scripts/
    article-library.ts
  styles/
    global.css
  content.config.ts
content/
  articles/*.mdx
  case-studies/*.mdx
public/
  _headers
  _redirects
  googlecd31dbbd9b3efa78.html
  images/
astro.config.mjs
wrangler.jsonc
```

Component boundaries follow visible responsibilities rather than creating a component for every wrapper. Each numbered homepage section is an Astro component; simple one-use fragments stay in the page that owns them.

### Shared layout

`BaseLayout.astro` owns:

- `lang="en"`, viewport, color scheme, skip link, site header, main landmark slot, and footer.
- Absolute canonical URL construction.
- Page title, description, robots, Open Graph, Twitter card, and optional article metadata.
- The canonical Person JSON-LD entity at `${SITE_URL}/#person`.
- Conditional Google Search Console verification metadata.
- Local font loading and the global stylesheet.
- Progressive browser-native cross-document view-transition CSS.
- The direction-contract comment as the first child of `<body>`.

Page-specific schemas are passed as serializable objects and emitted as safe JSON. Article, project, collection, breadcrumb, and FAQ schemas reference the shared Person `@id` rather than defining another Person.

## Content and data model

### Articles

Existing files remain in `content/articles/*.mdx`. `src/content.config.ts` defines an Astro content collection with the following schema:

```text
title       required non-empty string
date        required YYYY-MM-DD string
updated     optional YYYY-MM-DD string, not earlier than date
category    required member of the four approved categories
tags        required non-empty array of normalized strings
summary     required non-empty string suitable for metadata and listings
draft       optional boolean, default false
syndicated  optional object containing validated dev.to and/or Hashnode URLs
```

The four canonical categories remain:

1. Business Systems & Data Integrity
2. SaaS, Cloud & Security
3. AI & Automation
4. Engineering Practice & Reliability

The collection validates dates and category names during `astro check` and build. Articles sort by `date` descending, then slug ascending for deterministic ordering. `updated` controls `dateModified` and sitemap `lastmod` when present.

Draft behavior is preserved exactly:

- A draft receives a prebuilt detail page at its real slug for local review.
- A draft page displays a visible draft notice and emits `noindex, nofollow`.
- Drafts are excluded from `/articles`, homepage article lists, related links, RSS, and the sitemap.
- A missing article slug returns the custom 404 response through Cloudflare asset handling.

MDX uses `remark-gfm` so tables, task lists, autolinks, and strikethrough compile into semantic HTML. An Astro MDX component map replaces the default table element with `ProseTable.astro`, which preserves semantic table children inside a labelled, keyboard-focusable horizontal overflow wrapper. Prose styles cover headings, lists, code, blockquotes, links, figures, and semantic tables without React. Build validation rejects an article body containing an `h1`, preserving one page-level `h1` and an MDX hierarchy that begins at `h2`.

Tags remain visible editorial descriptors and feed `BlogPosting.keywords`; categories feed `articleSection` and navigation. They are useful for topical clarity, related-content links, and machine-readable context, but they are not treated as a ranking shortcut. The obsolete HTML `meta keywords` list is removed.

### Case studies

Existing narratives remain in `content/case-studies/*.mdx`. The case-study collection accepts an optional real `updated` date and uses the filename as the project slug. A build-time validation step fails if a case-study filename has no matching published project.

Each project detail page uses this fallback chain:

1. Matching MDX case study.
2. Verified `longDescription` from project data.
3. Verified short `description` from project data.

The fallback renderer must not use unsanitized string replacement plus `set:html`. A build-time helper recognizes only paragraphs, labelled section headings, and `•` bullet lines in the existing strings, returns typed text records, and lets Astro escape every value. Inline `**` markers are removed by that controlled tokenizer and rendered as text emphasis; raw HTML is never accepted.

### Projects

`lib/projects.ts` migrates to `src/data/projects.ts` and remains the single source of truth for project slug, title, description, image path, technologies, period, role, status, category, and verified live/source links. It also permits an optional `updated` date, but only when a real substantive-update date is supported by the case study or owner. The project inventory remains complete and statically generated. Project start dates continue to support visible chronology and `SoftwareApplication.dateCreated`; they are not misrepresented as modification dates.

A `relatedArticleSlugs` field is added to the same project record. It is populated only for relationships supported by the existing article and project copy, such as Adam AI document matching, REPSShield provider failover, and Initao billing/offline workflows. It defaults to an empty array. The FastAPI ERP article is never attached to a project until the owner publishes that project.

Project images retain stable public URLs for Open Graph and JSON-LD. Every rendered image includes known dimensions, descriptive alternative text grounded in what is visible, and appropriate `loading`, `decoding`, and `fetchpriority` attributes. Existing placeholder assets remain plainly placeholders; the migration does not fabricate missing proof.

### FAQ and professional data

`lib/faq.ts` migrates to `src/data/faq.ts`, and the visible FAQ and `FAQPage` JSON-LD read the same array. Add one visible, source-grounded question that explains how Ehnand uses Claude Code and Codex while retaining responsibility for architecture, review, and production outcomes.

Experience, education, certificates, skills, contact links, and résumé access migrate from the existing components without rewriting factual claims. The current externally hosted résumé remains an external link in this phase; it is not downloaded or committed without separate owner approval.

## Homepage composition

### 1. Navigation

A compact technical header contains the name/mark, primary navigation, and the `Discuss a project` action. It remains legible over the paper surface and does not obscure anchored headings.

### 2. First viewport: offer plus current evidence

The hero uses the approved copy:

- Eyebrow: `ENGINEER-DIRECTED · AI-AUGMENTED`
- Heading: `Full-stack systems delivery.`
- Body: `I design and architect production SaaS, operational platforms, APIs, and infrastructure, using Claude Code and Codex to accelerate implementation, testing, CI/CD, and IaC.`
- Primary action: `Discuss a project`
- Secondary action: `Inspect selected work`

The page-title metadata uses a pipe separator rather than an em dash. The visible hero sentence also avoids using an em dash as a structural divider.

The right side is a verified Adam AI evidence record using only current project metadata and the existing screenshot. It can display verified fields such as project title, category, role, period, status, technologies, and case-study link. It must not include the comp's fictional trace ID, fake dashboard values, or any generated result.

On mobile, the service statement comes first, followed by actions and then the Adam AI record. The first call to action remains visible without requiring horizontal scrolling.

### 3. Commissioning rail

The horizontal trace is the defining interaction and information graphic:

| Stage | Working line | Responsibility label |
|---|---|---|
| Problem | Clarify constraints | HUMAN-LED DISCOVERY |
| Architecture | Design the system | HUMAN-OWNED DECISIONS |
| Delivery | Build and verify | CLAUDE CODE + CODEX |
| Production | Operate and improve | AGENT-ASSISTED CI/CD + IAC |

Caption: `AI agents accelerate execution; engineering judgment and accountability remain human.`

The rail is semantic HTML ordered content, with inline SVG used only for the connecting trace and calibration marks. On small screens it becomes a vertical trace; it does not force the full page to scroll horizontally.

### 4. Selected systems

The homepage curates exactly three systems at launch:

1. Adam AI
2. Initao Water Billing System
3. MemberPulse

Each is presented as an evidence row or record, not a floating generic card. The record includes one image, category/status/role/period, a concise verified description, selected technology labels, and a direct project-detail link. The full inventory remains at `/projects`.

### 5. Services

`#services` describes the client problems Ehnand can take ownership of, using verified experience rather than a framework inventory:

- SaaS and operational platform delivery.
- APIs, data models, billing, reconciliation, and business-system integrity.
- AI-assisted document and workflow automation.
- Deployment, CI/CD, cloud infrastructure, and infrastructure as code.

Each service points to supporting projects or articles. Copy avoids generic promises such as "10x," "world class," or guaranteed business outcomes.

### 6. How I work with AI agents

A dedicated visible section explains the responsibility boundary:

- **Ehnand owns:** discovery, architecture, system boundaries, data and security decisions, tradeoffs, final review, and production accountability.
- **Claude Code and Codex assist with:** research, scaffolding, focused implementation, tests, refactoring, and documentation.
- **Delivery workflow:** agents can help build CI/CD pipelines, Terraform/IaC, and deployment checks, but changes remain reviewed against the design, repository evidence, and production constraints.

This section links to relevant published writing about durable AI memory, automation rare paths, provider failover, and engineering reliability. It must remain understandable to a non-specialist client while giving a technical evaluator enough specificity to see that the workflow is deliberate.

### 7. Recent articles

Show the newest published article from each of the four categories, ordered by date descending. Each row includes publication date, category, title, summary, and a canonical link. The section links to the complete `/articles` library.

### 8. About and evidence

`#about` is a compact record of verified experience, location/time zone, work availability, selected technologies, education, certificates, portrait, and résumé link. It supports deeper evaluation without displacing project proof from the top of the page.

### 9. FAQ

Render the shared FAQ data as native `<details>` and `<summary>` disclosures. Answers remain available without JavaScript. The visible text and JSON-LD are generated from the same records.

### 10. Contact and footer

`#contact` presents the existing verified email, WhatsApp, LinkedIn, and GitHub destinations plus the résumé. There is no contact form. The primary email link is obvious, external destinations are labelled, and focus states are visible.

## Supporting-page design

### Projects archive

`/projects` is a commissioning register rather than a grid of identical cards. It begins with a short archive introduction and a count derived from project data. Every project is present in server-rendered HTML with title, category, status, role, period, concise description, image, and detail link.

The initial Projects archive has no filter controls. It remains a single complete register ordered by the existing project-data order, keeping the only archive script scoped to Articles. Category headings and record labels still make the archive scannable.

### Project details

Each project page contains:

1. Visible breadcrumbs.
2. A record header with title, category, role, period, status, and verified links.
3. The real project image or existing placeholder.
4. MDX case study or verified fallback narrative.
5. Technology list.
6. Explicitly related published articles when supported.
7. A route back to the project archive and a `Discuss a project` action.

The layout is reading-first and uses the same numbered-record grammar as the homepage. External live/source links are clearly differentiated from internal case-study navigation.

### Articles archive

`/articles` is a searchable technical knowledge index. It server-renders every published article so crawlers and no-JavaScript visitors receive the full collection.

The control strip contains:

- A labelled search field covering title, summary, category, and tags.
- A horizontally scrollable capsule rail with `All` plus the four canonical categories.
- A live result count announced through a polite status region.
- A reset action that appears when a filter is active.

The result list is contained in a focusable region with `max-block-size: min(70vh, 64rem)` and `overflow-y: auto`, preventing 50 or more articles from making the page indefinitely tall. It has a visible focus style, an accessible label, persistent headings outside the scroll region, and no hidden keyboard trap.

A small vanilla TypeScript module applies filters, updates `aria-pressed`, controls the empty state, and mirrors `q` and `category` into the query string with `history.replaceState`. Query states retain a canonical URL of `/articles`. If the script fails or JavaScript is disabled, every article remains visible.

### Article details

Each article page contains visible breadcrumbs, category, published/updated dates, title, summary, tags, semantic MDX, syndication links when present, and related published articles. The related algorithm is deterministic: same-category articles first, then newest remaining articles, excluding the current article and all drafts, capped at three.

The measure stays near 70 characters for long-form reading. Code and tables scroll horizontally within their own labelled regions instead of widening the page. Heading hierarchy starts at the page's single `h1`; MDX begins at `h2`.

### Not-found page

The 404 page states that the record was not found and links to Work, Articles, and the homepage. It uses the shared header/footer and is useful without script. `/projects/multi-tenant-erp-backend` and any other unknown path must resolve here and must not appear in navigation, schema, sitemap, RSS, or internal links.

## Visual system

### Color

The initial tokens are fixed and must be contrast-checked in implementation:

| Token | Value | Use |
|---|---|---|
| Paper | `#F3F4F1` | Main background |
| Surface | `#FAFAF7` | Raised records and reading surfaces |
| Graphite | `#15191A` | Primary text |
| Graphite soft | `#4B5352` | Secondary text |
| Rule | `#C8CDCA` | Dividers and calibration lines |
| Cobalt | `#164BC5` | Links, focus, selected states, working marks |
| Amber | `#A85100` | Live status and one-time trace emphasis |

Amber is not used for long body text. Cobalt and amber are never the only indication of state; labels, icons, or patterns provide a second cue.

### Typography

- `IBM Plex Sans Variable` is the locally served primary grotesk through `@fontsource-variable/ibm-plex-sans`.
- `IBM Plex Mono` is the locally served technical label and metadata face through `@fontsource/ibm-plex-mono`.
- Astro bundles the Fontsource WOFF2 files into the static build; no Google Fonts request is made at runtime.
- Body text is at least 1rem with comfortable line height. Technical labels remain legible and do not rely on extremely small all-caps type.
- Page-title metadata follows `Page title | Ehnand Azucena`; no title uses an em dash separator.

### Grid and surfaces

- Content uses a centered 12-column grid with a maximum width near 1240px and responsive gutters.
- Desktop evidence records use asymmetry and alignment to a shared baseline; mobile collapses to one column.
- Borders are primarily one-pixel rules. Corners are square or subtly clipped, not a site-wide set of rounded cards.
- Calibration marks, arrows, and traces are inline SVG or CSS rules. Icons are a small, consistent inline SVG set with visible text labels where meaning matters.
- The production background uses the solid Paper token with no generated grain and no decorative gradient. The technical-paper character comes from typography, rules, spacing, and calibration marks, avoiding another image request.

## Motion and interaction

Motion communicates the trace rather than decorating every section:

- On the first page view, the commissioning line draws and activates its four stages once over 500 to 700 milliseconds.
- Link, row, and filter feedback lasts 100 to 250 milliseconds.
- Browser-native cross-document View Transitions provide progressive continuity for supported browsers without a client router or hydration framework.
- Project archive images and titles receive stable view-transition names that provide continuity on supported browsers and degrade to ordinary navigation elsewhere.
- Content is visible in its final layout before any animation runs. Animation never controls whether text exists or can be read.
- `prefers-reduced-motion: reduce` disables the rail draw, view-transition animation, smooth scrolling, and nonessential transforms.
- There are no autoplay videos, looping status pulses, bounce effects, scroll-jacked sections, or motion tied continuously to pointer movement.

## Accessibility requirements

- Exactly one `h1` per page and a logical heading outline beneath it.
- A keyboard-visible skip link and persistent `:focus-visible` treatment using the cobalt token.
- Native links and buttons for all actions; no clickable `div` elements.
- Minimum 44 by 44 CSS-pixel touch targets for primary mobile controls.
- Meaningful alt text for evidence images; decorative calibration graphics use empty alt text or `aria-hidden="true"`.
- Filter rails support keyboard activation and clearly expose selected state.
- Internal scroll regions are focusable, labelled, and do not intercept page-level keyboard navigation.
- Color contrast is validated against WCAG 2.2 AA in both default and focused states.
- Content and navigation remain complete with JavaScript disabled.
- Layout is verified at 320px, 375px, 768px, 1024px, 1440px, and a wide desktop viewport with no horizontal page overflow.

## Search and AI discoverability

### Metadata and canonical policy

Every route receives a unique factual title and description, absolute canonical URL, Open Graph metadata, Twitter card metadata, author/publisher data, and index/follow policy. Canonicals omit trailing slashes and ignore archive filter query strings.

Title patterns:

- Home: `Full Stack Systems Engineer | Ehnand Azucena`
- Projects: `Full Stack Projects | Ehnand Azucena`
- Project detail: `{Project title} | Ehnand Azucena`
- Articles: `Technical Articles | Ehnand Azucena`
- Article detail: `{Article title} | Ehnand Azucena`

Metadata copy emphasizes supported topics and services without repeating keyword lists. `meta name="keywords"` is not emitted.

### Structured data

- `BaseLayout`: one canonical `Person` entity at `${SITE_URL}/#person` on every page.
- Homepage: `WebSite`, `ProfilePage`, and `FAQPage`, with the FAQ text matching the rendered answers.
- Projects archive: `CollectionPage` and `ItemList` covering every project detail URL.
- Project detail: `SoftwareApplication` and `BreadcrumbList`.
- Articles archive: `Blog` with references to published posts.
- Article detail: `BlogPosting` and `BreadcrumbList`, with `datePublished`, `dateModified`, `articleSection`, tags, canonical `mainEntityOfPage`, and Person references.

The Person's visible copy and supported `knowsAbout` values include AI-assisted software delivery, CI/CD, and infrastructure as code while preserving all currently supported identity, employment, education, location, and profile links. Structured data must not add claims absent from visible content.

### Sitemap, RSS, and crawl paths

The sitemap is a custom static endpoint so every emitted `lastmod` is evidence-based:

- Articles use `updated`, then `date`.
- Project details use an explicit case-study or project `updated` date. When neither exists, their sitemap entry omits `lastmod` instead of substituting the project start date.
- `src/config/site.ts` records a deliberate `SITE_LAST_UPDATED` date for substantive homepage and shared-layout changes. Homepage and archive dates use the newest relevant value among that date and their published content.
- Build time is never used as a fake modification date.

RSS contains published articles only, uses canonical `/articles/[slug]` URLs, and escapes MDX-derived summaries safely. The feed and sitemap exclude drafts, legacy `/blog` URLs, filter query strings, and the unpublished ERP project.

Visible internal links connect service areas, projects, and related articles. Breadcrumbs are rendered in HTML as well as JSON-LD. The existing Google verification file remains public, and `GOOGLE_SITE_VERIFICATION` remains an optional build-time metadata value.

## Cloudflare Workers Static Assets design

### Wrangler configuration

`wrangler.jsonc` contains an asset-only Worker configuration:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "ehnand-portfolio",
  "compatibility_date": "2026-08-16",
  "assets": {
    "directory": "./dist",
    "html_handling": "drop-trailing-slash",
    "not_found_handling": "404-page"
  }
}
```

There is no `main` entry because no Worker runtime code is required. `pnpm deploy` runs the production build and then `wrangler deploy` from Docker Compose.

### Redirects

Astro copies `public/_redirects` into `dist/`:

```text
/blog /articles 308
/blog/* /articles/:splat 308
```

Redirect verification covers the bare legacy path, known legacy article slugs, query strings, and no redirect loop.

### Response headers

`public/_headers` provides conservative static security headers:

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), geolocation=(), microphone=()
```

A Content Security Policy is not introduced blindly. It requires a separate inventory and browser verification after the final asset and external-link set is known.

### Domain cutover and owner setup

After implementation, the owner will:

1. Ensure `ehnand.com` is an active Cloudflare zone. If nameservers must move, copy and verify all existing DNS records first, especially email MX, SPF, DKIM, and DMARC records.
2. In Cloudflare Workers & Pages, connect the GitHub repository to Workers Builds.
3. Use `main` as the production branch and `pnpm build` as the Cloudflare-managed build command, with output in `dist/` and the Worker name matching `wrangler.jsonc`. Docker Compose remains mandatory for local development; Cloudflare runs the equivalent command in its own managed build environment.
4. Set `SITE_URL=https://ehnand.com` and the optional `GOOGLE_SITE_VERIFICATION` value as build variables. No runtime secret is required for the portfolio itself.
5. Deploy first to the generated `workers.dev` address and verify routes, assets, redirects, 404 behavior, metadata, schema, sitemap, and RSS.
6. Open the Worker's Settings, then Domains & Routes, choose Add, choose Custom Domain, and attach `ehnand.com`.
7. Configure `www.ehnand.com` to redirect permanently to the canonical apex domain, preserving paths and query strings.
8. Verify TLS, the apex and `www` behavior, Google Search Console ownership, `robots.txt`, `sitemap.xml`, `rss.xml`, and email delivery before removing the prior Vercel project or DNS records.

The Vercel deployment remains available until the custom domain has been verified on Cloudflare. Removing the old deployment is a separate owner-controlled cutover action, not an automatic repository step.

## Docker and package workflow

All Node, Astro, pnpm, lint, test, build, preview, and deploy commands continue to run through Docker Compose.

### Container changes

- `Dockerfile.dev` uses Node 22 Bookworm Slim with Corepack-managed pnpm. Wrangler's `workerd` binary requires glibc and does not execute under Alpine's musl runtime.
- The Compose service maps host port `3001` to Astro's container port `4321`.
- Development command: `pnpm dev --host 0.0.0.0`.
- Compose-managed named volumes isolate `/app/node_modules`, `/app/.astro`, and `/app/dist`; `.next` volumes and references are removed. The shared `dist` volume lets a build, HTML validation run, and preview container inspect the same generated output without creating root-owned host artifacts.
- Production preview uses Astro's preview server on an explicitly mapped container port for integration checks.

### Package scripts

```text
dev      astro dev --host 0.0.0.0
build    astro build
preview  astro preview --host 0.0.0.0
check    astro check
lint     eslint .
test     node --test
validate:html  html-validate "dist/**/*.html"
deploy   pnpm build && wrangler deploy
```

### Dependency direction

Runtime dependencies are `astro`, `@astrojs/mdx`, `@astrojs/markdown-remark`, `@astrojs/rss`, `@fontsource-variable/ibm-plex-sans`, `@fontsource/ibm-plex-mono`, and `remark-gfm`. Development dependencies are `@astrojs/check`, `@eslint/js`, `@types/node`, `typescript`, `typescript-eslint`, `eslint`, `eslint-plugin-astro`, `globals`, `html-validate`, and `wrangler`, plus transitive packages resolved by pnpm. The implementation installs compatible stable releases through Docker and pins the exact result in `pnpm-lock.yaml` and the `packageManager` field.

Remove Next.js, React, React DOM, React types, Framer Motion, Three.js, `next-mdx-remote`, `next-themes`, Radix UI, shadcn helpers, Lucide React, Tailwind, PostCSS, `gray-matter`, and React-specific intersection or carousel packages once no Astro source imports them. Plain CSS replaces Tailwind, and inline SVG replaces the React icon package.

## Migration and deletion sequence

1. Record the current public route/content inventory and baseline Docker test results.
2. Add Astro configuration, static content collections, shared data, layouts, global styles, and Docker changes while preserving existing content and assets.
3. Build the homepage and shared navigation/footer from the approved comp and direction contract.
4. Build Projects archive/detail routes and validate all existing project slugs.
5. Build Articles archive/detail routes, GFM rendering, drafts, filtering, related links, RSS, and sitemap.
6. Add metadata, structured data, redirects, headers, robots, 404 behavior, and Wrangler configuration.
7. Rewrite integration tests around semantic HTML and public behavior rather than Next.js class names or runtime details.
8. Run the full Astro check, lint, unit, production-build, and preview integration suite through Docker Compose.
9. Compare the generated route inventory and content counts against the baseline.
10. Delete `app/`, `components/`, Next configuration, `next-env.d.ts`, Next-specific TypeScript settings, `.next` references, unused Tailwind/PostCSS/shadcn configuration, and Next/React dependencies.
11. Run the same verification suite again after deletion and search the repository and lockfile for forbidden Next/React runtime remnants.
12. Update `README.md`, `CLAUDE.md`, `AGENTS.md`, `.env.example`, Docker documentation, and deployment instructions to describe Astro and Cloudflare accurately.
13. Perform the final visual, responsive, accessibility, metadata, and provenance review against the approved comp.

Deletion happens only after the Astro routes have passed parity checks. Existing content, user assets, unrelated dirty-worktree changes, and Git history are preserved.

## Error handling and edge cases

- Invalid article frontmatter, unsupported categories, malformed dates, duplicate slugs, or case-study/project mismatches fail the build with a file-specific message.
- An empty published-article collection renders a useful Articles empty state and omits article entries from RSS/sitemap without crashing the build.
- Filter search is case-insensitive, trims whitespace, handles punctuation safely, and never interprets input as HTML or a regular expression.
- A zero-result filter state explains that no articles match and provides a reset action.
- Invalid query parameters fall back to `All` without hiding the archive.
- Long project titles, technology lists, category labels, code blocks, tables, and unbroken URLs wrap or scroll within their own containers and never widen the page.
- External links use `rel="noopener noreferrer"` when opened in a new tab. Internal navigation does not force a new tab.
- Missing optional project images use the repository's existing placeholder and truthful alt text.
- Unknown article/project slugs and the unpublished ERP project return the custom 404.
- Drafts remain directly previewable locally but cannot surface through public discovery mechanisms.
- A missing `SITE_URL` falls back to `https://ehnand.com`; a trailing slash in the environment value is normalized away.

## Verification and acceptance criteria

### Automated Docker checks

Run, at minimum:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
```

Start the built preview through Docker Compose and run integration checks against it.

### Content and route checks

- `/`, `/projects`, `/articles`, RSS, sitemap, robots, and 404 render successfully.
- All 15 current project slugs render exactly once.
- All 9 current article slugs render exactly once.
- The four article categories appear in the Articles capsule rail.
- The Articles source HTML contains every published article before JavaScript runs.
- Search, category selection, reset, query-string synchronization, result count, empty state, and the scrollable result region work with mouse and keyboard.
- The dual-read, forward-write Store/Best use table renders as semantic `table`, `thead`, `th`, and `td` elements.
- A fixture draft is built, visibly labelled, `noindex`, and excluded from homepage lists, `/articles`, related links, RSS, and sitemap.
- `/blog` and `/blog/[known-slug]` return `308` to their `/articles` equivalents.
- `/projects/multi-tenant-erp-backend` returns 404, and no rendered HTML, feed, or sitemap links to it.
- Every visible article/project link resolves; every image source returns successfully.

### SEO checks

- Every indexable page has one unique title, one description, and one absolute canonical URL.
- No page title uses an em dash as the site-name separator.
- Structured-data JSON parses and references `${SITE_URL}/#person` consistently.
- Homepage FAQ schema matches visible FAQ text.
- Project/archive/article schema includes only published, supported entities.
- Sitemap dates come from content/project evidence and never from build time.
- RSS contains all and only published articles with canonical `/articles` URLs.
- Legacy `/blog` URLs are absent from canonical tags, internal links, sitemap, and RSS.
- Robots references the absolute sitemap URL and does not block public assets.

### Accessibility and visual checks

- Full keyboard walkthrough covers skip link, navigation, disclosures, filters, scroll regions, project links, article links, résumé, and contact actions.
- `html-validate` reports no errors on generated home, archives, representative details, and 404 pages; the manual keyboard and contrast checks cover behavior that static validation cannot prove.
- Text and UI-state colors meet WCAG 2.2 AA contrast.
- Reduced-motion mode removes the commissioning draw and view-transition movement without hiding content.
- Screenshots at the required responsive widths match the approved hierarchy and show no page-level horizontal overflow.
- The homepage first viewport makes the offer, evidence, AI responsibility boundary, and primary action understandable.

### Performance and removal checks

- Static article and project detail pages ship no framework hydration bundle.
- The Articles archive ships only the small local filter module required for its controls.
- No runtime font or third-party UI request is needed to render the site.
- The Three.js cube and Framer Motion runtime are absent from generated assets.
- Repository searches find no Next.js imports, Next.js config, `.next` workflow, React runtime, obsolete Vercel adapter, or Next/React package entry after migration cleanup.
- `dist/` contains all expected HTML, images, fonts, redirects, headers, feed, sitemap, robots, and 404 output.

## Asset provenance and finish review

The approved comp is a design reference and is not served publicly. Shipping raster categories are:

1. Existing owner/project/certificate images from `public/`, recorded as repository-provided assets.
2. No generated raster ships in the redesign; the background is a solid CSS color and all working marks are repo-native SVG/CSS.
3. No generated project screenshot, portrait, certificate, or client evidence.

The trace, arrows, icons, and calibration marks are repo-native SVG/CSS and do not require raster generation. Every public image receives an origin record, dimensions, usage location, and alt-text decision in `DESIGN.md` or a linked provenance section.

The final finish review compares desktop and mobile renders against the approved comp, records intentional deviations, verifies the direction-contract seed `dc307738` exists in the built HTML, and produces a clear ship/revise verdict. The site is not considered complete while visual defects, unsupported claims, accessibility failures, broken routes, missing provenance, or Next.js remnants remain.

## Approved artifacts

- Product definition: `PRODUCT.md`
- Surface brief: `.impeccable/homepage-surface-brief.md`
- Generated surface brief: `.impeccable/surfaces/src-pages-index-astro.md`
- Approved comp: `.impeccable/mocks/homepage/option-2-horizontal-ai-workflow.png`
- Comp prompt: `.impeccable/mocks/homepage/option-2-horizontal-ai-workflow.prompt.txt`
- Approval record: `.impeccable/mocks/homepage/option-2-horizontal-ai-workflow.png.json`

## Definition of done

The migration is done only when the Astro site reproduces every supported public route and content item, implements the approved Production Trace redesign, accurately explains the engineer-directed AI workflow, passes Docker-based build and verification checks, deploys as an asset-only Cloudflare Worker, and contains no active Next.js or React application. Domain cutover remains a deliberate owner action after the `workers.dev` deployment is verified.
