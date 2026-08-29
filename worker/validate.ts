/**
 * Pure request validation for the contact endpoint.
 *
 * Nothing here touches a Worker global, so the whole module is exercised by
 * `node --test`. Every message is written for the visitor: it says what to do
 * next and never names a cause.
 */

export const LIMITS = {
  name: 100,
  email: 254,
  company: 100,
  messageMin: 10,
  messageMax: 4000,
} as const

export interface ContactSubmission {
  name: string
  email: string
  company: string
  message: string
}

interface ValidationSuccess {
  ok: true
  errors: Record<string, string>
  value: ContactSubmission
}

interface ValidationFailure {
  ok: false
  errors: Record<string, string>
  value?: undefined
}

export type ValidationResult = ValidationSuccess | ValidationFailure

/**
 * Deliberately narrower than RFC 5322. It accepts the addresses people actually
 * type and refuses anything that could smuggle a second recipient or a header
 * into the outbound message: whitespace, commas, semicolons, angle brackets,
 * quotes, and brackets are all excluded from both halves.
 */
const EMAIL_PATTERN =
  /^[^\s@,;:<>"'()[\]\\]+@[^\s@,;:<>"'()[\]\\.]+(?:\.[^\s@,;:<>"'()[\]\\.]+)+$/

function readField(input: Record<string, unknown>, key: string): string {
  const value = input[key]
  return typeof value === "string" ? value : ""
}

/** Collapses a value onto a single line so it can never break a mail header. */
function singleLine(value: string): string {
  return value.replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim()
}

/** Keeps paragraph structure but normalises line endings and strips controls. */
function multiLine(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/[\p{Cc}\p{Cf}]/gu, (character) => (character === "\n" ? "\n" : ""))
    .trim()
}

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0
}

export function validateSubmission(
  input: Record<string, unknown>,
): ValidationResult {
  const errors: Record<string, string> = {}

  const name = singleLine(readField(input, "name"))
  const company = singleLine(readField(input, "company"))
  const email = readField(input, "email").trim()
  const message = multiLine(readField(input, "message"))

  if (name.length > LIMITS.name) {
    errors.name = "That name is longer than this form accepts."
  }

  if (company.length > LIMITS.company) {
    errors.company = "That company name is longer than this form accepts."
  }

  if (email.length === 0) {
    errors.email = "Enter an email address I can reply to."
  } else if (email.length > LIMITS.email) {
    errors.email = "That email address is longer than this form accepts."
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That email address doesn't look quite right."
  }

  if (message.length === 0) {
    errors.message = "Tell me what you need, even in a sentence or two."
  } else if (message.length < LIMITS.messageMin) {
    errors.message = "Add a bit more detail so I can give you a useful answer."
  } else if (message.length > LIMITS.messageMax) {
    errors.message = "That's longer than this form accepts. Send the rest by email."
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return { ok: true, errors: {}, value: { name, email, company, message } }
}
