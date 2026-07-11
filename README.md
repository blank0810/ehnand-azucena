# ehnand.com — Portfolio of Ehnand Azucena

Personal portfolio site for **Ehnand Azucena**, a Full Stack Developer at [Cloudesk](https://cloudesk.co/) based in Initao, Northern Mindanao, Philippines (UTC+8).

**Live: [ehnand.com](https://ehnand.com)** · [LinkedIn](https://www.linkedin.com/in/ehnand-azucena-3028a7194) · contact@ehnand.com

Built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Development

This project is **containerized** — run everything through Docker, not on the host.

```bash
docker compose up          # Dev server at localhost:3001
docker compose up --build  # Rebuild after dependency changes

# Production build — the NODE_ENV override is required, see below
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build

docker compose run --rm --no-deps app pnpm lint
```

Two gotchas worth knowing up front:

1. **Host builds fail.** `docker-compose.yml` mounts anonymous volumes over `/app/node_modules` and `/app/.next`. Docker creates the host-side stubs root-owned, so a host `pnpm build` dies with `EACCES: permission denied, open '.next/trace'`.
2. **`next build` needs an explicit `NODE_ENV=production`.** Compose sets `NODE_ENV=development` for the dev server and that value leaks into `docker compose run`. Building under it loads the dev React runtime and every route fails prerender — the errors look like app bugs, but the app is fine.

The project standardizes on **pnpm**. Do not run `npm install`: npm's flat `node_modules` pulls in a duplicate React that breaks `next build` with a `useContext` null error during prerender.

## Architecture

A server-rendered single-page home plus statically-generated per-project detail routes.

```
RootLayout (app/layout.tsx — metadata + Person JSON-LD)
  └─ ThemeProvider (next-themes, class-based dark mode, defaults to dark)
       ├─ app/page.tsx — server component; FAQPage JSON-LD
       │    └─ Hero → About → Experience → Projects → Skills
       │       → Education → Certificates → FAQ → Contact → Footer
       └─ app/projects/[slug] — SSG per project, own metadata + JSON-LD
```

Section components are client components (`"use client"`) for Framer Motion animations; the pages that host them are server components, so all content is server-rendered for search engines and AI crawlers.

**Content lives in `lib/`, not in the components** — this is the single source of truth:

| File | Feeds |
|---|---|
| `lib/projects.ts` | Project cards, `/projects/[slug]` detail pages, sitemap |
| `lib/faq.ts` | The FAQ section *and* the FAQPage JSON-LD (they must match) |
| `lib/site.ts` | `SITE_URL`, from `NEXT_APP_URL` (falls back to `https://ehnand.com`) |

Edit data there, not in the JSX.

## SEO notes

Structured data is split deliberately: `Person` schema is in the root layout (every page), while `FAQPage` schema lives in `app/page.tsx` only — Google discounts FAQPage markup whose answers don't appear on the page, so it must not be emitted on project routes.

`app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from `lib/projects.ts` and `SITE_URL`.

## License

Personal project. Not licensed for reuse.
