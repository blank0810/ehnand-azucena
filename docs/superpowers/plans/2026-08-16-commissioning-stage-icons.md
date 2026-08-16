# Commissioning Stage Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage commissioning rail’s four generic square markers with meaningful, accessible stage icons while preserving the existing sequence, copy, trace motion, and responsive behavior.

**Architecture:** Keep the stage definitions and inline SVG markup in `CommissioningRail.astro`, using a discriminating `icon` value on each stage and conditional SVG paths inside the existing ordered-list loop. Restyle the existing marker wrapper as a transparent visual clearing on the trace, then verify rendered semantics and layout through generated HTML tests and Playwright MCP.

**Tech Stack:** Astro, TypeScript, inline SVG, CSS, Node test runner, Docker Compose, Playwright MCP

## Global Constraints

- Keep `Problem → Architecture → Delivery → Production`, `01`–`04`, all descriptions, and all responsibility labels unchanged.
- Use inline SVG only; add no package, external icon request, or raster asset.
- Use Cobalt for Problem, Architecture, and Delivery; use Amber only for Production.
- Treat icons as decorative with `aria-hidden="true"`; adjacent headings retain the accessible meaning.
- Preserve the ordered-list structure, existing trace animation, reduced-motion policy, light/dark tokens, and mobile vertical sequence.
- Keep the page statically rendered and functional without client JavaScript.
- Run every Node, Astro, pnpm, test, lint, and build command through Docker Compose.
- Do not commit or push unless the owner explicitly asks.

---

### Task 1: Render and style the four stage icons

**Files:**
- Modify: `tests/generated/homepage.test.mjs`
- Modify: `src/components/home/CommissioningRail.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: the existing `stages` array and `.commissioning__marker` trace position.
- Produces: `data-stage-icon="problem|architecture|delivery|production"` on four decorative inline SVGs rendered inside `.commissioning__marker`.

- [ ] **Step 1: Add the failing generated-HTML regression test**

Append this test to `tests/generated/homepage.test.mjs`:

```js
test("commissioning stages render four decorative semantic icons", async () => {
  const html = await readGenerated("/")
  const icons = ["problem", "architecture", "delivery", "production"]

  assert.equal((html.match(/class="commissioning__icon"/g) ?? []).length, 4)
  assert.equal((html.match(/data-stage-icon=/g) ?? []).length, 4)

  for (const icon of icons) {
    assert.match(
      html,
      new RegExp(
        `<svg[^>]*class="commissioning__icon"[^>]*data-stage-icon="${icon}"[^>]*aria-hidden="true"`,
      ),
    )
  }

  assert.doesNotMatch(
    html,
    /<span class="commissioning__marker" aria-hidden="true"><\/span>/,
  )
})
```

- [ ] **Step 2: Run the suite and confirm the regression test fails**

Run:

```bash
docker compose run --rm --no-deps app pnpm test
```

Expected: the new commissioning-icon test fails because the generated homepage contains no `.commissioning__icon` elements.

- [ ] **Step 3: Add icon identifiers and inline SVG artwork**

Add `icon` to the four records in `CommissioningRail.astro`:

```astro
const stages = [
  {
    icon: "problem",
    stage: "Problem",
    line: "Clarify constraints",
    responsibility: "HUMAN-LED DISCOVERY",
  },
  {
    icon: "architecture",
    stage: "Architecture",
    line: "Design the system",
    responsibility: "HUMAN-OWNED DECISIONS",
  },
  {
    icon: "delivery",
    stage: "Delivery",
    line: "Build and verify",
    responsibility: "CLAUDE CODE + CODEX",
  },
  {
    icon: "production",
    stage: "Production",
    line: "Operate and improve",
    responsibility: "AGENT-ASSISTED CI/CD + IAC",
  },
]
```

Replace the empty marker with this inline SVG structure inside the existing `stages.map` loop:

```astro
<span class="commissioning__marker" aria-hidden="true">
  <svg
    class="commissioning__icon"
    data-stage-icon={item.icon}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    {
      item.icon === "problem" && (
        <>
          <circle cx="10" cy="10" r="5.5"></circle>
          <path d="m14 14 6 6"></path>
        </>
      )
    }
    {
      item.icon === "architecture" && (
        <>
          <circle cx="6" cy="6" r="2.5"></circle>
          <circle cx="18" cy="6" r="2.5"></circle>
          <circle cx="12" cy="18" r="2.5"></circle>
          <path d="M8.5 6h7M7.4 8.1l3.2 7.8M16.6 8.1l-3.2 7.8"></path>
        </>
      )
    }
    {
      item.icon === "delivery" && (
        <>
          <path d="m8 6-5 6 5 6M16 6l5 6-2.5 3"></path>
          <path d="m11 17 2.5 2.5 6-7"></path>
        </>
      )
    }
    {
      item.icon === "production" && (
        <>
          <path d="M14.5 4.5c2.6-1.7 5.5-2 5.5-2s-.3 2.9-2 5.5l-6.5 6.5-4-4 7-6Z"></path>
          <path d="m9 9-4.5.5-2 2 5 1M15 15l-.5 4.5-2 2-1-5"></path>
          <circle cx="15.5" cy="7" r="1.5"></circle>
          <path d="M6 17c-1.5.4-2.6 1.5-3 3 1.5-.4 2.6-1.5 3-3Z"></path>
        </>
      )
    }
  </svg>
