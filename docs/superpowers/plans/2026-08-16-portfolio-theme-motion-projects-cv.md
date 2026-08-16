# Portfolio Theme, Motion, Projects, and CV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Astro portfolio with neutral light/dark themes, purposeful page motion, an accessible five-project hero showcase, consistent Projects naming, a bounded project archive, and a first-party downloadable CV.

**Architecture:** Preserve Astro static rendering and progressively enhance generated HTML with three focused vanilla TypeScript controllers: theme state, featured-project rotation, and one-time section reveals. Shared data and pure state helpers remain framework-independent and unit-testable; CSS owns theme tokens, transitions, responsive presentation, and reduced-motion behavior.

**Tech Stack:** Astro 7 static output, strict TypeScript, vanilla browser APIs, CSS custom properties, native View Transitions, MDX, Node's built-in test runner, HTML Validate, Docker Compose, pnpm, and Cloudflare Workers Static Assets.

## Global Constraints

- Read `CLAUDE.md` before execution; its Project Overview remains the product authority.
- Follow the approved specification at `docs/superpowers/specs/2026-08-16-portfolio-theme-motion-projects-cv-design.md`.
- Run every Node, Astro, pnpm, lint, test, build, preview, and deployment-related command through Docker Compose.
- Use pnpm only.
- Keep every public route statically rendered and crawlable.
- Add no React, React DOM, Framer Motion, carousel package, theme package, hydration runtime, or Worker runtime entry.
- Use **Projects** as the visible navigation label while retaining `/projects`.
- Display **Water Billing System** while retaining `/projects/initao-water-billing-system` and supported contextual `Initao` references.
- Use the exact five featured projects and order approved in the specification.
- Preserve the FastAPI ERP article without creating or linking an ERP project.
- Preserve WCAG 2.2 AA behavior, semantic structure, keyboard access, visible focus, and reduced-motion support.
- Do not invent or embellish public claims, metrics, dates, clients, credentials, or outcomes.
- Preserve unrelated owner changes in the dirty worktree.
- Do not commit, push, deploy, modify DNS, delete Vercel resources, or change domains unless the owner explicitly requests it.

## Execution preflight

- [ ] **Step 1: Load the repository and UI guardrails**

Read `CLAUDE.md`, `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, and the approved specification. Invoke the `impeccable` skill for this interface refinement, run its context loader against `src/pages/index.astro`, read the `animate` playbook, and read `reference/craft-floor.md` immediately before the first UI edit.

Keep the skill's Node utility inside the required Docker workflow:

```bash
docker compose run --rm --no-deps -v /home/blank/.codex/skills/impeccable:/opt/impeccable:ro app node /opt/impeccable/scripts/context.mjs --target src/pages/index.astro
sed -n '1,9999p' /home/blank/.codex/skills/impeccable/reference/animate.md
```

Immediately before the first component or CSS production edit, run:

```bash
sed -n '1,9999p' /home/blank/.codex/skills/impeccable/reference/craft-floor.md
```

Follow any context-loader directive that applies to this refinement. Report a stale-context finding rather than repairing unrelated artifact drift.

- [ ] **Step 2: Record the dirty-worktree baseline**

Run:

```bash
git status --short
git diff --stat
```

Expected: the existing Astro migration changes remain present. Do not discard, stage, or rewrite unrelated changes.

Because the current Astro tree is largely untracked, create a temporary comparison snapshot without touching the Git index:

```bash
PORTFOLIO_BASELINE="$(mktemp -d /tmp/ehnand-portfolio-theme-motion.XXXXXX)"
cp -a --parents CLAUDE.md README.md DESIGN.md PRODUCT.md public/_headers src tests content/articles "$PORTFOLIO_BASELINE"
printf '%s\n' "$PORTFOLIO_BASELINE"
```

Record the printed absolute path and substitute it for `<baseline>` in later `diff -u` commands. The snapshot is diagnostic only; do not copy it back over the working tree. At each review checkpoint, use `git diff` for tracked paths and `diff -u <baseline>/<path> <path>` for an untracked path; `diff` exit status 1 is expected when it is showing the intended changes. Review a newly created text file with `diff -u /dev/null <path>`.

- [ ] **Step 3: Establish a fresh generated-site baseline**

Run:

```bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
```

Expected: the current 28-page production build and existing test suite pass before new failing tests are introduced.

---

## File map

### Create

- `src/components/site/ThemeToggle.astro` — reusable desktop/mobile theme control markup.
- `src/data/featured-projects.ts` — approved featured-project order and strict project resolution.
- `src/lib/theme.ts` — pure theme validation, resolution, and toggle helpers.
- `src/lib/featured-carousel.ts` — pure index wrapping and auto-advance policy.
- `src/scripts/theme.ts` — browser theme synchronization and persistence.
- `src/scripts/featured-projects.ts` — accessible hero rotation controller.
- `src/scripts/site-motion.ts` — one-time viewport reveal controller.
- `tests/unit/theme.test.mjs` — pure theme behavior.
- `tests/unit/theme-css.test.mjs` — palette presence, warm-color removal, and contrast checks.
- `tests/unit/featured-carousel.test.mjs` — carousel index and pause policy.
- `tests/unit/cv-asset.test.mjs` — accepted CV identity and PDF safety properties.
- `tests/unit/motion-source.test.mjs` — progressive motion and reduced-motion source contract.
- `public/files/Ehnand-Azucena-CV.pdf` — owner-provided first-party CV.

### Modify

- `src/layouts/BaseLayout.astro` — before-paint theme initialization and global browser controllers.
- `src/components/site/Header.astro` — Projects label and theme controls.
- `src/components/site/Footer.astro` — Projects label and first-party résumé link.
- `src/layouts/ProjectLayout.astro` — Projects wording in the project-detail return action.
- `src/components/home/Hero.astro` — five-project accessible showcase.
- `src/components/home/AboutEvidence.astro` — separate view and download résumé actions.
- `src/components/home/SelectedSystems.astro` — Projects wording only; retain three deeper records.
- `src/components/home/Services.astro` — Water Billing display label.
- `src/pages/projects/index.astro` — named, focusable bounded project region.
- `src/data/profile.ts` — first-party résumé URL and filename in the existing `PROFILE` source of truth.
- `src/data/projects.ts` — Water Billing display title, narrative self-reference, and image alt text.
- `content/articles/correct-ledger-wrong-billing-statement.mdx` — Water Billing link label.
- `content/articles/utility-billing-ledger.mdx` — Water Billing link label.
- `content/articles/offline-first-laravel.mdx` — Water Billing link label.
- `content/articles/durable-ai-memory-obsidian-mocs.mdx` — Water Billing link label.
- `src/styles/global.css` — both themes, controls, carousel, motion, archive scrolling, responsive and reduced-motion rules.
- `public/_headers` — CV indexing policy.
- `tests/generated/base-layout.test.mjs` — navigation, theme bootstrap, and controller contracts.
- `tests/generated/homepage.test.mjs` — five featured projects, Water Billing title, and CV actions.
- `tests/generated/projects.test.mjs` — archive scroll semantics and stable Water Billing canonical route.
- `tests/integration/cloudflare-routes.test.mjs` — served CV headers and content type.
- `DESIGN.md` — neutral dual-theme and expanded motion authority.
- `PRODUCT.md` — first-party résumé evidence and approved interaction set.
- `CLAUDE.md` — active browser-interaction architecture.
- `README.md` — operator-facing theme, showcase, and CV notes.

---

### Task 1: Align public naming and make the CV first-party

**Files:**

- Create: `tests/unit/cv-asset.test.mjs`
- Create: `public/files/Ehnand-Azucena-CV.pdf`
- Modify: `tests/generated/base-layout.test.mjs`
- Modify: `tests/generated/homepage.test.mjs`
- Modify: `tests/generated/projects.test.mjs`
- Modify: `tests/integration/cloudflare-routes.test.mjs`
- Modify: `src/data/profile.ts`
- Modify: `src/data/projects.ts`
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/Footer.astro`
- Modify: `src/layouts/ProjectLayout.astro`
- Modify: `src/components/home/AboutEvidence.astro`
- Modify: `src/components/home/SelectedSystems.astro`
- Modify: `src/components/home/Services.astro`
- Modify: `content/articles/correct-ledger-wrong-billing-statement.mdx`
- Modify: `content/articles/utility-billing-ledger.mdx`
- Modify: `content/articles/offline-first-laravel.mdx`
- Modify: `content/articles/durable-ai-memory-obsidian-mocs.mdx`
- Modify: `public/_headers`

