import { absoluteUrl, SITE_URL } from "@/config/site"

export const prerender = true

export function GET(): Response {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
