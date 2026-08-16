export const ARTICLE_CATEGORIES = [
  "Business Systems & Data Integrity",
  "SaaS, Cloud & Security",
  "AI & Automation",
  "Engineering Practice & Reliability",
] as const

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]
export type ArticleCategoryFilter = "All" | ArticleCategory

export interface ArticleListItem {
  slug: string
  title: string
  date: string
  updated?: string
  summary: string
  category: ArticleCategory
  tags: string[]
}
