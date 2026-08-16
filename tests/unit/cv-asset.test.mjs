import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
import test from "node:test"

const expectedHash = "d34fd1683925bcc930844119e121d9c299cc1b3ced756e8c3b4a741c8f61e244"
const cvPath = "public/files/Ehnand-Azucena-CV.pdf"

test("first-party CV matches the owner-approved PDF", async () => {
  const pdf = await readFile(cvPath)
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-")
  assert.equal(createHash("sha256").update(pdf).digest("hex"), expectedHash)
  assert.doesNotMatch(pdf.toString("latin1"), /\/JavaScript\b|\/JS\b/)
  assert.doesNotMatch(pdf.toString("latin1"), /\/Encrypt\b/)
})
