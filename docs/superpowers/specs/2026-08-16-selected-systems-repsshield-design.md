# Selected Systems REPSShield Design

## Goal

Replace MemberPulse with REPSShield as the third record in the homepage “Selected systems” section. This changes the homepage curation only; both projects remain available through the complete project archive and featured-project rotation.

## Approved selection and order

1. Adam AI
2. Water Billing System
3. REPSShield

The component continues resolving every record through the shared project metadata in `src/data/projects.ts`. Titles, descriptions, screenshots, technology labels, role, period, status, and project URLs must not be copied or rewritten inside the homepage component.

## Supporting copy

Replace the now-stale phrase “association operations” with “AI-assisted compliance.” The complete section summary becomes:

> A focused record of production SaaS, public-service infrastructure, and AI-assisted compliance. Browse the complete project inventory.

## Boundaries

- Preserve the existing Selected Systems layout, styling, semantics, and responsive behavior.
- Do not remove MemberPulse from the project archive, featured-project rotation, services evidence, sitemap, or shared project data.
- Do not change REPSShield metadata or introduce new claims.
- Keep the complete project inventory count and link unchanged.

## Verification

- Update the generated-homepage regression test to assert exactly three selected records in the approved order.
- Confirm the Selected Systems section contains the REPSShield project route and no MemberPulse selected record.
- Run the Docker test, production build, Astro check, lint, and generated HTML validation commands.
- Use Playwright MCP for a bounded homepage inspection confirming the third visible selected record is REPSShield and no horizontal overflow is introduced.
