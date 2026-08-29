export function formatIsoDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"))
}

export function compareIsoDesc(left: string, right: string): number {
  return right.localeCompare(left)
}

const SITE_UTC_OFFSET = "+08:00"

/**
 * Schema.org consumers that validate `dateModified` as a DateTime reject a
 * bare `YYYY-MM-DD`. Evidence dates are day-precision, so anchor them to the
 * start of that day in the site's own timezone rather than inventing a clock
 * time or stamping the build.
 */
export function toSchemaDateTime(date: string): string {
  return date.includes("T") ? date : `${date}T00:00:00${SITE_UTC_OFFSET}`
}

interface EvidenceDate {
  date: string
  updated?: string
}

export function latestEvidenceDate(
  entries: readonly EvidenceDate[],
): string | undefined {
  return entries
    .map((entry) => entry.updated ?? entry.date)
    .sort()
    .at(-1)
}
