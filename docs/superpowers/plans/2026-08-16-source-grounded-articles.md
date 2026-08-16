# Source-Grounded Articles and ERP Project Implementation Plan

> **Scope correction (2026-08-16):** The ERP project portions of this original plan are superseded by [`2026-08-16-gfm-tables-and-unpublished-erp.md`](./2026-08-16-gfm-tables-and-unpublished-erp.md). The ERP article remains published, but the project entry and project links are intentionally absent until its resources are complete.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish four source-grounded MDX articles, one per approved category, and add the anonymized ERP project referenced by the SaaS article.

**Architecture:** Article bodies remain standalone MDX files consumed by the existing build-time content reader, so the current Articles listing, search, metadata, JSON-LD, sitemap, and RSS integrations pick them up automatically. The ERP stays in `lib/projects.ts`, the repository's single project-data source, so its card, detail route, JSON-LD, and sitemap entry remain synchronized.

**Tech Stack:** Next.js 14 App Router, React 18, strict TypeScript, MDX with gray-matter frontmatter, Tailwind CSS, Node's built-in test runner, Docker Compose.

## Global Constraints

- Preserve the portfolio's credibility and Ehnand Azucena's voice; do not invent clients, results, metrics, roles, dates, or completeness claims.
- Never publish citizen identifiers, customer records, production amounts, cloud account identifiers, private repository paths, credentials, unresolved exploit details, or internal client names.
- Use `2026-08-16` as the real article date and omit the `draft` field so all four articles appear locally.
- State Python `3.14` everywhere for the active ERP application; never describe it as Python 3.12.
- State that SaaS multi-tenancy is partially implemented and the current deployment supports one configured tenant per stack.
- Describe Terraform resources present in the live repository without claiming every resource has already been applied to production.
- Use `Multi-Tenant ERP Backend` publicly; do not expose its internal aliases or private repository URL.
- Run all Node, Next.js, pnpm, lint, and build commands through Docker Compose.
- Use pnpm only and add no dependency.
- Work directly on `main`, preserve unrelated changes, and do not commit or push unless the owner explicitly asks.
- Retain server-rendered article content and all existing canonical, structured-data, sitemap, RSS, and draft behavior.

---

## File Map

**Create**

- `content/articles/correct-ledger-wrong-billing-statement.mdx` — Business Systems & Data Integrity article.
- `content/articles/fastapi-erp-terraform-aws-lambda.mdx` — SaaS, Cloud & Security article.
- `content/articles/durable-ai-memory-obsidian-mocs.mdx` — AI & Automation article.
- `content/articles/automation-no-op-rare-paths.mdx` — Engineering Practice & Reliability article.

**Modify**

- `lib/projects.ts` — add the anonymized Multi-Tenant ERP Backend project.
- `tests/articles-menu.test.mjs` — pin the four articles, all four categories, canonical detail pages, project page, sitemap, and RSS behavior.

No route, renderer, schema, category vocabulary, or dependency changes are required.

### Task 1: Pin the new public content with failing integration tests

**Files:**

- Modify: `tests/articles-menu.test.mjs`

**Interfaces:**

- Consumes: the running Docker Compose app at `TEST_BASE_URL=http://host.docker.internal:3001` or the container-local Next.js service.
- Produces: integration expectations for four new `BlogPosting` pages and one new `SoftwareApplication` project page.

- [ ] **Step 1: Extend the expected article inventory**

Append these exact titles to `publishedTitles`:

```js
"Why a Correct Ledger Total Can Still Produce a Wrong Billing Statement",
"Deploying a Python 3.14 FastAPI ERP to AWS Lambda with Terraform",
"Building Durable AI Memory with Obsidian, Atomic Notes, and MOCs",
"Automation That Usually No-Ops Has Not Proved It Can Act",
```

Change the category assertion so `SaaS, Cloud & Security` must be present instead of absent.

- [ ] **Step 2: Add direct route and discovery assertions**

Add a table containing each slug and title, then request every detail route and assert its title, canonical URL, and absence of the draft notice. Category coverage remains on the Articles listing, because the current detail-page design does not render the primary category. Extend the discovery test to require each new article URL in both sitemap and RSS.

Add a project test for `/projects/multi-tenant-erp-backend` that asserts the page includes `Multi-Tenant ERP Backend`, `Python 3.14`, `FastAPI`, `Terraform`, `Partially implemented`, and its canonical project URL. Require the project URL in the sitemap.

- [ ] **Step 3: Run the integration test and verify the intended red state**

Run through Docker Compose:

```bash
docker compose exec -T app node --test tests/articles-menu.test.mjs
```

Expected: failure because the four article titles/routes and ERP project route do not exist. Confirm the failure is about missing content, not connection or syntax errors.

### Task 2: Add the anonymized ERP project

**Files:**

- Modify: `lib/projects.ts`

**Interfaces:**

- Consumes: the existing `Project` interface and generated `/projects/[slug]` route.
- Produces: `getProjectBySlug("multi-tenant-erp-backend")` through the existing `PROJECTS` array.

- [ ] **Step 1: Add one in-development project entry**

Insert the project among current production/client work with:

```ts
{
  slug: "multi-tenant-erp-backend",
  title: "Multi-Tenant ERP Backend",
  image: "/placeholder.svg",
  period: "Jul 2026 – Present",
  role: "Backend Developer",
  status: "In Development",
  category: "SaaS / Enterprise",
}
```

