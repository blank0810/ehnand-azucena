# GFM Tables and Unpublished ERP Implementation Plan

> **For agentic workers:** Follow the repository's test-first and Docker-only workflow. Do not commit or push unless the owner explicitly asks.

**Goal:** Render article pipe tables correctly while keeping the ERP technical article published without exposing or linking an incomplete ERP portfolio project.

**Architecture:** Keep article pages server-rendered through `next-mdx-remote/rsc`. Add `remark-gfm` to the shared MDX compilation options so every article receives semantic table parsing. Remove the ERP entry from the central project registry, which automatically removes it from project listings, generated routes, structured data, and the sitemap.

**Tech Stack:** Next.js 14 App Router, React 18, strict TypeScript, MDX, `remark-gfm`, Tailwind CSS, Node's built-in test runner, Docker Compose, pnpm.

## Task 1: Pin the corrected public behavior

**Files:**

- Modify: `tests/articles-menu.test.mjs`

- [x] Remove expectations for a published `/projects/multi-tenant-erp-backend` route and sitemap entry.
- [x] Add a rendered-HTML regression asserting the durable-memory article contains a semantic Store/Best use table and not the raw pipe-table paragraph.
- [x] Assert the four new article pages and discovery endpoints do not advertise the unpublished ERP project URL.
- [x] Run `docker compose exec -T app node --test tests/articles-menu.test.mjs` and confirm the new assertions fail for the current table and links.

## Task 2: Remove the unpublished ERP project references

**Files:**

- Modify: `lib/projects.ts`
- Modify: `content/articles/fastapi-erp-terraform-aws-lambda.mdx`
- Modify: `content/articles/durable-ai-memory-obsidian-mocs.mdx`

- [x] Remove the ERP object from the shared `PROJECTS` array.
- [x] Keep the FastAPI/Terraform article published, but replace its project-linked author note with standalone technical wording.
- [x] Remove the ERP project link from the durable-memory article's author note.
- [x] Confirm no public source or generated discovery output contains `/projects/multi-tenant-erp-backend`.

## Task 3: Enable GitHub Flavored Markdown tables

**Files:**

- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `components/mdx-content.tsx`

- [x] Add `remark-gfm` with pnpm through the running Docker Compose app.
- [x] Pass `remarkGfm` through `MDXRemote`'s `mdxOptions.remarkPlugins` while preserving the existing element map and server rendering.
- [x] Re-run the focused article integration test and confirm it passes.

## Task 4: Verify the repository state

- [x] Run `docker compose exec -T app node --test tests/*.test.mjs`.
- [x] Run `docker compose run --rm --no-deps app pnpm lint` and report the existing first-time ESLint configuration prompt that prevents lint execution.
- [x] Run `docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build`.
- [x] Run `git diff --check`, inspect the scoped diff, and scan public content for the unpublished ERP project URL and private placeholders.
- [x] Do not commit or push.

The supplemental strict TypeScript check still reports the repository's existing typing debt in theme-provider props, Three.js declarations, the unused animated background, async `MDXRemote`, missing Radix packages, and `use-toast`; it reports no new `remark-gfm` option or plugin type error.
