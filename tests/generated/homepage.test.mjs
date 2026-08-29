import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { extractJsonLd, readGenerated } from "../helpers/generated-site.mjs"

// Read the source rather than importing it: featured-projects.ts resolves the
// "@/" alias, which the test runner does not.
const featuredSource = await readFile("src/data/featured-projects.ts", "utf8")
const FEATURED_PROJECT_SLUGS = [
  ...featuredSource
    .slice(
      featuredSource.indexOf("FEATURED_PROJECT_SLUGS = ["),
      featuredSource.indexOf("] as const"),
    )
    .matchAll(/"([a-z0-9-]+)"/g),
].map((match) => match[1])

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

test("homepage hero exposes the approved featured projects in order", async () => {
  const html = await readGenerated("/")
  const slugs = FEATURED_PROJECT_SLUGS

  assert.equal(
    (html.match(/data-featured-project=/g) ?? []).length,
    slugs.length,
  )
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

test("the contact section ships a form that posts to the Worker", async () => {
  const html = await readGenerated("/")

  assert.match(html, /<form[^>]*class="contact-form"[^>]*>/)
  assert.match(html, /action="\/api\/contact"/)
  assert.match(html, /method="post"/)
})

test("only email and message are required", async () => {
  const html = await readGenerated("/")
  const form = html.slice(html.indexOf("<form"), html.indexOf("</form>"))

  for (const field of ["email", "message"]) {
    const control = form.match(
      new RegExp("<(?:input|textarea)[^>]*name=\"" + field + "\"[^>]*>"),
    )
    assert.ok(control, field + " should be present")
    assert.match(control[0], /\brequired\b/, field + " should be required")
  }

  for (const field of ["name", "company"]) {
    const control = form.match(
      new RegExp("<input[^>]*name=\"" + field + "\"[^>]*>"),
    )
    assert.ok(control, field + " should be present")
    assert.doesNotMatch(
      control[0],
      /\brequired\b/,
      field + " should stay optional",
    )
  }
})

test("every contact field carries a label and an error region", async () => {
  const html = await readGenerated("/")

  for (const field of ["name", "company", "email", "message"]) {
    assert.match(
      html,
      new RegExp('<label for="contact-' + field + '"'),
      field + " should have a real label",
    )
    assert.match(
      html,
      new RegExp('data-field-error="' + field + '"'),
      field + " should have an error region",
    )
    assert.match(
      html,
      new RegExp('aria-describedby="contact-' + field + '-error"'),
      field + " should be described by its error region",
    )
  }

  assert.match(html, /role="status"[^>]*aria-live="polite"|aria-live="polite"[^>]*role="status"/)
})

test("the honeypot is hidden by style, not by attribute", async () => {
  const html = await readGenerated("/")
  const trap = html.match(/<div class="contact-form__trap"[\s\S]*?<\/div>/)

  assert.ok(trap, "the honeypot wrapper should be present")
  assert.match(trap[0], /aria-hidden="true"/)
  assert.match(trap[0], /name="website"/)
  assert.match(trap[0], /tabindex="-1"/)
  assert.doesNotMatch(
    trap[0],
    /\shidden(?=[\s>=])/,
    "an attribute-hidden trap is trivial to skip",
  )
})

test("the no-script path still reaches a real address", async () => {
  const html = await readGenerated("/")
  const noscript = html.match(/<noscript>[\s\S]*?<\/noscript>/)

  assert.ok(noscript, "the contact section should carry a no-script fallback")
  assert.match(noscript[0], /mailto:contact@ehnand\.com/)
})

test("the challenge widget is wired to a site key", async () => {
  const html = await readGenerated("/")

  assert.match(html, /class="cf-turnstile contact-form__challenge"/)
  assert.match(html, /data-sitekey="[^"]+"/)
  assert.match(html, /data-theme="dark"/)
  assert.match(
    html,
    /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/,
    "the widget script should be loaded",
  )
})

test("required and optional fields are both marked for sighted users", async () => {
  const html = await readGenerated("/")

  for (const field of ["name", "company"]) {
    const label = html.match(
      new RegExp('<label for="contact-' + field + '">[\\s\\S]*?</label>'),
    )
    assert.ok(label, field + " should have a label")
    assert.match(label[0], /contact-form__optional/, field + " should read optional")
  }

  for (const field of ["email", "message"]) {
    const label = html.match(
      new RegExp('<label for="contact-' + field + '">[\\s\\S]*?</label>'),
    )
    assert.ok(label, field + " should have a label")
    assert.match(label[0], /contact-form__required/, field + " should read required")
    assert.match(
      label[0],
      /aria-hidden="true"/,
      "the marker duplicates the required attribute, so it stays visual-only",
    )
  }
})
