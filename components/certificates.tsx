"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Award, Calendar, Globe, Database, Code, Shield, Wrench, Layers } from "lucide-react"
import Image from "next/image"

const certificates = [
  {
    title: "Cosmic Coding with Symfony 7",
    issuer: "SymfonyCasts",
    date: "March 2025",
    image: "/images/certificates/cosmic-coding-symfony7.png",
    verificationUrl: "https://symfonycasts.com/certificates/1437702CC155",
    category: "Web Development",
    icon: Globe,
  },
  {
    title: "Doctrine & the Database",
    issuer: "SymfonyCasts",
    date: "March 2025",
    image: "/images/certificates/doctrine-symfony7.png",
    verificationUrl: "https://symfonycasts.com/certificates/1437702CC155",
    category: "Database",
    icon: Database,
  },
  {
    title: "Symfony 7 Fundamentals",
    issuer: "SymfonyCasts",
    date: "March 2025",
    image: "/images/certificates/symfony7-fundamentals.png",
    verificationUrl: "https://symfonycasts.com/certificates/1437702CC155",
    category: "Web Development",
    icon: Globe,
  },
  {
    title: "React Basics",
    issuer: "Meta",
    date: "January 2025",
    image: "/images/certificates/react-basics.png",
    verificationUrl: "https://coursera.org/verify/SUL3C9D7GZK3",
    category: "Frontend",
    icon: Layers,
  },
  {
    title: "Advanced React",
    issuer: "Meta",
    date: "January 2025",
    image: "/images/certificates/advanced-react.png",
    verificationUrl: "https://coursera.org/verify/2PPLPYD9SZ8B",
    category: "Frontend",
    icon: Layers,
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "December 2024",
    image: "/images/certificates/responsive-web-design.png",
    verificationUrl: "https://www.freecodecamp.org/certification/Ehnand/responsive-web-design",
    category: "Web Development",
    icon: Globe,
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "December 2024",
    image: "/images/certificates/javascript-algorithms.png",
    verificationUrl: "https://www.freecodecamp.org/certification/Ehnand/javascript-algorithms-and-data-structures-v8",
    category: "Programming",
    icon: Code,
  },
  {
    title: "CSX Cybersecurity Fundamentals Certificate (CSXF)",
    issuer: "Cybrary",
    date: "August 2023",
    image: "/images/certificates/csxf-cybersecurity.png",
    verificationUrl:
      "https://app.cybrary.it/profile/SimpleCanidae0202?tab=cert-completion&cert=CC-900adb08-fcfc-4837-b719-e9dcbf3129e4",
    category: "Cybersecurity",
    icon: Shield,
  },
  {
    title: "Intrusion Detection Setup",
    issuer: "Virtual Cyber Labs",
    date: "January 2023",
    image: "/images/certificates/intrusion-detection-setup.png",
    verificationUrl: "https://verification.givemycertificate.com/v/944bf71e-ac18-468c-ad61-637f7cd7d10a",
    category: "Cybersecurity",
    icon: Shield,
  },
  {
    title: "Blue Teaming Internship",
    issuer: "Virtual Cyber Labs",
    date: "January 2023",
    image: "/images/certificates/blue-teaming-internship.png",
    verificationUrl: "https://academy.virtualcyberlabs.com/verify-certificate?serialno=BKS2KRNH",
    category: "Cybersecurity",
    icon: Shield,
  },
  {
    title: "Technical Support Fundamentals",
    issuer: "Google",
    date: "November 2022",
    image: "/images/certificates/technical-support-google.png",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/SWNULUC8VLYL",
    category: "IT Support",
    icon: Wrench,
  },
]

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="certificates" className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Certificates & Achievements
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Continuous learning and professional development through industry-recognized certifications and courses.
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => {
            const IconComponent = cert.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden flex flex-col h-full"
              >
                {/* Certificate Image with Enhanced Category Badge */}
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-800">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Enhanced Category Badge with Icon - matching project style exactly */}
                  <div className="absolute top-3 right-3">
                    <motion.span
                      className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-medium backdrop-blur-sm shadow-lg ring-2 ring-black/30 flex items-center gap-1.5 whitespace-nowrap transition-all duration-300 hover:bg-primary/30 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={`${cert.category} Certificate`}
                    >
                      <IconComponent className="h-3 w-3" />
                      <span className="font-bold tracking-wide">{cert.category}</span>
                    </motion.span>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2 text-gray-400">
                    <Award className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-gray-400">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{cert.date}</span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <motion.a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center gap-2 text-sm w-full justify-center py-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify Certificate
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
