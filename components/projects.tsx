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
    title: "Personal Budget & Finance Manager",
    description:
      "A comprehensive double-entry accounting system for personal finance, featuring net worth tracking, P&L statements, and budget analytics.",
    image: "/images/projects/budget-app.png",
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "shadcn/ui", "NextAuth.js", "Recharts"],
    period: "Dec 2025 – Present",
    role: "Solo Developer",
    status: "Live Production",
    category: "Finance",
    liveUrl: "https://ehnand-budget.vercel.app/",
  },
  {
    title: "REPSShield (Real Estate Professional Compliance Platform)",
    description:
      "Advanced SaaS compliance platform helping real estate investors maintain IRS REP status and protect $50,000+ in annual tax deductions. Features AI-powered compliance monitoring, intelligent time tracking, audit-ready reporting, and seamless integrations.",
    image: "/images/projects/repsshield.png",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "AI Integration", "IRS Compliance"],
    period: "Aug 2025 – Present",
    role: "Backend Developer",
    status: "Live Production",
    category: "SaaS Platform",
    liveUrl: "https://repsshield.com",
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
  {
    title: "Weather Forecasting Application",
    description:
      "React-based app with OpenWeather API, hitting 95% uptime and geolocation support, deployed on Vercel.",
    image: "/images/weather_app.png",
    technologies: ["React", "OpenWeather API", "Vercel", "Geolocation"],
    period: "Jan 2025 – Feb 2025",
    role: "Solo Developer",
    status: "Live",
    category: "Web App",
    liveUrl: "https://ehnand-weather-app.vercel.app/",
    githubUrl: "https://github.com/blank0810/weather-app",
  },
  {
    title: "EduTracker System",
    description: "Laravel/MySQL tool with Google Sheets/Gmail APIs, slashing reporting time by 40%.",
    image: "/images/edutracker.jpg",
    technologies: ["Laravel", "MySQL", "Google APIs", "Reporting"],
    period: "Jul 2024",
    role: "Solo Developer",
    status: "Deployed",
    category: "Education",
  },
  {
    title: "Email Automation Script",
    description:
      "Python script leveraging MXroute API to automate creation of 500+ email accounts, cutting manual setup time by 70% and ensuring config consistency.",
    image: "/images/email_auto.jpg",
    technologies: ["Python", "MXroute API", "Automation"],
    period: "Jul 2024",
    role: "Solo Developer",
    status: "Completed",
    category: "Automation",
  },
  {
    title: "M1 – WEB HRIS",
    description: "Cloud HR system, enhancing data integrity and security compliance.",
    image: "/images/lgu_hris.jpg",
    technologies: ["Laravel", "SQL Server", "Cloud", "HR System", "Security", "Data Integrity"],
    period: "Jan 2024 - Jun 2024",
    role: "Team Developer",
    status: "Deployed",
    category: "Enterprise",
  },
  {
    title: "M1-Helpdesk System",
    description: "Centralized IT platform with VMware, halving response times.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Laravel", "SQL Server", "IT Helpdesk", "VMware", "Response Time"],
    period: "Jan 2024 - Jun 2024",
    role: "Lead Developer",
    status: "Deployed",
    category: "Internal Tool",
  },
  {
    title: "Desktop Human Resources Information System",
    description: "C#.NET-based desktop app, securing payroll and employee records while speeding processing by 30%.",
    image: "/images/lgu_hris.jpg",
    technologies: ["C#.NET", "SQL Server", "Desktop", "HR", "Payroll"],
    period: "Aug 2023 - Jan 2024",
    role: "Lead Developer",
    status: "Deployed",
    category: "Desktop App",
  },
  {
    title: "File Repository System",
    description: "Secure document management system with role-based access control and version tracking.",
    image: "/images/file_repo.jpg",
    technologies: ["PHP", "MySQL", "Document Management", "Security", "Version Control"],
    period: "Jun 2023 - Aug 2023",
    role: "Solo Developer",
    status: "Completed",
    category: "Document Management",
  },
  {
    title: "Medical Diagnostic Expert System",
    description: "AI-powered diagnostic tool using rule-based inference to assist medical professionals.",
    image: "/images/expert_sys.jpg",
    technologies: ["AI", "Expert Systems", "Healthcare", "Diagnostics", "PHP"],
    period: "Mar 2023 - May 2023",
    role: "Solo Developer",
    status: "Completed",
    category: "AI/Healthcare",
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
          Explore my portfolio of innovative solutions, from enterprise SaaS platforms to cutting-edge web applications.
          Use the advanced filtering system below to discover projects by technology, category, timeline, or create your
          own custom filters.
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