**Interfaces:**

- Consumes: owner source `/home/blank/Documents/Ehnand CV.pdf`; project slug `initao-water-billing-system`; `PROFILE` from `src/data/profile.ts`.
- Produces: `PROFILE.resumeUrl === "/files/Ehnand-Azucena-CV.pdf"`; `PROFILE.resumeFilename === "Ehnand-Azucena-CV.pdf"`; unchanged canonical project slug with displayed title **Water Billing System**.

- [ ] **Step 1: Add the failing CV asset test**

Create `tests/unit/cv-asset.test.mjs`:

```js
import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import test from "node:test"

const expectedHash = "d34fd1683925bcc930844119e121d9c299cc1b3ced756e8c3b4a741c8f61e244"
const cvPath = "public/files/Ehnand-Azucena-CV.pdf"

test("first-party CV matches the owner-approved PDF", async () => {
  const pdf = await readFile(cvPath)
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-")
  assert.equal(createHash("sha256").update(pdf).digest("hex"), expectedHash)
  assert.doesNotMatch(pdf.toString("latin1"), /\/JavaScript\b|\/JS\b/)
  assert.doesNotMatch(pdf.toString("latin1"), /\/Encrypt\b/)
})
```

- [ ] **Step 2: Change generated-site tests to the approved naming and CV contract**

In `tests/generated/base-layout.test.mjs`, replace the Work assertion with:

```js
assert.equal(
  (html.match(/href="\/projects"[^>]*>Projects<\/a>/g) ?? []).length,
  3,
)
assert.doesNotMatch(html, /href="\/projects"[^>]*>Work<\/a>/)
```

In `tests/generated/homepage.test.mjs`, add:

```js
assert.match(html, />Water Billing System</)
assert.match(html, /href="\/files\/Ehnand-Azucena-CV\.pdf"[^>]*>View résumé<\/a>/)
assert.match(
  html,
  /href="\/files\/Ehnand-Azucena-CV\.pdf"[^>]*download="Ehnand-Azucena-CV\.pdf"[^>]*>Download PDF<\/a>/,
)
assert.doesNotMatch(html, /vercel-storage\.com/)
```

In `tests/generated/projects.test.mjs`, add this dedicated canonical-continuity test:

```js
test("Water Billing uses the new title on the stable canonical route", async () => {
  const html = await readGenerated("/projects/initao-water-billing-system")
  assert.match(html, /<h1[^>]*>Water Billing System<\/h1>/)
  assert.match(
    html,
    /rel="canonical" href="https:\/\/ehnand\.com\/projects\/initao-water-billing-system"/,
  )
  assert.match(html, />Back to all projects<\/a>/)
})
```

In `tests/integration/cloudflare-routes.test.mjs`, add:

```js
test("first-party CV is viewable but excluded from indexing", async () => {
  const response = await request("/files/Ehnand-Azucena-CV.pdf")
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("content-type"), "application/pdf")
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/)
  assert.match(response.headers.get("x-robots-tag") ?? "", /noarchive/)
})
```

- [ ] **Step 3: Run the tests and verify the expected red state**

Run:

```bash
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
```

Expected: both commands FAIL for the intended contracts: the unit/generated suite cannot find the approved first-party PDF and still sees Work, Vercel Blob, and the old project title; the Wrangler route test receives a non-200 response for the missing PDF.

- [ ] **Step 4: Copy the exact approved PDF into the public asset tree**

Run this exact binary copy operation:

```bash
mkdir -p public/files
cp "/home/blank/Documents/Ehnand CV.pdf" public/files/Ehnand-Azucena-CV.pdf
```

Then verify:

```bash
sha256sum public/files/Ehnand-Azucena-CV.pdf
```

Expected hash: `d34fd1683925bcc930844119e121d9c299cc1b3ced756e8c3b4a741c8f61e244`.

- [ ] **Step 5: Make profile data own the first-party CV path**

Replace the remote value in `src/data/profile.ts` with:

```ts
resumeUrl: "/files/Ehnand-Azucena-CV.pdf",
resumeFilename: "Ehnand-Azucena-CV.pdf",
```

- [ ] **Step 6: Add distinct view and download actions**

In `src/components/home/AboutEvidence.astro`, replace the existing résumé anchor with:

```astro
<a
  class="button button--secondary"
  href={PROFILE.resumeUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  View résumé
</a>
<a
  class="text-link"
  href={PROFILE.resumeUrl}
  download={PROFILE.resumeFilename}
>
  Download PDF
</a>
```

Keep Contact and Footer links pointed at `PROFILE.resumeUrl`; they inherit the first-party path automatically.

- [ ] **Step 7: Align Projects naming**

Change every navigation anchor whose `href` is `/projects` from **Work** to **Projects** in `Header.astro` and `Footer.astro`. In `ProjectLayout.astro`, change **Back to all work** to **Back to all projects**. In `SelectedSystems.astro`, replace "the complete inventory remains in Work" with "Browse the complete project inventory." Replace "Inspect selected work" in `Hero.astro` with "Inspect selected projects" when Task 3 rewrites that component.

