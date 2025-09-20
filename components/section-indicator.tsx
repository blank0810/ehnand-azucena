"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Code, Briefcase, FolderOpen, Award, GraduationCap, Mail } from "lucide-react"

interface SectionIndicatorProps {
  sections: Array<{
    id: string
    label: string
  }>
}

export default function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Map section IDs to their corresponding icons
  const sectionIcons = {
    home: <Home className="h-4 w-4" />,
    about: <User className="h-4 w-4" />,
    skills: <Code className="h-4 w-4" />,
    experience: <Briefcase className="h-4 w-4" />,
    projects: <FolderOpen className="h-4 w-4" />,
    certificates: <Award className="h-4 w-4" />,
    education: <GraduationCap className="h-4 w-4" />,
    contact: <Mail className="h-4 w-4" />,
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show indicator after scrolling past hero section
      setIsVisible(scrollPosition > windowHeight * 0.3)

      // Find active section with better detection
      const sectionsWithPositions = sections
        .map((section) => {
          const element = document.querySelector(`#${section.id}`)
          if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + scrollPosition
            const elementBottom = elementTop + rect.height

            return {
              ...section,
              top: elementTop,
              bottom: elementBottom,
              isInView: rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5,
              distanceFromCenter: Math.abs(rect.top + rect.height / 2 - windowHeight / 2),
            }
          }
          return null
        })
        .filter(Boolean)

      // Find the section closest to the center of the viewport
      const activeSection = sectionsWithPositions
        .filter((section) => section?.isInView)
        .sort((a, b) => (a?.distanceFromCenter || 0) - (b?.distanceFromCenter || 0))[0]

      if (activeSection) {
        setActiveSection(activeSection.id)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const getCurrentSectionIndex = () => {
    return sections.findIndex((section) => section.id === activeSection)
  }

  const getScrollProgress = () => {
    if (typeof window === "undefined") return 0
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return Math.min((scrollTop / docHeight) * 100, 100)
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Main Indicator Container */}
        <motion.div
          className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
          animate={{
            width: isHovered ? 200 : 60,
            height: isHovered ? "auto" : 60,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Collapsed State - Current Section Only */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 flex flex-col items-center justify-center"
              >
                {/* Current Section Icon */}
                <motion.div className="text-primary mb-2" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  {sectionIcons[activeSection as keyof typeof sectionIcons]}
                </motion.div>

                {/* Progress Indicator */}
                <div className="w-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="w-full bg-gradient-to-t from-primary to-secondary rounded-full"
                    style={{ height: `${((getCurrentSectionIndex() + 1) / sections.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Section Counter */}
                <div className="text-xs text-gray-400 mt-2 font-medium">
                  {getCurrentSectionIndex() + 1}/{sections.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded State - All Sections */}
          <AnimatePresence>
            {isHovered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-3">
                {/* Header */}
                <div className="text-center mb-3 pb-2 border-b border-gray-700/50">
                  <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Navigation</h4>
                </div>

                {/* Section List */}
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                        ${
                          activeSection === section.id
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        }
                      `}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Section Icon */}
                      <div
                        className={`
                        flex-shrink-0 transition-colors duration-200
                        ${activeSection === section.id ? "text-primary" : "text-gray-400"}
                      `}
                      >
                        {sectionIcons[section.id as keyof typeof sectionIcons]}
                      </div>

                      {/* Section Label */}
                      <span className="text-sm font-medium truncate">{section.label}</span>

                      {/* Active Indicator */}
                      {activeSection === section.id && (
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Footer with Progress */}
                <div className="mt-3 pt-2 border-t border-gray-700/50">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(getScrollProgress())}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${getScrollProgress()}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hover Hint */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
              transition={{ delay: 2 }}
            >
              Hover to expand
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-b-2 border-t-transparent border-b-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
