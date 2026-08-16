export interface NarrativePart {
  text: string
  strong: boolean
}

export interface NarrativeRecord {
  kind: "paragraph" | "heading" | "bullet"
  parts: NarrativePart[]
}

function tokenizeInlineEmphasis(source: string): NarrativePart[] {
  const parts: NarrativePart[] = []
  let cursor = 0

  while (cursor < source.length) {
    const opening = source.indexOf("**", cursor)

    if (opening === -1) {
      parts.push({ text: source.slice(cursor), strong: false })
      break
    }

    const closing = source.indexOf("**", opening + 2)

    if (closing === -1) {
      parts.push({ text: source.slice(cursor), strong: false })
      break
    }

    if (opening > cursor) {
      parts.push({ text: source.slice(cursor, opening), strong: false })
    }

    parts.push({ text: source.slice(opening + 2, closing), strong: true })
    cursor = closing + 2
  }

  return parts.filter((part) => part.text.length > 0)
}

export function parseProjectNarrative(source: string): NarrativeRecord[] {
  const records: NarrativeRecord[] = []
  const blocks = source.trim().split(/\r?\n\s*\r?\n/)

  for (const block of blocks) {
    const text = block.trim()
    if (!text) continue

    const heading = text.match(/^\*\*(.+):\*\*$/)
    if (heading) {
      records.push({
        kind: "heading",
        parts: [{ text: heading[1], strong: false }],
      })
      continue
    }

    const lines = text.split(/\r?\n/).map((line) => line.trim())
    if (lines.every((line) => line.startsWith("•"))) {
      for (const line of lines) {
        records.push({
          kind: "bullet",
          parts: tokenizeInlineEmphasis(line.replace(/^•\s*/, "")),
        })
      }
      continue
    }

    records.push({
      kind: "paragraph",
      parts: tokenizeInlineEmphasis(lines.join(" ")),
    })
  }

  return records
}
