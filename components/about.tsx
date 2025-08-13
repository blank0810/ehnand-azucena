"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Download } from "lucide-react"
import Image from "next/image"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/Ehnand_Azucena_CV.pdf" // Using your original file
    link.download = "Ehnand_Azucena_CV.pdf" // Using your original filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="about" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          About Me
        </motion.h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/images/profile.jpg"
                  alt="Ehnand Azucena"
                  fill
                  className="rounded-full object-cover border-4 border-primary/30 relative z-10"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-4">Backend-focused Full Stack Engineer with production experience</h3>
            <p className="text-gray-300 leading-relaxed">
              I specialize in building robust backend systems and scalable web applications using modern technologies
              like Laravel, Symfony, NestJS, and various database systems. With hands-on experience in multi-tenant SaaS
              platforms, enterprise-grade internal tools, and mission-critical systems for schools, e-commerce, and
              associations.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My expertise spans across delivering robust APIs, scalable backend systems, and optimized databases, with
              growing experience in Docker-based DevOps and CI/CD pipelines. I'm passionate about creating efficient
              solutions that solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                onClick={handleDownload}
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-5 w-5" />
                Download Resume
              </motion.button>
              <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
