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
