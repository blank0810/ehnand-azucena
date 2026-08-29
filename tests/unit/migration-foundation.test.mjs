import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const readText = (path) => (existsSync(path) ? readFileSync(path, "utf8") : "")

const packageJson = JSON.parse(readText("package.json"))
const dockerfile = readText("Dockerfile.dev")
const compose = readText("docker-compose.yml")
const astroConfig = readText("astro.config.mjs")
const wranglerConfig = readText("wrangler.jsonc")
const workerEntry = readText("worker/index.ts")
// wrangler.jsonc carries whole-line comments and trailing commas; strip both
// rather than pulling in a JSONC parser for one file.
const wranglerJson = JSON.parse(
  wranglerConfig.replace(/^\s*\/\/.*$/gm, "").replace(/,\s*([}\]])/g, "$1"),
)

test("package scripts target Astro and Docker-facing port 4321", () => {
  assert.equal(packageJson.scripts.dev, "astro dev --host 0.0.0.0")
  assert.equal(packageJson.scripts.build, "astro build")
  assert.equal(packageJson.scripts.preview, "astro preview --host 0.0.0.0")
  assert.equal(packageJson.scripts.check, "astro check")
  assert.equal(packageJson.scripts.lint, "eslint .")
  assert.ok(packageJson.dependencies.astro)
  assert.equal(packageJson.dependencies.next, undefined)
  assert.equal(packageJson.devDependencies.next, undefined)
  assert.equal(packageJson.dependencies.react, undefined)
  assert.equal(packageJson.devDependencies.react, undefined)
  assert.match(dockerfile, /FROM node:22-bookworm-slim/)
  assert.match(dockerfile, /EXPOSE 4321/)
  assert.match(compose, /3001:4321/)
})

test("Astro is static and canonical URLs omit trailing slashes", () => {
  assert.match(astroConfig, /output:\s*"static"/)
  assert.match(astroConfig, /trailingSlash:\s*"never"/)
  assert.doesNotMatch(astroConfig, /@astrojs\/cloudflare/)
})

test("Cloudflare Workers still serves the prerendered site from assets", () => {
  assert.equal(wranglerJson.assets?.directory, "./dist")
  assert.equal(wranglerJson.assets?.html_handling, "drop-trailing-slash")
  assert.equal(wranglerJson.assets?.not_found_handling, "404-page")
  assert.equal(wranglerJson.assets?.binding, "ASSETS")
  assert.doesNotMatch(wranglerConfig, /"(?:kv_namespaces|d1_databases|r2_buckets)"\s*:/)
})

test("the runtime entry exists only to serve the contact endpoint", () => {
  assert.equal(wranglerJson.main, "worker/index.ts")
  assert.match(workerEntry, /"\/api\/contact"/)
  assert.match(
    workerEntry,
    /return env\.ASSETS\.fetch\(request\)/,
    "every other route must fall through to the assets binding",
  )
})

test("the mail recipient is pinned at the binding", () => {
  const [binding, ...extra] = wranglerJson.send_email ?? []
  assert.equal(extra.length, 0, "one send binding is enough")
  assert.equal(binding?.name, "EMAIL")
  assert.equal(binding?.destination_address, "contact@ehnand.com")
})

test("the contact endpoint is rate limited", () => {
  const [limiter] = wranglerJson.ratelimits ?? []
  assert.equal(limiter?.name, "CONTACT_RATE_LIMIT")
  assert.ok(limiter?.simple?.limit > 0)
  assert.ok([10, 60].includes(limiter?.simple?.period))
})

test("no secret is committed to the Cloudflare config", () => {
  assert.equal(wranglerJson.vars?.TURNSTILE_SECRET_KEY, undefined)
  assert.doesNotMatch(wranglerConfig, /SECRET/i)
  assert.equal(wranglerJson.vars?.CONTACT_DRY_RUN, "false")
})

test("Cloudflare Workers persists observability logs", () => {
  assert.equal(wranglerJson.observability?.enabled, true)
})

test("Cloudflare does not publish an alternate workers.dev hostname", () => {
  assert.equal(wranglerJson.workers_dev, false)
})
