# Astro and Cloudflare Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax (- [ ]) for tracking.

**Goal:** Replace the current Next.js portfolio with the approved Production Trace Astro site, preserve every supported public route and discovery surface, and prepare an asset-only Cloudflare Workers deployment.

**Architecture:** Astro statically generates the homepage, 15 project pages, 9 published article pages, draft previews, XML discovery endpoints, robots, and a custom 404. Repository-backed TypeScript data and Astro content collections remain the only public-content sources; the only browser script is the progressively enhanced Articles filter. Cloudflare Workers Static Assets serves dist with no Worker runtime entry, while permanent legacy redirects live in the copied static _redirects file.

**Tech Stack:** Astro static output, strict TypeScript, Astro MDX content collections, remark-gfm, IBM Plex Sans/Mono through Fontsource, plain CSS, pnpm, Node 22, Docker Compose, Node's built-in test runner, ESLint, html-validate, Wrangler, Cloudflare Workers Static Assets.

## Global Constraints

- Read CLAUDE.md, AGENTS.md, PRODUCT.md, and docs/superpowers/specs/2026-08-16-astro-cloudflare-portfolio-redesign-design.md before implementation.
- Work directly on main. Do not create a branch, pull request, or Git worktree.
- Do not commit or push unless the owner explicitly asks. Each task ends with a review checkpoint instead of a commit step.
- Preserve unrelated user changes, including .vscode, AGENTS.md, existing article work, and all approved Impeccable artifacts.
- Run every Node, Astro, pnpm, lint, test, build, preview, and deployment command through Docker Compose.
- Use pnpm only. pnpm-lock.yaml and the packageManager field remain authoritative.
- Development remains available at http://localhost:3001, mapped to Astro port 4321.
- Production is Astro output: static. Do not install @astrojs/cloudflare or add a Worker main entry.
- Production hosting is Cloudflare Workers Static Assets, not Cloudflare Pages.
- Keep these canonical public routes: /, /projects, /projects/[slug], /articles, /articles/[slug], /rss.xml, /sitemap.xml, /robots.txt.
- Keep 308 redirects from /blog and /blog/* to the equivalent /articles URLs.
- Preserve all 15 current projects, all 9 current articles, all four editorial categories, RSS, sitemap, GFM tables, canonical metadata, and the Person identifier https://ehnand.com/#person.
- Keep draft article pages buildable and noindex while excluding drafts from every listing, related-content set, RSS item, and sitemap URL.
- Keep the Python 3.14 FastAPI ERP article published. Do not create, link, or advertise an ERP project route.
- Never invent or embellish employers, clients, outcomes, metrics, credentials, dates, testimonials, contact details, project states, or technical experience.
- Use the approved hero copy, engineer-directed AI positioning, three selected systems, and four-stage commissioning rail verbatim from the design specification.
- Use page-title metadata in the form Page title | Ehnand Azucena; do not use an em dash as the separator.
- Use the fixed visual tokens Paper #F3F4F1, Surface #FAFAF7, Graphite #15191A, Graphite soft #4B5352, Rule #C8CDCA, Cobalt #164BC5, and Amber #A85100.
- Use IBM Plex Sans Variable and IBM Plex Mono Variable from local Fontsource bundles.
- Ship no React, React DOM, Next.js, Framer Motion, Three.js, Tailwind, Radix, shadcn, next-themes, or client-router runtime.
- Ship no generated raster. Existing repository images are the only public raster evidence.
- Keep content visible without JavaScript. The Articles filter is progressive enhancement over a complete server render.
- Meet WCAG 2.2 AA behavior for headings, focus, contrast, keyboard use, touch targets, responsive layout, labelled scroll regions, and reduced motion.
- Do not run wrangler deploy, alter DNS, detach Vercel, or mutate Cloudflare account state without a separate explicit owner request.

---

## File Map

### Create

- astro.config.mjs — static Astro configuration, canonical site, MDX integration, and no-trailing-slash policy.
- eslint.config.mjs — flat ESLint rules for JavaScript, TypeScript, and Astro.
- .htmlvalidate.json — generated-HTML structural validation.
- wrangler.jsonc — asset-only Workers Static Assets configuration.
- src/env.d.ts — Astro client and build-environment types.
- src/content.config.ts — article and case-study content collections.
- src/config/site.ts — SITE_URL, SITE_LAST_UPDATED, absolute URL construction, and durable profile links.
- src/data/article-categories.ts — the four editorial categories and article-list types.
- src/data/profile.ts — verified identity, contact, availability, résumé, and social links.
- src/data/career.ts — verified experience, education, certificates, and skill groups.
- src/data/faq.ts — visible FAQ and FAQPage schema source.
- src/data/projects.ts — migrated project records, image dimensions, related article slugs, and lookup helpers.
- src/lib/article-filter.ts — pure article metadata filtering.
- src/lib/content.ts — collection lookup, publication filtering, homepage selection, and related-content logic.
- src/lib/dates.ts — UTC-safe display and comparison helpers.
- src/lib/project-narrative.ts — safe typed parser for existing fallback narratives.
- src/lib/schema.ts — Person and page-schema builders plus safe JSON serialization.
- src/layouts/BaseLayout.astro — global document, metadata, Person schema, header, and footer.
- src/layouts/ArticleLayout.astro — reading-first article shell.
- src/layouts/ProjectLayout.astro — project-record shell.
- src/components/site/Header.astro — skip-aware global navigation and mobile disclosure.
- src/components/site/Footer.astro — verified contact, archive, social, and résumé links.
- src/components/site/Breadcrumbs.astro — visible breadcrumb navigation.
- src/components/site/JsonLd.astro — serialized JSON-LD output.
- src/components/content/ProseTable.astro — semantic table in a labelled overflow region.
- src/components/content/ProjectNarrative.astro — typed fallback project narrative rendering.
- src/components/home/Hero.astro — approved offer and Adam AI evidence record.
- src/components/home/CommissioningRail.astro — Problem to Production responsibility trace.
- src/components/home/SelectedSystems.astro — Adam AI, Initao, and MemberPulse evidence.
- src/components/home/Services.astro — evidence-linked client capabilities.
- src/components/home/AiWorkflow.astro — human ownership and Claude Code/Codex assistance boundary.
- src/components/home/RecentArticles.astro — newest published article per category.
- src/components/home/AboutEvidence.astro — verified portrait, experience, education, credentials, and skills.
- src/components/home/Faq.astro — native details/summary FAQ.
- src/components/home/Contact.astro — direct contact and availability.
- src/components/projects/ProjectRecord.astro — reusable project archive record.
- src/components/articles/ArticleRecord.astro — reusable article result record.
- src/components/articles/ArticleLibrary.astro — server-rendered search/filter shell and scroll region.
- src/scripts/article-library.ts — progressive article filtering and URL query synchronization.
- src/styles/global.css — Production Trace tokens, layout, prose, motion, and responsive rules.
- src/pages/index.astro — complete homepage.
- src/pages/projects/index.astro — complete project register.
- src/pages/projects/[slug].astro — statically generated project details.
- src/pages/articles/index.astro — searchable technical article index.
- src/pages/articles/[slug].astro — statically generated article details and draft previews.
- src/pages/rss.xml.ts — published-article RSS feed.
- src/pages/sitemap.xml.ts — evidence-dated sitemap.
- src/pages/robots.txt.ts — crawl policy and sitemap pointer.
- src/pages/404.astro — custom missing-record page.
- public/_redirects — permanent legacy article redirects.
- public/_headers — conservative static response headers.
- tests/fixtures/draft-preview.mdx — integration-only draft source.
- tests/helpers/generated-site.mjs — helpers for generated HTML assertions.
- tests/helpers/article-sources.mjs — dependency-free article frontmatter fixtures for generated tests.
- tests/unit/migration-foundation.test.mjs — Astro/package/container contract.
- tests/unit/content-data.test.mjs — data counts, uniqueness, dates, relationships, and ERP boundary.
- tests/unit/article-filter.test.mjs — pure article filtering behavior.
- tests/generated/base-layout.test.mjs — metadata, direction contract, Person schema, and zero-framework shell.
- tests/generated/homepage.test.mjs — homepage hierarchy, trace, proof, AI workflow, FAQ, and contact.
- tests/generated/projects.test.mjs — archive and 15 detail-page parity.
- tests/generated/articles.test.mjs — article archive/detail, table, metadata, and discovery-source parity.
- tests/integration/cloudflare-routes.test.mjs — HTTP status, redirects, headers, draft policy, and 404.
- tests/run-integration.mjs — temporary draft injection, clean build, local Wrangler server, tests, cleanup, and final clean rebuild.
- DESIGN.md — final visual rules, intentional deviations, and raster provenance.

### Modify

- Dockerfile.dev — Node 22, Astro port, frozen pnpm install, and Astro development command.
- docker-compose.yml — port 3001:4321 and Compose-managed node_modules, .astro, and dist volumes.
- package.json — Astro scripts and dependency replacement.
- pnpm-lock.yaml — pnpm-generated Astro dependency graph.
- tsconfig.json — Astro strict preset and src alias.
- .gitignore — Astro, dist, Wrangler, and local environment outputs.
- .dockerignore — Astro/Workers build exclusions and removal of .next assumptions.
- .env.example — SITE_URL and optional Google verification build variables.
- README.md — Astro operator workflow and Cloudflare owner setup.
- CLAUDE.md — Astro architecture, Docker workflow, content model, and Cloudflare deployment.
- AGENTS.md — current Astro repository guidance and removal of Next-specific rules.
- PRODUCT.md — verify that implemented architecture still matches the approved product definition.

### Preserve unchanged

- content/articles/*.mdx — the nine source-grounded articles.
- content/case-studies/adam-ai.mdx — the current case study and real updated date.
- public/images/** — verified project, portrait, and certificate evidence.
- public/googlecd31dbbd9b3efa78.html — existing Search Console verification file.
- .impeccable/** — approved comp, brief, seed, and approval record.
- docs/superpowers/specs/** and earlier plans — historical design context.

### Delete only after parity passes

- app/**
- components/**
- hooks/**
- lib/**
- styles/**
- next.config.mjs
- next-env.d.ts
- postcss.config.mjs
- tailwind.config.ts
- components.json
- REFACTORING_PLAN.md
- googlecd31dbbd9b3efa78.html at repository root; keep the copy under public.

---

### Task 1: Establish the Astro and Docker foundation

**Files:**

- Create: tests/unit/migration-foundation.test.mjs
- Create: astro.config.mjs
- Create: eslint.config.mjs
- Create: .htmlvalidate.json
- Create: src/env.d.ts
- Create: src/pages/index.astro
- Modify: Dockerfile.dev
- Modify: docker-compose.yml
- Modify: package.json
- Modify: pnpm-lock.yaml
- Modify: tsconfig.json
- Modify: .gitignore
- Modify: .dockerignore

**Interfaces:**

- Consumes: packageManager pnpm@10.25.0, Docker-only workflow, production SITE_URL fallback.
- Produces: Astro static build commands; Node 22 container; src alias to src; reusable dist volume; an initial crawlable root route.
- Later tasks rely on: astro build, astro check, ESLint, html-validate, and port 4321 inside the container.

- [ ] **Step 1: Write the failing foundation contract test**

Create tests/unit/migration-foundation.test.mjs:

~~~js
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const packageJson = JSON.parse(readFileSync("package.json", "utf8"))
const dockerfile = readFileSync("Dockerfile.dev", "utf8")
const compose = readFileSync("docker-compose.yml", "utf8")
const astroConfig = readFileSync("astro.config.mjs", "utf8")

test("package scripts target Astro and Docker-facing port 4321", () => {
  assert.equal(packageJson.scripts.dev, "astro dev --host 0.0.0.0")
  assert.equal(packageJson.scripts.build, "astro build")
  assert.equal(packageJson.scripts.preview, "astro preview --host 0.0.0.0")
  assert.equal(packageJson.scripts.check, "astro check")
  assert.equal(packageJson.scripts.lint, "eslint .")
  assert.ok(packageJson.dependencies.astro)
  assert.equal(packageJson.dependencies.next, undefined)
  assert.equal(packageJson.devDependencies.next, undefined)
  assert.equal(packageJson.dependencies.react, undefined)
  assert.equal(packageJson.devDependencies.react, undefined)
  assert.match(dockerfile, /FROM node:22-bookworm-slim/)
  assert.match(dockerfile, /EXPOSE 4321/)
  assert.match(compose, /3001:4321/)
})

test("Astro is static and canonical URLs omit trailing slashes", () => {
  assert.match(astroConfig, /output:\s*"static"/)
  assert.match(astroConfig, /trailingSlash:\s*"never"/)
  assert.doesNotMatch(astroConfig, /@astrojs\/cloudflare/)
})
~~~

- [ ] **Step 2: Run the foundation test and confirm the red state**

Run:

~~~bash
docker compose run --rm --no-deps app node --test tests/unit/migration-foundation.test.mjs
~~~

Expected: FAIL because package scripts still invoke Next.js, the container is Node 20, and astro.config.mjs does not exist.

- [ ] **Step 3: Change the container and Compose ports before resolving packages**

Use apply_patch to make Dockerfile.dev:

~~~dockerfile
FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 4321

CMD ["pnpm", "dev"]
~~~

Change docker-compose.yml to:

~~~yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3001:4321"
    volumes:
      - .:/app
      - node_modules:/app/node_modules
      - astro_cache:/app/.astro
      - astro_dist:/app/dist
    environment:
      NODE_ENV: development

volumes:
  node_modules:
  astro_cache:
  astro_dist:
~~~

- [ ] **Step 4: Build the Node 22 transition image**

Run:

~~~bash
docker compose build app
~~~

Expected: the existing lockfile installs successfully under Node 22 and the image exposes 4321.

- [ ] **Step 5: Replace direct dependencies through pnpm inside Docker**

Run these commands through the rebuilt service:

~~~bash
docker compose run --rm app pnpm remove @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-tabs @radix-ui/react-tooltip @types/node @types/react @types/react-dom autoprefixer class-variance-authority clsx framer-motion gray-matter lucide-react next next-mdx-remote next-themes postcss react react-dom react-intersection-observer tailwind-merge tailwindcss tailwindcss-animate three typescript eslint-config-next
docker compose run --rm app pnpm add astro @astrojs/mdx @astrojs/markdown-remark @astrojs/rss @fontsource-variable/ibm-plex-sans @fontsource/ibm-plex-mono remark-gfm
docker compose run --rm app pnpm add -D @astrojs/check @eslint/js @types/node eslint eslint-plugin-astro globals html-validate typescript typescript-eslint wrangler
~~~

Expected: package.json and pnpm-lock.yaml contain the Astro stack and no direct Next.js or React dependency.

- [ ] **Step 6: Replace package scripts and module mode**

Use apply_patch to update the package identity, module mode, and scripts to the following excerpt. Keep the dependency and devDependency sections generated by pnpm in Step 5:

~~~json
{
  "name": "ehnand-portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.25.0",
  "scripts": {
    "dev": "astro dev --host 0.0.0.0",
    "build": "astro build",
    "preview": "astro preview --host 0.0.0.0",
    "preview:cloudflare": "wrangler dev --local --ip 0.0.0.0 --port 4321",
    "check": "astro check",
    "lint": "eslint .",
    "test": "node --test tests/unit/*.test.mjs tests/generated/*.test.mjs",
    "test:integration": "node tests/run-integration.mjs",
    "validate:html": "html-validate \"dist/**/*.html\"",
    "deploy": "pnpm build && wrangler deploy"
  }
}
~~~

