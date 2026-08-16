import {
  absoluteUrl,
  SITE_LAST_UPDATED,
} from "@/config/site"
import { PROJECTS } from "@/data/projects"
import {
  entrySlug,
  getCaseStudyByProjectSlug,
  getPublishedArticles,
} from "@/lib/content"
import { latestEvidenceDate } from "@/lib/dates"

export const prerender = true

interface SitemapEntry {
  location: string
  lastModified?: string
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    }
    return entities[character]
  })
}

function maxIsoDate(...values: Array<string | undefined>): string | undefined {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1)
}

function renderEntry(entry: SitemapEntry): string {
  const lastModified = entry.lastModified
    ? `<lastmod>${escapeXml(entry.lastModified)}</lastmod>`
    : ""
  return `<url><loc>${escapeXml(entry.location)}</loc>${lastModified}</url>`
}

export async function GET(): Promise<Response> {
  const articles = await getPublishedArticles()
  const projects = await Promise.all(
    PROJECTS.map(async (project) => ({
      project,
      caseStudy: await getCaseStudyByProjectSlug(project.slug),
    })),
  )
  const newestArticleEvidenceDate = latestEvidenceDate(
    articles.map((article) => article.data),
  )
  const projectEvidenceDates = projects.flatMap(({ project, caseStudy }) => [
    project.updated,
    caseStudy?.data.updated,
  ])

  const entries: SitemapEntry[] = [
    {
      location: absoluteUrl("/"),
      lastModified: maxIsoDate(SITE_LAST_UPDATED, newestArticleEvidenceDate),
    },
    {
      location: absoluteUrl("/projects"),
      lastModified: maxIsoDate(SITE_LAST_UPDATED, ...projectEvidenceDates),
    },
    ...projects.map(({ project, caseStudy }) => ({
      location: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updated ?? caseStudy?.data.updated,
    })),
  ]

  if (newestArticleEvidenceDate) {
    entries.push({
      location: absoluteUrl("/articles"),
      lastModified: newestArticleEvidenceDate,
    })
  }

  entries.push(
    ...articles.map((article) => ({
      location: absoluteUrl(`/articles/${entrySlug(article.id)}`),
      lastModified: article.data.updated ?? article.data.date,
    })),
  )

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderEntry),
    "</urlset>",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
