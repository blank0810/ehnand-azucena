/**
 * The only module that touches the mail transport.
 *
 * Everything above it deals in validated data and generic outcomes, so swapping
 * Cloudflare Email Service for another provider is a change confined to
 * `sendNotification`.
 */

import type { ContactSubmission } from "./validate"
import type { Env } from "./types"

const SUBJECT_MAX = 120
const LABEL_WIDTH = 9

export interface Notification {
  subject: string
  text: string
  replyTo: string
}

export function formatNotification(
  submission: ContactSubmission,
  receivedAt: Date,
): Notification {
  const sender = submission.name.length > 0 ? submission.name : submission.email
  const subject = ("New enquiry from " + sender)
    .replace(/\s+/g, " ")
    .slice(0, SUBJECT_MAX)
    .trim()

  const from = submission.name.length > 0
    ? submission.name + " <" + submission.email + ">"
    : submission.email

  const header = [["From:", from], ["Sent:", receivedAt.toISOString()]]
  if (submission.company.length > 0) header.splice(1, 0, ["Company:", submission.company])

  const text = [
    ...header.map(([label, value]) => label.padEnd(LABEL_WIDTH) + value),
    "",
    submission.message,
    "",
    "--",
    "Sent from the contact form on ehnand.com.",
    "Reply to this message to answer them directly.",
  ].join("\n")

  return { subject, text, replyTo: submission.email }
}

export async function sendNotification(
  env: Env,
  submission: ContactSubmission,
  receivedAt: Date,
): Promise<void> {
  const { subject, text, replyTo } = formatNotification(submission, receivedAt)

  if (env.CONTACT_DRY_RUN === "true") {
    console.log("contact: dry run, not sending", { subject, replyTo })
    return
  }

  await env.EMAIL.send({
    to: env.CONTACT_TO,
    from: env.CONTACT_FROM,
    subject,
    text,
    replyTo,
  })
}
