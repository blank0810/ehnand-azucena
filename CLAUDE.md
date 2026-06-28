# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ehnand Azucena (Full Stack Developer). Built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS. Originally generated via v0.dev and deployed on Vercel.

## Development Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint checks
```

Both `package-lock.json` and `pnpm-lock.yaml` are committed. The Dockerfile and tooling use **npm** — prefer `npm` to keep the npm lockfile authoritative. There is no test runner configured.

### Docker Development

```bash
docker compose up        # Start dev server at localhost:3001 (maps to container port 3000)
docker compose up --build  # Rebuild after dependency changes
```

Uses `Dockerfile.dev` with Node 20 Alpine, bind-mounts source code, and isolates `node_modules` and `.next` in the container.

## Architecture

Single-page portfolio app. `app/page.tsx` is a client component that renders all sections sequentially with a 2-second loading screen:

```
RootLayout (app/layout.tsx - server component)
  └─ ThemeProvider (next-themes, class-based dark mode, defaults to dark)
       └─ Page (app/page.tsx - "use client")
            ├─ LoadingScreen (shown for 2s)
            ├─ ScrollProgress
            ├─ Navigation
            ├─ SectionIndicator (tracks 8 sections by ID)
            └─ Hero → About → Experience → Projects → Skills → Education → Certificates → Contact → Footer
```

### Key Patterns

- **Nearly everything is a client component** (`"use client"`) for Framer Motion animations and interactivity. No API routes remain.
- **3D Cube** (`components/3d-cube.tsx`): Three.js-based, dynamically imported in `hero.tsx` with `ssr: false` to avoid server-side rendering. Adds ~600KB to bundle but is lazy-loaded.
- **Section navigation**: Each section component has a matching `id` attribute (e.g., `id="home"`, `id="about"`) that maps to the `sections` array in `page.tsx` for `SectionIndicator` dot navigation.
- **Animations**: Framer Motion (`motion` components) used heavily across all sections. `react-intersection-observer` triggers animations on scroll.

### Component Categories

- **Section components** (`components/hero.tsx`, `about.tsx`, `experience.tsx`, etc.) - Portfolio content sections
- **UI primitives** (`components/ui/`) - shadcn/ui components (button, card, badge, toast, tabs)
- **Supporting components** - `theme-provider.tsx`, `scroll-progress.tsx`, `section-indicator.tsx`, `loading-screen.tsx`, `typing-animation.tsx`
- **Unused components still in repo** (not imported anywhere) - `blog-section.tsx`, `testimonials.tsx`, `parallax-background.tsx`, `animated-background.tsx`, `ProjectCard.tsx`, `projects-filter-dropdown.tsx`, `skill-progress.tsx`, `theme-switcher.tsx`. Verify usage with grep before editing — most rendering goes through `projects.tsx`, `about.tsx`, and `skills.tsx`

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