</span>
```

- [ ] **Step 4: Replace the square marker styling with icon alignment styling**

Update the marker rules in `src/styles/global.css`:

```css
.commissioning__marker {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  margin: 1rem 0;
  background: var(--surface);
  color: var(--cobalt);
}

.commissioning__icon {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: square;
  stroke-linejoin: miter;
  stroke-width: 1.75;
}

.commissioning__trace li:last-child .commissioning__marker {
  color: var(--amber);
}
```

At the existing mobile breakpoint, align the vertical trace with the wider icon marker:

```css
.commissioning__trace::before {
  left: 1rem;
}

.commissioning__trace li {
  grid-template-columns: 2.75rem 1fr;
}
```

- [ ] **Step 5: Build fresh generated HTML and run the regression suite**

Run:

```bash
docker compose run --rm --no-deps -e NODE_ENV=production app pnpm build
docker compose run --rm --no-deps app pnpm test
```

Expected: the production build succeeds and every test passes, including the four-icon regression test.

---

### Task 2: Verify accessibility, responsiveness, and production output

**Files:**
- Verify: `src/components/home/CommissioningRail.astro`
- Verify: `src/styles/global.css`
- Verify: generated `dist/index.html`

**Interfaces:**
- Consumes: the four rendered `data-stage-icon` values from Task 1.
- Produces: verified desktop/mobile icon alignment with no horizontal document overflow and no new console errors.

- [ ] **Step 1: Run static verification in Docker**

Run these commands independently:

```bash
docker compose run --rm --no-deps app pnpm check
docker compose run --rm --no-deps app pnpm lint
docker compose run --rm --no-deps app pnpm validate:html
git diff --check
```

Expected: Astro reports zero diagnostics; ESLint, HTML validation, and diff checking exit successfully.

- [ ] **Step 2: Inspect desktop layout with Playwright MCP**

At `http://127.0.0.1:3001/`, set the viewport to `1280 × 900` and inspect `#production-trace`. Confirm:

- four `.commissioning__icon` elements are present in Problem, Architecture, Delivery, Production order;
- the first three icons compute to Cobalt and Production computes to Amber;
- every icon center aligns with the horizontal trace;
- `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

- [ ] **Step 3: Inspect mobile layout with Playwright MCP**

Resize to `390 × 844` and confirm:

- the icons align with the vertical trace;
- the text stays in the second grid column without overlap;
- the same four icon identifiers remain present;
- `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

- [ ] **Step 4: Check the browser console and final working-tree scope**

Use Playwright MCP to confirm zero console errors after loading the homepage. Then run:

```bash
git status --short
git diff --check
```

Expected: no formatting errors; only the approved icon refinement, its regression test, and its design/plan documents are attributable to this task. Preserve all unrelated owner changes and do not commit or push.
