import { getCollection, type CollectionEntry } from "astro:content"
import { ARTICLE_CATEGORIES } from "@/data/article-categories"
import { PROJECTS } from "@/data/projects"
import { compareIsoDesc } from "@/lib/dates"

export type ArticleEntry = CollectionEntry<"articles">
export type CaseStudyEntry = CollectionEntry<"caseStudies">

const FORBIDDEN_ERP_ROUTE = "/projects/multi-tenant-erp-backend"

export function entrySlug(id: string): string {
  return id.replace(/\.(?:md|mdx)$/i, "")
}

function compareArticles(left: ArticleEntry, right: ArticleEntry): number {
  return (
    compareIsoDesc(left.data.date, right.data.date) ||
    entrySlug(left.id).localeCompare(entrySlug(right.id))
  )
}

export async function getAllArticles(): Promise<ArticleEntry[]> {
  return (await getCollection("articles")).sort(compareArticles)
}

export async function getPublishedArticles(): Promise<ArticleEntry[]> {
  return (await getAllArticles()).filter((article) => !article.data.draft)
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleEntry | undefined> {
  return (await getAllArticles()).find((article) => entrySlug(article.id) === slug)
}

export async function getCaseStudyByProjectSlug(
  slug: string,
): Promise<CaseStudyEntry | undefined> {
  return (await getCollection("caseStudies")).find(
    (entry) => entrySlug(entry.id) === slug,
  )
}

export async function getRelatedArticles(
  article: ArticleEntry,
  limit = 3,
): Promise<ArticleEntry[]> {
  const published = (await getPublishedArticles()).filter(
    (candidate) => candidate.id !== article.id,
  )
  const sameCategory = published.filter(
    (candidate) => candidate.data.category === article.data.category,
  )
  const remaining = published.filter(
    (candidate) => candidate.data.category !== article.data.category,
  )

  return [...sameCategory, ...remaining].slice(0, limit)
}

export async function getHomepageArticles(): Promise<ArticleEntry[]> {
  const published = await getPublishedArticles()
  const newestByCategory = ARTICLE_CATEGORIES.map((category) =>
    published.find((article) => article.data.category === category),
  ).filter((article): article is ArticleEntry => article !== undefined)

  return newestByCategory.sort(compareArticles)
}

function hasDocumentHeading(source: string): boolean {
  let fence: "```" | "~~~" | undefined

  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trimStart()

    if (!fence && (trimmed.startsWith("```") || trimmed.startsWith("~~~"))) {
      fence = trimmed.startsWith("```") ? "```" : "~~~"
      continue
    }

    if (fence && trimmed.startsWith(fence)) {
      fence = undefined
      continue
    }

    if (!fence && (/^#\s+/.test(trimmed) || /^<h1(?:\s|>)/i.test(trimmed))) {
      return true
    }
  }

  return false
}

export async function assertContentIntegrity(): Promise<void> {
  const errors: string[] = []
  const projectSlugs = new Set<string>()

  for (const project of PROJECTS) {
    if (projectSlugs.has(project.slug)) {
      errors.push(`Duplicate project slug: ${project.slug}`)
    }
    projectSlugs.add(project.slug)
  }

  if (projectSlugs.has("multi-tenant-erp-backend")) {
    errors.push("The unpublished ERP must not exist as a portfolio project")
  }

  if (JSON.stringify(PROJECTS).includes(FORBIDDEN_ERP_ROUTE)) {
    errors.push(`Portfolio project data contains forbidden route ${FORBIDDEN_ERP_ROUTE}`)
  }

  const articles = await getAllArticles()
  const articleSlugs = new Set(articles.map((article) => entrySlug(article.id)))
  const caseStudies = await getCollection("caseStudies")

  for (const project of PROJECTS) {
    for (const slug of project.relatedArticleSlugs) {
      if (!articleSlugs.has(slug)) {
        errors.push(`${project.slug} references missing article ${slug}`)
      }
    }
  }

  for (const caseStudy of caseStudies) {
    const slug = entrySlug(caseStudy.id)
    if (!projectSlugs.has(slug)) {
      errors.push(`Case study has no matching project: ${slug}`)
    }
  }

  for (const article of articles) {
    const body = "body" in article && typeof article.body === "string" ? article.body : ""
    if (hasDocumentHeading(body)) {
      errors.push(`Article body must not contain an h1: ${entrySlug(article.id)}`)
    }
    if ((JSON.stringify(article.data) + body).includes(FORBIDDEN_ERP_ROUTE)) {
      errors.push(`Article contains forbidden ERP project route: ${entrySlug(article.id)}`)
    }
  }

  if (errors.length > 0) {
    throw new Error("Content integrity failed:\n- " + errors.join("\n- "))
  }
}