Retain the exact dependency versions written by pnpm in Step 5; do not replace them with broad latest ranges by hand.

- [ ] **Step 7: Create the Astro configuration**

Create astro.config.mjs:

~~~js
import mdx from "@astrojs/mdx"
import { unified } from "@astrojs/markdown-remark"
import { defineConfig } from "astro/config"
import remarkGfm from "remark-gfm"

const site = (process.env.SITE_URL ?? "https://ehnand.com").replace(/\/+$/, "")

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  integrations: [mdx()],
  markdown: {
    processor: unified({
      gfm: false,
      remarkPlugins: [remarkGfm],
    }),
  },
})
~~~

- [ ] **Step 8: Replace TypeScript and environment declarations**

Replace tsconfig.json:

~~~json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
~~~

Create src/env.d.ts:

~~~ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string
  readonly GOOGLE_SITE_VERIFICATION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
~~~

- [ ] **Step 9: Add flat ESLint and generated-HTML validation**

Create eslint.config.mjs:

~~~js
import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: ["dist/**", ".astro/**", ".wrangler/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,ts,astro}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
)
~~~

Create .htmlvalidate.json:

~~~json
{
  "extends": ["html-validate:recommended"]
}
~~~

- [ ] **Step 10: Add the first real Astro route**

Create src/pages/index.astro as a temporary but truthful static route:

~~~astro
---
const title = "Full Stack Systems Engineer | Ehnand Azucena"
const description =
  "Full-stack systems delivery for production SaaS, operational platforms, APIs, and infrastructure."
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <main>
      <h1>Full-stack systems delivery.</h1>
    </main>
  </body>
</html>
~~~

Task 3 replaces this shell with BaseLayout; it already uses final factual copy and is not demo filler.

- [ ] **Step 11: Update ignore files for Astro and Wrangler**

In .gitignore, remove .next and out entries and add:

~~~gitignore
/node_modules/
/.pnpm-store/
/.astro/
/dist/
/.wrangler/
.dev.vars
.env*
!.env.example
*.tsbuildinfo
/.superpowers/
.vercel/
~~~

In .dockerignore, remove .next and add node_modules, .astro, dist, .wrangler, .git, .env*.local, and .pnpm-store. Do not exclude content/**/*.mdx or public images.

- [ ] **Step 12: Rebuild and run the foundation checks**

Run:

~~~bash
docker compose build app
docker compose run --rm --no-deps app node --test tests/unit/migration-foundation.test.mjs
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
~~~

Expected: all commands PASS and dist/index.html contains Full-stack systems delivery.

- [ ] **Step 13: Review the foundation diff without committing**

Run:

~~~bash
git diff --check
git status --short
~~~

Confirm that unrelated files are untouched and no commit or push occurs.

---

### Task 2: Migrate and validate content and professional data

**Files:**

