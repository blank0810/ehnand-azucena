# Portfolio Theme, Motion, Projects, and CV Refinement Design

- **Date:** 2026-08-16
- **Status:** Approved for implementation planning
- **Site:** `ehnand.com`
- **Framework:** Astro static output deployed through Cloudflare Workers Static Assets

## Objective

Refine the approved Production Trace portfolio without replacing its evidence-led identity. The work adds a genuine neutral light/dark theme, purposeful motion, a five-project homepage showcase, consistent Projects naming, a bounded project archive, and a first-party downloadable CV. It also changes the displayed municipal project name from **Initao Water Billing System** to **Water Billing System** while preserving its existing canonical project URL.

The result must remain statically rendered, crawlable, accessible, fast, and free of React, Framer Motion, carousel packages, or a browser hydration runtime.

## User-facing decisions

- Use **Projects** for the primary navigation label, footer label, archive references, and calls to action.
- Retain `/projects` and `/projects/[slug]` as the canonical public route family.
- Replace the warm, light-only paper palette with neutral light and dark themes.
- Follow the visitor's operating-system theme on the first visit.
- Persist an explicit theme choice across visits.
- Rotate five verified projects in the homepage hero with restrained motion and complete user controls.
- Keep the project archive statically rendered but place its records inside a bounded vertical scroll region like the Articles library.
- Publish the owner-provided CV as a first-party static PDF with separate view and download actions.
- Display **Water Billing System** as the project title while retaining `/projects/initao-water-billing-system` for link continuity and SEO.

## Scope boundaries

This is a focused refinement of the current Astro site. It does not replace the Production Trace layout, typography, evidence hierarchy, project content model, route model, article system, or Cloudflare asset-only deployment.

The following remain out of scope:

- React or another hydrated UI framework
- Framer Motion, carousel packages, or a general animation library
- a Cloudflare Worker runtime entry
- project search or category filtering
- a CV editor or CV-generation workflow
- renaming the Water Billing project slug
- removing legitimate personal-location, client, or municipality references outside the project title
- adding unsupported project claims, metrics, screenshots, or case studies

## Information architecture and naming

### Projects navigation

The visible label **Work** changes to **Projects** in desktop navigation, mobile navigation, the footer, section descriptions, and project calls to action. `/projects` remains unchanged because it is descriptive, predictable, and aligned with the archive metadata and structured data.

Homepage copy changes from phrases such as "the complete inventory remains in Work" to direct language such as "Browse all projects." The homepage section id may remain `projects` because it already matches the destination concept and existing in-page links.

### Water Billing System title

The project record's displayed title changes from **Initao Water Billing System** to **Water Billing System**. The updated title must flow from the shared project data into the homepage, project archive, project detail metadata, JSON-LD, project detail page, related UI, image alternative text, service evidence links, and article link labels.

The canonical slug remains `initao-water-billing-system`. Existing links and indexed URLs therefore continue to resolve without a redirect. Supported contextual references to the Municipality of Initao, the owner's location, `LGU-Initao`, the repository image filename, and the GitHub repository URL remain unchanged. This matches the owner's updated CV, which uses **Water Billing System** as the heading while retaining `LGU-Initao` as the client line.

## Theme system

### Behavior

The root `<html>` element owns a `data-theme="light"` or `data-theme="dark"` attribute and the corresponding `color-scheme` value.

Theme resolution follows this order:

1. Use a valid stored preference from `localStorage`.
2. Otherwise use `prefers-color-scheme: dark` when it matches.
3. Otherwise use light mode.

The initialization runs in a small inline head script before first paint so the visitor does not see the wrong theme flash. Storage access is wrapped defensively so privacy modes or storage failures fall back to the operating-system preference without breaking page rendering.

A theme toggle appears in the desktop header and inside the mobile navigation. It exposes a clear accessible name such as **Switch to dark theme** or **Switch to light theme**, reflects the current state with `aria-pressed`, and uses a simple inline SVG icon plus visible or visually hidden text. A manual selection is stored under one stable key, `ehnand-theme`.

The site follows live operating-system theme changes only while no explicit preference has been stored. Once a visitor uses the toggle, the saved choice wins on later navigation and visits.

### Neutral color palettes

The palette keeps graphite, cobalt, amber, and ruled evidence records, but removes the warm cast from primary surfaces.

| Role | Light | Dark |
|---|---:|---:|
| Page | `#f6f7f8` | `#0d1117` |
| Surface | `#ffffff` | `#161b22` |
| Primary text | `#15191f` | `#f0f3f6` |
| Secondary text | `#4e5763` | `#b4bdc8` |
| Rule | `#d0d5db` | `#303844` |
| Strong rule | `#87919d` | `#66717f` |
| Cobalt | `#164bc5` | `#8ab4ff` |
| Cobalt strong | `#10358c` | `#b8d1ff` |
| Live status | `#974400` | `#ffb45f` |
| Accent contrast | `#ffffff` | `#0d1117` |

