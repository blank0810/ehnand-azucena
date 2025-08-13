"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Timeline from "./timeline"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "ClouDesk Pty. Ltd",
    companyUrl: "https://cloudesk.co/",
    location: "Remote | Sydney, NSW Australia",
    period: "Jan 2025 – Present",
    description: [
      "Maintained and patched educational platform for ICOM International School (Malaysia) and its China-based internal platform",
      "Enhanced stability for PG Pay, a high-value e-commerce platform for precious metals",
      "Led backend development for MemberPulse, a multi-tenant SaaS platform supporting CPD points, job boards, events, sponsorships, and directories",
      "Integrated third-party APIs (Xero, Stripe, HubSpot) into key features, supporting scalable payments and CRM workflows",
      "Stack: Symfony, PostgreSQL, Bootstrap, Vultr, OAuth2, Bitbucket CI/CD",
    ],
  },
  {
    title: "IT Specialist",
    company: "EduQuest Inc.",
    companyUrl: "https://eduquestph.com/",
    location: "Cagayan De Oro City, Northern Mindanao, Philippines",
    period: "Jul 2024 – Jan 2025",
    description: [
      "Re-architected LMS infrastructure, reducing downtime by 20% and boosting user engagement by 30%",
      "Automated reporting using Google Sheets & Gmail APIs, cutting manual work by 40%",
      "Trained teachers, students, and parents on the updated LMS, increasing platform adoption by 50%",
    ],
  },
  {
    title: "System And Database Specialist | Internship",
    company: "MORESCO-1",
    companyUrl: "https://moresco1.com/",
    location: "Poblacion, Laguindingan, Misamis Oriental",
    period: "Jan 2024 - May 2024",
    description: [
      "Delivered M1-HRIS, reducing HR processing time by 40%, and M1-Helpdesk, reducing ticket resolution by 35%",
      "Optimized SQL queries, improving data retrieval speed by 20%",
      "Hardened data security, decreasing vulnerability reports by 50%",
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Professional Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          My journey in building scalable systems, optimizing databases, and delivering impactful solutions across
          various industries.
        </motion.p>

        <div ref={ref}>
          <Timeline items={experiences} />
        </div>
      </div>
    </section>
  )
}
