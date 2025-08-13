"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, User } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  period: string
  role: string
  liveUrl?: string
  githubUrl?: string
}

interface ProjectCardProps {
  project: Project
  index?: number
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Project Image */}
      <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
        <Image
          src={project.image || "/placeholder.svg?height=200&width=400"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        {/* Project Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{project.period}</span>
          </div>
          <div className="flex items-center gap-1">
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
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
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
              className="btn-outline flex items-center gap-2 text-sm px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-4 w-4" />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