Amber remains limited to live-production status. It never becomes a page or section background. Images, code blocks, form controls, focus rings, scrollbars, view-transition surfaces, and selection colors consume theme tokens rather than fixed light colors.

The implementation must verify WCAG 2.2 AA contrast for normal text, large text, controls, focus indicators, and link states in both themes before shipping.

## Motion system

Motion communicates continuity and state change. It must not compete with project evidence or make reading slower.

### Cross-document navigation

The existing native cross-document View Transitions configuration remains progressively enhanced. On supported browsers, the outgoing root fades and shifts by no more than 6 pixels while the incoming root resolves over approximately 280 milliseconds using `cubic-bezier(0.16, 1, 0.3, 1)`. Unsupported browsers perform normal navigation with no behavioral loss.

The persistent header receives a stable view-transition name so navigation feels anchored while the document content changes. Project and article titles may receive scoped transition names only where unique values can be guaranteed.

### Page and section entry

The first viewport uses a restrained staged reveal: service label, heading, summary/actions, and featured project move no more than 12 pixels and settle within 420 milliseconds. Lower sections and archive records reveal once when they enter the viewport using a small IntersectionObserver controller.

Content is visible by default. JavaScript applies motion-ready classes only after initialization and never leaves an element in a pending state before it can immediately observe or release it. This prevents blank content when JavaScript is unavailable or fails. Entry motion runs once per element and is not replayed when the visitor scrolls back and forth.

Buttons, text arrows, theme controls, project controls, filters, and navigation links retain short 140-180 millisecond hover and focus transitions.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- cross-document transition animation is disabled;
- entry elements render in their final position and opacity;
- smooth scrolling is disabled;
- the commissioning line renders complete;
- the featured-project showcase does not auto-advance;
- manual project changes happen without transform or crossfade animation.

## Featured-project hero

### Project set

The homepage hero uses these five verified project records in this order:

1. Adam AI
2. REPSShield
3. Water Billing System
4. MemberPulse
5. Swiss Energy Platform Suite

The list is explicit and resolved through the shared project data. Missing slugs fail the build rather than silently dropping a featured project.

### Static markup and enhancement

All five project records and their detail links are present in the generated HTML. The first project is the non-JavaScript visual fallback, and a compact static list keeps links to all five projects usable before enhancement. Carousel controls are hidden until the controller initializes. The existing static Selected Systems section remains the deeper homepage evidence section; the hero is a quick rotating overview rather than a replacement for the complete project records.

Each slide contains the verified project image or identified fallback, project title, category, role, period, status, and project-detail link. It does not introduce new metrics or claims.

### Interaction

The active project changes every 7,000 milliseconds. A change uses a restrained opacity crossfade and a vertical movement of no more than 12 pixels over approximately 420 milliseconds.

The interface includes:

- Previous project
- Next project
- a direct selector for each of the five projects
- Pause rotation / Resume rotation
- a visible `01 / 05` style position indicator

Rotation pauses while the showcase is hovered, while focus is within it, while the document is hidden, and when the visitor presses Pause. Manual Previous, Next, or direct-selection input updates immediately and restarts the interval only when automatic rotation is still enabled.

The component follows the accessible carousel pattern with a labelled region, `aria-roledescription="carousel"`, labelled slides, descriptive control names, and clear current-state indicators. Automatic changes use `aria-live="off"` and do not repeatedly interrupt assistive technology. Manual Previous, Next, or direct-selection changes update a separate polite status message. Keyboard operation uses ordinary buttons; no custom arrow-key trap is required.

## Projects archive

All project records remain in initial HTML and retain their existing canonical links and structured-data coverage.

The `.projects-register` becomes a named scroll region with:

- `tabindex="0"`;
- an accessible label such as **Project records**;
- `max-block-size: min(72svh, 72rem)`;
- `overflow-y: auto`;
- `overscroll-behavior: contain`;
- stable scrollbar gutter;
- a visible focus outline using the theme accent;
- the site's themed thin scrollbar.

The archive header states the total record count and indicates that the region can be scrolled. No artificial pagination, infinite loading, search, or category filters are added. The region remains bounded on mobile to match the owner's explicit request and the established Articles behavior.

## CV asset and actions

### Accepted source

The accepted source is `/home/blank/Documents/Ehnand CV.pdf`, provided by the owner on 2026-08-16.

