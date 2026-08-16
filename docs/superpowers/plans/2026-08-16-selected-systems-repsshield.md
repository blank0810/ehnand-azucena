# Selected Systems REPSShield Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make REPSShield the third homepage Selected System and update the supporting summary so it accurately describes the curated evidence.

**Architecture:** Change only the ordered slug list and section summary in `SelectedSystems.astro`; the component continues resolving every visible project field from `src/data/projects.ts`. Protect the exact three-record order through the generated homepage test without affecting MemberPulse in any other site surface.

**Tech Stack:** Astro, TypeScript, generated static HTML, Node test runner, Docker Compose, Playwright MCP

## Global Constraints

- The Selected Systems order must be Adam AI, Water Billing System, then REPSShield.
- The section summary must say “AI-assisted compliance” instead of “association operations.”
- Continue sourcing every project field from `src/data/projects.ts`; do not duplicate or rewrite REPSShield metadata.
- Preserve the existing layout, styles, semantics, responsive behavior, complete project count, and archive link.
- Keep MemberPulse in the project archive, featured-project rotation, services evidence, sitemap, and shared project data.
- Run every Node, Astro, pnpm, test, lint, and build command through Docker Compose.
- Do not commit or push unless the owner explicitly asks.

---

### Task 1: Replace the third Selected System

**Files:**
- Modify: `tests/generated/homepage.test.mjs`
- Modify: `src/components/home/SelectedSystems.astro`

**Interfaces:**
- Consumes: `getProjectBySlug(slug)` from `src/data/projects.ts`.
- Produces: three `data-selected-system` records in the exact order `adam-ai`, `initao-water-billing-system`, `repsshield`.

- [ ] **Step 1: Strengthen the generated homepage test with the approved order and copy**

Replace the body of `homepage curates exactly the three approved systems` in `tests/generated/homepage.test.mjs` with:

```js
const html = await readGenerated("/")
const selectedSlugs = [...html.matchAll(/data-selected-system="([^"]+)"/g)].map(
  (match) => match[1],
)

assert.deepEqual(selectedSlugs, [
  "adam-ai",
  "initao-water-billing-system",
  "repsshield",
])
assert.match(html, />Water Billing System</)
assert.doesNotMatch(html, />Initao Water Billing System</)
assert.match(html, /AI-assisted compliance/)
```

The exact selected-slug array proves that MemberPulse is absent from this section even though it remains elsewhere on the homepage.

- [ ] **Step 2: Run the suite and verify the new contract fails**

Run:

```bash
docker compose run --rm --no-deps app pnpm test
```

Expected: the Selected Systems test fails because the third generated slug is `memberpulse`, not `repsshield`, and the old summary lacks “AI-assisted compliance.”

- [ ] **Step 3: Change the third slug and supporting summary**

Update `selectedSlugs` in `src/components/home/SelectedSystems.astro`:

```astro
const selectedSlugs = [
  "adam-ai",
  "initao-water-billing-system",
  "repsshield",
] as const
```

Update only the stale clause in the section summary:

```astro
<p>
  A focused record of production SaaS, public-service infrastructure, and AI-assisted
  compliance. Browse the complete project inventory.
</p>
```

- [ ] **Step 4: Build fresh generated HTML and run the full regression suite**

Run:

```bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
```

Expected: the production build succeeds and every test passes with REPSShield as the third selected record.

---

### Task 2: Verify the curated homepage evidence

**Files:**
- Verify: `src/components/home/SelectedSystems.astro`
- Verify: generated `dist/index.html`

**Interfaces:**
- Consumes: the generated Selected Systems records from Task 1.
- Produces: verified static output and a responsive third REPSShield record without document overflow.

- [ ] **Step 1: Run static verification**

Run these commands independently:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps app pnpm validate:html
git diff --check
```

Expected: Astro reports zero diagnostics; ESLint, HTML validation, and diff checking exit successfully.

- [ ] **Step 2: Run the one required Impeccable detector pass**

Run:

```bash
docker compose run --rm --no-deps -v /home/blank/.codex/skills/impeccable:/impeccable:ro app node /impeccable/scripts/detect.mjs --json src/components/home/SelectedSystems.astro
```

Expected: the detector returns no findings attributable to the selection change.

- [ ] **Step 3: Inspect the section with Playwright MCP**

At `http://127.0.0.1:3001/`, inspect desktop `1280 × 900` and mobile `390 × 844` in one bounded pass. Confirm:

- the three visible records are Adam AI, Water Billing System, and REPSShield in that order;
- the summary contains “AI-assisted compliance”;
- the REPSShield card uses the existing shared screenshot, role, period, status, and project link;
- `document.documentElement.scrollWidth === document.documentElement.clientWidth` at both sizes;
- the browser console reports zero errors.

- [ ] **Step 4: Review final scope without integrating it**

Run:

```bash
git status --short
git diff --check
```

Expected: the task changes only the Selected Systems component, its generated regression test, and the approved design/plan documents. Preserve every unrelated owner change and do not commit or push.
