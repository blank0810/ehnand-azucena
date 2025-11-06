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
    const link = document.createElement("a")
    link.href = "/Ehnand CV.pdf"
    link.download = "Ehnand CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="about" className="py-20 bg-gray-900 relative">
      <div className="section-container" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 group">
                  <Image
                    src="/images/profile-new.jpg"
                    alt="Ehnand Azucena - Professional Full Stack Developer specializing in Laravel, React, and Symfony"
                    width={320}
                    height={320}
                    priority={true}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary/15 rounded-full blur-md animate-pulse delay-1000"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6 order-1 md:order-2"
          >
            <h3 className="text-2xl font-bold mb-4">Professional Full Stack Developer with Production Experience</h3>
            <p className="text-gray-300 leading-relaxed">
              I'm a skilled <strong>Full Stack Developer</strong> and <strong>Systems Engineer</strong> specializing in
              building robust backend systems and scalable web applications. My expertise includes{" "}
              <strong>Laravel development</strong>, <strong>React applications</strong>,{" "}
              <strong>Symfony frameworks</strong>, and comprehensive database management systems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With hands-on experience in multi-tenant <strong>SaaS platform development</strong>, enterprise-grade
              internal tools, and mission-critical systems for schools, e-commerce, and professional associations. I
              excel at delivering robust APIs, scalable backend architectures, and optimized database solutions with
              growing expertise in Docker-based DevOps and CI/CD pipelines.
            </p>
            <p className="text-gray-300 leading-relaxed">
              As a <strong>remote developer</strong> available for <strong>freelance projects</strong>, I'm passionate
              about creating efficient, modern solutions that solve real-world business problems and drive measurable
              results.
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
