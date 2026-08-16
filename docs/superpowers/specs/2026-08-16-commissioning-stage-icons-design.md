# Commissioning Stage Icons Design

## Goal

Replace the four generic square markers in the homepage “From problem to production” commissioning rail with meaningful stage icons. The refinement should make the sequence easier to scan without changing its content, order, or responsibility model.

## Approved visual treatment

Each stage uses a small dependency-free inline SVG drawn with the existing technical, squared-off line language:

1. **Problem:** magnifying glass, representing discovery and constraint clarification.
2. **Architecture:** connected system nodes, representing system design and human-owned decisions.
3. **Delivery:** code brackets with a check, representing implementation and verification with Claude Code and Codex.
4. **Production:** deployment rocket, representing operation, CI/CD, and infrastructure as code.

The icons sit directly over the commissioning trace without an enclosing square. A surface-colored clearance around each icon keeps the connecting line from running through the artwork. The first three icons use Cobalt; Production retains the existing Amber live-status accent. The existing `01`–`04` indices, headings, descriptions, and responsibility labels remain unchanged.

## Responsive behavior

On desktop, each icon stays aligned with its stage position on the horizontal trace. At the existing mobile breakpoint, the same icons align with the vertical trace and retain the current two-column stage layout. Icon size and line weight remain consistent across breakpoints, with no new horizontal overflow.

## Accessibility and resilience

The adjacent stage heading already conveys each icon’s meaning, so the SVGs are decorative and use `aria-hidden="true"`. No information depends on color or imagery alone. The ordered-list structure remains intact, and the section remains understandable if CSS animation or client JavaScript is unavailable. Reduced-motion behavior is unchanged.

## Implementation boundaries

- Keep the stage data and icon markup inside `CommissioningRail.astro`.
- Use inline SVG rather than adding an icon-library dependency or external asset requests.
- Extend the existing `.commissioning__marker` styling instead of introducing a separate visual system.
- Do not change public copy, section order, trace animation, theme tokens, or other homepage sections.

## Verification

- Add a source regression test covering the four icon identifiers, decorative semantics, and absence of the old empty markers.
- Run the Docker test, Astro check, lint, production build, and generated HTML validation commands.
- Use Playwright MCP for one bounded desktop/mobile visual pass, confirming icon alignment, one icon per stage, no page-wide horizontal overflow, and no browser console errors.