- [ ] **Step 8: Change only the project display name and its self-references**

In `src/data/projects.ts`, keep `slug: "initao-water-billing-system"` and the `RELATED_ARTICLES` key unchanged. Apply these exact replacements inside that project record:

```ts
title: "Water Billing System",
```

```text
The Water Billing System is a government enterprise platform won via competitive bidding for the Municipality of Initao.
```

```ts
alt: "Water Billing System dashboard screenshot",
```

In `Services.astro` and the four listed MDX article footer links, change the visible link text to **Water Billing System** while preserving `/projects/initao-water-billing-system`. Keep narrative references such as "Municipality of Initao" and `LGU-Initao` unchanged.

- [ ] **Step 9: Add the PDF response policy**

Append this stanza to `public/_headers`:

```text
/files/Ehnand-Azucena-CV.pdf
  X-Robots-Tag: noindex, noarchive
```

Do not set `Content-Disposition`; the View action must remain inline-capable.

- [ ] **Step 10: Build and verify Task 1**

Run:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
```

Expected: naming, CV, generated HTML, type, lint, build, HTML, and served-header checks pass. Existing routes and the 15-project inventory remain intact.

- [ ] **Step 11: Review the Task 1 diff without committing**

Run:

```bash
git diff -- src/data/profile.ts src/data/projects.ts src/components src/layouts/ProjectLayout.astro public content tests
git diff --check
```

Expected: only the approved public-name and first-party-CV changes appear. Do not stage or commit.

---

### Task 2: Add a no-flash neutral light/dark theme

**Files:**

- Create: `src/components/site/ThemeToggle.astro`
- Create: `src/lib/theme.ts`
- Create: `src/scripts/theme.ts`
- Create: `tests/unit/theme.test.mjs`
- Create: `tests/unit/theme-css.test.mjs`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/site/Header.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/generated/base-layout.test.mjs`

**Interfaces:**

- Produces: `Theme = "light" | "dark"`; `THEME_STORAGE_KEY = "ehnand-theme"`; `isTheme(value)`, `resolveTheme(stored, prefersDark)`, and `toggleTheme(theme)`; DOM hooks `[data-theme-toggle]` and `[data-theme-label]`.
- Consumes: `window.matchMedia("(prefers-color-scheme: dark)")`, `localStorage`, and `document.documentElement.dataset.theme`.

- [ ] **Step 1: Write failing pure theme tests**

Create `tests/unit/theme.test.mjs`:

```js
import assert from "node:assert/strict"
import test from "node:test"
import {
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
} from "../../src/lib/theme.ts"

test("theme resolution prefers a valid saved choice", () => {
  assert.equal(THEME_STORAGE_KEY, "ehnand-theme")
  assert.equal(resolveTheme("light", true), "light")
  assert.equal(resolveTheme("dark", false), "dark")
})

test("theme resolution follows the system without a saved choice", () => {
  assert.equal(resolveTheme(null, true), "dark")
  assert.equal(resolveTheme("invalid", false), "light")
  assert.equal(isTheme("dark"), true)
  assert.equal(isTheme("system"), false)
})

test("theme toggle switches between the two rendered themes", () => {
  assert.equal(toggleTheme("light"), "dark")
  assert.equal(toggleTheme("dark"), "light")
})
```

- [ ] **Step 2: Write the failing generated theme-shell assertions**

Add to `tests/generated/base-layout.test.mjs`:

```js
assert.match(html, /ehnand-theme/)
assert.equal((html.match(/data-theme-toggle/g) ?? []).length, 2)
assert.match(html, /data-theme-label/)
assert.match(html, /prefers-color-scheme: dark/)
```

- [ ] **Step 3: Write the failing palette and contrast test**

Create `tests/unit/theme-css.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const css = await readFile("src/styles/global.css", "utf8")

function rgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function luminance(hex) {
  const channels = rgb(hex).map((value) => {
    const normalized = value / 255
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background))
  const darker = Math.min(luminance(foreground), luminance(background))
  return (lighter + 0.05) / (darker + 0.05)
}

test("neutral light and dark palettes replace the warm paper palette", () => {
  assert.match(css, /--paper:\s*#f6f7f8/)
  assert.match(css, /html\[data-theme="dark"\][\s\S]*--paper:\s*#0d1117/)
  for (const warm of ["#f3f4f1", "#fafaf7", "#e2e5e1", "#e3e6e2", "#e4e6e2", "#e7e9e5"]) {
    assert.equal(css.includes(warm), false, `${warm} remains in the active stylesheet`)
  }
})

test("core text pairs meet WCAG AA contrast", () => {
  assert.ok(contrast("#15191f", "#f6f7f8") >= 4.5)
  assert.ok(contrast("#4e5763", "#ffffff") >= 4.5)
  assert.ok(contrast("#f0f3f6", "#0d1117") >= 4.5)
  assert.ok(contrast("#b4bdc8", "#161b22") >= 4.5)
  assert.ok(contrast("#10358c", "#f6f7f8") >= 4.5)
  assert.ok(contrast("#b8d1ff", "#0d1117") >= 4.5)
  assert.ok(contrast("#974400", "#ffffff") >= 4.5)
  assert.ok(contrast("#ffb45f", "#161b22") >= 4.5)
})

test("filled actions and focus accents retain sufficient contrast", () => {
  assert.ok(contrast("#ffffff", "#164bc5") >= 4.5)
  assert.ok(contrast("#0d1117", "#8ab4ff") >= 4.5)
  assert.ok(contrast("#164bc5", "#f6f7f8") >= 3)
  assert.ok(contrast("#8ab4ff", "#0d1117") >= 3)
})
```

- [ ] **Step 4: Verify the theme tests fail for the intended reasons**

Run:

```bash
docker compose run --rm --no-deps app pnpm test
```

Expected: FAIL because `src/lib/theme.ts`, dual-theme tokens, bootstrap markup, and two controls do not exist.

- [ ] **Step 5: Implement the pure theme contract**

Create `src/lib/theme.ts`:

```ts
export const THEME_STORAGE_KEY = "ehnand-theme"

export type Theme = "light" | "dark"

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark"
}

export function resolveTheme(
  storedTheme: string | null,
  prefersDark: boolean,
): Theme {
  if (isTheme(storedTheme)) return storedTheme
  return prefersDark ? "dark" : "light"
}

export function toggleTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark"
}
```

- [ ] **Step 6: Add the before-paint initializer**

In the `<head>` of `BaseLayout.astro`, immediately after the viewport meta, add an inline script that executes before paint:

