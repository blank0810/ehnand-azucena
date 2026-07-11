import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Layers } from "lucide-react"
import { PROJECTS } from "@/lib/projects"
import { SITE_URL } from "@/lib/site"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Projects — Ehnand Azucena",
  description:
    "Multi-tenant SaaS platforms, AI document-intelligence pipelines, and government enterprise systems built for clients in Australia, Switzerland, the UAE, the US, and the Philippines.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: "Projects — Ehnand Azucena",
    description: "Multi-tenant SaaS, AI pipelines, and government enterprise systems.",
    url: `${SITE_URL}/projects`,
  },
}

export default function ProjectsPage() {
  // The hub exists mainly as a crawl path: 15 detail pages previously had no page
  // linking to them, so a crawler's only route in was the sitemap.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects — Ehnand Azucena",
    url: `${SITE_URL}/projects`,
    author: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}/projects/${project.slug}`,
      })),
    },
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">Projects</h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-12">
            Production systems built for clients across Australia, Switzerland, the UAE, the United States, and the
            Philippines — multi-tenant SaaS, AI document pipelines, and government enterprise platforms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col bg-gray-900/60 rounded-xl border border-gray-800 overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 text-primary text-sm mb-2">
                    <Layers className="h-4 w-4" />
                    <span>{project.category}</span>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-2 font-poppins group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">{project.description}</p>

                  <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                    <span>{project.role}</span>
                    <span>{project.period}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
