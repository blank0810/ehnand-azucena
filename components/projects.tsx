"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Calendar, ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FEATURED_PROJECTS, ARCHIVE_PROJECTS } from "@/lib/projects"
import EnhancedStatusBadge from "./enhanced-status-badge"

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Recent Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          A selection of production systems, SaaS platforms, and enterprise tools built for clients across four
          countries.
        </motion.p>

        {/* Featured projects grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden flex flex-col h-full group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Image links to the project detail page */}
              <Link
                href={`/projects/${project.slug}`}
                className="relative h-48 w-full mb-4 overflow-hidden rounded-md block"
                aria-label={`View details for ${project.title}`}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <EnhancedStatusBadge status={project.status} size="sm" />
                </div>
              </Link>

              <div className="flex-1 flex flex-col">
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                </Link>

                <div className="flex items-center text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{project.period}</span>
                </div>

                <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                <div className="mb-4 flex flex-wrap">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className="skill-tag mr-2 mb-2">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="skill-tag mr-2 mb-2 opacity-60">+{project.technologies.length - 4} more</span>
                  )}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="btn-primary flex items-center gap-2 text-sm px-4 py-2 flex-1 justify-center"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center justify-center gap-2 text-sm px-4 py-2"
                      aria-label={`Open live demo of ${project.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center justify-center gap-2 text-sm px-4 py-2"
                      aria-label={`View source code of ${project.title}`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Earlier & academic work — collapsed by default, but rendered in the DOM (crawlable) */}
        {ARCHIVE_PROJECTS.length > 0 && (
          <details className="mt-16 group max-w-5xl mx-auto">
            <summary className="flex items-center justify-center gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-gray-300 hover:text-primary transition-colors">
              <span className="font-semibold">
                Earlier &amp; Academic Work (2023–2024) — {ARCHIVE_PROJECTS.length} projects
              </span>
              <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
            </summary>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {ARCHIVE_PROJECTS.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="card flex items-start justify-between gap-4 group/row hover:border-primary/50 transition-all duration-300"
                >
                  <div>
                    <h4 className="font-semibold text-white group-hover/row:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {project.period} · {project.category}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{project.technologies.slice(0, 3).join(" · ")}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-500 group-hover/row:text-primary transition-colors duration-300 mt-1" />
                </Link>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
