import { SITE_NAME } from "@/config/site"

const MAX_DOCUMENT_TITLE_LENGTH = 70
const SITE_SUFFIX = ` | ${SITE_NAME}`

export function constrainDocumentTitle(title: string): string {
  if (title.length <= MAX_DOCUMENT_TITLE_LENGTH) return title

  const subject = title.endsWith(SITE_SUFFIX)
    ? title.slice(0, -SITE_SUFFIX.length)
    : title

  if (subject.length <= MAX_DOCUMENT_TITLE_LENGTH) return subject

  const candidate = subject.slice(0, MAX_DOCUMENT_TITLE_LENGTH + 1)
  const wordBoundary = candidate.lastIndexOf(" ")
  return candidate.slice(0, wordBoundary > 0 ? wordBoundary : MAX_DOCUMENT_TITLE_LENGTH)
}
