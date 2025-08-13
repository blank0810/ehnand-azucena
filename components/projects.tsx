"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Calendar, User, MapPin } from "lucide-react"
import Image from "next/image"

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
  },
  {
    title: "EduTracker System",
    description: "Reduced reporting time by 40% via automation and data consolidation.",
    image: "/images/edutracker.jpg",
    technologies: ["Laravel", "MySQL", "Google APIs"],
    period: "Jul 2024 - Aug 2024",
    role: "Solo Developer",
    status: "Deployed",
    category: "Education",
  },
  {
    title: "Weather App",
    description: "A responsive weather application with real-time data and forecasts.",
    image: "/images/weather_app.png",
    technologies: ["React", "OpenWeather API", "Tailwind CSS"],
    period: "Dec 2024",
    role: "Solo Developer",
    status: "Live",
    category: "Web App",
    liveUrl: "https://ehnand-weather-app.vercel.app/",
    githubUrl: "https://github.com/blank0810/weather-app",
  },
  {
    title: "M1 – HRIS (MORESCO-1)",
    description: "Internal HR platform deployed in a multi-office environment; improved data integrity and access.",
    image: "/images/lgu_hris.jpg",
    technologies: ["Laravel", "SQL Server"],
    period: "Jan 2024 - Jun 2024",
    role: "Team Developer",
    status: "Deployed",
    category: "Enterprise",
  },
  {
    title: "M1-Helpdesk",
    description: "Ticketing system reducing average response time by 35%. Deployed on an internal network.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Laravel", "SQL Server"],
    period: "Jan 2024 - Jun 2024",
    role: "Lead Developer",
    status: "Deployed",
    category: "Internal Tool",
  },
  {
    title: "Email Automation Script",
    description:
      "Python script leveraging MXroute API to automate creation of 500+ email accounts, cutting manual setup time by 70% and ensuring config consistency.",
    image: "/images/email_auto.jpg",
    technologies: ["Python", "MXroute API"],
    period: "Jul 2024 - Aug 2024",
    role: "Solo Developer",
    status: "Completed",
    category: "Automation",
  },
  {
    title: "DESKTOP HRIS",
    description:
      "C#.NET-based desktop app, securing payroll and employee records while speeding processing by 30%. Legacy HR system with secure role-based access and records protection.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["C#.NET", "SQL Server"],
    period: "Aug 2023 - Jan 2024",
    role: "Lead Developer",
    status: "Deployed",
    category: "Desktop App",
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    <section id="projects" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Recent Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Here are some of the projects I've worked on, showcasing my expertise in full-stack development, system
          architecture, and problem-solving.
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
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

                <p className="text-gray-300 mb-4 flex-1">{project.description}</p>

                {/* Project Meta */}
                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{project.role}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="skill-tag bg-primary/20 text-primary border border-primary/30">
                        {tech}
                      </span>
                    ))}
                  </div>
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
      </div>
    </section>
  )
}
