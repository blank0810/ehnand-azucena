"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Calendar, User, MapPin, Award, Layers } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import EnhancedStatusBadge from "./enhanced-status-badge"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  period: string
  role: string
  status: string
  category: string
  liveUrl?: string
  githubUrl?: string
}

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!project) return null

  const getDetailedDescription = (title: string) => {
    const descriptions: { [key: string]: string } = {
      "MemberPulse (SaaS CPD Platform)": `
        MemberPulse is a comprehensive multi-tenant SaaS platform designed for professional associations and organizations. 
        The platform features a complete ecosystem including:
        
        • **Course Management System** - Create, manage, and deliver professional development courses
        • **Event Management** - Full-featured event planning, registration, and management
        • **Subscription System** - Flexible membership tiers and billing management
        • **Job Board** - Career opportunities and professional networking
        • **Business Directory** - Member and organization listings
        • **Sponsorship Management** - Corporate partnership and sponsorship tracking
        • **CPD Points Tracking** - Continuing Professional Development credit system
        
        Built with enterprise-grade security, scalability, and multi-tenancy in mind, supporting both individual professionals and large organizations.
        
        Visit the platform at: https://memberpulse.com.au
      `,
      PlayNow: `
        PlayNow is an innovative SaaS marketplace platform that connects merchants with customers through a unique coupon-based system. 
        The platform enables:
        
        • **Merchant Dashboard** - Comprehensive tools for businesses to create and manage deals
        • **Coupon Management** - Dynamic pricing and promotional campaign tools
        • **Multi-Category Support** - Sports venues, activities, goods, and services
        • **User Experience** - Intuitive interface for discovering and purchasing deals
        • **Payment Integration** - Secure transaction processing and merchant payouts
        • **Analytics & Reporting** - Performance tracking for merchants and platform metrics
        
        The beta version successfully demonstrated the core marketplace functionality before project handoff, showcasing the potential for scalable deal distribution.
      `,
      "Weather Forecasting Application": `
        A modern, responsive weather application built with React and integrated with the OpenWeather API. 
        Key features include:
        
        • **Real-time Weather Data** - Current conditions, forecasts, and weather alerts
        • **Geolocation Support** - Automatic location detection and manual city search
        • **Interactive UI** - Clean, intuitive interface with weather visualizations
        • **Performance Optimized** - Achieving 95% uptime with efficient API usage
        • **Responsive Design** - Seamless experience across desktop and mobile devices
        • **Error Handling** - Robust error management and user feedback systems
        
        Deployed on Vercel with continuous integration and monitoring for optimal performance.
      `,
    }

    return descriptions[title] || project.description
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>

            {/* Project Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

              {/* Enhanced Status Badge */}
              <div className="absolute top-4 left-4">
                <EnhancedStatusBadge status={project.status} size="md" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Layers className="h-4 w-4" />
                  <span className="font-medium">{project.category}</span>
                </div>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="text-white font-medium">{project.period}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <p className="text-white font-medium">{project.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-white font-medium">{project.status}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                <div className="prose prose-gray max-w-none">
                  <div
                    className="text-gray-300 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: getDetailedDescription(project.title).replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-primary">$1</strong>',
                      ),
                    }}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full font-medium hover:bg-primary/30 transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Live Project
                  </motion.a>
                )}

                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-5 w-5" />
                    View Source Code
                  </motion.a>
                )}

                {!project.liveUrl && !project.githubUrl && (
                  <div className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 text-gray-400 rounded-lg">
                    <MapPin className="h-5 w-5" />
                    Internal/Confidential Project
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