```astro
<script is:inline>
  (() => {
    const storageKey = "ehnand-theme"
    let storedTheme = null
    try {
      storedTheme = localStorage.getItem(storageKey)
    } catch {}
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : prefersDark ? "dark" : "light"
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  })()
</script>
```

Before `</body>`, load the bundled controller:

```astro
<script>
  import "@/scripts/theme"
</script>
```

- [ ] **Step 7: Create reusable theme-toggle markup**

Create `src/components/site/ThemeToggle.astro` with a `className` prop and two inline SVG states:

```astro
---
interface Props {
  className?: string
}

const { className = "" } = Astro.props
---

<button
  class:list={["theme-toggle", className]}
  type="button"
  data-theme-toggle
  aria-pressed="false"
  aria-label="Switch to dark theme"
>
  <svg class="theme-toggle__icon theme-toggle__icon--light" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path>
  </svg>
  <svg class="theme-toggle__icon theme-toggle__icon--dark" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z"></path>
  </svg>
  <span data-theme-label>Theme</span>
</button>
```

Import it in `Header.astro`:

```astro
---
import ThemeToggle from "@/components/site/ThemeToggle.astro"
---
```

Render `<ThemeToggle className="theme-toggle--desktop" />` between the desktop navigation and contact action. Render `<ThemeToggle className="theme-toggle--mobile" />` inside the mobile navigation immediately before the final contact link.

- [ ] **Step 8: Implement theme synchronization and persistence**

Create `src/scripts/theme.ts`:

```ts
import {
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
  type Theme,
} from "@/lib/theme"

const root = document.documentElement
const media = window.matchMedia("(prefers-color-scheme: dark)")
const toggles = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]"),
)

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

function applyTheme(theme: Theme): void {
  root.dataset.theme = theme
  root.style.colorScheme = theme
  for (const button of toggles) {
    const next = toggleTheme(theme)
    button.setAttribute("aria-pressed", String(theme === "dark"))
    button.setAttribute("aria-label", `Switch to ${next} theme`)
    const label = button.querySelector<HTMLElement>("[data-theme-label]")
    if (label) label.textContent = theme === "dark" ? "Dark" : "Light"
  }
}

function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}
}

const initial = isTheme(root.dataset.theme)
  ? root.dataset.theme
  : resolveTheme(readStoredTheme(), media.matches)
applyTheme(initial)

for (const button of toggles) {
  button.addEventListener("click", () => {
    const current = isTheme(root.dataset.theme) ? root.dataset.theme : "light"
    const next = toggleTheme(current)
    storeTheme(next)
    applyTheme(next)
  })
}

media.addEventListener("change", (event) => {
  if (!isTheme(readStoredTheme())) applyTheme(event.matches ? "dark" : "light")
})
```

- [ ] **Step 9: Replace warm tokens and theme every fixed surface**

Replace the opening token block in `global.css` with the complete approved light palette and add the adjacent dark override:

```css
:root {
  color-scheme: light;
  --paper: #f6f7f8;
  --surface: #ffffff;
  --graphite: #15191f;
  --graphite-soft: #4e5763;
  --rule: #d0d5db;
  --rule-strong: #87919d;
  --cobalt: #164bc5;
  --cobalt-dark: #10358c;
  --amber: #974400;
  --accent-contrast: #ffffff;
  --inline-code: #e8ebef;
  --table-head: #edf0f3;
  --image-surface: #e5e9ed;
  --placeholder: #65707d;
  --header-surface: rgb(246 247 248 / 97%);
  --inverse-surface: #15191f;
  --inverse-text: #ffffff;
  --inverse-soft: #c7ced6;
  --inverse-rule: #707a86;
  --shadow: rgb(21 25 31 / 16%);
  --font-sans: "IBM Plex Sans Variable", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --content-max: 77.5rem;
  --reading-max: 70ch;
}

html[data-theme="dark"] {
  color-scheme: dark;
  --paper: #0d1117;
  --surface: #161b22;
  --graphite: #f0f3f6;
  --graphite-soft: #b4bdc8;
  --rule: #303844;
  --rule-strong: #66717f;
  --cobalt: #8ab4ff;
  --cobalt-dark: #b8d1ff;
  --amber: #ffb45f;
  --accent-contrast: #0d1117;
  --inline-code: #232a34;
  --table-head: #202731;
  --image-surface: #202731;
  --placeholder: #9aa5b2;
  --header-surface: rgb(13 17 23 / 97%);
  --inverse-surface: #05070a;
  --inverse-text: #f0f3f6;
  --inverse-soft: #b4bdc8;
  --inverse-rule: #4d5765;
  --shadow: rgb(0 0 0 / 38%);
}
```

Apply these selector-level replacements rather than guessing at equivalent colors:

| Existing use | Replacement |
|---|---|
| selection and cobalt-filled controls | `color: var(--accent-contrast)` |
| `.site-header` fixed RGBA | `background: var(--header-surface)` |
| mobile navigation fixed shadow | `box-shadow: 0 0.75rem 2rem var(--shadow)` |
| inline code `#e2e5e1` | `background: var(--inline-code)` |
| table heading `#e7e9e5` | `background: var(--table-head)` |
| image/fallback surfaces `#e3e6e2` and `#e4e6e2` | `background: var(--image-surface)` |
| article placeholder `#65706d` | `color: var(--placeholder)` |
| `.skip-link`, `.skip-link:focus`, and `.prose pre` inverse treatment | `background: var(--inverse-surface); color: var(--inverse-text)` |
| `.contact` background/text and `.contact h2` | `background: var(--inverse-surface)` on the section; `color: var(--inverse-text)` on both selectors |
| contact `#d4d9d6` and `#bfc7c3` | `color: var(--inverse-soft)` |
| contact `#707978` rules | `border-color: var(--inverse-rule)` |
| remaining contact `#fff` text/link states | `color: var(--inverse-text)` |

Leave only the explicit theme-token declarations and print-only `#fff`/`#000` values as fixed hex colors. Confirm that result with `rg -n '#[0-9a-fA-F]{3,8}|rgba\(' src/styles/global.css`.

Add the header-grid and complete toggle rules:

```css
.site-header__inner {
  grid-template-columns: minmax(12rem, 1fr) auto auto auto;
}

.theme-toggle {
  display: inline-flex;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.55rem 0.7rem;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
  background: transparent;
  color: var(--graphite);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  transition:
    border-color 160ms ease-out,
    color 160ms ease-out;
}

.theme-toggle:hover {
  border-color: var(--cobalt);
  color: var(--cobalt-dark);
}

.theme-toggle__icon {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.75;
}

html[data-theme="dark"] .theme-toggle__icon--light,
html:not([data-theme="dark"]) .theme-toggle__icon--dark {
  display: none;
}

.theme-toggle--mobile {
  width: 100%;
  justify-content: flex-start;
  border-width: 0 0 1px;
  border-color: var(--rule);
  border-radius: 0;
  padding-inline: 1rem;
}

@media (max-width: 60rem) {
  .site-header__inner {
    grid-template-columns: minmax(10rem, 1fr) auto;
  }

  .site-nav--desktop,
  .site-header__action,
  .theme-toggle--desktop {
    display: none;
  }
}
```

