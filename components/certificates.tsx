"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, ExternalLink, Calendar, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Certificate data from the provided table
const certificates = [
  {
    title: "Symfony 7 Fundamentals: Services, Config & Environments",
    issuer: "SymfonyCasts",
    date: "Mar. 2025",
    image: "/images/certificates/symfony7-fundamentals.png",
    link: "https://symfonycasts.com/certificates/5B1DF7A5C158",
    description: "Mastered Symfony 7 fundamentals including services, configuration, and environment setup.",
  },
  {
    title: "Doctrine, Symfony 7 & the Database",
    issuer: "SymfonyCasts",
    date: "Mar. 2025",
    image: "/images/certificates/doctrine-symfony7.png",
    link: "https://symfonycasts.com/certificates/DD1321ADC161",
    description: "Advanced database integration with Symfony 7 using Doctrine ORM for efficient data management.",
  },
  {
    title: "Cosmic Coding with Symfony 7",
    issuer: "SymfonyCasts",
    date: "Mar. 2025",
    image: "/images/certificates/cosmic-coding-symfony7.png",
    link: "https://symfonycasts.com/certificates/1437702CC155",
    description: "Advanced Symfony 7 development techniques and best practices for building robust applications.",
  },
  {
    title: "Advanced React",
    issuer: "Meta",
    date: "Jan. 2025",
    image: "/images/certificates/advanced-react.png",
    link: "https://coursera.org/verify/2PPLPYD9SZ8B",
    description: "Advanced React concepts including hooks, context API, performance optimization, and testing.",
  },
  {
    title: "React Basics",
    issuer: "Meta",
    date: "Jan. 2025",
    image: "/images/certificates/react-basics.png",
    link: "https://coursera.org/verify/SUL3C9D7GZK3",
    description: "Fundamentals of React including components, props, state, and basic application architecture.",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "Dec. 2024",
    image: "/images/certificates/javascript-algorithms.png",
    link: "https://www.freecodecamp.org/certification/Ehnand/javascript-algorithms-and-data-structures-v8",
    description:
      "Comprehensive understanding of JavaScript algorithms and data structures for efficient problem-solving.",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Dec. 2024",
    image: "/images/certificates/responsive-web-design.png",
    link: "https://www.freecodecamp.org/certification/Ehnand/responsive-web-design",
    description: "Creating responsive web layouts using HTML, CSS, Flexbox, Grid, and modern design principles.",
  },
  {
    title: "CSX Cybersecurity Fundamentals Certificate (CSXF)",
    issuer: "Cybrary",
    date: "Aug. 2023",
    image: "/images/certificates/csxf-cybersecurity.png",
    link: "https://app.cybrary.it/profile/SimpleCanidae0202?tab=cert-completion&cert=CC-900adb08-fcfc-4837-b719-e9dcbf3129e4",
    description:
      "Foundational knowledge in cybersecurity principles, threats, vulnerabilities, and basic security measures.",
  },
  {
    title: "Civil Service Eligibility",
    issuer: "Civil Service Commission",
    date: "N/A",
    image: "/placeholder.svg?height=300&width=400&text=Civil+Service+Eligibility",
    link: null,
    description: "Professional eligibility for government service positions in the Philippines.",
  },
  {
    title: "Blue Teaming Internship",
    issuer: "Virtual Cyber Labs",
    date: "Jan. 2023",
    image: "/images/certificates/blue-teaming-internship.png",
    link: "https://verification.givemycertificate.com/v/944bf71e-ac18-468c-ad61-637f7cd7d10a",
    description: "Practical experience in defensive cybersecurity operations, threat detection, and incident response.",
  },
  {
    title: "Technical Support Fundamentals",
    issuer: "Google",
    date: "Nov. 2022",
    image: "/images/certificates/technical-support-google.png",
    link: "https://www.coursera.org/account/accomplishments/verify/SWNULUC8VLYL",
    description: "Core skills for IT support including troubleshooting, customer service, and technical knowledge.",
  },
  {
    title: "Intrusion Detection Setup",
    issuer: "Virtual Cyber Labs",
    date: "Oct. 2022",
    image: "/images/certificates/intrusion-detection-setup.png",
    link: "https://academy.virtualcyberlabs.com/verify-certificate?serialno=BKS2KRNH",
    description: "Hands-on experience configuring and managing intrusion detection systems for network security.",
  },
]

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterIssuer, setFilterIssuer] = useState("")

  // Get unique issuers for filtering
  const issuers = [...new Set(certificates.map((cert) => cert.issuer))]

  // Filter certificates based on search term and issuer filter
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIssuer = filterIssuer === "" || cert.issuer === filterIssuer
    return matchesSearch && matchesIssuer
  })

  return (
    <section id="certificates" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Professional Certifications
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Continuous learning and professional development are core values in my career. Here are some of my key
          certifications.
        </motion.p>

        {/* Search and filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex flex-col md:flex-row gap-4 justify-center"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
            />
          </div>

          <select
            value={filterIssuer}
            onChange={(e) => setFilterIssuer(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Issuers</option>
            {issuers.map((issuer, index) => (
              <option key={index} value={issuer}>
                {issuer}
              </option>
            ))}
          </select>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card overflow-hidden group"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.5)",
              }}
              onClick={() => setSelectedCertificate(certificate)}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-md cursor-pointer">
                <Image
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.title}
                  fill
                  className="object-contain bg-white p-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end justify-center">
                  <p className="text-white p-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                    View Certificate
                  </p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 flex items-start">
                  <Award className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" />
                  <span>{certificate.title}</span>
                </h3>
                <p className="text-gray-400 mb-2">{certificate.issuer}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{certificate.date}</span>
                </div>
                <p className="text-gray-300 mb-4">{certificate.description}</p>
                {certificate.link && (
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-white flex items-center transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" /> Verify Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No certificates match your search criteria.</p>
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-64 md:h-80 relative">
                  <Image
                    src={selectedCertificate.image || "/placeholder.svg"}
                    alt={selectedCertificate.title}
                    fill
                    className="object-contain bg-white p-4"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 bg-gray-800/80 p-2 rounded-full text-white hover:bg-gray-700"
                  onClick={() => setSelectedCertificate(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedCertificate.title}</h3>
                <p className="text-primary text-lg mb-2">{selectedCertificate.issuer}</p>
                <div className="flex items-center text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{selectedCertificate.date}</span>
                </div>

                <p className="text-gray-300 mb-6">{selectedCertificate.description}</p>

                {selectedCertificate.link && (
                  <Link
                    href={selectedCertificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Verify Certificate
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
