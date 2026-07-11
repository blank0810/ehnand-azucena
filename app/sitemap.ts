import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { PROJECTS, getProjectStartDate } from "@/lib/projects"
import { getArticles } from "@/lib/content"

// `lastModified` must be a REAL date. Stamping every URL with `new Date()` at build
// time means every deploy claims every page changed — Google detects untrustworthy
// lastmod and discards it wholesale, making the signal worse than useless.
//
// Articles use their frontmatter date; projects use their start date; the homepage
// uses the newest article date, since new writing is the only thing that changes it.
const FALLBACK_DATE = "2026-01-01"

// getProjectStartDate returns YYYY-MM; sitemaps want a full YYYY-MM-DD.
function projectDate(project: Parameters<typeof getProjectStartDate>[0]): string {
  const start = getProjectStartDate(project)
  return start ? `${start}-01` : FALLBACK_DATE
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles()
  const homeLastModified = articles[0]?.updated ?? articles[0]?.date ?? FALLBACK_DATE

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: projectDate(project),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.updated ?? article.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Only advertise /blog once something is on it. An empty listing page in the
    // sitemap is a thin page, and thin pages drag on site-wide quality assessment.
    ...(articles.length > 0
      ? [
          {
            url: `${SITE_URL}/blog`,
            lastModified: homeLastModified,
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
        ]
      : []),
    ...projectRoutes,
    ...articleRoutes,
  ]
}
