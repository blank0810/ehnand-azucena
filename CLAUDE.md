# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ehnand Azucena (Full Stack Developer). Built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS. Originally generated via v0.dev and deployed on Vercel.

## Git Workflow (CRITICAL)

**Commit and push directly on `main`. Do NOT create feature branches or PRs.** This is a solo repo — the owner is the only contributor — so branch/PR ceremony adds no value here. This project rule intentionally overrides the global "branch first / feature branches → PRs → main" default. Still honor the non-negotiable safety rules: never force-push, never commit secrets/`.env`, and only commit/push when asked.

## Development Commands

```bash
docker compose up          # Start dev server at localhost:3001 (maps to container port 3000)
docker compose up --build  # Rebuild after dependency changes

# Production build — note the NODE_ENV override, it is required (see below)
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build

docker compose run --rm --no-deps app pnpm lint   # ESLint checks
```

**This project is containerized. Run everything through `docker compose`, not on the host.**

`docker-compose.yml` mounts *anonymous volumes* over `/app/node_modules` and `/app/.next` to isolate them from the host. Docker creates the host-side stubs of those directories as **root-owned**, so running `pnpm dev` or `pnpm build` directly on the host fails with `EACCES: permission denied, open '.next/trace'` — and running `pnpm install` on the host just populates a `node_modules` the container ignores. Neither is worth doing; use the container.

**Two gotchas that will waste your time if you don't know them:**

1. **`next build` needs `NODE_ENV=production` explicitly.** `docker-compose.yml` sets `NODE_ENV=development` for the dev server, and that value leaks into `docker compose run`. Building under it makes Next load the *dev* React runtime and every route fails prerender ("Export encountered errors on following paths: /, /projects/..."). The errors are misleading — they look like app bugs, but the app is fine. Always pass `-e NODE_ENV=production` when building.
2. **pnpm only, never `npm install`.** The project standardizes on pnpm (`pnpm-lock.yaml`); Vercel and `Dockerfile.dev` (Node 20 Alpine, pnpm via corepack) both build with it. npm's flat `node_modules` pulls in a duplicate React that breaks `next build` with a `useContext` null error during prerender.

There is no test runner configured. Vercel builds from source on push and is unaffected by any of the above.

## Architecture

Portfolio app: a single-page home plus statically-generated per-project detail routes. `app/page.tsx` is a **server component** (the old 2-second client loading screen was removed so all section content is server-rendered for SEO):

```
RootLayout (app/layout.tsx - server component; metadata + Person & FAQPage JSON-LD)
  └─ ThemeProvider (next-themes, class-based dark mode, defaults to dark)
       ├─ Page (app/page.tsx - server component)
       │    ├─ ScrollProgress
       │    ├─ Navigation
       │    ├─ SectionIndicator (tracks 9 sections by ID)
       │    └─ Hero → About → Experience → Projects → Skills → Education → Certificates → FAQ → Contact → Footer
       └─ /projects/[slug] (app/projects/[slug]/page.tsx - server component; SSG per project, own metadata + JSON-LD)
```

### Key Patterns

- **Section components are client components** (`"use client"`) for Framer Motion animations; `app/page.tsx` and the `/projects/[slug]` pages are **server components** so content is server-rendered. No API routes.
- **Content data lives in `lib/`** as the single source of truth: `lib/projects.ts` (projects + `featured` flag, feeds the cards, detail pages, and sitemap), `lib/faq.ts` (feeds the FAQ section and FAQPage JSON-LD), `lib/site.ts` (`SITE_URL` from `NEXT_APP_URL`, fallback `https://ehnand.com`). Edit data here, not in the components.
- **3D Cube** (`components/3d-cube.tsx`): Three.js-based, dynamically imported in `hero.tsx` with `ssr: false` to avoid server-side rendering. Adds ~600KB to bundle but is lazy-loaded.
- **Section navigation**: Each section component has a matching `id` attribute (e.g., `id="home"`, `id="about"`) that maps to the `sections` array in `page.tsx` for `SectionIndicator` dot navigation.
- **Animations**: Framer Motion (`motion` components) used heavily across all sections. `react-intersection-observer` triggers animations on scroll.

### Component Categories

- **Section components** (`components/hero.tsx`, `about.tsx`, `experience.tsx`, etc.) - Portfolio content sections
- **UI primitives** (`components/ui/`) - shadcn/ui components (button, card, badge, toast, tabs)
- **Supporting components** - `theme-provider.tsx`, `scroll-progress.tsx`, `section-indicator.tsx`, `typing-animation.tsx`, `enhanced-status-badge.tsx`
- **Unused components still in repo** (not imported anywhere) - `blog-section.tsx`, `testimonials.tsx`, `parallax-background.tsx`, `animated-background.tsx`, `skill-progress.tsx`, `theme-switcher.tsx`. Verify usage with grep before editing — most rendering goes through `projects.tsx`, `about.tsx`, and `skills.tsx`

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add [component-name]
```

Configured in `components.json` with aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`.

## Styling

- Tailwind CSS with `tailwindcss-animate` plugin
- Dark mode via `next-themes` with class-based switching (default: dark)
- CSS custom properties in `app/globals.css` define base utility classes: `.section-container`, `.section-title`, `.gradient-text`, `.btn-primary`, `.btn-outline`, `.card`, `.skill-tag`
- The only active stylesheet is `app/globals.css` (imported in `layout.tsx`). A second `styles/globals.css` exists but is **not** imported — edit `app/globals.css`
- Color palette: primary `#3b82f6` (blue), secondary `#10b981` (green), accent `#f59e0b` (amber)
- Custom CSS animations defined in both `globals.css` and `tailwind.config.ts`: `float`, `pulse-slow`, `fadeIn`, `typing`, `progress`
- Fonts (Google Fonts via `next/font`): Inter for body (`--font-inter`), Poppins for headings (`--font-poppins`, weights 600/700, applied with the `font-poppins` class, e.g. `hero.tsx`)

## Build Configuration

- ESLint and TypeScript errors are **ignored during builds** (`next.config.mjs`: `ignoreDuringBuilds: true`, `ignoreBuildErrors: true`)
- Remote images allowed from `*.public.blob.vercel-storage.com`
- Image optimization enabled with AVIF/WebP formats
- Path alias `@/*` maps to project root

## v0.dev Sync

This repo was originally auto-synced from v0.dev. The `generator: 'v0.app'` metadata remains in `layout.tsx`. Manual edits are now the primary workflow.

## Active Refactoring

See `REFACTORING_PLAN.md` for a 10-phase plan to remove unused code and files. Several components in the repo (email templates, performance monitoring, link preview tester) are listed for removal but some files referenced may already be deleted.
