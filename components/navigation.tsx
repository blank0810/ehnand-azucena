"use client"

import { useEffect } from "react"

import { useState } from "react"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, Briefcase, FolderOpen, Award, GraduationCap, Mail, ChevronUp } from "lucide-react"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const navItems: NavItem[] = [
    { id: "home", label: "Home", href: "#home", icon: <Home className="h-4 w-4" /> },
    { id: "about", label: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { id: "skills", label: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
    { id: "experience", label: "Experience", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "projects", label: "Projects", href: "#projects", icon: <FolderOpen className="h-4 w-4" /> },
    { id: "certificates", label: "Certificates", href: "#certificates", icon: <Award className="h-4 w-4" /> },
    { id: "education", label: "Education", href: "#education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "contact", label: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ]

  // Handle scroll events for active section detection and navigation styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Update navigation background based on scroll
      setIsScrolled(scrollPosition > 50)

      // Show back to top button after scrolling down
      setShowBackToTop(scrollPosition > windowHeight * 0.5)

      // Find active section based on scroll position
      const sections = navItems
        .map((item) => {
          const element = document.querySelector(item.href)
          if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + scrollPosition
            const elementHeight = rect.height

            return {
              id: item.id,
              top: elementTop,
              bottom: elementTop + elementHeight,
              inView: rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.3,
            }
          }
          return null
        })
        .filter(Boolean)

      // Find the section that's most in view
      const activeSection = sections.find((section) => section?.inView)
      if (activeSection) {
        setActiveSection(activeSection.id)
      }
    }

    handleScroll() // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80 // Account for fixed navigation height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false) // Close mobile menu after navigation
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-nav")
      const button = document.getElementById("mobile-nav-button")

      if (isOpen && nav && button && !nav.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${isScrolled ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg" : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <motion.button
              onClick={() => scrollToSection("#home")}
              className="flex items-center space-x-2 text-white font-bold text-xl hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EA</span>
              </div>
              <span className="hidden sm:inline">Ehnand Azucena</span>
            </motion.button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      activeSection === item.id
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-nav-button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-300"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-80 max-w-[85vw] bg-gray-900/98 backdrop-blur-xl border-l border-gray-800 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">EA</span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">Ehnand Azucena</h2>
                      <p className="text-gray-400 text-sm">Full Stack Developer</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-2 px-6">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300
                          ${
                            activeSection === item.id
                              ? "bg-primary/20 text-primary border border-primary/30 shadow-lg"
                              : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          }
                        `}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`
                          p-2 rounded-lg transition-colors duration-300
                          ${activeSection === item.id ? "bg-primary/30" : "bg-gray-800/50"}
                        `}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-medium">{item.label}</span>
                          {activeSection === item.id && (
                            <div className="text-xs text-primary/80 mt-0.5">Current section</div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-800">
                  <div className="text-center text-gray-400 text-sm">
                    <p>© 2025 Ehnand Azucena</p>
                    <p>Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-30 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5 group-hover:animate-bounce" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Back to top
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation Progress Indicator */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-30 h-1 bg-gray-800/50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
          style={{
            scaleX:
              typeof window !== "undefined"
                ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
                : 0,
          }}
        />
      </motion.div>
    </>
  )
}