Keep `.mobile-nav` hidden above 60rem as it is now; the mobile toggle lives inside that already-hidden menu. Preserve the existing 44-by-44-pixel minimum targets for every header control.

- [ ] **Step 10: Build and verify Task 2**

Run:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm validate:html
```

Expected: pure theme, palette, contrast, generated markup, type, lint, build, and HTML checks pass with no warm page surface remaining.

- [ ] **Step 11: Review the Task 2 diff without committing**

Run:

```bash
git diff -- src/lib/theme.ts src/scripts/theme.ts src/components/site src/layouts/BaseLayout.astro src/styles/global.css tests
git diff --check
```

Expected: one theme implementation, two synchronized controls, and no unrelated copy or layout replacement.

---

### Task 3: Build the accessible five-project hero showcase

**Files:**

- Create: `src/data/featured-projects.ts`
- Create: `src/lib/featured-carousel.ts`
- Create: `src/scripts/featured-projects.ts`
- Create: `tests/unit/featured-carousel.test.mjs`
- Modify: `src/components/home/Hero.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/generated/homepage.test.mjs`

**Interfaces:**

- Produces: `FEATURED_PROJECT_SLUGS`, `getFeaturedProjects()`, `wrapProjectIndex(index, length)`, and `canAutoAdvance(state)`.
- DOM contract: `[data-featured-projects]`, `[data-featured-project]`, `[data-featured-controls]`, `[data-featured-previous]`, `[data-featured-next]`, `[data-featured-pause]`, `[data-featured-selector]`, `[data-featured-position]`, `[data-featured-status]`, and root `data-enhanced="true"` after successful initialization.

- [ ] **Step 1: Write failing carousel policy tests**

Create `tests/unit/featured-carousel.test.mjs`:

```js
import assert from "node:assert/strict"
import test from "node:test"
import {
  canAutoAdvance,
  wrapProjectIndex,
} from "../../src/lib/featured-carousel.ts"

test("project indexes wrap in both directions", () => {
  assert.equal(wrapProjectIndex(5, 5), 0)
  assert.equal(wrapProjectIndex(-1, 5), 4)
  assert.equal(wrapProjectIndex(2, 5), 2)
  assert.throws(() => wrapProjectIndex(0, 0), /positive/)
})

test("automatic rotation stops for every approved pause condition", () => {
  const active = {
    userPaused: false,
    hovered: false,
    focusWithin: false,
    documentHidden: false,
    reducedMotion: false,
  }
  assert.equal(canAutoAdvance(active), true)
  for (const key of Object.keys(active)) {
    assert.equal(canAutoAdvance({ ...active, [key]: true }), false, key)
  }
})
```

- [ ] **Step 2: Replace the single-project homepage assertion with a failing five-project assertion**

Keep the existing test that verifies exactly three deeper `data-selected-system` records. Add a separate test to `tests/generated/homepage.test.mjs`:

```js
test("homepage hero exposes the five approved featured projects in order", async () => {
  const html = await readGenerated("/")
  const slugs = [
    "adam-ai",
    "repsshield",
    "initao-water-billing-system",
    "memberpulse",
    "swiss-energy-platform-suite",
  ]
  assert.equal((html.match(/data-featured-project=/g) ?? []).length, 5)
  let previous = -1
  for (const slug of slugs) {
    const position = html.indexOf(`data-featured-project="${slug}"`)
    assert.ok(position > previous, `${slug} is out of order`)
    previous = position
  }
  assert.match(html, /aria-roledescription="carousel"/)
  assert.match(html, /hero-showcase__track" aria-live="off"/)
  assert.match(html, /data-featured-pause/)
  assert.match(html, /data-featured-status[^>]*aria-live="polite"/)
  assert.match(html, /hero-showcase__fallback-links/)
})
```

- [ ] **Step 3: Verify the carousel tests fail for missing behavior**

Run:

```bash
docker compose run --rm --no-deps app pnpm test
```

Expected: FAIL because the pure state helper and five-slide hero do not exist.

- [ ] **Step 4: Implement strict featured-project resolution**

Create `src/data/featured-projects.ts`:

```ts
import { getProjectBySlug, type Project } from "@/data/projects"

export const FEATURED_PROJECT_SLUGS = [
  "adam-ai",
  "repsshield",
  "initao-water-billing-system",
  "memberpulse",
  "swiss-energy-platform-suite",
] as const

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => {
    const project = getProjectBySlug(slug)
    if (!project) throw new Error(`Featured project ${slug} is missing`)
    return project
  })
}
```

- [ ] **Step 5: Implement the pure carousel policy**

Create `src/lib/featured-carousel.ts`:

```ts
export interface AutoAdvanceState {
  userPaused: boolean
  hovered: boolean
  focusWithin: boolean
  documentHidden: boolean
  reducedMotion: boolean
}

export function wrapProjectIndex(index: number, length: number): number {
  if (length <= 0) throw new Error("Project length must be positive")
  return ((index % length) + length) % length
}

export function canAutoAdvance(state: AutoAdvanceState): boolean {
  return !Object.values(state).some(Boolean)
}
```

- [ ] **Step 6: Replace the hero's single record with complete static carousel markup**

In `Hero.astro`, resolve `const projects = getFeaturedProjects()`. Keep the service offer on the left. Replace the existing record with a labelled showcase whose track maps all five projects:

```astro
<section
  class="hero-showcase"
  aria-label="Featured projects"
  aria-roledescription="carousel"
  data-featured-projects
