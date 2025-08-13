"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Calendar, MapPin, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const projects = [
  {
    title: "MemberPulse (SaaS CPD Platform)",
    description:
      "Built from ground up: courses, events, subscriptions, job boards, directories, sponsorship system. Supports individual and organizational members. Multi-tenant design, live infrastructure.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Symfony", "Bootstrap", "Vultr", "PostgreSQL", "OAuth2"],
    period: "Feb 2025 – Present",
    role: "Lead Developer",
    status: "Live Production",
    category: "SaaS Platform",
    liveUrl: "https://platform.memberpulse.com.au",
  },
  {
    title: "PlayNow",
    description:
      "Beta version of a SaaS marketplace for merchants to sell coupons for goods/venues/activities (Project Handed Off).",
    image: "/placeholder.svg?height=300&width=400",
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

  const [selectedFilter, setSelectedFilter] = useState("All")
  const [showMore, setShowMore] = useState(false)

  // Get all unique technologies for filter buttons
  const allTechnologies = ["All", ...new Set(projects.flatMap((project) => project.technologies))]

  // Filter projects based on selected technology
  const filteredProjects =
    selectedFilter === "All" ? projects : projects.filter((project) => project.technologies.includes(selectedFilter))

  // Show only first 6 projects initially, or all if showMore is true
  const displayedProjects = showMore ? filteredProjects : filteredProjects.slice(0, 6)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live production":
      case "live":
        return "bg-green-900/30 text-green-400 border-green-700"
      case "deployed":
        return "bg-blue-900/30 text-blue-400 border-blue-700"
      case "beta":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700"
      case "completed":
        return "bg-purple-900/30 text-purple-400 border-purple-700"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-700"
    }
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

        {/* Technology Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedFilter(tech)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                selectedFilter === tech ? "bg-primary text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden flex flex-col h-full group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Project Image with Enhanced Hover Effect */}
              <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md cursor-pointer">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end justify-center">
                  <p className="text-white p-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    Click to view details
                  </p>
                </div>
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
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
                    <span className="skill-tag mr-2 mb-2 opacity-60">+{project.technologies.length - 4} more</span>
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
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} />
            </motion.button>
          </motion.div>
        )}

        {/* Project Count Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400">
            Showing {displayedProjects.length} of {filteredProjects.length} projects
            {selectedFilter !== "All" && ` filtered by "${selectedFilter}"`}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
