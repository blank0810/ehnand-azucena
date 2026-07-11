// RSS 2.0 feed for the blog.
//
// Worth the 40 lines: dev aggregators and several AI crawlers discover new posts
// via feeds rather than by re-crawling a listing page.
import { getArticles } from "@/lib/content"
import { SITE_URL } from "@/lib/site"

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function GET() {
  const articles = getArticles()

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/blog/${article.slug}`
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <author>contact@ehnand.com (Ehnand Azucena)</author>
${(article.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`
    })
    .join("\n")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ehnand Azucena — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Writing on Laravel, Symfony, multi-tenant SaaS, AI pipelines, and database design.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
