"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-white py-12 relative">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ehnand Azucena</h3>
            <p className="text-gray-400 mb-4">
              Full Stack Systems Engineer specializing in web development, database management, and cloud
              infrastructure.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/blank0810"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ehnand-azucena-3028a7194"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:ehnand.azucena00@gmail.com"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#certificates" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Certificates
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#education" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Education
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p className="text-gray-400 mb-2">Initao, Northern Mindanao, Philippines</p>
            <p className="text-gray-400 mb-2">ehnand.azucena00@gmail.com</p>
            <p className="text-gray-400">09534678287 / 09128956168</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Ehnand Azucena. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-gray-800 rounded-full hover:bg-primary transition-colors duration-300"
            whileHover={{ y: -5 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