- Create: src/content.config.ts
- Create: src/data/article-categories.ts
- Create: src/data/profile.ts
- Create: src/data/career.ts
- Create: src/data/faq.ts
- Create: src/data/projects.ts
- Create: src/lib/content.ts
- Create: src/lib/dates.ts
- Create: src/lib/project-narrative.ts
- Create: tests/unit/content-data.test.mjs
- Preserve: content/articles/*.mdx
- Preserve: content/case-studies/adam-ai.mdx
- Consume: lib/projects.ts, lib/faq.ts, components/about.tsx, components/experience.tsx, components/education.tsx, components/certificates.tsx, components/skills.tsx, and components/contact.tsx

**Interfaces:**

- Produces: ARTICLE_CATEGORIES; Project; PROJECTS; getProjectBySlug; getProjectStartDate; PROFILE; EXPERIENCES; EDUCATION; CERTIFICATES; SKILL_GROUPS; FAQ_ITEMS.
- Produces async content functions: getAllArticles, getPublishedArticles, getArticleBySlug, getCaseStudyByProjectSlug, getRelatedArticles, getHomepageArticles, assertContentIntegrity.
- Produces pure helpers: formatIsoDate, compareIsoDesc, parseProjectNarrative, filterArticles in Task 6.
- Later tasks consume only these data and content interfaces, never the old component-local arrays.

- [ ] **Step 1: Write the failing data-integrity tests**

Create tests/unit/content-data.test.mjs:

~~~js
import assert from "node:assert/strict"
import { access, readFile } from "node:fs/promises"
import test from "node:test"

const {
  PROJECTS,
  getProjectBySlug,
  getProjectStartDate,
} = await import("../../src/data/projects.ts")
const { ARTICLE_CATEGORIES } = await import("../../src/data/article-categories.ts")
const { FAQ_ITEMS } = await import("../../src/data/faq.ts")
const { parseProjectNarrative } = await import("../../src/lib/project-narrative.ts")

test("project inventory is complete, unique, and excludes the unpublished ERP", async () => {
  assert.equal(PROJECTS.length, 15)
  assert.equal(new Set(PROJECTS.map((project) => project.slug)).size, 15)
  assert.equal(getProjectBySlug("multi-tenant-erp-backend"), undefined)

  for (const project of PROJECTS) {
    assert.ok(project.image.width > 0)
    assert.ok(project.image.height > 0)
    assert.ok(project.image.alt.length > 0)
    await access("." + project.image.src)
  }
})

test("project chronology remains UTC-safe and evidence based", () => {
  assert.equal(getProjectStartDate(getProjectBySlug("adam-ai")), "2026-01")
  assert.equal(getProjectStartDate(getProjectBySlug("file-repository-system")), "2023-06")
})

test("article taxonomy and AI workflow FAQ are canonical", () => {
  assert.deepEqual(ARTICLE_CATEGORIES, [
    "Business Systems & Data Integrity",
    "SaaS, Cloud & Security",
    "AI & Automation",
    "Engineering Practice & Reliability",
  ])
  assert.ok(FAQ_ITEMS.some((item) => item.question.includes("Claude Code and Codex")))
})

test("fallback narratives produce escaped typed records with inline emphasis", () => {
  const records = parseProjectNarrative(
    "Overview **verified** paragraph.\n\n**Capabilities:**\n\n• Safe item",
  )
  assert.deepEqual(records, [
    {
      kind: "paragraph",
      parts: [
        { text: "Overview ", strong: false },
        { text: "verified", strong: true },
        { text: " paragraph.", strong: false },
      ],
    },
    {
      kind: "heading",
      parts: [{ text: "Capabilities", strong: false }],
    },
    {
      kind: "bullet",
      parts: [{ text: "Safe item", strong: false }],
    },
  ])
})

test("all related article slugs exist and the ERP article has no project owner", async () => {
  const files = await import("node:fs/promises").then(({ readdir }) =>
    readdir("content/articles"),
  )
  const slugs = new Set(files.filter((file) => file.endsWith(".mdx")).map((file) => file.slice(0, -4)))

  for (const project of PROJECTS) {
    for (const slug of project.relatedArticleSlugs) {
      assert.ok(slugs.has(slug), project.slug + " references missing article " + slug)
    }
  }

  const erp = await readFile("content/articles/fastapi-erp-terraform-aws-lambda.mdx", "utf8")
  assert.doesNotMatch(erp, /\/projects\/multi-tenant-erp-backend/)
})
~~~

- [ ] **Step 2: Run the data test and confirm the red state**

Run:

~~~bash
docker compose run --rm --no-deps app node --test tests/unit/content-data.test.mjs
~~~

Expected: FAIL with module-not-found errors for src/data and src/lib files.

- [ ] **Step 3: Define the canonical article taxonomy**

Create src/data/article-categories.ts:

~~~ts
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
  updated?: string
  summary: string
  category: ArticleCategory
  tags: string[]
}
~~~

- [ ] **Step 4: Define Astro content collections with strict frontmatter**

Create src/content.config.ts with glob loaders rooted at the existing content directories:

~~~ts
import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"
import { ARTICLE_CATEGORIES } from "./data/article-categories"

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/articles" }),
  schema: z
    .object({
      title: z.string().min(1),
      date: isoDate,
      updated: isoDate.optional(),
      category: z.enum(ARTICLE_CATEGORIES),
      tags: z.array(z.string().min(1)).min(1),
      summary: z.string().min(1),
      draft: z.boolean().default(false),
      syndicated: z
        .object({
          devto: z.string().url().optional(),
          hashnode: z.string().url().optional(),
        })
        .optional(),
    })
    .superRefine((article, context) => {
      if (article.updated && article.updated < article.date) {
        context.addIssue({
          code: "custom",
          path: ["updated"],
          message: "updated must not be earlier than date",
        })
      }
    }),
})

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/case-studies" }),
  schema: z.object({
    updated: isoDate.optional(),
  }),
})

export const collections = { articles, caseStudies }
~~~

- [ ] **Step 5: Migrate project records without changing claims**

Create src/data/projects.ts. Copy every claim-bearing field from lib/projects.ts exactly, then use this interface:

~~~ts
export interface ProjectImage {
  src: string
  width: number
  height: number
  alt: string
  fallback?: boolean
}

export interface Project {
  slug: string
  title: string
  description: string
  longDescription?: string
  image: ProjectImage
  technologies: string[]
  period: string
  role: string
  status: string
  category: string
  updated?: string
  relatedArticleSlugs: string[]
  liveUrl?: string
  githubUrl?: string
}
~~~

Use these dimensions:

| Source | Width | Height |
|---|---:|---:|
| /images/projects/adam-ai.webp | 1891 | 589 |
| /images/projects/repsshield.png | 1825 | 816 |
| /images/projects/memberpulse.webp | 1891 | 589 |
| /images/projects/initao-water-bill.webp | 1890 | 667 |
| /images/projects/swiss-energy-placeholder.svg | 500 | 300 |
| /images/projects/budget-app.png | 1890 | 667 |
| /images/projects/playnow.webp | 1836 | 753 |
| /images/weather_app.png | 1870 | 971 |
| /images/edutracker.jpg | 755 | 402 |
| /images/email_auto.jpg | 748 | 393 |
| /images/lgu_hris.jpg | 534 | 584 |
| /placeholder.svg | 1200 | 1200 |
| /images/file_repo.jpg | 738 | 477 |
| /images/expert_sys.jpg | 718 | 476 |

Image alt text must identify the visible project screenshot or state that the image is the existing repository fallback. Do not claim that a fallback is a production screenshot.

Set relatedArticleSlugs exactly:

~~~ts
const RELATED_ARTICLES: Record<string, string[]> = {
  "adam-ai": [
    "document-matching-strategies",
    "automation-no-op-rare-paths",
  ],
  repsshield: ["llm-provider-failover"],
  "initao-water-billing-system": [
    "offline-first-laravel",
    "utility-billing-ledger",
    "correct-ledger-wrong-billing-statement",
  ],
  "swiss-energy-platform-suite": ["document-matching-strategies"],
}
~~~

Every other project receives an empty array. Add no ERP record.

Retain getProjectBySlug and getProjectStartDate with these signatures:

~~~ts
export function getProjectBySlug(slug: string): Project | undefined
export function getProjectStartDate(project?: Project): string | undefined
~~~

- [ ] **Step 6: Centralize verified profile and contact values**

Create src/data/profile.ts with literal values already present in the repository:

~~~ts
export const PROFILE = {
  name: "Ehnand Azucena",
  role: "Full Stack Systems Engineer",
  alternateRole: "Full Stack Developer",
  email: "contact@ehnand.com",
  phoneDisplay: "+63 953 467 8287",
  phoneE164: "+639534678287",
  whatsappUrl: "https://wa.me/639534678287",
  location: "Initao, Northern Mindanao 9022, Philippines",
  timezone: "UTC+8",
  githubUrl: "https://github.com/blank0810",
  linkedinUrl: "https://www.linkedin.com/in/ehnand-azucena-3028a7194",
  resumeUrl:
    "https://7zznrjaei5nypecj.public.blob.vercel-storage.com/CV/Ehnand%20CV.pdf",
  portrait: {
    src: "/images/profile-new.jpg",
    width: 768,
    height: 1152,
    alt: "Portrait of Ehnand Azucena",
  },
  availability: "Available for contract and project-based work",
} as const
~~~

Use normal links for résumé, mail, WhatsApp, LinkedIn, and GitHub. Do not recreate the React clipboard or fetch-download behavior.

- [ ] **Step 7: Move professional evidence into typed data**

Create src/data/career.ts with Experience, Education, Certificate, and SkillGroup interfaces. Move the literal experiences from components/experience.tsx, education from components/education.tsx, the six displayed certificates from components/certificates.tsx, and the six skill groups from components/skills.tsx without editing factual values.

Do not migrate the percentage-based proficiency bars. They are subjective UI decoration, not evidence required by the approved product direction.

Use these exported names:

~~~ts
export const EXPERIENCES: Experience[]
export const EDUCATION: Education[]
export const CERTIFICATES: Certificate[]
export const SKILL_GROUPS: SkillGroup[]
~~~

Record these dimensions with the six displayed certificates:

| Source | Width | Height |
|---|---:|---:|
| /images/certificates/symfony7-fundamentals.png | 1854 | 691 |
| /images/certificates/advanced-react.png | 1057 | 815 |
| /images/certificates/react-basics.png | 1058 | 818 |
| /images/certificates/javascript-algorithms.png | 1226 | 825 |
| /images/certificates/responsive-web-design.png | 1220 | 820 |
| /images/certificates/csxf-cybersecurity.png | 1123 | 796 |

Verification URLs remain unchanged.

- [ ] **Step 8: Migrate FAQ data and add the approved AI responsibility answer**

Create src/data/faq.ts by copying the five existing FAQ records and appending:

~~~ts
{
  question: "How does Ehnand use Claude Code and Codex in delivery?",
  answer:
    "Ehnand uses Claude Code and Codex to accelerate research, scaffolding, focused implementation, tests, documentation, CI/CD, and infrastructure-as-code work. He remains responsible for discovery, architecture, technical decisions, review, and production outcomes.",
}
~~~

Export FAQ_ITEMS from this file and make it the only FAQ source.

- [ ] **Step 9: Add UTC-safe date and fallback narrative helpers**

Create src/lib/dates.ts with:

~~~ts
export function formatIsoDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"))
}

export function compareIsoDesc(left: string, right: string): number {
  return right.localeCompare(left)
}
~~~

Create src/lib/project-narrative.ts with:

~~~ts
export interface NarrativePart {
  text: string
  strong: boolean
}

export interface NarrativeRecord {
  kind: "paragraph" | "heading" | "bullet"
  parts: NarrativePart[]
}

export function parseProjectNarrative(source: string): NarrativeRecord[]
~~~

The parser must:

1. Split on blank lines.
2. Turn a complete line in the form double-asterisk, heading text, colon, double-asterisk into a heading without markers or colon.
3. Turn each line beginning with the bullet character into a bullet.
4. Tokenize paired double-asterisk spans inside paragraphs and bullets into strong parts.
5. Treat unmatched markers as ordinary text.
6. Return all other non-empty text as a paragraph.
7. Never accept or emit HTML; Astro escapes every part and ProjectNarrative renders strong parts with a strong element.

- [ ] **Step 10: Add content query and integrity functions**

Create src/lib/content.ts using getCollection from astro:content. Define:

~~~ts
import type { CollectionEntry } from "astro:content"

export type ArticleEntry = CollectionEntry<"articles">
export type CaseStudyEntry = CollectionEntry<"caseStudies">

export function entrySlug(id: string): string
export async function getAllArticles(): Promise<ArticleEntry[]>
export async function getPublishedArticles(): Promise<ArticleEntry[]>
export async function getArticleBySlug(slug: string): Promise<ArticleEntry | undefined>
export async function getCaseStudyByProjectSlug(
  slug: string,
): Promise<CaseStudyEntry | undefined>
export async function getRelatedArticles(
  article: ArticleEntry,
  limit?: number,
): Promise<ArticleEntry[]>
export async function getHomepageArticles(): Promise<ArticleEntry[]>
export async function assertContentIntegrity(): Promise<void>
~~~

Behavior:

- entrySlug removes a final .md or .mdx extension defensively.
- Articles sort by date descending and then slug ascending.
- Published functions exclude data.draft.
- Related articles use the same category first, then newest remaining, exclude the current entry and drafts, and cap at three by default.
- Homepage articles select the newest published entry for each canonical category and order the four results by date descending.
- Integrity fails on duplicate project slugs, a case-study slug without a project, an unknown related article slug, an article h1, or an ERP project record/link.
- The four existing article-category strings remain unchanged.

- [ ] **Step 11: Run data, type, and build checks**

Run:

~~~bash
docker compose run --rm --no-deps app node --test tests/unit/content-data.test.mjs
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
~~~

Expected: PASS with 15 projects, 9 article files, four categories, one case study, and no ERP project.

- [ ] **Step 12: Review the content diff without committing**

Inspect src/data and src/lib against their source files. Confirm that every factual field is unchanged, private vault paths are absent, and no commit or push occurs.

---

### Task 3: Build the shared Production Trace shell and SEO primitives

**Files:**

- Create: src/config/site.ts
- Create: src/lib/schema.ts
- Create: src/components/site/JsonLd.astro
- Create: src/components/site/Header.astro
- Create: src/components/site/Footer.astro
- Create: src/components/site/Breadcrumbs.astro
- Create: src/layouts/BaseLayout.astro
- Create: src/styles/global.css
- Create: tests/helpers/generated-site.mjs
- Create: tests/generated/base-layout.test.mjs
- Modify: src/pages/index.astro

**Interfaces:**

- BaseLayout props: title, description, canonicalPath, imagePath, robots, ogType, publishedTime, modifiedTime, tags, and schemas.
- absoluteUrl(path) returns a canonical absolute URL.
- serializeJsonLd(value) returns JSON with less-than signs escaped.
- buildPersonSchema() returns the sole Person entity with id https://ehnand.com/#person.
- Header and Footer consume PROFILE and expose the global route/anchor vocabulary.

- [ ] **Step 1: Write failing generated-shell tests**

Create tests/helpers/generated-site.mjs:

~~~js
import { readFile } from "node:fs/promises"

export async function readGenerated(pathname) {
  const clean = pathname === "/" ? "index.html" : pathname.replace(/^\//, "") + "/index.html"
  return readFile(new URL("../../dist/" + clean, import.meta.url), "utf8")
}

export function extractJsonLd(html) {
  return Array.from(
    html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ([, source]) => JSON.parse(source),
  )
}
~~~

Create tests/generated/base-layout.test.mjs:

~~~js
import assert from "node:assert/strict"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

test("root shell has canonical metadata and the direction contract", async () => {
  const html = await readGenerated("/")
  assert.match(html, /<title>Full Stack Systems Engineer \| Ehnand Azucena<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/"/)
  assert.match(html, /dc307738/)
  assert.match(html, /href="\/projects"[^>]*>Work<\/a>/)
  assert.match(html, /href="\/articles"[^>]*>Articles<\/a>/)
  assert.doesNotMatch(html, /\/_next\//)
})

test("root shell emits one canonical Person entity", async () => {
  const html = await readGenerated("/")
  const jsonLd = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
  const people = jsonLd.filter((item) => item["@type"] === "Person")
  assert.equal(people.length, 1)
  assert.equal(people[0]["@id"], "https://ehnand.com/#person")
  assert.equal(people[0].email, "contact@ehnand.com")
})
~~~

- [ ] **Step 2: Build and run the shell test in the red state**

Run:

~~~bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/base-layout.test.mjs
~~~

Expected: FAIL because the temporary route has no shared shell, canonical link, direction contract, navigation, or Person schema.

- [ ] **Step 3: Create site URL and update-date configuration**

Create src/config/site.ts:

~~~ts
import { PROFILE } from "@/data/profile"

export const SITE_URL = (import.meta.env.SITE_URL ?? "https://ehnand.com").replace(/\/+$/, "")
export const SITE_LAST_UPDATED = "2026-08-16"
export const PERSON_ID = SITE_URL + "/#person"
export const SITE_NAME = "Ehnand Azucena"
export { PROFILE }

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path
  if (path === "/") return SITE_URL + "/"
  return SITE_URL + "/" + path.replace(/^\/+|\/+$/g, "")
}
~~~

- [ ] **Step 4: Create schema and safe serialization helpers**

Create src/lib/schema.ts with buildPersonSchema using only the supported Person values currently in app/layout.tsx. Preserve worksFor ClouDesk Pty. Ltd, alumniOf Mindanao State University - Naawan, address, sameAs links, occupation, and existing knowsAbout values. Add these visible and supported topics:

- AI-assisted software delivery
- CI/CD
- Infrastructure as Code

Use PERSON_ID for every author/publisher reference. Implement:

~~~ts
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
~~~

Do not put FAQ, BlogPosting, SoftwareApplication, or collection objects into the Person builder.

- [ ] **Step 5: Create JSON-LD and breadcrumb components**

JsonLd.astro accepts value: unknown and renders one application/ld+json script with set:html={serializeJsonLd(value)}.

Breadcrumbs.astro accepts:

~~~ts
interface Breadcrumb {
  label: string
  href?: string
}
~~~

Render a nav with aria-label Breadcrumb, an ordered list, and aria-current page on the final item. Do not use an icon without a text label.

- [ ] **Step 6: Create the zero-framework global header**

Header.astro renders:

- A skip link to #main-content.
- Ehnand Azucena linked to /.
- Desktop links: Work /projects, Services /#services, Articles /articles, About /#about.
- Primary action Discuss a project linked to /#contact.
- A mobile details/summary disclosure with the same destinations and labels.

Use plain links and native details. No script, menu role, click handler, or duplicate id.

- [ ] **Step 7: Create the verified global footer**

Footer.astro reads PROFILE and renders:

- Full Stack Systems Engineer / Full Stack Developer positioning.
- Work, Articles, About, and Contact routes.
- Email, WhatsApp, LinkedIn, GitHub, and résumé.
- Current UTC build year for copyright.
- Built with Astro. Do not claim a Cloudflare production deployment until the owner completes the external cutover.

Every external new-tab link uses rel="noopener noreferrer". Give icon-only decorative SVG an accessible text label or hide it and keep visible text.

- [ ] **Step 8: Build BaseLayout metadata and document structure**

BaseLayout.astro imports the two Fontsource variable families and global.css. Use these defaults:

~~~ts
interface Props {
  title: string
  description: string
  canonicalPath?: string
  imagePath?: string
  robots?: "index,follow" | "noindex,nofollow"
  ogType?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  schemas?: unknown[]
}
~~~

Emit:

- UTF-8, viewport, description, canonical, robots, Google verification when set.
- Open Graph title, description, canonical URL, image, site name, locale, and type.
- Twitter summary_large_image metadata.
- Article published/modified time and tags only for article pages.
- One Person JSON-LD script plus page-specific schemas.
- The exact direction-contract comment from the approved design specification as the first body child, inserted from a static trusted constant so dc307738 survives the build.
- Header, a slot expected to contain main#main-content, and Footer.

Default image is /images/profile-new.jpg. Page titles passed into the layout already include the pipe separator.

- [ ] **Step 9: Establish the Production Trace CSS foundation**

Create src/styles/global.css with:

~~~css
:root {
  color-scheme: light;
  --paper: #f3f4f1;
  --surface: #fafaf7;
  --graphite: #15191a;
  --graphite-soft: #4b5352;
  --rule: #c8cdca;
  --cobalt: #164bc5;
  --amber: #a85100;
  --font-sans: "IBM Plex Sans Variable", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --content-max: 77.5rem;
  --reading-max: 70ch;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background: var(--paper);
  color: var(--graphite);
  scroll-padding-top: 5rem;
}

body {
  margin: 0;
  min-width: 20rem;
  background: var(--paper);
  font-family: var(--font-sans);
  line-height: 1.6;
}

a {
  color: inherit;
}

:focus-visible {
  outline: 3px solid var(--cobalt);
  outline-offset: 3px;
}

.container {
  width: min(calc(100% - 2rem), var(--content-max));
  margin-inline: auto;
}

.mono-label {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
~~~

Add responsive grid, header, footer, button, rule, record, prose, overflow-region, and print rules using these tokens. Use no decorative gradient, glassmorphism, continuous pulse, or default rounded-card system.

- [ ] **Step 10: Replace the root route with BaseLayout**

Replace src/pages/index.astro with BaseLayout, title Full Stack Systems Engineer | Ehnand Azucena, the approved factual description, and main#main-content. Keep the final h1 copy Full-stack systems delivery. Task 4 fills the remaining homepage sections.

- [ ] **Step 11: Build and run shell checks**

Run:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/base-layout.test.mjs
~~~

Expected: PASS; root HTML contains one Person, canonical metadata, no /_next asset, and the direction seed.

- [ ] **Step 12: Review the shell diff without committing**

Confirm that the first body child is the direction comment, the skip link is keyboard visible, all header/footer destinations are correct, and no commit or push occurs.

---

### Task 4: Implement the complete Production Trace homepage

**Files:**

- Create: src/components/home/Hero.astro
- Create: src/components/home/CommissioningRail.astro
- Create: src/components/home/SelectedSystems.astro
- Create: src/components/home/Services.astro
- Create: src/components/home/AiWorkflow.astro
- Create: src/components/home/RecentArticles.astro
- Create: src/components/home/AboutEvidence.astro
- Create: src/components/home/Faq.astro
- Create: src/components/home/Contact.astro
- Create: tests/generated/homepage.test.mjs
- Modify: src/pages/index.astro
- Modify: src/styles/global.css

**Interfaces:**

- Hero consumes getProjectBySlug("adam-ai").
- SelectedSystems consumes the exact slugs adam-ai, initao-water-billing-system, and memberpulse.
- RecentArticles consumes getHomepageArticles and receives at most one article per category.
- Faq consumes FAQ_ITEMS; the page's FAQPage schema consumes the same array.
- Homepage section ids are home, production-trace, projects, services, ai-workflow, articles, about, faq, and contact. AboutEvidence preserves the nested legacy anchors experience, skills, education, and certificates.

- [ ] **Step 1: Write failing homepage evidence tests**

Create tests/generated/homepage.test.mjs:

~~~js
import assert from "node:assert/strict"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

test("homepage presents the approved offer and responsibility trace", async () => {
  const html = await readGenerated("/")
  assert.match(html, /ENGINEER-DIRECTED · AI-AUGMENTED/)
  assert.match(html, /<h1[^>]*>Full-stack systems delivery\.<\/h1>/)
  assert.match(html, /HUMAN-LED DISCOVERY/)
  assert.match(html, /HUMAN-OWNED DECISIONS/)
  assert.match(html, /CLAUDE CODE \+ CODEX/)
  assert.match(html, /AGENT-ASSISTED CI\/CD \+ IAC/)
  assert.match(html, /engineering judgment and accountability remain human/i)
})

test("homepage curates exactly the three approved systems", async () => {
  const html = await readGenerated("/")
  const records = html.match(/data-selected-system=/g) ?? []
  assert.equal(records.length, 3)
  assert.match(html, /\/projects\/adam-ai/)
  assert.match(html, /\/projects\/initao-water-billing-system/)
  assert.match(html, /\/projects\/memberpulse/)
})

test("homepage exposes all four article categories and direct contact", async () => {
  const html = await readGenerated("/")
  assert.equal((html.match(/data-home-article=/g) ?? []).length, 4)
  assert.match(html, /Business Systems &amp; Data Integrity/)
  assert.match(html, /SaaS, Cloud &amp; Security/)
  assert.match(html, /AI &amp; Automation/)
  assert.match(html, /Engineering Practice &amp; Reliability/)
  assert.match(html, /mailto:contact@ehnand\.com/)
  assert.match(html, /How does Ehnand use Claude Code and Codex in delivery\?/)
})

test("FAQ schema is sourced from the visible homepage questions", async () => {
  const html = await readGenerated("/")
  const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
  const faq = graph.find((item) => item["@type"] === "FAQPage")
  assert.ok(faq)
  assert.equal(faq.mainEntity.length, 6)

  for (const item of faq.mainEntity) {
    assert.ok(html.includes(item.name))
    assert.ok(html.includes(item.acceptedAnswer.text))
  }
})
~~~

- [ ] **Step 2: Run homepage tests and confirm the red state**

Run:

~~~bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/homepage.test.mjs
~~~

Expected: FAIL because the root route contains only the shared shell and h1.

- [ ] **Step 3: Build the approved hero and Adam evidence record**

Hero.astro must render exactly:

- Eyebrow: ENGINEER-DIRECTED · AI-AUGMENTED
- h1: Full-stack systems delivery.
- Body: I design and architect production SaaS, operational platforms, APIs, and infrastructure, using Claude Code and Codex to accelerate implementation, testing, CI/CD, and IaC.
- Primary link: Discuss a project to #contact.
- Secondary link: Inspect selected work to #projects.

Render the Adam AI record from project data with image, title, category, role, period, status, and detail link. Do not render a trace id, fake values, or generated dashboard result. Set fetchpriority="high" only on this above-the-fold project image.

- [ ] **Step 4: Build the semantic commissioning rail**

CommissioningRail.astro uses an ordered list sourced from this constant:

~~~ts
const stages = [
  {
    stage: "Problem",
    line: "Clarify constraints",
    responsibility: "HUMAN-LED DISCOVERY",
  },
  {
    stage: "Architecture",
    line: "Design the system",
    responsibility: "HUMAN-OWNED DECISIONS",
  },
  {
    stage: "Delivery",
    line: "Build and verify",
    responsibility: "CLAUDE CODE + CODEX",
  },
  {
    stage: "Production",
    line: "Operate and improve",
    responsibility: "AGENT-ASSISTED CI/CD + IAC",
  },
]
~~~

Add the caption from the test. Use an aria-hidden inline SVG only for the connecting line; the ordered-list text carries all meaning. CSS draws the line once over 600ms and changes to a vertical trace below 48rem. Reduced motion disables the draw while keeping the complete line visible.

- [ ] **Step 5: Build the selected systems section**

SelectedSystems.astro uses section id projects, resolves exactly the three approved project slugs, and throws a build error if one is missing. Each data-selected-system record renders image, category, status, role, period, description, up to five technologies, and a project-detail link. Do not show all 15 projects here.

- [ ] **Step 6: Build evidence-linked services**

Services.astro renders four client-facing capabilities from the specification:

1. SaaS and operational platform delivery.
2. APIs, data models, billing, reconciliation, and business-system integrity.
3. AI-assisted document and workflow automation.
4. Deployment, CI/CD, cloud infrastructure, and infrastructure as code.

Each capability includes at least one real internal project or article link. The infrastructure-as-code capability links to /articles/fastapi-erp-terraform-aws-lambda as an article only; it never links to or implies an ERP project record. Use no guaranteed outcome, anonymous testimonial, or generic 10x language.

- [ ] **Step 7: Build the AI workflow responsibility section**

AiWorkflow.astro renders three explicit groups:

- Ehnand owns discovery, architecture, system boundaries, data and security decisions, tradeoffs, final review, and production accountability.
- Claude Code and Codex assist with research, scaffolding, focused implementation, tests, refactoring, and documentation.
- Agents can assist CI/CD, Terraform/IaC, and deployment checks; Ehnand reviews changes against design and production constraints.

Link to durable-ai-memory-obsidian-mocs, automation-no-op-rare-paths, and llm-provider-failover. Do not link the ERP article to a project.

- [ ] **Step 8: Build one recent article per category**

RecentArticles.astro receives getHomepageArticles output. Render four data-home-article records with date, category, title, summary, and canonical /articles/[slug] link. Render a final View all articles link to /articles.

- [ ] **Step 9: Build compact about, career, education, credentials, and skills evidence**

AboutEvidence.astro uses PROFILE, EXPERIENCES, EDUCATION, CERTIFICATES, and SKILL_GROUPS.

- Show the portrait at its real 768 by 1152 ratio.
- Keep work chronology and factual bullet points from career data.
- Keep education and current six displayed credentials.
- Render skill groups as text records, not proficiency percentages.
- Link the external résumé directly.
- Keep the section compact with progressive details disclosures for secondary education/certificate depth on narrow screens.
- Put visible subheadings on the preserved experience, skills, education, and certificates anchor targets.

- [ ] **Step 10: Build native FAQ and contact sections**

Faq.astro maps FAQ_ITEMS to details/summary elements and opens the first item. Contact.astro uses PROFILE for email, WhatsApp, LinkedIn, GitHub, location, résumé, and availability. Use no clipboard script, contact form, or animated availability pulse.

- [ ] **Step 11: Assemble homepage and page schemas**

src/pages/index.astro awaits homepage articles, builds WebSite, ProfilePage, and FAQPage schemas, and renders components in this order:

1. Hero
2. CommissioningRail
3. SelectedSystems
4. Services
5. AiWorkflow
6. RecentArticles
7. AboutEvidence
8. Faq
9. Contact

Use main#main-content and section ids from the Interfaces block. The FAQ schema maps the same FAQ_ITEMS rendered by Faq.astro.

- [ ] **Step 12: Add homepage responsive and motion CSS**

Add:

- A 12-column desktop hero with text left and Adam evidence right.
- A one-column mobile order of offer, actions, then evidence.
- Evidence rows aligned to shared rules rather than floating rounded cards.
- 44px minimum primary touch targets.
- Cobalt focus and selected states with text labels as a second cue.
- No page-level horizontal overflow at 320px.
- 100–250ms hover/focus feedback.
- The single 600ms commissioning draw.
- Native cross-document view-transition CSS with no Astro client router.

- [ ] **Step 13: Build and run homepage checks**

Run:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/homepage.test.mjs
~~~

Expected: PASS with four category-diverse articles, three selected systems, six FAQs, and the complete responsibility trace.

- [ ] **Step 14: Review homepage claims without committing**

Compare every visible claim with src/data, the MDX content, or approved copy. Confirm that comp-only trace ids and fake values are absent. Do not commit or push.

---

### Task 5: Implement the complete Projects archive and detail routes

**Files:**

- Create: src/components/projects/ProjectRecord.astro
- Create: src/components/content/ProjectNarrative.astro
- Create: src/layouts/ProjectLayout.astro
- Create: src/pages/projects/index.astro
- Create: src/pages/projects/[slug].astro
- Create: tests/generated/projects.test.mjs
- Modify: src/styles/global.css
- Consume: src/data/projects.ts
- Consume: src/lib/content.ts
- Consume: content/case-studies/adam-ai.mdx

**Interfaces:**

- ProjectRecord receives project: Project and optional priority: boolean.
- ProjectNarrative receives the typed output of parseProjectNarrative.
- ProjectLayout receives project, canonical path, page schema, breadcrumbs, case-study content, and related articles.
- Project archive order remains the existing PROJECTS array order; no project filter script is added.

- [ ] **Step 1: Write failing project parity tests**

Create tests/generated/projects.test.mjs:

~~~js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

const { PROJECTS } = await import("../../src/data/projects.ts")

test("project archive server-renders all 15 records", async () => {
  const html = await readGenerated("/projects")
  assert.match(html, /<title>Full Stack Projects \| Ehnand Azucena<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/ehnand\.com\/projects"/)
  assert.equal((html.match(/data-project-record=/g) ?? []).length, 15)

  for (const project of PROJECTS) {
    assert.match(html, new RegExp('href="/projects/' + project.slug + '"'))
    assert.ok(html.includes(project.title))
  }
})

test("every project detail has canonical metadata and SoftwareApplication schema", async () => {
  for (const project of PROJECTS) {
    const html = await readGenerated("/projects/" + project.slug)
    assert.ok(html.includes(project.title))
    assert.match(
      html,
      new RegExp(
        'rel="canonical" href="https://ehnand.com/projects/' + project.slug + '"',
      ),
    )
    const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
    const software = graph.find((item) => item["@type"] === "SoftwareApplication")
    assert.equal(software.author["@id"], "https://ehnand.com/#person")
  }
})

test("ERP project is absent and Adam case study remains rendered", async () => {
  await assert.rejects(readFile("dist/projects/multi-tenant-erp-backend/index.html"))
  const adam = await readGenerated("/projects/adam-ai")
  assert.match(adam, /Module Marketplace/)
  assert.doesNotMatch(adam, /TRACE ID/)
})
~~~

- [ ] **Step 2: Build and run project tests in the red state**

Run:

~~~bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/projects.test.mjs
~~~

Expected: FAIL because project archive and detail routes do not exist.

- [ ] **Step 3: Create the project archive record**

ProjectRecord.astro renders one article[data-project-record] with:

- Correct width, height, src, alt, loading, decoding, and fetchpriority.
- Category, status, role, period, title, concise description, and up to five technologies.
- One prominent internal detail link.
- Optional live/source links with visible labels and safe external-link attributes.
- A stable view-transition name derived from the slug for image and title.

Do not nest multiple conflicting links around the same complete record.

- [ ] **Step 4: Build the projects commissioning register**

src/pages/projects/index.astro:

- Uses BaseLayout title Full Stack Projects | Ehnand Azucena.
- Renders visible Home / Projects breadcrumbs.
- Introduces the complete archive and a count derived from PROJECTS.
- Renders every ProjectRecord in existing data order.
- Has no search or category controls.
- Emits CollectionPage with an ItemList of all 15 canonical detail URLs.
- References PERSON_ID as author.

- [ ] **Step 5: Build the safe fallback narrative component**

ProjectNarrative.astro receives records from parseProjectNarrative and renders:

- heading records as h2 or h3 according to their order.
- paragraph records as p.
- adjacent bullet records inside ul/li.
- each NarrativePart as escaped text, wrapping only parts with strong true in a strong element.

Do not use set:html for longDescription. The only set:html usage in the site remains trusted serialized JSON-LD and the static direction comment.

- [ ] **Step 6: Build ProjectLayout**

ProjectLayout.astro composes BaseLayout and renders:

- Visible breadcrumbs.
- Project category, title, role, period, status, image, and verified links.
- A case-study slot or ProjectNarrative fallback.
- Technology list.
- Explicit related published articles.
- Back to all work and Discuss a project actions.

Use a reading measure near 70ch for narrative text. Keep code/tables within their own overflow containers.

- [ ] **Step 7: Generate all project detail routes**

In src/pages/projects/[slug].astro:

- getStaticPaths returns one path per PROJECTS record.
- Resolve case study by project slug.
- Call assertContentIntegrity during build.
- If the case study exists, render it with Astro content render().
- Otherwise parse longDescription, then description.
- Resolve relatedArticleSlugs only against published articles.
- Build SoftwareApplication with name, description, category, canonical URL, absolute image, supported dateCreated, and author PERSON_ID.
- Build BreadcrumbList with Home, Projects, and current project.
- Use title Project title | Ehnand Azucena.

Do not emit dateModified when there is no explicit project or case-study updated date.

- [ ] **Step 8: Add project responsive and reading CSS**

Style archive records as numbered commissioning entries with rules and sharp corners. Keep images within their aspect boxes. At narrow widths, metadata stacks before the description and buttons remain at least 44px high. View-transition names must be unique per archive page.

- [ ] **Step 9: Build and run project checks**

Run:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/projects.test.mjs
~~~

Expected: PASS for the archive, all 15 detail pages, Adam MDX, schema references, and ERP absence.

- [ ] **Step 10: Review project output without committing**

Inspect Adam, Initao, MemberPulse, one early project, and the existing Swiss/fallback image records. Confirm all links and image facts match the repository and no commit or push occurs.

---

### Task 6: Implement the Articles knowledge index and MDX reading routes

**Files:**

- Create: src/lib/article-filter.ts
- Create: src/components/content/ProseTable.astro
- Create: src/components/articles/ArticleRecord.astro
- Create: src/components/articles/ArticleLibrary.astro
- Create: src/scripts/article-library.ts
- Create: src/layouts/ArticleLayout.astro
- Create: src/pages/articles/index.astro
- Create: src/pages/articles/[slug].astro
- Create: tests/helpers/article-sources.mjs
- Create: tests/unit/article-filter.test.mjs
- Create: tests/generated/articles.test.mjs
- Modify: src/styles/global.css
- Consume: src/lib/content.ts
- Consume: content/articles/*.mdx

**Interfaces:**

- filterArticles accepts a readonly FilterableArticle array, a query string, and a category string; it returns the matching records without mutating input.
- ArticleRecord receives an ArticleListItem and renders one data-article-record.
- ArticleLibrary receives ArticleListItem[] and server-renders every record before its enhancement script runs.
- ArticleLayout receives an article entry, rendered MDX Content component, related published entries, and page schemas.
- The browser module reads data-search and data-category attributes; no article body is indexed for client search.

- [ ] **Step 1: Write the failing pure filter tests**

Create tests/unit/article-filter.test.mjs by migrating the current filter tests and importing src/lib/article-filter.ts. Keep these cases:

~~~js
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
    filterArticles(articles, "  CIRCUIT BREAKERS ", "All").map((item) => item.slug),
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
~~~

- [ ] **Step 2: Run the filter tests and confirm the red state**

Run:

~~~bash
docker compose run --rm --no-deps app node --test tests/unit/article-filter.test.mjs
~~~

Expected: FAIL because src/lib/article-filter.ts does not exist.

- [ ] **Step 3: Implement the pure metadata filter**

Create src/lib/article-filter.ts:

~~~ts
export interface FilterableArticle {
  title: string
  summary: string
  category: string
  tags: readonly string[]
}

export function filterArticles<T extends FilterableArticle>(
  articles: readonly T[],
  query: string,
  category: string,
): T[] {
  const normalizedQuery = query.trim().toLowerCase()

  return articles.filter((article) => {
    if (category !== "All" && article.category !== category) return false
    if (!normalizedQuery) return true

    return [
      article.title,
      article.summary,
      article.category,
      ...article.tags,
    ].some((value) => value.toLowerCase().includes(normalizedQuery))
  })
}
~~~

Run the unit test again and expect PASS.

- [ ] **Step 4: Write failing generated article-route tests**

Create tests/helpers/article-sources.mjs so Node tests read public source facts without importing Astro's virtual astro:content module:

~~~js
import { readdir, readFile } from "node:fs/promises"

function frontmatterValue(frontmatter, name) {
  const match = frontmatter.match(new RegExp("^" + name + ":\\s*(.+)$", "m"))
  if (!match) return undefined
  return match[1].trim().replace(/^["']|["']$/g, "")
}

export async function readArticleSources() {
  const files = (await readdir("content/articles"))
    .filter((file) => file.endsWith(".mdx"))
    .sort()

  return Promise.all(
    files.map(async (file) => {
      const source = await readFile("content/articles/" + file, "utf8")
      const frontmatter = source.split("---", 3)[1] ?? ""
      return {
        slug: file.slice(0, -4),
        title: frontmatterValue(frontmatter, "title"),
        category: frontmatterValue(frontmatter, "category"),
        draft: frontmatterValue(frontmatter, "draft") === "true",
      }
    }),
  )
}
~~~

Create tests/generated/articles.test.mjs:

~~~js
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
~~~

- [ ] **Step 5: Build and run generated article tests in the red state**

Run:

~~~bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/articles.test.mjs
~~~

Expected: FAIL because the Astro article routes and components do not exist.

- [ ] **Step 6: Create the semantic GFM table component**

Create ProseTable.astro:

~~~astro
---
const label = "Scrollable data table"
---

<div class="prose-table-region" role="region" aria-label={label} tabindex="0">
  <table>
    <slot />
  </table>
</div>
~~~

The region receives a visible focus outline and horizontal overflow only when required. The table retains native table, thead, tbody, tr, th, and td semantics.

- [ ] **Step 7: Create the article result record**

ArticleRecord.astro receives ArticleListItem and renders article[data-article-record] with:

- data-search containing lowercased title, summary, category, and tags.
- data-category containing the exact category.
- category, UTC-safe date, title, summary, up to three tags, remaining-tag count, and canonical detail link.
- One h2 and one primary link per record.
- No body text or client-fetched content.

- [ ] **Step 8: Create the complete server-rendered article library**

ArticleLibrary.astro renders:

- A section root with data-article-library.
- Labelled search input with id article-search and type search.
- A role=group capsule rail labelled Filter articles by category.
- All plus the four canonical category buttons in approved order; each button carries data-category with its exact value.
- aria-pressed true only on All in the initial HTML.
- A polite result count carrying data-result-count and showing the published count.
- Reset buttons carrying data-reset-filters and hidden initially.
- A focusable results region with aria-label Article results, data-scroll-region articles, max-block-size min(70vh, 64rem), and overflow-y auto.
- Every ArticleRecord in the initial HTML.
- A hidden zero-results panel carrying data-empty-state and a data-reset-filters action.
- One bundled script import for src/scripts/article-library.ts.

The horizontal category rail scrolls on narrow screens and wraps on wider screens.

- [ ] **Step 9: Implement progressive article filtering and query synchronization**

Create src/scripts/article-library.ts with this control flow:

~~~ts
import { filterArticles } from "../lib/article-filter"

function initArticleLibrary() {
  const root = document.querySelector<HTMLElement>("[data-article-library]")
  if (!root) return

  const search = root.querySelector<HTMLInputElement>("#article-search")
  const count = root.querySelector<HTMLElement>("[data-result-count]")
  const empty = root.querySelector<HTMLElement>("[data-empty-state]")
  const records = Array.from(
    root.querySelectorAll<HTMLElement>("[data-article-record]"),
  )
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-category]"),
  )
  const resets = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-reset-filters]"),
  )

  if (!search || !count || !empty || buttons.length === 0) return

  const items = records.map((element, index) => ({
    element,
    index,
    title: element.dataset.search ?? "",
    summary: "",
    category: element.dataset.category ?? "",
    tags: [] as string[],
  }))
  const allowedCategories = new Set(
    buttons.map((button) => button.dataset.category ?? "All"),
  )
  const params = new URLSearchParams(window.location.search)
  const requestedCategory = params.get("category") ?? "All"
  let activeCategory = allowedCategories.has(requestedCategory)
    ? requestedCategory
    : "All"

  search.value = params.get("q") ?? ""

  function update(syncUrl = true) {
    const matches = filterArticles(items, search.value, activeCategory)
    const visible = new Set(matches.map((item) => item.index))
    const active = search.value.trim() !== "" || activeCategory !== "All"

    records.forEach((record, index) => {
      record.hidden = !visible.has(index)
    })
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String((button.dataset.category ?? "All") === activeCategory),
      )
    })
    resets.forEach((button) => {
      button.hidden = !active
    })
    empty.hidden = matches.length !== 0
    count.textContent =
      String(matches.length) +
      (matches.length === 1 ? " article" : " articles") +
      (active ? " found" : "")

    if (!syncUrl) return
    const next = new URLSearchParams()
    if (search.value.trim()) next.set("q", search.value.trim())
    if (activeCategory !== "All") next.set("category", activeCategory)
    const query = next.toString()
    history.replaceState(
      null,
      "",
      window.location.pathname +
        (query ? "?" + query : "") +
        window.location.hash,
    )
  }

  search.addEventListener("input", () => update())
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category ?? "All"
      update()
    })
  })
  resets.forEach((button) => {
    button.addEventListener("click", () => {
      search.value = ""
      activeCategory = "All"
      update()
      search.focus()
    })
  })

  update(false)
}

initArticleLibrary()
~~~

Never replace or remove server-rendered article nodes. The function returns without throwing if required controls are absent.

Use input for search and click for buttons. Do not debounce nine local records; direct filtering remains fast at 50 or more records.

- [ ] **Step 10: Build ArticleLayout**

ArticleLayout.astro composes BaseLayout and renders:

- Visible Home / Articles / Current title breadcrumbs.
- A visible draft notice when data.draft is true.
- Category, published date, optional updated date, h1, summary, and tags.
- A reading measure near 70ch.
- The rendered MDX Content with table mapped to ProseTable.
- Syndication links for valid dev.to or Hashnode URLs.
- Up to three related published articles.
- Back to Articles and Discuss a project actions.

Draft pages pass robots noindex,nofollow. Published pages pass index,follow.

- [ ] **Step 11: Build the Articles archive route and schema**

src/pages/articles/index.astro:

- Awaits getPublishedArticles and maps entries into ArticleListItem.
- Uses title Technical Articles | Ehnand Azucena.
- Uses canonical /articles.
- Renders visible h1 Technical Articles and the approved production-notes introduction.
- Renders ArticleLibrary.
- Emits Blog schema with one BlogPosting reference per published article and author PERSON_ID.
- Emits no draft reference and no /blog URL.

- [ ] **Step 12: Generate all article detail routes, including drafts**

src/pages/articles/[slug].astro:

- getStaticPaths uses getAllArticles, so drafts build.
- Resolves entry, render(entry), and getRelatedArticles.
- Uses title Article title | Ehnand Azucena.
- Uses canonical /articles/[slug].
- Maps MDX table to ProseTable.
- Emits BlogPosting and BreadcrumbList.
- Uses datePublished, dateModified, articleSection, keywords, canonical mainEntityOfPage, image, author PERSON_ID, and publisher PERSON_ID.
- Excludes all drafts from related results.

Do not emit a meta keywords element; tags belong in visible content and BlogPosting keywords.

- [ ] **Step 13: Add reading, code, table, capsule, and scroll-region CSS**

Add:

- 70ch article measure and clear h2/h3 rhythm.
- Inline-code and fenced-code treatments using IBM Plex Mono.
- Horizontal code/table overflow contained inside focusable regions.
- Sticky-free article controls so the internal result scroller owns only results.
- max-block-size min(70vh, 64rem) for Article results.
- hidden attribute enforcement with display none.
- Visible empty-state and reset-action focus styles.
- No page-level horizontal overflow.

- [ ] **Step 14: Run article unit, type, build, and generated checks**

Run:

~~~bash
docker compose run --rm --no-deps app node --test tests/unit/article-filter.test.mjs
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/articles.test.mjs
~~~

Expected: PASS for nine published records, all detail pages, GFM table semantics, canonical metadata, and ERP-link absence.

- [ ] **Step 15: Manually exercise progressive enhancement without committing**

With Docker dev running at http://localhost:3001/articles:

- Search for ledger and confirm matching titles/summaries/tags.
- Select each category and confirm aria-pressed plus count.
- Combine search and category.
- Reset and confirm query parameters clear.
- Disable JavaScript and confirm all nine articles remain visible.
- Keyboard-focus the category rail and results scroller.

Do not commit or push.

---

### Task 7: Add discovery endpoints, Cloudflare asset behavior, drafts, and 404

**Files:**

- Create: src/pages/rss.xml.ts
- Create: src/pages/sitemap.xml.ts
- Create: src/pages/robots.txt.ts
- Create: src/pages/404.astro
- Create: public/_redirects
- Create: public/_headers
- Create: wrangler.jsonc
- Create: tests/fixtures/draft-preview.mdx
- Create: tests/integration/cloudflare-routes.test.mjs
- Create: tests/run-integration.mjs
- Modify: tests/generated/articles.test.mjs
- Modify: src/styles/global.css

**Interfaces:**

- RSS consumes getPublishedArticles and SITE_URL.
- Sitemap consumes PROJECTS, case-study/project updated dates, published articles, SITE_LAST_UPDATED, and absoluteUrl.
- Wrangler serves dist with html_handling drop-trailing-slash and not_found_handling 404-page.
- Integration runner owns the test fixture lifecycle and leaves content/articles plus dist in a clean production state.

- [ ] **Step 1: Add failing generated discovery assertions**

Append to tests/generated/articles.test.mjs:

~~~js
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
~~~

Update readGenerated in tests/helpers/generated-site.mjs so .xml and .txt paths map directly to dist/rss.xml, dist/sitemap.xml, and dist/robots.txt rather than adding /index.html.

- [ ] **Step 2: Build and confirm discovery assertions fail**

Run:

~~~bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/articles.test.mjs
~~~

Expected: FAIL because the three static endpoints do not exist.

- [ ] **Step 3: Generate published-article RSS**

Create src/pages/rss.xml.ts using @astrojs/rss. Set prerender true and return:

- Title Ehnand Azucena | Technical Articles.
- Description grounded in production SaaS, AI, data integrity, cloud, and reliability.
- Site from the Astro context or SITE_URL.
- One item per published article with title, summary, publication date parsed at UTC midnight, canonical /articles/[slug] link, and category/tags.
- No full private note content and no draft.

- [ ] **Step 4: Generate an evidence-dated sitemap**

Create src/pages/sitemap.xml.ts as a static endpoint. Implement XML escaping and render urlset entries for:

- / using max of SITE_LAST_UPDATED and newest published article date.
- /projects using max of SITE_LAST_UPDATED and explicit project/case-study updated dates.
- /articles when at least one published article exists, using newest published date.
- All 15 project detail routes.
- All published article detail routes.

Rules:

- Article lastmod is updated then date.
- Project lastmod is explicit project updated then matching case-study updated.
- Omit project lastmod when neither exists.
- Project start periods are never sitemap modification dates.
- Omit drafts, /blog, query strings, and the ERP project.
- Use no build-time new Date value as lastmod.

- [ ] **Step 5: Generate robots.txt**

Create src/pages/robots.txt.ts with prerender true and this body:

~~~text
User-agent: *
Allow: /

Sitemap: https://ehnand.com/sitemap.xml
Host: https://ehnand.com
~~~

Construct the absolute values from SITE_URL rather than hardcoding a second environment source.

- [ ] **Step 6: Create the custom missing-record page**

Create src/pages/404.astro with BaseLayout title Record Not Found | Ehnand Azucena, robots noindex,nofollow, h1 Record not found, and links to /, /projects, and /articles. Use the Production Trace record grammar and no script.

- [ ] **Step 7: Configure asset-only Wrangler behavior**

Create wrangler.jsonc:

~~~jsonc
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
~~~

Do not add main, account_id, route, KV, D1, R2, or secrets.

- [ ] **Step 8: Add permanent redirects and conservative response headers**

Create public/_redirects:

~~~text
/blog /articles 308
/blog/* /articles/:splat 308
~~~

Create public/_headers:

~~~text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), geolocation=(), microphone=()
~~~

Do not add a Content Security Policy in this task.

- [ ] **Step 9: Create the integration-only draft fixture**

Create tests/fixtures/draft-preview.mdx:

~~~mdx
---
title: "Integration Draft Preview"
date: 2026-08-16
category: "Engineering Practice & Reliability"
tags: [integration-test, draft]
summary: "A non-public fixture used to verify draft preview and discovery behavior."
draft: true
---

## Draft-only heading

This fixture must be reachable directly and absent from public discovery.
~~~

This file remains outside content/articles except while tests run.

- [ ] **Step 10: Write Cloudflare HTTP behavior tests**

Create tests/integration/cloudflare-routes.test.mjs:

~~~js
import assert from "node:assert/strict"
import test from "node:test"

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:8787"

async function request(pathname, init) {
  return fetch(baseUrl + pathname, init)
}

test("asset server returns security headers", async () => {
  const response = await request("/")
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("x-content-type-options"), "nosniff")
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  )
})

test("legacy article URLs redirect with 308", async () => {
  const archive = await request("/blog", { redirect: "manual" })
  assert.equal(archive.status, 308)
  assert.equal(new URL(archive.headers.get("location"), baseUrl).pathname, "/articles")

  const detail = await request("/blog/utility-billing-ledger", {
    redirect: "manual",
  })
  assert.equal(detail.status, 308)
  assert.equal(
    new URL(detail.headers.get("location"), baseUrl).pathname,
    "/articles/utility-billing-ledger",
  )
})

test("draft is direct-preview only", async () => {
  const draft = await request("/articles/__integration-draft")
  assert.equal(draft.status, 200)
  const draftHtml = await draft.text()
  assert.match(draftHtml, /noindex,nofollow/)
  assert.match(draftHtml, /Draft/)

  for (const path of ["/", "/articles", "/rss.xml", "/sitemap.xml"]) {
    const body = await request(path).then((response) => response.text())
    assert.doesNotMatch(body, /__integration-draft/)
  }
})

test("unknown and unpublished ERP routes use the custom 404", async () => {
  for (const path of [
    "/missing-record",
    "/projects/multi-tenant-erp-backend",
  ]) {
    const response = await request(path)
    assert.equal(response.status, 404)
    assert.match(await response.text(), /Record not found/i)
  }
})
~~~

- [ ] **Step 11: Create the self-contained Docker integration runner**

Create tests/run-integration.mjs with this lifecycle:

~~~js
import { once } from "node:events"
import { access, copyFile, rm } from "node:fs/promises"
import { spawn } from "node:child_process"

const fixture = "tests/fixtures/draft-preview.mdx"
const target = "content/articles/__integration-draft.mdx"
const baseUrl = "http://127.0.0.1:8787"

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: false,
      stdio: "inherit",
      ...options,
    })
    child.once("error", reject)
    child.once("exit", (code) => {
      if (code === 0) resolve()
      else reject(new Error(command + " exited with code " + String(code)))
    })
  })
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(baseUrl + "/")
      if (response.ok) return
    } catch {
      // Wrangler has not bound the port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error("Wrangler did not become ready within 30 seconds")
}

async function assertTargetAbsent() {
  try {
    await access(target)
  } catch (error) {
    if (error && error.code === "ENOENT") return
    throw error
  }
  throw new Error(target + " already exists; refusing to overwrite it")
}

async function stopServer(server) {
  if (!server || server.exitCode !== null) return
  server.kill("SIGTERM")
  await Promise.race([
    once(server, "exit"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ])
  if (server.exitCode === null) server.kill("SIGKILL")
}

await assertTargetAbsent()

let server
let failure

try {
  await copyFile(fixture, target)
  await run("pnpm", ["build"], {
    env: { ...process.env, NODE_ENV: "production" },
  })
  server = spawn(
    "pnpm",
    [
      "exec",
      "wrangler",
      "dev",
      "--local",
      "--ip",
      "127.0.0.1",
      "--port",
      "8787",
    ],
    { shell: false, stdio: "inherit" },
  )
  await waitForServer()
  await run(
    process.execPath,
    ["--test", "tests/integration/cloudflare-routes.test.mjs"],
    {
      env: { ...process.env, TEST_BASE_URL: baseUrl },
    },
  )
} catch (error) {
  failure = error
} finally {
  await stopServer(server)
  await rm(target, { force: true })
  try {
    await run("pnpm", ["build"], {
      env: { ...process.env, NODE_ENV: "production" },
    })
  } catch (error) {
    failure ??= error
  }
}

if (failure) throw failure
~~~

This refuses to overwrite the fixture target, forwards child output, rejects non-zero exits, removes only the known test file, and leaves dist rebuilt from clean production content.

- [ ] **Step 12: Run discovery and Cloudflare behavior checks**

Run:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app node --test tests/generated/articles.test.mjs
docker compose run --rm --no-deps app pnpm test:integration
~~~

Expected: PASS for RSS, sitemap, robots, headers, both 308 redirects, direct draft preview/noindex/exclusion, custom 404, ERP 404, and final clean dist.

- [ ] **Step 13: Verify fixture cleanup and review without committing**

Run:

~~~bash
test ! -e content/articles/__integration-draft.mdx
rg -n "__integration-draft" dist content/articles
git status --short
~~~

Expected: the first command succeeds; rg returns no result; no unrelated file is changed. Do not commit or push.

---

### Task 8: Run the bounded responsive, accessibility, and finish review

**Files:**

- Modify: src/styles/global.css
- Modify: focused Astro components only when the review finds a concrete defect
- Create: DESIGN.md
- Consume: .impeccable/mocks/homepage/option-2-horizontal-ai-workflow.png
- Consume: .impeccable/homepage-surface-brief.md
- Consume: docs/superpowers/specs/2026-08-16-astro-cloudflare-portfolio-redesign-design.md

**Interfaces:**

- Production Trace visual tokens and section order are already fixed.
- This task performs one combined desktop/mobile inspection, one batched correction, and at most one confirmation pass.
- DESIGN.md becomes the durable record of tokens, typography, layout, motion, accessibility, intentional comp deviations, and image provenance.

- [ ] **Step 1: Load the Impeccable craft floor immediately before UI edits**

Read the installed Impeccable reference/craft-floor.md in full. Re-read the approved surface brief and comp. Do not rerun the Impeccable context script if it already ran in this session.

- [ ] **Step 2: Run all non-visual checks before opening the browser**

Run:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
~~~

Expected: every command PASS. Fix structural failures before visual review.

- [ ] **Step 3: Start the Docker development server**

Run:

~~~bash
docker compose up --build -d
docker compose ps
~~~

Expected: the app service is healthy/running and http://localhost:3001 returns 200.

- [ ] **Step 4: Capture the single combined visual review set**

Using the in-app browser control workflow, inspect together:

- Homepage at 1440px and 375px.
- Projects archive at 1440px and 375px.
- Adam AI project detail at 1024px and 375px.
- Articles archive at 1440px and 375px.
- Durable AI Memory article at 1024px and 375px.
- Custom 404 at 375px.

Compare against the approved comp for composition, paper/graphite/cobalt/amber material, hierarchy, rail clarity, evidence density, sharp record grammar, and restraint. Record all defects before editing.

- [ ] **Step 5: Perform the keyboard and reduced-motion walkthrough**

Verify:

- Skip link becomes visible and moves focus to main.
- Desktop and mobile navigation reach every destination.
- details/summary controls expose state and remain keyboard operable.
- Article search, all category buttons, reset, and results scroller are usable without a pointer.
- Project, article, résumé, contact, and external links show focus.
- No focus is hidden behind the header.
- prefers-reduced-motion removes the trace draw and view-transition movement while preserving content.
- JavaScript disabled leaves all article records visible.

Record failures in the same defect batch.

- [ ] **Step 6: Apply one batched correction pass**

Use apply_patch to fix every recorded defect together. Limit edits to the responsible CSS/component. Do not introduce a second visual language, new dependency, unsupported claim, new animation family, or generated image.

- [ ] **Step 7: Perform one confirmation pass**

Repeat the desktop/mobile screenshots for changed surfaces and the failed keyboard/reduced-motion cases. Stop after this pass when the defects are resolved; do not enter open-ended polishing.

- [ ] **Step 8: Verify the static JavaScript and asset budget**

Run inside Docker:

~~~bash
docker compose run --rm --no-deps app sh -lc 'find dist/_astro -maxdepth 2 -type f -name "*.js" -print'
docker compose run --rm --no-deps app sh -lc 'du -h dist/_astro/* | sort -h'
~~~

Expected:

- Static homepage and detail pages have no framework hydration bundle.
- The only authored interaction bundle is the small Articles library script.
- No file contains Three.js, Framer Motion, React, or Next runtime code.
- Fonts and images load locally from generated/public assets.

- [ ] **Step 9: Create DESIGN.md with the implemented system and provenance**

DESIGN.md must contain:

1. Production Trace thesis and direction seed dc307738.
2. Exact color tokens and measured text contrast ratios:
   - Graphite on Paper 16.04:1.
   - Graphite soft on Paper 7.16:1.
   - Cobalt on Paper 6.68:1.
   - Amber on Paper 4.95:1.
3. IBM Plex Sans/Mono roles and local-loading policy.
4. 12-column desktop and one-column mobile layout rules.
5. Evidence-record, rule, capsule, reading, and focus patterns.
6. The single commissioning animation and reduced-motion behavior.
7. Approved homepage section order.
8. Intentional deviations from the generated comp: no fictional trace id, no fake dashboard values, no generated screenshot, and no paper-grain raster.
9. A provenance table for the portrait, project images, certificate images, and the repository fallback SVG, each marked repository-provided with source path and usage.
10. A clear final verdict: ship only when the confirmation pass, automated checks, and Next.js removal all pass.

- [ ] **Step 10: Review DESIGN.md and diff without committing**

Run:

~~~bash
git diff --check
git status --short
~~~

Confirm DESIGN.md describes the implementation, not the discarded Next.js theme. Do not commit or push.

---

### Task 9: Remove Next.js and update operator documentation

**Files:**

- Delete: app/**
- Delete: components/**
- Delete: hooks/**
- Delete: lib/**
- Delete: styles/**
- Delete: next.config.mjs
- Delete: next-env.d.ts
- Delete: postcss.config.mjs
- Delete: tailwind.config.ts
- Delete: components.json
- Delete: REFACTORING_PLAN.md
- Delete: googlecd31dbbd9b3efa78.html at repository root
- Modify: .env.example
- Modify: README.md
- Modify: CLAUDE.md
- Modify: AGENTS.md
- Modify: PRODUCT.md only if wording differs from the verified implementation
- Modify: tests paths when old tests still point at lib or Next-specific class strings

**Interfaces:**

- The Astro source and tests from Tasks 1–8 are the sole application.
- Historical files under docs/superpowers and docs/plans remain as decision records even when they mention the former stack.
- public/googlecd31dbbd9b3efa78.html remains the only verification-file copy.

- [ ] **Step 1: Run the complete parity gate before deletion**

Run:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
~~~

Expected: PASS. Do not delete the old source if any route, content, SEO, or visual gate fails.

- [ ] **Step 2: Resolve the exact deletion targets**

Run:

~~~bash
rg --files app components hooks lib styles | sort
git status --short
~~~

Compare the list with the File Map. Confirm migrated equivalents exist under src and content/public assets are outside the deletion set.

- [ ] **Step 3: Delete obsolete framework source and configuration with apply_patch**

Use apply_patch file deletions for the resolved app, components, hooks, lib, and styles files plus the listed root configuration/doc files. Do not use a broad recursive shell delete. Keep content, public, .impeccable, docs, tests, PRODUCT.md, AGENTS.md, and .vscode.

- [ ] **Step 4: Replace environment documentation**

.env.example becomes:

~~~dotenv
# Absolute production URL with no trailing slash.
# Used at build time for canonical URLs, JSON-LD, robots, RSS, and sitemap.
SITE_URL=https://ehnand.com

# Optional Google Search Console HTML-tag verification content value.
GOOGLE_SITE_VERIFICATION=
~~~

Do not include Cloudflare account id, API token, DNS credentials, or real secrets.

- [ ] **Step 5: Rewrite README.md as the Astro operator guide**

README must state:

- Purpose: Ehnand Azucena's professional portfolio and technical writing.
- Stack: Astro static output, TypeScript, MDX content collections, plain CSS, Cloudflare Workers Static Assets.
- Local commands through Docker Compose:
  - docker compose up
  - docker compose up --build
  - docker compose run --rm --no-deps app pnpm check
  - docker compose run --rm --no-deps app pnpm lint
  - docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
  - docker compose run --rm --no-deps app pnpm validate:html
  - docker compose run --rm --no-deps app pnpm test
  - docker compose run --rm --no-deps app pnpm test:integration
- Dev URL: http://localhost:3001.
- Article workflow and frontmatter, including draft behavior.
- Project data and case-study filename relationship.
- Cloudflare Workers Builds setup:
  1. Active Cloudflare zone with mail records preserved.
  2. Connect GitHub repository under Workers Builds.
  3. Production branch main.
  4. Build command pnpm build.
  5. Wrangler config deploys dist.
  6. Build variables SITE_URL and optional GOOGLE_SITE_VERIFICATION.
  7. Verify workers.dev before adding ehnand.com.
  8. Add apex custom domain and permanent www-to-apex redirect.
  9. Verify TLS, email, robots, sitemap, RSS, and Search Console.
  10. Remove old Vercel routing only after Cloudflare verification.
- Local deploy script exists but must not be run without explicit authority and Cloudflare credentials.

- [ ] **Step 6: Rewrite CLAUDE.md for the current architecture**

Replace Next-specific overview, components, dark theme, Three.js, Tailwind, Vercel, .next, and NODE_ENV failure notes with:

- Project purpose and reputation-sensitive evidence policy.
- Astro static architecture and source tree.
- Production Trace visual system and DESIGN.md.
- Content collection, project data, FAQ, and site config sources.
- Route list and schema ownership.
- Docker commands and port 3001.
- Workers Static Assets, _redirects, _headers, wrangler.jsonc, and domain handoff.
- pnpm-only and no-host-build rule.
- Work directly on main; commit/push only when asked.

- [ ] **Step 7: Rewrite AGENTS.md to match the completed migration**

Keep the project-purpose and reputation clauses. Replace the stack and workflow sections with Astro equivalents:

- Pages/layouts are static Astro by default.
- Article and case-study source locations and schema.
- src/data/projects.ts, src/data/faq.ts, and src/config/site.ts sources of truth.
- BaseLayout Person id and page-specific schema references.
- src/styles/global.css and DESIGN.md visual authority.
- Docker-only Astro commands.
- Wrangler asset-only deployment and no adapter/runtime.
- Real lastmod rules.
- No React island without separately justified functionality.
- Direct main workflow and owner-only commit/push authority.

- [ ] **Step 8: Replace obsolete tests rather than preserving Next-specific assertions**

Delete tests/articles-menu.test.mjs, tests/article-filter.test.mjs, and old lib declarations only after their behavior is covered by the new unit/generated/integration tests. No test may assert Tailwind class strings, /_next markup, React components, or Next route filenames.

- [ ] **Step 9: Search for forbidden runtime and configuration remnants**

Run:

~~~bash
rg -n "from [\"'](next|react|react-dom|framer-motion|three)|next/|@radix-ui|next-themes|tailwindcss" --glob '*.{ts,tsx,js,mjs,astro,json}' --glob '!docs/**' --glob '!.impeccable/**'
rg -n '"(next|react|react-dom|framer-motion|three|next-themes)"' package.json pnpm-lock.yaml
rg --files -g 'next.config.*' -g 'next-env.d.ts' -g 'tailwind.config.*' -g 'postcss.config.*'
docker compose run --rm --no-deps app pnpm why next react react-dom
~~~

Expected: no application/config/package match. Textual technology references inside project and article content are allowed and must remain.

- [ ] **Step 10: Rebuild from the cleaned repository**

Run:

~~~bash
docker compose build app
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
~~~

Expected: every check PASS after all Next.js source and dependencies are gone.

- [ ] **Step 11: Review documentation and deletion diff without committing**

Run git diff --check and git status --short. Confirm public verification, content, images, prior design records, and unrelated owner files remain. Do not commit or push.

---

### Task 10: Final acceptance, local handoff, and Cloudflare readiness

**Files:**

- Modify: focused source/docs only if a final acceptance check exposes a concrete defect
- Verify: DESIGN.md
- Verify: README.md
- Verify: wrangler.jsonc
- Verify: public/_redirects
- Verify: public/_headers
- Verify: dist/**

**Interfaces:**

- This task produces a verified local site at http://localhost:3001 and an owner-ready Cloudflare setup checklist.
- It does not deploy, change DNS, remove Vercel, commit, or push.

- [ ] **Step 1: Run the final clean automated suite**

Run in this order:

~~~bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test:integration
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
~~~

Expected: all commands PASS; the last build guarantees dist has no integration draft.

- [ ] **Step 2: Verify generated route and content counts**

Run:

~~~bash
docker compose run --rm --no-deps app sh -lc 'find dist/projects -name index.html | sort'
docker compose run --rm --no-deps app sh -lc 'find dist/articles -name index.html | sort'
~~~

Expected:

- 16 project HTML files total: one archive plus 15 details.
- 10 article HTML files total: one archive plus 9 published details when no real draft exists.
- No multi-tenant-erp-backend route.
- No /blog HTML page; redirects own that legacy path.

- [ ] **Step 3: Verify canonical and structured discovery output**

Inspect generated home, one project, one article, sitemap, RSS, and robots. Confirm:

- Titles use the pipe separator.
- Canonicals use https://ehnand.com with no trailing slash except root.
- Every schema author/publisher reference points to https://ehnand.com/#person.
- Sitemap and RSS contain canonical Articles URLs only.
- Sitemap dates are content-based or omitted.
- Homepage FAQ schema matches all six visible answers.
- ERP project and draft fixture are absent.

- [ ] **Step 4: Verify Cloudflare asset behavior one final time**

Run pnpm test:integration through Docker and confirm 308 redirects, security headers, draft behavior, custom 404, and ERP 404. Confirm wrangler.jsonc has no main or runtime binding.

- [ ] **Step 5: Start the final local server and smoke-test key routes**

Run:

~~~bash
docker compose up --build -d
docker compose ps
curl --silent --show-error --head http://localhost:3001/
curl --silent --show-error --head http://localhost:3001/projects
curl --silent --show-error --head http://localhost:3001/articles
~~~

Expected: 200 responses. Open http://localhost:3001 and smoke-test the homepage, one project, Articles filtering, one GFM table article, and contact links.

- [ ] **Step 6: Confirm the approved design contract and provenance**

Check:

~~~bash
rg -n 'dc307738|ENGINEER-DIRECTED|HUMAN-OWNED DECISIONS' dist/index.html DESIGN.md
rg -n 'TRACE ID|multi-tenant-erp-backend' dist --glob '*.html' --glob '*.xml'
~~~

Expected: the first command finds the direction and responsibility copy; the second finds no comp-only trace id or ERP project route/link.

- [ ] **Step 7: Inspect final repository state**

Run:

~~~bash
git diff --check
git status --short
git diff --stat
~~~

Classify every changed/untracked file as pre-existing owner work, approved design artifact, Astro migration output, or documentation. Do not stage, commit, or push.

- [ ] **Step 8: Hand off the verified outcome**

Report:

- Local URL http://localhost:3001.
- Exact verification commands and pass/fail results.
- Final project/article/category counts.
- Confirmation that Next.js/React runtime and configuration are gone.
- Confirmation that no external deployment, DNS change, commit, or push occurred.
- Cloudflare owner steps from README: connect Workers Builds, set build variables, verify workers.dev, add ehnand.com, configure www redirect, verify TLS/email/Search Console, then retire old Vercel routing.

The migration is complete only when every automated check, bounded visual review, cleanup search, and finish verdict passes.
