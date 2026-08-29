import assert from "node:assert/strict"
import test from "node:test"

import { formatNotification } from "../../worker/notify.ts"

const receivedAt = new Date("2026-08-29T02:15:00.000Z")

function submission(overrides = {}) {
  return {
    name: "Maria Santos",
    email: "maria@northbound.example",
    company: "Northbound Logistics",
    message: "We need a billing system that survives an audit.",
    ...overrides,
  }
}

test("the subject names the sender", () => {
  const { subject } = formatNotification(submission(), receivedAt)
  assert.equal(subject, "New enquiry from Maria Santos")
})

test("the subject falls back to the address when no name is given", () => {
  const { subject } = formatNotification(submission({ name: "" }), receivedAt)
  assert.equal(subject, "New enquiry from maria@northbound.example")
})

test("the subject is capped and stays on one line", () => {
  const { subject } = formatNotification(
    submission({ name: "N".repeat(300) }),
    receivedAt,
  )

  assert.ok(subject.length <= 120, "subject should be capped")
  assert.doesNotMatch(subject, /[\r\n]/)
})

test("replyTo carries the visitor address", () => {
  const { replyTo } = formatNotification(submission(), receivedAt)
  assert.equal(replyTo, "maria@northbound.example")
})

test("the body carries every supplied field and the message verbatim", () => {
  const { text } = formatNotification(submission(), receivedAt)

  assert.match(text, /Maria Santos/)
  assert.match(text, /maria@northbound\.example/)
  assert.match(text, /Northbound Logistics/)
  assert.match(text, /We need a billing system that survives an audit\./)
  assert.match(text, /2026-08-29T02:15:00\.000Z/)
})

test("absent optional fields leave no empty labels behind", () => {
  const { text } = formatNotification(
    submission({ name: "", company: "" }),
    receivedAt,
  )

  assert.doesNotMatch(text, /^Name:/m)
  assert.doesNotMatch(text, /^Company:/m)
  assert.match(text, /^From: {4}maria@northbound\.example$/m)
})

test("the body is plain text with no markup", () => {
  const { text } = formatNotification(
    submission({ message: "<script>alert(1)</script> and <b>bold</b>" }),
    receivedAt,
  )

  assert.match(text, /<script>alert\(1\)<\/script>/)
  assert.equal(typeof text, "string")
})
