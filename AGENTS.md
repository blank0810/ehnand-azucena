# AGENTS.md

## Project purpose

- Read `CLAUDE.md` before substantial work. Its Project Overview is the guiding product intent for this repository.
- This is Ehnand Azucena's personal professional portfolio at `ehnand.com`, built to present his full-stack systems experience, production projects, and technical writing to prospective clients and employers. It is not a generic starter, component showcase, or reusable SaaS template.
- Optimize changes for credibility, clear evidence of real work, accessibility, performance, and search/AI discoverability while preserving Ehnand's voice and professional identity.
- Treat public copy as reputation-sensitive. Never invent or embellish employers, clients, project outcomes, metrics, credentials, dates, testimonials, contact details, or technical experience. If a factual claim is not supported by the repository or the user, flag it instead of guessing.
- Keep the site focused. Avoid unrelated product features, generic marketing filler, and abstractions that do not improve the portfolio or its publishing workflow.

## Repository guidance

- `CLAUDE.md` is the detailed architecture and workflow guide. `README.md` is the operator guide. `DESIGN.md` is the visual authority.
- Files in `docs/superpowers/` and `docs/plans/` record design context and decisions; they are not automatically evidence that work is pending.
- Preserve shared MDX content and public evidence assets when changing presentation code.

## Stack and architecture

- Astro static output, strict TypeScript, MDX content collections, plain CSS, and Cloudflare Workers Static Assets.
- Keep pages and layouts static Astro by default so content remains generated HTML and crawlable. Do not add a React island or Worker runtime without separately justified functionality.
- The homepage is assembled in `src/pages/index.astro` from focused Astro components.
- Portfolio metadata lives in `src/data/projects.ts` and feeds homepage records, the projects hub, project detail routes, related articles, schemas, and the sitemap. Do not duplicate it in components or case-study frontmatter.
- Project narratives live in `content/case-studies/<project-slug>.mdx`; filenames must match project slugs. Pages fall back to verified project descriptions when no case study exists.
- Article sources live in `content/articles/*.mdx`; frontmatter is defined in `src/content.config.ts`. Preserve draft behavior that excludes drafts from listings, related content, RSS, and sitemap and marks direct preview pages `noindex,nofollow`.
- `src/data/faq.ts` feeds both the rendered FAQ and homepage `FAQPage` JSON-LD. Keep visible answers and schema synchronized.
- `src/config/site.ts` is the source of truth for `SITE_URL`. Keep canonical URLs, metadata, sitemap, RSS, and JSON-LD based on it.
- `src/layouts/BaseLayout.astro` defines the canonical Person entity at `${SITE_URL}/#person`; page schemas reference it rather than duplicating a person.
- `src/styles/global.css` is the only active stylesheet. Reuse the Production Trace tokens and patterns in `DESIGN.md`.
- The article library is progressively enhanced by one small vanilla TypeScript module. All records must remain in server-generated HTML without JavaScript.
- `wrangler.jsonc` is asset-only. Do not add a `main` entry, adapter, runtime binding, or server route unless the product requirement genuinely needs execution.

## Development workflow

- Run all Node, Astro, pnpm, lint, test, build, preview, Wrangler, and deploy commands through Docker Compose. Do not run installs or builds directly on the host.
- Use pnpm only. Never run `npm install`; `pnpm-lock.yaml` is authoritative.
- Start development at `http://localhost:3001` with:

  ```bash
  docker compose up
  docker compose up --build
  ```

- Run the verification suite with:

  ```bash
  docker compose run --rm --no-deps app pnpm check
  docker compose run --rm --no-deps app pnpm lint
  docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
  docker compose run --rm --no-deps app pnpm validate:html
  docker compose run --rm --no-deps app pnpm test
  docker compose run --rm --no-deps app pnpm test:integration
  ```

- Compose named volumes isolate `/app/node_modules`, `/app/.astro`, and `/app/dist`. Host installs are ignored.
- The integration runner owns its draft fixture lifecycle and must leave both `content/articles` and `dist` in a clean production state.

## Change discipline

- Preserve static rendering, canonical URLs, metadata, structured data, sitemap coverage, RSS, redirects, response headers, and crawl paths when changing routes or content models.
- Keep content consumers synchronized. A project or article change can affect listings, details, metadata, JSON-LD, sitemap dates, RSS, and internal links.
- Use real content dates. Article `updated` falls back to `date`; project sitemap dates require explicit project or case-study update evidence. Never use build time or project start periods as `lastmod`.
- Keep the Python 3.14 FastAPI ERP article published but do not add or link an ERP portfolio project until the owner publishes its resources.
- Maintain responsive behavior, keyboard access, semantic headings, meaningful alternative text, readable contrast, reduced motion, and usable overflow regions.
- Follow the existing style: root alias imports (`@/...`), double quotes, no semicolons, two-space indentation, and focused components.
- Keep client JavaScript minimal and progressive. Add dependencies only when the benefit justifies bundle and maintenance cost.
- Keep secrets, private operational references, and sensitive vault material out of Git and public content. `.env.example` documents names only.

## Git workflow

- Work directly on `main`. Do not create feature branches or pull requests for this solo repository.
- Commit or push only when the user explicitly asks. Never force-push.
- Preserve unrelated owner changes in a dirty worktree and keep commits narrowly scoped.