- SHA-256: `d34fd1683925bcc930844119e121d9c299cc1b3ced756e8c3b4a741c8f61e244`
- Size: 137,841 bytes
- Pages: 2
- Page size: US Letter
- Tagged: yes
- Encrypted: no
- Forms: none
- Embedded JavaScript: none

Both pages were rendered and visually inspected. Text is readable, links and headings are visible, and no content is clipped or overlapping. The project heading is **Water Billing System**.

### First-party delivery

The PDF is copied unchanged to:

`public/files/Ehnand-Azucena-CV.pdf`

Its public URL is:

`/files/Ehnand-Azucena-CV.pdf`

`PROFILE.resumeUrl` becomes this first-party path. The Vercel Blob URL is removed from active source. Cloudflare Workers Static Assets serves the PDF with the rest of the generated portfolio; R2 and a Worker runtime are unnecessary for one small public document.

The About evidence section presents two distinct actions:

- **View résumé** opens the PDF in a new tab.
- **Download PDF** points to the same-origin URL with `download="Ehnand-Azucena-CV.pdf"`.

Contact and footer résumé links open the same first-party PDF. They do not need to duplicate both actions because the About section is the primary résumé interaction.

`public/_headers` assigns the PDF `X-Robots-Tag: noindex, noarchive` so the portfolio remains the indexed source of professional information and an older cached PDF does not compete in search results. The PDF stays publicly accessible and downloadable. The response must preserve `Content-Type: application/pdf` and must not force attachment globally because the View action needs inline browser display.

## SEO and crawlability

- `/projects` and every project detail remain static HTML.
- All five featured-project links exist in the initial homepage HTML.
- The hero controller changes presentation only; it does not fetch content or create crawl paths.
- Water Billing System metadata and structured data use the updated display title while the canonical URL stays unchanged.
- The project archive's bounded scrolling does not hide or virtualize records.
- Theme selection changes presentation only and never produces alternate canonical URLs.
- Native view transitions do not replace normal links or navigation semantics.
- The CV is linked from visible HTML but intentionally excluded from indexing through its response header.

## Accessibility requirements

- Theme controls, carousel controls, the project scroll region, and CV actions are reachable and understandable with a keyboard.
- Theme and carousel controls expose state through names and ARIA attributes, not color alone.
- Focus indicators remain visible in both themes.
- Automatic project rotation has a visible Pause control and stops on hover and focus.
- Reduced-motion preferences remove nonessential animation and auto-rotation.
- Project images retain meaningful alternative text; repository fallbacks remain identified honestly.
- The project scroll region has a visible focus state, can be exited with ordinary Tab navigation, and intentionally contains pointer or touch overscroll while the visitor is browsing its records.
- The site remains readable and navigable without JavaScript.

## Implementation boundaries

The behavior is split into focused units:

- the root layout owns before-paint theme initialization and document-level transition hooks;
- the header owns desktop and mobile theme-toggle placement;
- a theme controller owns preference resolution, persistence, labels, and system-change handling;
- the hero component owns featured-project markup;
- a featured-project controller owns timing, pause state, visibility state, and manual controls;
- a small motion controller owns one-time section entry observation;
- shared project data remains the only source of project names, links, and metadata;
- global CSS owns theme tokens, transition styles, carousel presentation, and bounded archive behavior;
- the profile data owns the first-party CV URL.

No unit should depend on React state, a third-party carousel, a global event bus, or a server runtime.

## Verification strategy

Implementation follows test-first development. Generated-site tests must fail before production changes and then prove:

- primary and footer navigation label `/projects` as **Projects** rather than **Work**;
- the homepage contains exactly five featured hero projects in the approved order;
- the Water Billing display title is present and the existing canonical slug remains valid;
- the project archive remains complete and is a labelled, focusable scroll region;
- theme initialization and toggle hooks exist without introducing a hydration framework;
- the first-party CV exists at the stable path;
- About exposes separate View and Download actions;
- active source no longer references the Vercel Blob URL;
- reduced-motion handling covers page entry and project rotation;
- no Next.js or React runtime returns.

Final verification runs only through Docker Compose:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
```

The final visual confirmation covers desktop and mobile in both light and dark themes, keyboard operation of the carousel and project scroll region, reduced-motion behavior, cross-page navigation, and both CV actions. If the controlled browser remains unavailable, the implementation must report that visual confirmation as outstanding rather than substituting an unrelated browser automation surface.

## Documentation updates

Implementation updates `DESIGN.md` so it no longer describes the site as intentionally light-only or as having a single authored animation. `PRODUCT.md`, `CLAUDE.md`, `README.md`, and `AGENTS.md` change only where their operator or architecture guidance would otherwise contradict the shipped behavior.

No commit, push, Cloudflare deployment, Vercel deletion, domain change, or DNS change is part of this refinement unless the owner explicitly requests it.
