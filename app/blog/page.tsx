import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { getArticles } from "@/lib/content"
import { SITE_URL } from "@/lib/site"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog — Ehnand Azucena",
  description:
    "Writing on Laravel, Symfony, multi-tenant SaaS, AI pipelines, and database design — drawn from production systems built for clients in Australia, Switzerland, the UAE, and the US.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog — Ehnand Azucena",
    description: "Writing on Laravel, Symfony, multi-tenant SaaS, AI pipelines, and database design.",
    url: `${SITE_URL}/blog`,
  },
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function BlogPage() {
  const articles = getArticles()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ehnand Azucena — Blog",
    url: `${SITE_URL}/blog`,
    author: { "@id": `${SITE_URL}/#person` },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.summary,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      url: `${SITE_URL}/blog/${article.slug}`,
      author: { "@id": `${SITE_URL}/#person` },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-gray-950">
        <div className="section-container py-12 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">Blog</h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-12">
            Notes from production systems — multi-tenant SaaS, AI pipelines, reconciliation engines, and the database
            designs underneath them.
          </p>

          {articles.length === 0 ? (
            <p className="text-gray-400">No articles published yet. Check back soon.</p>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="p-6 bg-gray-900/60 rounded-xl border border-gray-800 hover:border-primary/40 transition-colors"
                >
                  <Link href={`/blog/${article.slug}`} className="group">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={article.date}>{formatDate(article.date)}</time>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 font-poppins group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-gray-300 leading-relaxed mb-4">{article.summary}</p>
                  </Link>

                  <div className="flex flex-wrap gap-2">
                    {article.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
