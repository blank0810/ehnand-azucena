"use client"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import ThreeDCube from "./3d-cube"
import TypingAnimation from "./typing-animation"

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "Full Stack Systems Engineer",
    "Laravel & React Specialist",
    "SaaS Platform Developer",
    "Database & Cloud Expert",
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/hero-bg.svg')] bg-cover bg-center opacity-10"></div>
      <div className="section-container z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 font-poppins">
              <span className="gradient-text">Ehnand</span> Azucena
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary h-10">
              <TypingAnimation texts={roles} typingSpeed={100} deletingSpeed={50} delayBetweenTexts={2000} />
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
              Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies.
              Expert in building scalable SaaS platforms, optimizing databases, and delivering enterprise-grade
              solutions.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="https://www.linkedin.com/in/ehnand-azucena-3028a7194"
                target="_blank"
                className="btn-outline flex items-center gap-2 group"
              >
                <Linkedin size={18} className="group-hover:animate-pulse" /> LinkedIn
              </Link>
              <Link
                href="https://github.com/blank0810"
                target="_blank"
                className="btn-outline flex items-center gap-2 group"
              >
                <Github size={18} className="group-hover:animate-pulse" /> GitHub
              </Link>
              <Link href="mailto:ehnand.azucena00@gmail.com" className="btn-outline flex items-center gap-2 group">
                <Mail size={18} className="group-hover:animate-pulse" /> Email
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="relative">
              <ThreeDCube />
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <Link href="#about">
            <ArrowDown className="h-8 w-8 text-primary" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
