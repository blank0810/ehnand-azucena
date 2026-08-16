import { filterArticles } from "@/lib/article-filter"

interface BrowserArticle {
  element: HTMLElement
  title: string
  summary: string
  category: string
  tags: string[]
}

function initializeArticleLibrary(root: HTMLElement): void {
  const search = root.querySelector<HTMLInputElement>("[data-article-search]")
  const count = root.querySelector<HTMLElement>("[data-article-count]")
  const empty = root.querySelector<HTMLElement>("[data-article-empty]")
  const results = root.querySelector<HTMLElement>("[data-scroll-region='articles']")
  const categoryButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-category-filter]"),
  )
  const resetButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-article-reset]"),
  )
  const articles = Array.from(
    root.querySelectorAll<HTMLElement>("[data-article-record]"),
    (element): BrowserArticle => ({
      element,
      title: element.dataset.search ?? "",
      summary: "",
      category: element.dataset.category ?? "",
      tags: [],
    }),
  )

  if (!search || !count || !empty || !results) return

  const countElement = count
  const emptyState = empty

  const availableCategories = new Set(
    categoryButtons.map((button) => button.dataset.categoryFilter ?? "All"),
  )
  const url = new URL(window.location.href)
  let query = url.searchParams.get("q") ?? ""
  let category = url.searchParams.get("category") ?? "All"

  if (!availableCategories.has(category)) category = "All"
  search.value = query

  function updateUrl(): void {
    const nextUrl = new URL(window.location.href)
    const normalizedQuery = query.trim()

    if (normalizedQuery) nextUrl.searchParams.set("q", normalizedQuery)
    else nextUrl.searchParams.delete("q")

    if (category !== "All") nextUrl.searchParams.set("category", category)
    else nextUrl.searchParams.delete("category")

    window.history.replaceState(
      null,
      "",
      nextUrl.pathname + nextUrl.search + nextUrl.hash,
    )
  }

  function applyFilters(): void {
    const visibleArticles = filterArticles(articles, query, category)
    const visibleElements = new Set(
      visibleArticles.map((article) => article.element),
    )

    for (const article of articles) {
      article.element.hidden = !visibleElements.has(article.element)
    }

    for (const button of categoryButtons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.categoryFilter === category),
      )
    }

    const total = visibleArticles.length
    const hasFilters = query.trim().length > 0 || category !== "All"
    countElement.textContent = `${total} ${total === 1 ? "article" : "articles"}`
    emptyState.hidden = total !== 0

    for (const button of resetButtons) button.hidden = !hasFilters

    updateUrl()
  }

  search.addEventListener("input", () => {
    query = search.value
    applyFilters()
  })

  for (const button of categoryButtons) {
    button.addEventListener("click", () => {
      category = button.dataset.categoryFilter ?? "All"
      applyFilters()
    })
  }

  for (const button of resetButtons) {
    button.addEventListener("click", () => {
      query = ""
      category = "All"
      search.value = ""
      applyFilters()
      search.focus()
    })
  }

  applyFilters()
}

for (const root of document.querySelectorAll<HTMLElement>("[data-article-library]")) {
  initializeArticleLibrary(root)
}
