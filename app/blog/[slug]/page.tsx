import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { getArticle, getArticleSlugs, getArticles } from "@/lib/content"
import { SITE_URL } from "@/lib/site"
import MdxContent from "@/components/mdx-content"
import Footer from "@/components/footer"

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}

  const path = `/blog/${article.slug}`
  return {
    title: `${article.title} — Ehnand Azucena`,
    description: article.summary,
    keywords: article.tags,
    authors: [{ name: "Ehnand Azucena" }],
    alternates: { canonical: path },
    // A draft is reachable at its real URL for preview, but must never be indexed.
    ...(article.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: `${SITE_URL}${path}`,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const path = `/blog/${article.slug}`
  // getArticles() is published-only, so a draft never surfaces as a "keep reading" link.
  const others = getArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.summary,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        keywords: article.tags,
        url: `${SITE_URL}${path}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
        image: `${SITE_URL}/images/profile-new.jpg`,
        // Reference the single Person entity defined in the root layout rather than
        // inlining a duplicate — one author entity across the whole site.
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}${path}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-gray-950">
        <div className="section-container py-12 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <article className="max-w-3xl">
            {article.draft && (
              <p className="mb-6 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
                <strong className="font-semibold">Draft</strong> — not published. This page is noindex and is hidden
                from the blog listing, sitemap, and feed.
              </p>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.updated && article.updated !== article.date && (
                <span className="text-gray-600">· updated {formatDate(article.updated)}</span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-poppins leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-6">{article.summary}</p>

            <div className="flex flex-wrap gap-2 pb-8 mb-8 border-b border-gray-800">
              {article.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <MdxContent source={article.content} />

            {article.syndicated && (
              <p className="mt-12 pt-6 border-t border-gray-800 text-sm text-gray-500">
                Also published on{" "}
                {article.syndicated.devto && (
                  <a
                    href={article.syndicated.devto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    dev.to
                  </a>
                )}
                {article.syndicated.devto && article.syndicated.hashnode && " and "}
                {article.syndicated.hashnode && (
                  <a
                    href={article.syndicated.hashnode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Hashnode
                  </a>
                )}
                .
              </p>
            )}
          </article>

          {others.length > 0 && (
            <div className="max-w-3xl mt-16 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-bold text-white mb-6 font-poppins">Keep reading</h2>
              <div className="space-y-4">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="block p-5 bg-gray-900/60 rounded-lg border border-gray-800 hover:border-primary/40 transition-colors group"
                  >
                    <h3 className="text-white font-semibold mb-1 group-hover:text-primary transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{other.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