>
  <div class="hero-showcase__track" aria-live="off">
    {projects.map((project, index) => (
      <article
        class="hero-record"
        data-featured-project={project.slug}
        data-active={String(index === 0)}
        aria-hidden={String(index !== 0)}
        inert={index !== 0}
        aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
        aria-roledescription="slide"
      >
        <div class:list={["hero-record__image", { "is-fallback": project.image.fallback }]}>
          <img
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index === 0 ? "high" : "auto"}
          />
        </div>
        <div class="hero-record__body">
          <p class="mono-label">Featured production evidence</p>
          <h2>{project.title}</h2>
          <dl class="evidence-meta">
            <div><dt>Category</dt><dd>{project.category}</dd></div>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Period</dt><dd>{project.period}</dd></div>
            <div><dt>Status</dt><dd>{project.status}</dd></div>
          </dl>
          <a class="text-link" href={`/projects/${project.slug}`}>Inspect project evidence</a>
        </div>
      </article>
    ))}
  </div>

  <div class="hero-showcase__controls" data-featured-controls hidden>
    <button type="button" data-featured-previous aria-label="Previous project">←</button>
    <span class="mono-label" data-featured-position>01 / 05</span>
    <button type="button" data-featured-next aria-label="Next project">→</button>
    <button type="button" data-featured-pause aria-pressed="false">Pause rotation</button>
  </div>

  <div class="hero-showcase__selectors" data-featured-controls hidden aria-label="Choose featured project">
    {projects.map((project, index) => (
      <button
        type="button"
        data-featured-selector={String(index)}
        aria-label={`Show ${project.title}`}
        aria-pressed={String(index === 0)}
      >
        {String(index + 1).padStart(2, "0")}
      </button>
    ))}
  </div>

  <p class="visually-hidden" data-featured-status aria-live="polite"></p>
  <ul class="hero-showcase__fallback-links">
    {projects.map((project) => <li><a href={`/projects/${project.slug}`}>{project.title}</a></li>)}
  </ul>
</section>
```

Update the direction-contract comment in `BaseLayout.astro` so the first viewport describes a five-project rotating evidence record rather than Adam AI only.

- [ ] **Step 7: Implement the browser carousel controller**

Create `src/scripts/featured-projects.ts` exactly around the pure policy contract:

```ts
import { canAutoAdvance, wrapProjectIndex } from "@/lib/featured-carousel"

const ROTATION_DELAY = 7_000

function initializeFeaturedProjects(root: HTMLElement): void {
  const slides = Array.from(
    root.querySelectorAll<HTMLElement>("[data-featured-project]"),
  )
  const selectors = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-featured-selector]"),
  )
  const controls = Array.from(
    root.querySelectorAll<HTMLElement>("[data-featured-controls]"),
  )
  const previous = root.querySelector<HTMLButtonElement>(
    "[data-featured-previous]",
  )
  const next = root.querySelector<HTMLButtonElement>("[data-featured-next]")
  const pause = root.querySelector<HTMLButtonElement>("[data-featured-pause]")
  const position = root.querySelector<HTMLElement>("[data-featured-position]")
  const status = root.querySelector<HTMLElement>("[data-featured-status]")

  if (
    slides.length === 0
    || !previous
    || !next
    || !pause
    || !position
    || !status
  ) return

  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  let index = 0
  let timer: number | undefined
  let userPaused = false
  let hovered = false
  let focusWithin = false
  let documentHidden = document.hidden
  let reducedMotion = media.matches

  function clearTimer(): void {
    if (timer !== undefined) window.clearTimeout(timer)
    timer = undefined
  }

  function currentState() {
    return {
      userPaused,
      hovered,
      focusWithin,
      documentHidden,
      reducedMotion,
    }
  }

  function render(nextIndex: number, announce: boolean): void {
    index = wrapProjectIndex(nextIndex, slides.length)

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index
      slide.dataset.active = String(active)
      slide.setAttribute("aria-hidden", String(!active))
      slide.inert = !active
    })

    selectors.forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === index))
    })

    position.textContent = `${String(index + 1).padStart(2, "0")} / ${String(
      slides.length,
    ).padStart(2, "0")}`
    pause.textContent = userPaused ? "Resume rotation" : "Pause rotation"
    pause.setAttribute("aria-pressed", String(userPaused))

    if (announce) {
      status.textContent = `Showing ${
        slides[index].getAttribute("aria-label") ?? `project ${index + 1}`
      }`
    }
  }

  function schedule(): void {
    clearTimer()
    if (!canAutoAdvance(currentState())) return
    timer = window.setTimeout(() => {
      render(index + 1, false)
      schedule()
    }, ROTATION_DELAY)
  }

  function show(nextIndex: number): void {
    render(nextIndex, true)
    schedule()
  }

  previous.addEventListener("click", () => show(index - 1))
  next.addEventListener("click", () => show(index + 1))
  selectors.forEach((button) => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.featuredSelector)
      if (Number.isInteger(target)) show(target)
    })
  })
  pause.addEventListener("click", () => {
    userPaused = !userPaused
    render(index, false)
    schedule()
  })
  root.addEventListener("mouseenter", () => {
    hovered = true
    schedule()
  })
  root.addEventListener("mouseleave", () => {
    hovered = false
    schedule()
  })
  root.addEventListener("focusin", () => {
    focusWithin = true
    schedule()
  })
  root.addEventListener("focusout", (event) => {
    focusWithin = event.relatedTarget instanceof Node
      && root.contains(event.relatedTarget)
    schedule()
  })
  document.addEventListener("visibilitychange", () => {
    documentHidden = document.hidden
    schedule()
  })
  media.addEventListener("change", (event) => {
    reducedMotion = event.matches
    schedule()
  })

  controls.forEach((control) => {
    control.hidden = false
  })
  root.dataset.enhanced = "true"
  render(0, false)
  schedule()
}

for (const root of document.querySelectorAll<HTMLElement>(
  "[data-featured-projects]",
)) {
  initializeFeaturedProjects(root)
}
```

The exact mutable state names match `AutoAdvanceState`. Automatic changes pass `announce = false`; Previous, Next, and direct selectors pass `true`. The static fallback link list remains visible unless initialization succeeds and sets `data-enhanced="true"`.

Load the controller once near the end of `BaseLayout.astro`:

```astro
<script>
  import "@/scripts/featured-projects"
  import "@/scripts/theme"
</script>
```

- [ ] **Step 8: Style the carousel without changing the visual world**

Move the current `.hero-record` grid placement to the showcase and add these exact presentation rules around the existing record/image/body styles:

```css
.hero-showcase {
  grid-column: 8 / -1;
  min-width: 0;
}

.hero-showcase__track {
  display: grid;
}

.hero-record {
  grid-area: 1 / 1;
  grid-column: auto;
  transition:
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0s linear 420ms;
}

.hero-record[data-active="false"] {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
}

.hero-record[data-active="true"] {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0s;
}

.hero-record__image.is-fallback img {
  object-fit: contain;
}

.hero-showcase__controls,
.hero-showcase__selectors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--rule-strong);
}

.hero-showcase__controls[hidden],
.hero-showcase__selectors[hidden] {
  display: none;
}

.hero-showcase__controls button,
.hero-showcase__selectors button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--rule-strong);
  border-radius: 2px;
  background: transparent;
  color: var(--graphite);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.hero-showcase__controls button:hover,
.hero-showcase__selectors button:hover,
.hero-showcase__selectors button[aria-pressed="true"] {
  border-color: var(--cobalt);
  color: var(--cobalt-dark);
}

.hero-showcase__selectors button[aria-pressed="true"] {
  border-bottom-width: 3px;
}

