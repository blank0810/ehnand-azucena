import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const readText = (path) => (existsSync(path) ? readFileSync(path, "utf8") : "")

const packageJson = JSON.parse(readText("package.json"))
const dockerfile = readText("Dockerfile.dev")
const compose = readText("docker-compose.yml")
const astroConfig = readText("astro.config.mjs")
const wranglerConfig = readText("wrangler.jsonc")

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

test("Cloudflare Workers serves static assets without a runtime entry", () => {
  assert.match(wranglerConfig, /"directory":\s*"\.\/dist"/)
  assert.match(wranglerConfig, /"html_handling":\s*"drop-trailing-slash"/)
  assert.match(wranglerConfig, /"not_found_handling":\s*"404-page"/)
  assert.doesNotMatch(wranglerConfig, /"main"\s*:/)
  assert.doesNotMatch(wranglerConfig, /"(?:kv_namespaces|d1_databases|r2_buckets)"\s*:/)
})
