// Build-time reader for MDX content.
//
// Two content types, deliberately split:
//   content/articles/*.mdx      -> /blog/[slug]      (self-contained; frontmatter holds all metadata)
//   content/case-studies/*.mdx  -> /projects/[slug]  (narrative body ONLY)
//
// Case studies carry no metadata of their own: lib/projects.ts remains the single
// source of truth for project title/tech/period/role/etc, and a case study is matched
// to its project by filename (content/case-studies/adam-ai.mdx <-> slug "adam-ai").
// Duplicating that metadata into frontmatter would guarantee drift.
//
// Server-only: reads from disk at build time. Never import this from a client component.
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles")
const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies")

export interface ArticleFrontmatter {
  title: string
  /** ISO date (YYYY-MM-DD). Drives ordering, <time>, and sitemap lastmod. */
  date: string
  /** ISO date of last substantive edit. Falls back to `date`. */
  updated?: string
  tags: string[]
  /** One or two sentences. Used as the meta description and the listing blurb. */
  summary: string
  /**
   * Unpublished. A draft still builds a page (so it can be previewed at its real URL)
   * but is kept out of the listing, the sitemap, and the RSS feed, and is marked
   * noindex. Drop this flag to publish.
   */
  draft?: boolean
  /** Where this has been cross-posted, with canonical pointing back here. */
  syndicated?: {
    devto?: string
    hashnode?: string
  }
}

export interface Article extends ArticleFrontmatter {
  slug: string
  /** Raw MDX body, ready for compileMDX. */
  content: string
}

/** Read a directory of .mdx files. Returns [] if the directory doesn't exist yet. */
function readMdxDir(dir: string): { slug: string; raw: string }[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
      raw: fs.readFileSync(path.join(dir, file), "utf8"),
    }))
}

/** Every article on disk, drafts included, newest first. */
function readAllArticles(): Article[] {
  return readMdxDir(ARTICLES_DIR)
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw)
      return { slug, content, ...(data as ArticleFrontmatter) }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Published articles, newest first. This is what the listing, sitemap, and RSS use —
 * drafts are excluded so unfinished writing never advertises itself to a crawler.
 */
export function getArticles(): Article[] {
  return readAllArticles().filter((article) => !article.draft)
}

/**
 * Lookup by slug, INCLUDING drafts — a draft still needs to render at its real URL
 * so it can be previewed. The page marks it noindex.
 */
export function getArticle(slug: string): Article | null {
  return readAllArticles().find((article) => article.slug === slug) ?? null
}

/** Static params cover drafts too, so their pages exist for preview. */
export function getArticleSlugs(): string[] {
  return readAllArticles().map((article) => article.slug)
}

/**
 * The long-form narrative for a project, if one has been written.
 * Returns null when no case study exists — callers fall back to the project's
 * `longDescription`, then `description`, so a project without an MDX file still renders.
 */
export function getCaseStudy(slug: string): string | null {
  const file = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null

  const { content } = matter(fs.readFileSync(file, "utf8"))
  return content
}
