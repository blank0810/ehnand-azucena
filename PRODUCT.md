# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

The redesign replaces Next.js with Astro as a static-first framework, using TypeScript, MDX content collections, pnpm, and the repository's Docker-only development workflow. Production will deploy the generated static site through Cloudflare Workers Static Assets, not Cloudflare Pages. Runtime Worker routes are out of scope unless a future feature genuinely requires server execution. Public URLs must remain unchanged. The completed migration must not retain a parallel Next.js application, Next.js runtime dependency, compatibility route, or obsolete Next.js build configuration.

## Users

The primary audience is prospective clients evaluating Ehnand Azucena for remote contract and project-based full-stack systems delivery. They need to understand quickly what he builds, whether he has delivered comparable production work, and how to start a conversation.

Hiring managers and technical evaluators are a secondary audience. They need direct access to work history, technical breadth, project depth, articles, credentials, and the résumé without weakening the client-first homepage.

## Product Purpose

This is Ehnand Azucena's professional portfolio at `ehnand.com`. It exists to turn verified production experience into credible, inspectable proof of full-stack systems delivery and to convert qualified interest into direct contact.

Success means a prospective client can identify Ehnand's fit within the first viewport, inspect a small set of strong case studies, understand his working range through the complete project and article archives, and reach him without friction. Weekly technical publishing should compound that credibility and improve search and AI discovery over time.

## Positioning

Ehnand is positioned around full-stack systems delivery: SaaS products, operational business systems, APIs, data-intensive workflows, AI-assisted systems, and the infrastructure required to deploy them. His delivery model is engineer-directed and AI-augmented: Ehnand owns discovery, architecture, technical decisions, review, and production accountability while using Claude Code and Codex to accelerate research, scaffolding, implementation, testing, documentation, CI/CD pipelines, and infrastructure-as-code work. The differentiator is evidence from real production work and source-grounded technical writing, not a generic list of technologies, unsupported marketing claims, or the suggestion that autonomous tools replace engineering judgment.

## Operating Context

Visitors may arrive through the homepage, a project case study, an article, a search result, RSS, or a shared link. The site must support both fast evaluation and deeper investigation:

- The first viewport rotates through five approved proof points, while the deeper Selected Systems section curates three records rather than displaying the entire inventory.
- `/projects` remains the complete, crawlable project archive, with a stable detail URL for every published project.
- `/articles` remains the complete, searchable technical library, organized around the approved editorial categories.
- Article and project pages provide contextual internal links so visitors can move from expertise to evidence and from evidence to contact.
- Contact, LinkedIn, GitHub, and résumé access remain available without forcing a form workflow.

## Capabilities and Constraints

- Preserve the public routes `/`, `/projects`, `/projects/[slug]`, `/articles`, `/articles/[slug]`, `/rss.xml`, `/sitemap.xml`, and the permanent `/blog` redirects.
- Keep public pages statically rendered and crawlable by default. Client JavaScript must be limited to interactions that materially require it, such as local filtering, theme controls, featured-project rotation, and one-time reveals.
- Preserve article draft behavior: drafts stay out of listings, RSS, and the sitemap and remain `noindex` if locally reachable.
- Preserve canonical URLs, the shared Person entity, project/article structured data, real `lastModified` dates, RSS, sitemap coverage, and meaningful internal links.
- Keep the FastAPI ERP article published, but do not publish or link an ERP portfolio project until its resources are complete.
- Never invent or embellish clients, employers, outcomes, metrics, credentials, dates, testimonials, or technical experience.
- Keep secrets, private operational references, and sensitive vault material out of the public site.
- Weekly publishing must remain a simple repository-based workflow using MDX rather than hand-built page components.
- Explain the AI-assisted delivery workflow in visible HTML, including where Claude Code and Codex contribute and where Ehnand retains architectural judgment and accountability.
- The full redesign must retain responsive behavior, keyboard usability, semantic headings, readable contrast, meaningful image alternatives, and reduced-motion support.

## Brand Commitments

- Use the name Ehnand Azucena and preserve his direct, technically specific, evidence-led voice.
- Present him primarily as a Full Stack Systems Engineer / Full Stack Developer available for remote contract and project-based work.
- Preserve the verified contact address, LinkedIn profile, GitHub profile, résumé access, and existing professional portrait unless the owner replaces them.
- Avoid generic agency language, inflated promises, anonymous template copy, and visual effects that compete with the work.

## Evidence on Hand

- Shared project metadata and public claims in `src/data/projects.ts`.
- Project narratives in `content/case-studies/`, currently including the Adam AI case study.
- Nine published, source-grounded MDX articles across four editorial categories in `content/articles/`.
- Work history, education, skills, certificates, FAQ, availability, and contact content in `src/data/`.
- Project screenshots, certificate images, the professional portrait, and verification assets in `public/`.
- A first-party static résumé PDF served with the portfolio at `public/files/Ehnand-Azucena-CV.pdf`.

Not every project has a complete case study or final visual asset. Missing proof must be identified for later replacement rather than filled with invented material.

## Product Principles

1. Lead with the client problem and the strongest proof, then offer depth.
2. Make evidence more prominent than self-description.
3. Give every published project and article a durable, crawlable home.
4. Treat publishing, internal linking, and structured data as one discoverability system.
5. Prefer static HTML and progressive enhancement over decorative runtime complexity.
6. Present AI agents as delivery accelerators inside a disciplined engineering process, never as substitutes for expertise, verification, or ownership.

## Accessibility & Inclusion

Target WCAG 2.2 AA behavior for contrast, focus visibility, keyboard navigation, semantic structure, touch targets, and reduced motion. The portfolio must remain understandable and navigable when client-side JavaScript, animation, or nonessential imagery is unavailable.
