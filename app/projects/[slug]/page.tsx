import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Award, Layers } from "lucide-react"
import { PROJECTS, getProjectBySlug, getProjectStartDate } from "@/lib/projects"
import { SITE_URL } from "@/lib/site"
import Footer from "@/components/footer"

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  const title = `${project.title} — Ehnand Azucena`
  const path = `/projects/${project.slug}`
  return {
    title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url: `${SITE_URL}${path}`,
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [project.image],
    },
  }
}

// Render **bold** markers and preserve line breaks for the long-form copy.
function renderRichText(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const path = `/projects/${project.slug}`
  const imageUrl = project.image.startsWith("http") ? project.image : `${SITE_URL}${project.image}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: project.category,
        url: `${SITE_URL}${path}`,
        image: imageUrl,
        ...(getProjectStartDate(project) ? { dateCreated: getProjectStartDate(project) } : {}),
        author: {
          "@type": "Person",
          name: "Ehnand Azucena",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}${path}` },
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
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl mb-8">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
          </div>

          <div className="flex items-center gap-2 text-primary mb-2">
            <Layers className="h-4 w-4" />
            <span className="font-medium">{project.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-poppins">{project.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 bg-gray-900/60 rounded-lg border border-gray-800">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-400">Timeline</p>
                <p className="text-white font-medium">{project.period}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-900/60 rounded-lg border border-gray-800">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-white font-medium">{project.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-900/60 rounded-lg border border-gray-800">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-white font-medium">{project.status}</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
            <div
              className="text-gray-300 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: renderRichText(project.longDescription ?? project.description) }}
            />
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 px-6 py-3"
              >
                <ExternalLink className="h-5 w-5" />
                View Live Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 px-6 py-3"
              >
                <Github className="h-5 w-5" />
                View Source Code
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
