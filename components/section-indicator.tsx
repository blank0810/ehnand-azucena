"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SectionIndicatorProps {
  sections: Array<{
    id: string
    label: string
  }>
}

export default function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show indicator after scrolling past hero section
      setIsVisible(scrollPosition > windowHeight * 0.5)

      // Find active section
      const currentSection = sections.find((section) => {
        const element = document.querySelector(`#${section.id}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.3
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
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

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block"
    >
      <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full p-2 shadow-lg">
        <div className="space-y-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                relative w-3 h-3 rounded-full transition-all duration-300 group
                ${activeSection === section.id ? "bg-primary scale-125" : "bg-gray-600 hover:bg-gray-500"}
              `}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${section.label} section`}
            >
              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {section.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