.hero-showcase__fallback-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  padding: 0.75rem 0 0;
  margin: 0;
  border-top: 1px solid var(--rule);
  list-style: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.hero-showcase[data-enhanced="true"] .hero-showcase__fallback-links {
  display: none;
}

@media (max-width: 60rem) {
  .hero-showcase {
    grid-column: 8 / -1;
  }
}

@media (max-width: 48rem) {
  .hero__offer,
  .hero-showcase {
    grid-column: 1;
  }
}
```

Keep the current project-image aspect ratio and background token. Do not add gradients, shadows beyond the semantic shadow token, pills, glass, or a generic card-carousel treatment.

- [ ] **Step 9: Build and verify Task 3**

Run:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm validate:html
```

Expected: five-project order, carousel policy, generated markup, type, lint, build, and HTML validation all pass. The deeper Selected Systems test still reports exactly three records.

- [ ] **Step 10: Review the Task 3 diff without committing**

Run:

```bash
git diff -- src/data/featured-projects.ts src/lib/featured-carousel.ts src/scripts/featured-projects.ts src/components/home/Hero.astro src/layouts/BaseLayout.astro src/styles/global.css tests
git diff --check
```

Expected: the approved five-project set is the only featured set, and no project claims were changed.

---

### Task 4: Add purposeful entry motion and bound the project archive

**Files:**

- Create: `src/scripts/site-motion.ts`
- Create: `tests/unit/motion-source.test.mjs`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/generated/base-layout.test.mjs`
- Modify: `tests/generated/projects.test.mjs`

**Interfaces:**

- DOM contract: `.section`, `.archive-intro`, and `.record` become one-time reveal candidates; `html[data-motion="ready"]`, `.is-reveal-pending`, and `.is-revealed` own state.
- Project archive contract: `role="region"`, `data-scroll-region="projects"`, `aria-label="Project records"`, and `tabindex="0"`.

- [ ] **Step 1: Write failing project-region assertions**

Add to the archive test in `tests/generated/projects.test.mjs`:

```js
assert.match(html, /data-scroll-region="projects"/)
assert.match(html, /class="projects-register"[^>]*role="region"/)
assert.match(html, /aria-label="Project records"/)
assert.match(html, /data-scroll-region="projects"[^>]*tabindex="0"/)
assert.match(html, /Scroll to browse all 15 records/)
```

- [ ] **Step 2: Write the failing motion-source contract**

Create `tests/unit/motion-source.test.mjs`:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const css = await readFile("src/styles/global.css", "utf8")
const motion = await readFile("src/scripts/site-motion.ts", "utf8").catch(() => "")

test("site motion is progressive and one-time", () => {
  assert.match(motion, /IntersectionObserver/)
  assert.match(motion, /prefers-reduced-motion: reduce/)
  assert.match(motion, /observer\.unobserve/)
  assert.match(css, /html\[data-motion="ready"\]/)
  assert.match(css, /\.is-reveal-pending/)
  assert.match(css, /\.is-revealed/)
})

test("view transitions and reduced motion have explicit policies", () => {
  assert.match(css, /@view-transition/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(css, /::view-transition-old\(root\)/)
  assert.match(css, /::view-transition-new\(root\)/)
})
```

Add to `tests/generated/base-layout.test.mjs`:

```js
assert.match(html, /data-motion-root/)
```

- [ ] **Step 3: Verify the archive and motion tests fail**

Run:

```bash
docker compose run --rm --no-deps app pnpm test
```

Expected: FAIL because the project region and motion controller do not exist.

- [ ] **Step 4: Make the project register a bounded accessible region**

In `src/pages/projects/index.astro`, add this status under the record count:

```astro
<span class="archive-scroll-hint">Scroll to browse all {PROJECTS.length} records</span>
```

Change the register opening tag to:

```astro
<div
  class="projects-register"
  role="region"
  data-scroll-region="projects"
  aria-label="Project records"
  tabindex="0"
>
```

In `global.css`, apply:

```css
.projects-register {
  max-block-size: min(72svh, 72rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  border-top: 1px solid var(--graphite);
  border-bottom: 1px solid var(--graphite);
}

.projects-register:focus-visible {
  outline: 3px solid var(--cobalt);
  outline-offset: 4px;
}
```

Style `.archive-scroll-hint` as secondary mono metadata. Keep the region bounded at mobile sizes as approved.

- [ ] **Step 5: Implement the one-time reveal controller**

Create `src/scripts/site-motion.ts`:

```ts
const media = window.matchMedia("(prefers-reduced-motion: reduce)")

if (!media.matches && "IntersectionObserver" in window) {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(".section, .archive-intro, .record"),
  )
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        element.classList.remove("is-reveal-pending")
        element.classList.add("is-revealed")
        observer.unobserve(element)
      }
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  )

  for (const element of candidates) {
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.92) {
      element.classList.add("is-revealed")
      continue
    }
    element.classList.add("is-reveal-pending")
    observer.observe(element)
  }

  document.documentElement.dataset.motion = "ready"
}
```

Add `data-motion-root` to `<body>` in `BaseLayout.astro` and import the controller in the existing bundled script block:

```astro
<script>
  import "@/scripts/featured-projects"
  import "@/scripts/site-motion"
  import "@/scripts/theme"
</script>
```

- [ ] **Step 6: Implement initial, section, and cross-document motion CSS**

Replace the existing root-only view-transition rule and add the complete motion contract:

```css
@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__mode {
  animation: hero-enter 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero h1 {
  animation: hero-enter 340ms 20ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__summary,
.hero__actions {
  animation: hero-enter 360ms 40ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-showcase {
  animation: hero-enter 360ms 60ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

html[data-motion="ready"] .is-reveal-pending {
  opacity: 0;
  transform: translateY(12px);
}

html[data-motion="ready"] .is-revealed {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.site-header {
  view-transition-name: site-header;
}

@view-transition {
  navigation: auto;
}

@keyframes page-out {
  to {
    opacity: 0;
    transform: translateY(-6px);
  }
}

@keyframes page-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

::view-transition-old(root) {
  animation: 180ms cubic-bezier(0.16, 1, 0.3, 1) both page-out;
}

::view-transition-new(root) {
  animation: 280ms cubic-bezier(0.16, 1, 0.3, 1) both page-in;
}

::view-transition-group(site-header) {
  animation-duration: 280ms;
}
```

Extend the existing reduced-motion block with these targeted final states after its global duration reset:

```css
@media (prefers-reduced-motion: reduce) {
  .hero__mode,
  .hero h1,
  .hero__summary,
  .hero__actions,
  .hero-showcase {
    animation: none !important;
  }

  .hero-record,
  html[data-motion="ready"] .is-reveal-pending,
  html[data-motion="ready"] .is-revealed {
    opacity: 1;
    transform: none;
    transition: none !important;
  }

  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-group(site-header) {
    animation: none;
  }
}
```

