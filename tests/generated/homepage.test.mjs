import assert from "node:assert/strict"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

test("homepage presents the approved offer and responsibility trace", async () => {
  const html = await readGenerated("/")
  assert.match(html, /ENGINEER-DIRECTED · AI-AUGMENTED/)
  assert.match(html, /<h1[^>]*>Full-stack systems delivery\.<\/h1>/)
  assert.match(html, /HUMAN-LED DISCOVERY/)
  assert.match(html, /HUMAN-OWNED DECISIONS/)
  assert.match(html, /CLAUDE CODE \+ CODEX/)
  assert.match(html, /AGENT-ASSISTED CI\/CD \+ IAC/)
  assert.match(html, /engineering judgment and accountability remain human/i)
})

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

test("homepage curates exactly the three approved systems", async () => {
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
})

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

test("homepage exposes first-party view and download résumé actions", async () => {
  const html = await readGenerated("/")
  assert.match(
    html,
    /href="\/files\/Ehnand-Azucena-CV\.pdf"[^>]*>View résumé<\/a>/,
  )
  assert.match(
    html,
    /href="\/files\/Ehnand-Azucena-CV\.pdf"[^>]*download="Ehnand-Azucena-CV\.pdf"[^>]*>Download PDF<\/a>/,
  )
  assert.doesNotMatch(html, /vercel-storage\.com/)
})

test("homepage exposes all four article categories and direct contact", async () => {
  const html = await readGenerated("/")
  assert.equal((html.match(/data-home-article=/g) ?? []).length, 4)
  assert.match(html, /Business Systems &amp; Data Integrity/)
  assert.match(html, /SaaS, Cloud &amp; Security/)
  assert.match(html, /AI &amp; Automation/)
  assert.match(html, /Engineering Practice &amp; Reliability/)
  assert.match(html, /mailto:contact@ehnand\.com/)
  assert.match(html, /How does Ehnand use Claude Code and Codex in delivery\?/)
})

test("FAQ schema is sourced from the visible homepage questions", async () => {
  const html = await readGenerated("/")
  const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? [item])
  const faq = graph.find((item) => item["@type"] === "FAQPage")
  assert.ok(faq)
  assert.equal(faq.mainEntity.length, 6)

  for (const item of faq.mainEntity) {
    assert.ok(html.includes(item.name))
    assert.ok(html.includes(item.acceptedAnswer.text))
  }
})
