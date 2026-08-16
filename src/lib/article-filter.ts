export interface FilterableArticle {
  title: string
  summary: string
  category: string
  tags: readonly string[]
}

export function filterArticles<T extends FilterableArticle>(
  articles: readonly T[],
  query: string,
  category: string,
): T[] {
  const normalizedQuery = query.trim().toLowerCase()

  return articles.filter((article) => {
    if (category !== "All" && article.category !== category) return false
    if (!normalizedQuery) return true

    return [
      article.title,
      article.summary,
      article.category,
      ...article.tags,
    ].some((value) => value.toLowerCase().includes(normalizedQuery))
  })
}
