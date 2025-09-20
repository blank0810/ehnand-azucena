"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import AnimatedBackground from "@/components/animated-background"
import ParallaxBackground from "@/components/parallax-background"
import ThemeSwitcher from "@/components/theme-switcher"
import ScrollProgress from "@/components/scroll-progress"
import Navigation from "@/components/navigation"
import SectionIndicator from "@/components/section-indicator"
import LinkPreviewTester from "@/components/link-preview-tester"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // 5 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Navigation */}
      <Navigation />

      {/* Section Indicator */}
      <SectionIndicator sections={sections} />

      {/* Progress Bar */}
      <ScrollProgress />

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Background Effects */}
      <AnimatedBackground />
      <ParallaxBackground />

      <AnimatePresence>
        {!isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certificates />
            <Education />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Link Preview Tester */}
      <LinkPreviewTester />
    </main>
  )
}
