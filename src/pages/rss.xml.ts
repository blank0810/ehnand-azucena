import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { SITE_URL } from "@/config/site"
import {
  entrySlug,
  getPublishedArticles,
} from "@/lib/content"

export const prerender = true

export async function GET(context: APIContext): Promise<Response> {
  const articles = await getPublishedArticles()

  return rss({
    title: "Ehnand Azucena | Technical Articles",
    description:
      "Production field notes on SaaS systems, AI automation, data integrity, cloud delivery, and engineering reliability.",
    site: context.site ?? SITE_URL,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.summary,
      pubDate: new Date(article.data.date + "T00:00:00.000Z"),
      link: `/articles/${entrySlug(article.id)}`,
      categories: [article.data.category, ...article.data.tags],
    })),
  })
}
