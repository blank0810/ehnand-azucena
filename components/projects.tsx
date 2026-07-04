"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, ArrowRight, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PROJECTS, type Project } from "@/lib/projects"
import EnhancedStatusBadge from "./enhanced-status-badge"

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))]

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden flex flex-col h-full group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
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
  )
}

export default function Projects() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const isFiltering = query.trim() !== "" || category !== "All"

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const matchesCat = category === "All" || p.category === category
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesQuery
    })
  }, [query, category])

  const clearFilters = () => {
    setQuery("")
    setCategory("All")
  }

  return (
    <section id="projects" className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Recent Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-10 max-w-3xl mx-auto"
        >
          A selection of production systems, SaaS platforms, and enterprise tools built for clients across four
          countries.
        </motion.p>

        {/* Filter controls — search + category chips */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by name, tech, or category…"
              aria-label="Search projects"
              className="w-full pl-10 pr-10 py-3 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary/60 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Horizontal scroll strip on mobile, wrapped + centered on desktop */}
          <div className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-visible pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  category === cat
                    ? "bg-primary/20 text-primary border-primary/40"
                    : "bg-gray-800/60 text-gray-400 border-gray-700 hover:text-gray-200 hover:border-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* All projects, rendered identically — the CV is where curation/highlighting happens */}
        <div className="flex items-center justify-center gap-3 mb-8 text-sm text-gray-400">
          <span>
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {isFiltering ? " found" : ""}
          </span>
          {isFiltering && (
            <button onClick={clearFilters} className="text-primary hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-4">No projects match your search.</p>
            <button onClick={clearFilters} className="btn-primary">
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
