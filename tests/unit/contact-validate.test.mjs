import assert from "node:assert/strict"
import test from "node:test"

import {
  isHoneypotTripped,
  LIMITS,
  validateSubmission,
} from "../../worker/validate.ts"

function form(overrides = {}) {
  return {
    email: "client@example.com",
    message: "We need a billing system that survives an audit.",
    ...overrides,
  }
}

test("a minimal submission needs only email and message", () => {
  const result = validateSubmission(form())

  assert.equal(result.ok, true)
  assert.deepEqual(result.errors, {})
  assert.deepEqual(result.value, {
    name: "",
    email: "client@example.com",
    company: "",
    message: "We need a billing system that survives an audit.",
  })
})

test("name and company are optional and trimmed", () => {
  const result = validateSubmission(
    form({ name: "  Maria Santos  ", company: "  Northbound  " }),
  )

  assert.equal(result.ok, true)
  assert.equal(result.value.name, "Maria Santos")
  assert.equal(result.value.company, "Northbound")
})

test("missing fields are reported without naming a cause", () => {
  const result = validateSubmission({})

  assert.equal(result.ok, false)
  assert.equal(result.value, undefined)
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message"])
  for (const message of Object.values(result.errors)) {
    assert.doesNotMatch(message, /\b(error|invalid|failed|400|null|undefined)\b/i)
  }
})

test("whitespace-only input counts as missing", () => {
  const result = validateSubmission(form({ email: "   ", message: " \n\t " }))

  assert.equal(result.ok, false)
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message"])
})

test("addresses that cannot receive a reply are rejected", () => {
  const rejected = [
    "no-at-sign",
    "missing@tld",
    "two@@example.com",
    "spaced address@example.com",
    "trailing@example.",
    "@example.com",
    "user@.com",
  ]

  for (const email of rejected) {
    const result = validateSubmission(form({ email }))
    assert.equal(result.ok, false, email + " should be rejected")
    assert.ok(result.errors.email, email + " should report on the email field")
  }
})

test("ordinary addresses are accepted", () => {
  const accepted = [
    "client@example.com",
    "first.last@example.co.uk",
    "plus+tag@example.io",
    "under_score@sub.domain.example.org",
    "digits123@example.dev",
  ]

  for (const email of accepted) {
    const result = validateSubmission(form({ email }))
    assert.equal(result.ok, true, email + " should be accepted")
  }
})

test("header injection through the address is refused", () => {
  for (const email of [
    "client@example.com\nBcc: victim@example.com",
    "client@example.com\r\nSubject: spam",
    "client@example.com, victim@example.com",
    "Ehnand <client@example.com>",
  ]) {
    const result = validateSubmission(form({ email }))
    assert.equal(result.ok, false, JSON.stringify(email) + " should be rejected")
  }
})

test("carriage returns are stripped from single-line fields", () => {
  const result = validateSubmission(
    form({ name: "Maria\r\nBcc: victim@example.com", company: "North\nbound" }),
  )

  assert.equal(result.ok, true)
  assert.doesNotMatch(result.value.name, /[\r\n]/)
  assert.doesNotMatch(result.value.company, /[\r\n]/)
})

test("the message keeps its line breaks but normalises them", () => {
  const result = validateSubmission(
    form({ message: "First line.\r\nSecond line.\r\nThird line here." }),
  )

  assert.equal(result.ok, true)
  assert.equal(
    result.value.message,
    "First line.\nSecond line.\nThird line here.",
  )
})

test("a message shorter than the minimum is refused", () => {
  const result = validateSubmission(form({ message: "hi" }))

  assert.equal(result.ok, false)
  assert.ok(result.errors.message)
})

test("each field enforces its length cap", () => {
  const overLength = {
    name: "n".repeat(LIMITS.name + 1),
    email: "e".repeat(LIMITS.email) + "@example.com",
    company: "c".repeat(LIMITS.company + 1),
    message: "m".repeat(LIMITS.messageMax + 1),
  }

  for (const [field, value] of Object.entries(overLength)) {
    const result = validateSubmission(form({ [field]: value }))
    assert.equal(result.ok, false, field + " should enforce its cap")
    assert.ok(result.errors[field], field + " should report on its own field")
  }
})

test("values exactly at the cap are accepted", () => {
  const result = validateSubmission(
    form({
      name: "n".repeat(LIMITS.name),
      company: "c".repeat(LIMITS.company),
      message: "m".repeat(LIMITS.messageMax),
    }),
  )

  assert.equal(result.ok, true)
})

test("every error message stays free of technical vocabulary", () => {
  const result = validateSubmission({ email: "broken", message: "hi" })

  for (const message of Object.values(result.errors)) {
    assert.doesNotMatch(
      message,
      /\b(turnstile|worker|binding|regex|payload|status|http|exception|token)\b/i,
    )
    assert.match(message, /[.!?]$/)
  }
})

test("the honeypot trips on any non-empty value", () => {
  assert.equal(isHoneypotTripped("http://spam.example"), true)
  assert.equal(isHoneypotTripped(" x "), true)
  assert.equal(isHoneypotTripped(""), false)
  assert.equal(isHoneypotTripped("   "), false)
  assert.equal(isHoneypotTripped(null), false)
  assert.equal(isHoneypotTripped(undefined), false)
})