The controller's `reducedMotion` flag prevents auto-rotation; these CSS rules make manual changes and entry state immediate.

- [ ] **Step 7: Build and verify Task 4**

Run:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm validate:html
```

Expected: archive semantics, motion-source contract, reduced-motion rules, generated HTML, and all existing behavior pass.

- [ ] **Step 8: Review the Task 4 diff without committing**

Run:

```bash
git diff -- src/scripts/site-motion.ts src/pages/projects/index.astro src/layouts/BaseLayout.astro src/styles/global.css tests
git diff --check
```

Expected: motion remains progressive and bounded; the project archive still contains all 15 static records.

---

### Task 5: Synchronize documentation and run the shipping verification

**Files:**

- Modify: `DESIGN.md`
- Modify: `PRODUCT.md`
- Modify: `CLAUDE.md`
- Modify: `README.md`
- Verify: every implementation and test file from Tasks 1-4

**Interfaces:**

- Consumes: the implemented theme, carousel, archive, CV, and motion contracts.
- Produces: operator and agent documentation that describes the shipped Astro system without stale light-only, single-animation, or remote-CV claims.

- [ ] **Step 1: Update durable design authority**

In `DESIGN.md`:

- replace the light-only statement with the approved neutral light/dark palette table;
- document system-default plus persistent manual theme behavior;
- expand Motion to cover the 280-millisecond native page transition, 420-millisecond hero rotation, one-time section reveals, Pause behavior, and reduced-motion removal;
- update the homepage first viewport from Adam AI only to the five-project evidence showcase;
- keep amber limited to live status and retain the no-gradient/no-glass constraints.

- [ ] **Step 2: Update architecture and product documentation**

Apply these exact semantic updates:

- `PRODUCT.md`: replace "A remotely hosted résumé" with "A first-party static résumé PDF served with the portfolio".
- `CLAUDE.md`: replace "The only browser-authored interaction" with a list containing article search/filter, theme selection, featured-project rotation, and one-time section reveals; state that all content remains present in generated HTML.
- `README.md`: document the system-following theme toggle, five-project hero, bounded project register, first-party CV path, and Docker-only verification commands.

Do not change `AGENTS.md` unless execution reveals a direct contradiction; its current general browser-interaction and accessibility rules remain valid.

- [ ] **Step 3: Render and visually verify the copied PDF**

Use the PDF skill. Render the repository copy, not the source copy:

```bash
mkdir -p /tmp/ehnand-cv-final-review
pdftoppm -png -r 144 public/files/Ehnand-Azucena-CV.pdf /tmp/ehnand-cv-final-review/ehnand-cv
sha256sum public/files/Ehnand-Azucena-CV.pdf
```

Inspect both rendered pages. Expected: the hash remains `d34fd1683925bcc930844119e121d9c299cc1b3ced756e8c3b4a741c8f61e244`, Water Billing System is the project heading, and no text is clipped, overlapping, or missing.

- [ ] **Step 4: Run the complete Docker verification suite**

Run each command separately and read its full result:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm validate:html
docker compose run --rm --no-deps app pnpm test
docker compose run --rm --no-deps app pnpm test:integration
```

Expected: zero Astro diagnostics, zero lint errors, a clean 28-page production build, valid generated HTML, all unit/generated tests passing, and all Wrangler integration tests passing.

- [ ] **Step 5: Run targeted source and generated-output audits**

Run:

```bash
rg -n 'vercel-storage\.com|href="/projects"[^>]*>(Work|Back to all work)<' src content public tests
rg -n "from [\"'](next|react|react-dom|framer-motion)|next/|next-themes" --glob '*.{ts,tsx,js,mjs,astro}' --glob '!docs/**' --glob '!.impeccable/**'
rg --files -g 'next.config.*' -g 'next-env.d.ts' -g 'tailwind.config.*' -g 'postcss.config.*' -g '*.{tsx,jsx}'
git diff --check
```

Expected: the first three searches produce no active-source matches and `git diff --check` exits cleanly. Supported historical documentation and actual portfolio project technologies may still mention Next.js.

- [ ] **Step 6: Verify the running Docker site and CV responses**

Ensure the current Compose service uses the current configuration:

```bash
docker compose up -d --force-recreate --no-build app
curl --silent --show-error --retry 10 --retry-delay 1 --retry-connrefused --output /dev/null --write-out '%{http_code}\n' http://127.0.0.1:3001/
curl --silent --show-error --head http://127.0.0.1:3001/files/Ehnand-Azucena-CV.pdf
```

Expected: homepage returns `200`; the local Astro PDF returns `200` with `Content-Type: application/pdf`. The Cloudflare-specific `X-Robots-Tag` is verified by `pnpm test:integration`, because Astro dev does not apply `_headers`.

- [ ] **Step 7: Perform the bounded visual and interaction review**

Attempt the controlled in-app browser once at `http://localhost:3001`. If available, inspect desktop and mobile in both themes in one batched pass, then fix all discovered defects in one batch and use at most one confirmation pass. Verify:

- no warm/yellow page cast;
- no theme flash on reload or navigation;
- both theme controls remain synchronized;
- all five hero projects rotate in order;
- Pause, Previous, Next, selectors, hover pause, focus pause, and keyboard focus work;
- reduced motion disables auto-advance and nonessential transforms;
- the Projects label is consistent;
- the project archive is visibly bounded and keyboard focusable;
- View résumé opens the PDF and Download PDF downloads the stable filename;
- desktop and mobile layouts have no clipping or horizontal overflow.

If no controlled browser is connected, do not use standalone Playwright or another browser surface. Report the visual review as the only outstanding verification and give the owner the local URL.

- [ ] **Step 8: Produce the final diff and handoff without committing**

Run:

```bash
git status --short
git diff --stat
git diff -- docs/superpowers/specs/2026-08-16-portfolio-theme-motion-projects-cv-design.md docs/superpowers/plans/2026-08-16-portfolio-theme-motion-projects-cv.md
diff -ru <baseline>/src src
diff -ru <baseline>/tests tests
diff -ru <baseline>/content/articles content/articles
diff -u <baseline>/public/_headers public/_headers
diff -u <baseline>/DESIGN.md DESIGN.md
diff -u <baseline>/PRODUCT.md PRODUCT.md
diff -u <baseline>/CLAUDE.md CLAUDE.md
diff -u <baseline>/README.md README.md
```

The `diff` commands intentionally exit 1 when they display changes; inspect their content rather than treating that expected status as a failed verification. Report implemented behavior, exact verification results, the local URL, whether visual confirmation was available, and that no commit, push, deploy, Vercel deletion, or DNS change occurred.
