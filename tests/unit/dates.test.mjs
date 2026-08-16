import assert from "node:assert/strict"
import test from "node:test"

import { latestEvidenceDate } from "../../src/lib/dates.ts"

test("an older article update controls the collection evidence date", () => {
  const articles = [
    { date: "2026-08-16" },
    { date: "2026-07-11", updated: "2026-08-20" },
  ]

  assert.equal(latestEvidenceDate(articles), "2026-08-20")
})
