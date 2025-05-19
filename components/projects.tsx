"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Calendar, X } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Weather Forecasting Application",
    period: "Jan 2025 – Feb 2025",
    description:
      "React-based app with OpenWeather API, hitting 95% uptime and geolocation support, deployed on Vercel.",
    longDescription:
      "A comprehensive weather application built with React that provides real-time weather data and forecasts. The app uses the OpenWeather API to fetch accurate weather information and implements geolocation to automatically detect the user's location. With a 95% uptime rate, the application ensures reliable access to weather data. The responsive design makes it accessible on various devices, and the intuitive UI provides a seamless user experience.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "OpenWeather API", "Vercel", "Geolocation"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "EduTracker System",
    period: "Jul 2024",
    description: "Laravel/MySQL tool with Google Sheets/Gmail APIs, slashing reporting time by 40%.",
    longDescription:
      "EduTracker is a comprehensive education management system built with Laravel and MySQL. It integrates with Google Sheets and Gmail APIs to streamline data management and communication. The system reduced reporting time by 40% by automating data collection, processing, and report generation. Features include student tracking, attendance management, grade recording, and automated notifications to parents and teachers.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Laravel", "MySQL", "Google APIs", "Reporting"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "Email Automation Script",
    period: "Jul 2024",
    description:
      "Python script leveraging MXroute API to automate creation of 500+ email accounts, cutting manual setup time by 70% and ensuring config consistency.",
    longDescription:
      "Developed a Python automation script that interfaces with the MXroute API to create and configure email accounts at scale. The script successfully automated the creation of over 500 email accounts, reducing the manual setup time by 70%. It ensures configuration consistency across all accounts and includes error handling and logging for troubleshooting. The solution also provides a simple interface for administrators to manage bulk email account creation.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Python", "MXroute API", "Automation"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "M1 – WEB HRIS",
    period: "Jan 2024 - Jun 2024",
    description: "Cloud HR system, enhancing data integrity and security compliance.",
    longDescription:
      "M1-HRIS is a cloud-based Human Resource Information System developed for MORESCO-1. The system centralizes employee data management, streamlines HR processes, and ensures data integrity and security compliance. Key features include employee profile management, attendance tracking, leave management, payroll processing, and performance evaluation. The system implements role-based access control and data encryption to protect sensitive information.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Cloud", "HR System", "Security", "Data Integrity"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "M1-Helpdesk System",
    period: "Jan 2024 - Jun 2024",
    description: "Centralized IT platform with VMware, halving response times.",
    longDescription:
      "M1-Helpdesk is a centralized IT support platform developed for MORESCO-1 using VMware. The system streamlined the ticket management process, resulting in a 50% reduction in response times. Features include ticket creation and tracking, automated assignment based on expertise, knowledge base integration, and performance analytics. The system also provides real-time notifications and escalation procedures for critical issues.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["IT Helpdesk", "VMware", "Response Time"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    title: "DESKTOP HUMAN RESOURCES INFORMATION SYSTEM",
    period: "Aug 2023 - Jan 2024",
    description: "C#.NET-based desktop app, securing payroll and employee records while speeding processing by 30%.",
    longDescription:
      "A comprehensive desktop Human Resources Information System developed using C#.NET. The application secures payroll and employee records while providing efficient HR management tools. It improved processing speed by 30% through optimized database queries and efficient UI design. Features include employee management, attendance tracking, payroll processing, leave management, and reporting. The system implements data encryption and role-based access control to ensure security.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["C#.NET", "Desktop", "HR", "Payroll"],
    links: {
      demo: "#",
      github: "#",
    },
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [visibleProjects, setVisibleProjects] = useState(3)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filterTag, setFilterTag] = useState("")

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projects.length))
  }

  const allTags = [...new Set(projects.flatMap((project) => project.tags))]

  const filteredProjects = filterTag ? projects.filter((project) => project.tags.includes(filterTag)) : projects

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setFilterTag("")}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
              filterTag === "" ? "bg-primary text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {allTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                filterTag === tag ? "bg-primary text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden flex flex-col h-full group"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.5)",
              }}
            >
              <div
                className="relative h-48 w-full mb-4 overflow-hidden rounded-md cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end justify-center">
                  <p className="text-white p-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    Click to view details
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <div className="flex items-center text-gray-400 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{project.period}</span>
              </div>
              <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
              <div className="mb-4 flex flex-wrap">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`skill-tag ${filterTag === tag ? "bg-primary/30" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setFilterTag(tag)
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4 mt-auto">
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white flex items-center transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4 mr-1" /> Demo
                </a>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-white flex items-center transition-colors duration-300"
                >
                  <Github className="h-4 w-4 mr-1" /> Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <motion.button
              onClick={loadMore}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Projects
            </motion.button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-64 relative">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <button
                  className="absolute top-4 right-4 bg-gray-800/80 p-2 rounded-full text-white hover:bg-gray-700"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <div className="flex items-center text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{selectedProject.period}</span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.longDescription}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap">
                    {selectedProject.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={selectedProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> View Demo
                  </a>
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