Write a concrete description and long description covering the Python 3.14 FastAPI/Mangum Lambda path, Terraform IaC, PostgreSQL/SQLAlchemy, Firebase custom authorizer, and S3 asset flow. Use an explicit `Current boundary` section saying multi-tenancy is partially implemented and one configured tenant is supported per stack. Do not add `liveUrl` or `githubUrl`.

Use these technologies exactly:

```ts
[
  "Python 3.14",
  "FastAPI",
  "Mangum",
  "AWS Lambda",
  "API Gateway",
  "Terraform",
  "PostgreSQL",
  "SQLAlchemy",
  "Pydantic",
  "Firebase Auth",
  "Amazon S3",
]
```

- [ ] **Step 2: Inspect the generated public copy**

Search only the new project block for internal aliases, private URLs, account identifiers, and `3.12`. Expected: no matches.

### Task 3: Write the four complete MDX articles

**Files:**

- Create: `content/articles/correct-ledger-wrong-billing-statement.mdx`
- Create: `content/articles/fastapi-erp-terraform-aws-lambda.mdx`
- Create: `content/articles/durable-ai-memory-obsidian-mocs.mdx`
- Create: `content/articles/automation-no-op-rare-paths.mdx`

**Interfaces:**

- Consumes: `ArticleFrontmatter` from `lib/content.ts` and the four values in `ARTICLE_CATEGORIES`.
- Produces: four published `Article` records returned by `getArticles()`.

- [ ] **Step 1: Write the billing-statement article**

Use frontmatter:

```yaml
title: "Why a Correct Ledger Total Can Still Produce a Wrong Billing Statement"
date: 2026-08-16
category: "Business Systems & Data Integrity"
tags: [ledger, billing, accounting, data-integrity, reporting]
summary: "A ledger correction can balance an account and still make every intermediate statement misleading. The missing distinction is often transaction chronology versus reporting-period placement."
```

Cover chronological ordering, period ordering, boundary corrections, null-period handling, and verification against the rendered statement. Use generic pseudocode and link to the Initao project plus relevant existing articles. Publish no account-specific data.

- [ ] **Step 2: Write the FastAPI and Terraform article**

Use frontmatter:

```yaml
title: "Deploying a Python 3.14 FastAPI ERP to AWS Lambda with Terraform"
date: 2026-08-16
category: "SaaS, Cloud & Security"
tags: [python-3.14, fastapi, terraform, aws-lambda, multi-tenancy]
summary: "How I am packaging a FastAPI and Mangum ERP backend for AWS Lambda with Terraform while keeping the current one-tenant-per-stack boundary explicit."
```

Cover the request path, Python 3.14 runtime evidence, dependency-layer packaging, Terraform ownership, identity versus throttling, database/object-storage seams, and the difference between IaC completeness and SaaS multi-tenancy completeness. Link to the new project.

- [ ] **Step 3: Write the durable-memory article**

Use frontmatter:

```yaml
title: "Building Durable AI Memory with Obsidian, Atomic Notes, and MOCs"
date: 2026-08-16
category: "AI & Automation"
tags: [ai-memory, obsidian, knowledge-management, automation, developer-tools]
summary: "A context window is temporary working state, not durable memory. This is the dual-read, forward-write system I use to preserve project knowledge without loading an entire vault into every session."
```

Cover dual-read/forward-write, catalog injection, atomic notes, project MOCs, provenance, secrets separation, and pruning. Do not publish local paths, private corpus counts, or credentials.

- [ ] **Step 4: Write the rare-path automation article**

Use frontmatter:

```yaml
title: "Automation That Usually No-Ops Has Not Proved It Can Act"
date: 2026-08-16
category: "Engineering Practice & Reliability"
tags: [ci-cd, github-actions, testing, reliability, automation]
summary: "A recurring job can stay green for months because its happy path does no work. The first real action is then the first real test, usually on the day the automation matters most."
```

Use an anonymized fast-forward versus true-merge example, explain frequency versus path coverage, and give a practical rare-path verification checklist. Link to Adam AI without exposing repository or pull-request identifiers.

- [ ] **Step 5: Run a private-data and placeholder scan**

Search the four new articles and ERP project block for internal project aliases, private repository hosts, account identifiers, person/customer names from the source notes, `TBD`, `TODO`, `draft:`, and Python `3.12`. Expected: no matches.

### Task 4: Verify the rendered batch and repository quality

**Files:**

- Verify: `tests/articles-menu.test.mjs`
- Verify: all modified and created files

**Interfaces:**

- Consumes: Docker Compose application and production build configuration.
- Produces: fresh evidence that the public routes, content model, lint rules, and static build accept the batch.

- [ ] **Step 1: Run the focused article integration suite**

```bash
docker compose exec -T app node --test tests/articles-menu.test.mjs
```

Expected: all article menu, route, project, sitemap, and RSS tests pass.

- [ ] **Step 2: Run every repository test through Docker**

```bash
docker compose exec -T app node --test tests/*.test.mjs
```

Expected: zero failures.

- [ ] **Step 3: Run the separate lint check**

```bash
docker compose run --rm --no-deps app pnpm lint
```

Expected: exit 0 with no ESLint errors.

- [ ] **Step 4: Run the production build with the mandatory environment override**

```bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
```

Expected: exit 0 and static generation includes all four new article routes and `/projects/multi-tenant-erp-backend`.

- [ ] **Step 5: Inspect the final diff and public source boundary**

```bash
git diff --check
git status --short
git diff -- lib/projects.ts content/articles tests/articles-menu.test.mjs docs/superpowers
```

Confirm that only the intended project metadata, four articles, tests, and planning documents were added to this batch; preserve the earlier Articles implementation and unrelated `.vscode/` and `AGENTS.md` changes. Do not commit or push.
