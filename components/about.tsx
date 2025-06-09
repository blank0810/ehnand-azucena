"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Download } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-full md:h-96 overflow-hidden rounded-lg">
              <Image
                src="/images/profile.jpg"
                alt="Ehnand Azucena"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-5 -left-5 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Full Stack Systems Engineer</h3>
            <p className="text-gray-300 mb-6">
              I'm a driven Full Stack Systems Engineer with deep expertise in web development, database management, and
              cloud infrastructure. I craft scalable, secure, and user-focused applications by mastering both frontend
              and backend technologies.
            </p>
            <p className="text-gray-300 mb-6">
              By fusing technical precision with a keen understanding of business goals, I deliver solutions that exceed
              expectations while staying ahead through embracing cutting-edge technologies.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-gray-400">Initao, Northern Mindanao, Philippines</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-gray-400">ehnand.azucena00@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Study</h4>
                <p className="text-gray-400">Mindanao State University - Naawan</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Employment</h4>
                <p className="text-gray-400">Cloudesk Pty. Ltd. and WhiteTower</p>
              </div>
            </div>

            <motion.a
              href="/resume.pdf"
              download="Ehnand_Azucena_CV.pdf"
              className="btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4 mr-2" /> Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
