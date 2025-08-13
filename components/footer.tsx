"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import PerformanceWidget from "./performance-widget"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ehnand",
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/ehnand-azucena",
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:ehnandazucena@gmail.com",
      color: "hover:text-green-400",
    },
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.h3
              className="text-xl font-bold gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ehnand Azucena
            </motion.h3>
            <motion.p
              className="text-gray-400 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Full Stack Developer passionate about creating amazing web experiences
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800/50 rounded-full border border-gray-700/50 hover:border-primary/50 transition-all duration-300 ${link.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <PerformanceWidget />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Ehnand Azucena. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
