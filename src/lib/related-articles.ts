export interface RelatableArticle {
  id: string
  data: {
    category: string
    tags: string[]
  }
}

/**
 * Ranks by shared tags, weighting a rare tag above a common one, so links reach
 * the whole archive rather than the newest few per category. Ties go to the same
 * category, then to `published` order.
 */
export function selectRelatedArticles<T extends RelatableArticle>(
  article: RelatableArticle,
  published: readonly T[],
  limit = 3,
): T[] {
  const tagCounts = new Map<string, number>()

  for (const entry of published) {
    for (const tag of new Set(entry.data.tags)) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }

  const ownTags = new Set(article.data.tags)

  return published
    .filter((candidate) => candidate.id !== article.id)
    .map((candidate) => ({
      candidate,
      overlap: [...new Set(candidate.data.tags)]
        .filter((tag) => ownTags.has(tag))
        .reduce((sum, tag) => sum + 1 / (tagCounts.get(tag) ?? 1), 0),
      sameCategory: candidate.data.category === article.data.category ? 1 : 0,
    }))
    .sort(
      (left, right) =>
        right.overlap - left.overlap || right.sameCategory - left.sameCategory,
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
