import { once } from "node:events"
import { access, copyFile, rm } from "node:fs/promises"
import { spawn } from "node:child_process"

const fixture = "tests/fixtures/draft-preview.mdx"
const target = "content/articles/__integration-draft.mdx"
const baseUrl = "http://127.0.0.1:8787"

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: false,
      stdio: "inherit",
      ...options,
    })
    child.once("error", reject)
    child.once("exit", (code) => {
      if (code === 0) resolve()
      else reject(new Error(command + " exited with code " + String(code)))
    })
  })
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(baseUrl + "/")
      if (response.ok) return
    } catch {
      // Wrangler has not bound the port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error("Wrangler did not become ready within 30 seconds")
}

async function assertTargetAbsent() {
  try {
    await access(target)
  } catch (error) {
    if (error && error.code === "ENOENT") return
    throw error
  }
  throw new Error(target + " already exists; refusing to overwrite it")
}

async function stopServer(server) {
  if (!server || server.exitCode !== null) return
  server.kill("SIGTERM")
  await Promise.race([
    once(server, "exit"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ])
  if (server.exitCode === null) server.kill("SIGKILL")
}

await assertTargetAbsent()

let server
let failure

try {
  await copyFile(fixture, target)
  await run("pnpm", ["build"], {
    env: { ...process.env, NODE_ENV: "production" },
  })
  server = spawn(
    "pnpm",
    [
      "exec",
      "wrangler",
      "dev",
      "--local",
      "--ip",
      "127.0.0.1",
      "--port",
      "8787",
    ],
    { shell: false, stdio: "inherit" },
  )
  await waitForServer()
  await run(
    process.execPath,
    ["--test", "tests/integration/cloudflare-routes.test.mjs"],
    {
      env: { ...process.env, TEST_BASE_URL: baseUrl },
    },
  )
} catch (error) {
  failure = error
} finally {
  await stopServer(server)
  await rm(target, { force: true })
  try {
    await run("pnpm", ["build"], {
      env: { ...process.env, NODE_ENV: "production" },
    })
  } catch (error) {
    failure ??= error
  }
}

if (failure) throw failure
