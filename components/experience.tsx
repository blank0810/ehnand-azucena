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
      "Led backend development for MemberPulse, a multi-tenant SaaS platform serving professional associations across Australia — CPD tracking, job boards, events, sponsorships, and directories",
      "Integrated Stripe, Xero, HubSpot, and PayPal APIs for cross-tenant payment processing, CRM synchronization, and automated invoicing",
      "Built computer vision pipelines using Ultralytics YOLO to automate product classification and employee tracking for warehouse operations",
      "Stabilized PG Pay, a high-value e-commerce platform for precious metals — resolved critical transaction reliability issues and payment edge cases",
      "Maintained and extended educational platforms for ICOM International School (Malaysia) and a China-based internal learning system using Laravel",
      "Stack: Symfony, PostgreSQL, Bootstrap, Vultr, OAuth2, Bitbucket CI/CD",
    ],
  },
  {
    title: "Software Developer (IT Systems)",
    company: "EduQuest Inc.",
    companyUrl: "https://eduquestph.com/",
    location: "Cagayan De Oro City, Northern Mindanao, Philippines",
    period: "Jul 2024 – Jan 2025",
    description: [
      "Re-architected LMS infrastructure, reducing downtime by 20% and boosting user engagement by 30%",
      "Automated reporting using Google Sheets & Gmail APIs, cutting manual work by 40%",
      "Led platform onboarding for 200+ users (staff, students, parents), driving a 50% increase in LMS adoption",
    ],
  },
  {
    title: "Software Development Intern",
    company: "MORESCO-1",
    companyUrl: "https://moresco1.com/",
    location: "Poblacion, Laguindingan, Misamis Oriental",
    period: "Jan 2024 - May 2024",
    description: [
      "Developed features for M1-HRIS and M1-Helpdesk using Laravel and SQL Server, supporting centralized HR management and IT ticket resolution across multiple offices",
      "Optimized slow-running SQL queries for employee record retrieval, reducing page load times in the HRIS dashboard",
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
          {experiences && experiences.length > 0 ? (
            <Timeline items={experiences} />
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>Experience data is loading...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
