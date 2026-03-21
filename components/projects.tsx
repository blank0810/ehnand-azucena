"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Calendar, MapPin, ChevronDown, Zap } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import ProjectDetailsModal from "./project-details-modal"
import EnhancedStatusBadge from "./enhanced-status-badge"
import AdvancedProjectsFilter from "./advanced-projects-filter"

const projects = [
  {
    title: "Adam AI (Multi-Tenant Document Intelligence SaaS)",
    description:
      "B2B platform enabling tenants to subscribe to document-processing modules, commission custom pipelines, and publish to a Module Store. Agentic AI pipelines with 8 comparison algorithms power schema auto-detection, live extraction preview, and Gemini-driven matching rules for the first tenant -- a Swiss energy client operating a petrol station group.",
    image: "/images/projects/adam-one.png",
    technologies: ["TanStack Start", "React 19", "TypeScript", "PostgreSQL 16", "Drizzle ORM", "Trigger.dev v4", "LlamaCloud", "Google Gemini", "Cloudflare R2", "Better Auth", "Bun"],
    period: "Jan 2026 – Present",
    role: "Lead Developer",
    status: "Live Production",
    category: "SaaS Platform",
  },
  {
    title: "MemberPulse (SaaS CPD Platform)",
    description:
      "Built from ground up: courses, events, subscriptions, job boards, directories, sponsorship system. Supports individual and organizational members. Multi-tenant design, live infrastructure.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/memberpulse-vNte4EfiWa9GzHUdOJzwC2RCOAgW99.png",
    technologies: ["Symfony", "Bootstrap", "Vultr", "PostgreSQL", "OAuth2"],
    period: "Feb 2025 – Aug 2025",
    role: "Lead Developer",
    status: "Live Production",
    category: "SaaS Platform",
    liveUrl: "https://memberpulse.com.au",
  },
  {
    title: "REPSShield (AI-Powered Real Estate Tax Compliance)",
    description:
      "Three AI modes protect real estate investors' IRS REP status: agentic time-tracking that auto-classifies activities, RAG advisory over 282 IRS documents, and a 14-check IRS examiner simulation. Multi-provider circuit-breaker failover, calendar sync, Stripe billing, and mobile apps via Capacitor.js round out the platform.",
    image: "/images/projects/repsshield.png",
    technologies: ["React 18", "Node.js", "Express", "TypeScript", "PostgreSQL 16", "Drizzle ORM", "Vercel AI SDK v4", "Stripe", "Capacitor.js", "Astro 5", "Cloudflare Workers", "Trigger.dev"],
    period: "Aug 2025 – Present",
    role: "Backend Developer",
    status: "Live Production",
    category: "SaaS Platform",
    liveUrl: "https://repsshield.com",
  },
  {
    title: "Initao Water Billing System",
    description:
      "Won via competitive government bidding for the Municipality of Initao. Full billing lifecycle from meter reading to payment collection, offline-first mobile API for field workers, WebSocket real-time notifications, and a double-entry ledger ensuring audit-grade financial integrity.",
    image: "/images/projects/water-billing-placeholder.svg",
    technologies: ["Laravel 12", "PHP 8.2+", "MySQL 8", "Alpine.js 3", "Tailwind CSS 3", "Laravel Reverb", "Pest PHP", "Docker", "Laravel Sanctum"],
    period: "Feb 2026 – Present",
    role: "Lead Developer",
    status: "Deployed",
    category: "Government / Enterprise",
    githubUrl: "https://github.com/blank0810/initao-water-billing",
  },
  {
    title: "Swiss Energy Platform Suite",
    description:
      "Consolidated 20 services and 6 financial matching engines serving a Swiss petrol station group. Daily orchestration reconciles pickup slips, invoices, purchases, and delivery notes across 4 companies and 8 stations. Includes WhatsApp AI document classification pipeline and wholesale invoice generation.",
    image: "/images/projects/swiss-energy-placeholder.svg",
    technologies: ["Node.js", "MongoDB", "Google Sheets API", "CSV/XML Processing", "PM2", "GitHub Actions", "Hetzner"],
    period: "Dec 2025 – Present",
    role: "Lead Developer",
    status: "Live Production",
    category: "Internal Tool",
  },
  {
    title: "PlayNow",
    description:
      "Beta version of a SaaS marketplace for merchants to sell coupons for goods/venues/activities (Project Handed Off).",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/playnow-OhNmKY5rAMiAdxrwuhl3rxLo7Ps5dM.png",
    technologies: ["Next.js", "NestJS", "Vercel"],
    period: "Mar 2025 – Apr 2025",
    role: "Solo Developer",
    status: "Beta",
    category: "Marketplace",
    liveUrl: "https://dev.playnow.ae",
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [activeFilters, setActiveFilters] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Show only first 6 projects initially, or all if showMore is true
  const displayedProjects = showMore ? filteredProjects : filteredProjects.slice(0, 6)

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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
          className="text-center text-gray-400 mb-8 max-w-3xl mx-auto"
        >
          A selection of production systems, SaaS platforms, and enterprise tools built for clients across four
          countries.
        </motion.p>

        {/* Advanced Filter System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <AdvancedProjectsFilter
            projects={projects}
            onFilteredProjectsChange={setFilteredProjects}
            onActiveFiltersChange={setActiveFilters}
          />
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref}>
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map((project, index) => (
                  <motion.div
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card overflow-hidden flex flex-col h-full group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                  >
                    {/* Project Image with Enhanced Hover Effect and Click Handler */}
                    <div
                      className="relative h-48 w-full mb-4 overflow-hidden rounded-md cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          handleProjectClick(project)
                        }
                      }}
                      aria-label={`View details for ${project.title}`}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover Overlay with Click Functionality */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="text-center text-white p-4"
                        >
                          <p className="text-lg font-semibold mb-2">Click to view details</p>
                          <p className="text-sm text-gray-300">Learn more about this project</p>
                        </motion.div>
                      </div>
                      {/* Enhanced Status Badge */}
                      <div className="absolute top-3 right-3">
                        <EnhancedStatusBadge status={project.status} size="sm" />
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Project Meta */}
                      <div className="flex items-center text-gray-400 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{project.period}</span>
                      </div>

                      <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                      {/* Technologies */}
                      <div className="mb-4 flex flex-wrap">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span key={techIndex} className="skill-tag mr-2 mb-2">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="skill-tag mr-2 mb-2 opacity-60">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex items-center gap-2 text-sm px-4 py-2 flex-1 justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </motion.a>
                        )}

                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex items-center gap-2 text-sm px-4 py-2 flex-1 justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </motion.a>
                        )}

                        {!project.liveUrl && !project.githubUrl && (
                          <div className="btn-outline opacity-50 cursor-not-allowed flex items-center gap-2 text-sm px-4 py-2 flex-1 justify-center">
                            <MapPin className="h-4 w-4" />
                            Internal Project
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show More Button */}
              {filteredProjects.length > 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-center mt-12"
                >
                  <motion.button
                    onClick={() => setShowMore(!showMore)}
                    className="btn-outline flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showMore ? "Show Less Projects" : "Show More Projects"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
                    />
                  </motion.button>
                </motion.div>
              )}
            </>
          ) : (
            /* No Results State */
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Zap className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
                <p className="text-gray-400 mb-6">
                  No projects match your current filter criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setFilteredProjects(projects)
                    setActiveFilters([])
                  }}
                  className="btn-primary"
                >
                  View All Projects
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
