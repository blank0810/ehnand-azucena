"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Timeline from "./timeline"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Whitetower Digital Pty Ltd. & ClouDesk Pty. Ltd",
    location: "Kent Street, Sydney, NSW Australia 2000",
    period: "Jan 2025 – Present",
    description: [
      "Developing and maintaining full-stack web applications using modern technologies.",
      "Collaborating with cross-functional teams to deliver high-quality software solutions.",
      "Implementing best practices for code quality, security, and performance.",
    ],
  },
  {
    title: "IT Specialist",
    company: "EduQuest Inc.",
    location: "Cagayan De Oro City, Northern Mindanao, Philippines",
    period: "Jul 2024 – Jan 2025",
    description: [
      "Overhauled LMS infrastructure, slashing downtime by 20% and lifting engagement by 30% with data-driven updates.",
      "Trained educators, driving 50% higher adoption, and automated reporting with analytics.",
    ],
  },
  {
    title: "System And Database Specialist | Internship",
    company: "MORESCO-1",
    location: "Poblacion, Laguindingan, Misamis Oriental",
    period: "Jan 2024 - May 2024",
    description: [
      "Delivered M1-HRIS, cutting HR processing by 40%, and M1-Helpdesk, speeding ticket resolution by 35%.",
      "Hardened security (50% fewer vulnerabilities) and boosted data retrieval by 20% with database tweaks.",
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, 100])

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gray-900 relative">
      <motion.div style={{ opacity, y }} className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Professional Experience
        </motion.h2>

        <Timeline items={experiences} />
      </motion.div>
    </section>
  )
}
