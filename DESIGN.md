# Production Trace design system

## Thesis

Production Trace presents Ehnand Azucena as a systems engineer whose work can be inspected from problem framing through production operation. The visual direction comes from seed `dc307738`: neutral technical surfaces, graphite ink, cobalt working marks, one amber live-status accent, numbered evidence records, calibration rules, and a horizontal commissioning rail.

The site is evidence-led. Project records, technical articles, work history, credentials, and direct contact paths carry the page; ornamental dashboards, invented metrics, and generic marketing cards do not.

## Color and contrast

| Token | Light | Dark | Role |
|---|---:|---:|---|
| Paper | `#f6f7f8` | `#0d1117` | Primary page surface |
| Surface | `#ffffff` | `#161b22` | Quiet section contrast |
| Graphite | `#15191f` | `#f0f3f6` | Headings and primary text |
| Graphite soft | `#4e5763` | `#b4bdc8` | Secondary text and metadata |
| Cobalt | `#164bc5` | `#8ab4ff` | Working marks, focus, and primary actions |
| Cobalt dark | `#10358c` | `#b8d1ff` | Text links and hover states |
| Amber | `#974400` | `#ffb45f` | Live-production status only |
| Rule | `#d0d5db` | `#303844` | Quiet separators |
| Rule strong | `#87919d` | `#66717f` | Structural separators |

The first paint follows `prefers-color-scheme`. A compact header control lets the visitor choose light or dark explicitly, and that valid manual choice persists under the `ehnand-theme` key. Both themes retain the same information hierarchy and meet the tested contrast pairs; neither changes the site's meaning or content.

## Typography

- IBM Plex Sans Variable is the locally loaded reading and display face. It carries headings, body copy, controls, and long-form articles.
- IBM Plex Mono is the locally loaded measurement face. It is reserved for dates, status, record indices, code, and compact system metadata.
- Display text is capped at `6rem`, with tracking no tighter than `-0.035em`.
- Body and article copy stay within a `70ch` reading measure.
- Fonts are bundled by Astro from Fontsource. Pages do not depend on a remote font provider.

## Layout

Desktop compositions use a 12-column grid within a `77.5rem` content boundary. The grid supports an asymmetric service-led hero, image/evidence project records, and content plus metadata detail layouts. Rules align records without enclosing each item in a card.

At `48rem` and below, compositions collapse to one column. Navigation becomes a native `details` control, commissioning changes from a horizontal trace to a vertical sequence, record actions remain full and readable, and wide tables become focusable horizontal overflow regions.

## Interface patterns

### Evidence records

Projects and articles use ruled records with a clear title, verified description, role or category metadata, and one primary path. Images use their repository dimensions and meaningful alternative text. Fallback images are identified honestly rather than presented as screenshots.

### Rules and surfaces

One-pixel graphite or gray rules create structure. `Surface` alternates with `Paper` only where a section needs separation. There are no gradients, glass panels, nested cards, or decorative background grids.

### Capsules

Pills are limited to small article category filters. Technology and article tags use compact rectangular labels so pills do not become a general container style.

### Reading

Article bodies are statically generated from MDX with one visible `h1` supplied by the layout. GFM tables are semantic tables inside named, keyboard-focusable overflow groups. Code is readable without a client-side highlighter or inline token styles.

### Focus and browser surfaces

All interactive elements use a three-pixel Cobalt focus outline with offset. The sticky header is accounted for by document scroll padding. Selection, scrollbars, underlines, placeholder text, and tabular numerals use the same palette and typography system.

## Motion

Motion communicates continuity and state without becoming a separate visual layer:

- The first viewport enters over 300–360 milliseconds using opacity and a 12-pixel vertical offset.
- The featured-project record changes over 420 milliseconds and advances every seven seconds only when it is not paused, hovered, focused, hidden in a background tab, or subject to reduced motion. Previous, next, direct selectors, and a persistent Pause/Resume control remain available.
- Sections and records reveal once over 360 milliseconds when they enter the viewport. The controller unobserves each completed element.
- Native cross-document view transitions use a 180-millisecond exit and 280-millisecond entry while the header retains visual continuity.

All content is present and usable before and without animation. The static featured-project fallback links remain visible when enhancement does not initialize.

Under `prefers-reduced-motion: reduce`, hero entry, project auto-rotation, record transitions, smooth scrolling, commissioning drawing, and native view-transition animation are removed or shown immediately in their completed state.

## Homepage sequence

1. Service-led hero with a five-project evidence showcase: Adam AI, REPSShield, Water Billing System, MemberPulse, and Swiss Energy Platform Suite.
2. Problem → Architecture → Delivery → Production commissioning rail.
3. Selected production systems.
4. Services and evidence paths.
5. Engineer-directed, AI-augmented workflow.
6. One recent article from each of the four editorial categories.
7. Professional history, skills, education, and credentials.
8. FAQ.
9. Direct contact.

## Intentional comp deviations

- No fictional trace identifier is displayed.
- No fake dashboard values or unsupported performance metrics are used.
- No generated project screenshot replaces repository evidence.
- No paper-grain raster or synthetic texture is shipped.
- The comp's project arrangements were adapted to real title lengths, real screenshots, and the complete portfolio inventory.

## Image provenance

All media below was present in the repository before the Astro presentation layer used it. No ImageGen output is part of the shipping site.

| Asset group | Repository source | Public use | Provenance |
|---|---|---|---|
| Portrait | `public/images/profile-new.jpg` | Homepage About evidence and default social image | Repository-provided |
| Current and selected systems | `public/images/projects/adam-ai.webp`, `repsshield.png`, `memberpulse.webp`, `initao-water-bill.webp`, `budget-app.png`, and `playnow.webp` | Homepage records, project archive, and project details | Repository-provided |
| Historical project screenshots | `public/images/weather_app.png`, `edutracker.jpg`, `email_auto.jpg`, `lgu_hris.jpg`, `file_repo.jpg`, and `expert_sys.jpg` | Project archive and project details; `lgu_hris.jpg` supports both M1 HRIS records | Repository-provided |
| Swiss Energy fallback | `public/images/projects/swiss-energy-placeholder.svg` | Clearly marked fallback for the Swiss Energy Platform Suite | Repository-provided fallback SVG |
| M1 Helpdesk fallback | `public/placeholder.svg` | Clearly marked fallback for the M1 Helpdesk record | Repository-provided fallback SVG |
| Rendered certificates | `public/images/certificates/symfony7-fundamentals.png`, `advanced-react.png`, `react-basics.png`, `javascript-algorithms.png`, `responsive-web-design.png`, and `csxf-cybersecurity.png` | Homepage credential evidence | Repository-provided |
| Retained certificate files | Remaining files under `public/images/certificates/` | Repository evidence retained for future verified credential records; not currently rendered | Repository-provided |
| Generic retained placeholders | `public/placeholder*.{png,jpg,svg}` and `public/placeholder-logo.*` | Only `public/placeholder.svg` is referenced by a current project record | Repository-provided |

## Ship verdict

Ship only when the responsive confirmation pass, automated checks, and complete Next.js removal all pass. Deployment and domain cutover remain separate owner-controlled actions.
