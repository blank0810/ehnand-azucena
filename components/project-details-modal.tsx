"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Calendar, User, MapPin, Award, Layers } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import EnhancedStatusBadge from "./enhanced-status-badge"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  period: string
  role: string
  status: string
  category: string
  liveUrl?: string
  githubUrl?: string
}

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!project) return null

  const getDetailedDescription = (title: string) => {
    const descriptions: { [key: string]: string } = {
      "Adam One (Unified Document Matching Platform)": `
        Adam One is a unified document matching platform built for a Swiss petrol station company. It consolidates 20 independent services into a single mono-repo, automating the reconciliation of pickup slips, invoices, purchases, and delivery notes across 4 companies (CICA, SOCAR, LANDI, MINEROL) and 8 petrol stations.

        **Architecture & Scale:**

        • **20 Services** organized into 5 categories: Document Matching (10), Data Management (2), Reporting (3), Orchestration (2), and Automation (3)
        • **10 Matching Algorithms** — each tailored per company with varying criteria (group matching, direct matching, two-pass, delta-based, 3-way verification)
        • **Feature-first mono-repo** — each service is self-contained with its own config, routes, controller, service, and matching logic

        **Key Capabilities:**

        • **Daily Matching Orchestrator** — Runs all 12 operations sequentially: duplicate cleanup, 4 pickup/invoice matchings, 3 pickup/purchase matchings, invoice/purchase reconciliation, 3-way verification, station reports, and inventory summaries
        • **WhatsApp Image Classification** — Automated pipeline that fetches WhatsApp group images, classifies documents using AI (Llama Extract), and routes them via email with attachments
        • **Wholesale Invoice Generator** — Generates invoices with PDF creation, QR bills, automatic numbering, and VAT calculation
        • **Data Validation Pipeline** — 5-type integrity checks across 13 RAW sheets with Gemini-powered extraction verification and row protection

        **Automation Pipeline:**

        WhatsApp Daily (3 PM) → Email Processing → Relay Batch Tracker → Daily Matching (all 12 steps) → Inventory Summary + Station Reports → WhatsApp Summaries with verification status

        **Infrastructure:**

        Self-hosted on Hetzner VPS with PM2 process management, node-cron scheduling, MongoDB for state tracking, and GitHub Actions CI/CD. All document data flows through Google Sheets API with dynamic column lookup for resilience.

        **Impact:**

        Replaced manual document reconciliation across thousands of records, providing automated matching with visual formatting, match status tracking, and daily summary reports — serving as the operational backbone for the company's document processing workflow.
      `,
      "EtzlPark Transaction Checker": `
        EtzlPark Transaction Checker is a financial reconciliation system for Etzelpark fuel stations in Switzerland. It contains 6 independent Node.js matching engines, each reconciling transactions between a specific payment terminal system and its settlement provider.

        **Terminal Systems & Settlement Providers:**

        • **KSW-WorldLine** — Matches KSW terminal transactions against WorldLine card settlements using ID-based matching (BelegNrOnline + TrxRefNo) with ±1.00 CHF tolerance
        • **KSW-Post** — Matches KSW PostFinance transactions against POST settlements using primary ID match with time ±5min and amount ±0.10 CHF verification fallback
        • **Hectronic-TWINT** — Two-phase engine: Phase 1 ID-based matching, Phase 2 time ±3min + amount ±2 CHF + location mapping fallback, with TWINT fee normalization at 0.65%
        • **Hectronic-Post** — Matches Hectronic XML terminal data against POST settlements using Terminal ID + time ±3min + amount ±0.01 CHF tolerance
        • **Traffitec-Post** — Matches Traffitec terminals against POST settlements using Terminal ID + time ±3min + amount ±0.05 CHF tolerance with dynamic payment type filtering
        • **Traffitec-Nexi** — Two-tier engine: Tier 1 map-based composite key lookup (TerminalID + Date + AuthCode) covering 99% of matches with PAN last-4 disambiguation, Tier 2 fallback on time window + amount tolerance

        **Key Design Principles:**

        • Each matcher is a standalone Node.js project — independent installation and execution
        • Full pipeline in a single command (prepare + match), or step-by-step execution
        • Duplicate prevention — each settlement transaction can only match once across all matchers
        • Swiss financial format handling — semicolon-delimited CSVs with comma decimal separators
        • Reports generated in both CSV and JSON formats (matched, missing, discrepancies, unmatched)

        **Impact:**

        Automates the reconciliation of thousands of fuel station payment transactions across 3 terminal systems and 4 settlement providers, identifying matched transactions, missing records, overpaid/underpaid discrepancies, and unmatched settlements — replacing manual spreadsheet comparison.
      `,
      "REPSShield (Real Estate Professional Compliance Platform)": `
        REPSShield is a purpose-built SaaS solution addressing one of the biggest challenges in the real estate sector: preserving IRS REP status under Section 469(c)(7). Qualifying professionals can save $50,000+ annually in taxes by deducting unlimited rental property losses—but compliance requires 750+ hours of documented real estate activity, material participation, and meticulous recordkeeping.

        **Key Features & Capabilities:**
        
        • **Intelligent Time Tracking & Validation** - Real-time logging, activity classification, and voice-to-text entries that meet IRS requirements
        • **AI Compliance Engine** - Predicts qualification status, detects risks, and auto-classifies activities from emails, invoices, and receipts
        • **Property & Portfolio Management** - Multi-property activity logs, material participation analysis, and ROI insights
        • **Audit-Ready Reporting** - Professional, IRS-formatted reports with real-time dashboards and goal tracking
        • **Seamless Integrations** - Google Calendar, Gmail, property management systems, and export formats for CPAs
        • **Collaboration Tools** - Secure CPA sharing, role-based team management, and white-label options for firms

        **Target Market & Impact:**
        The platform serves high-income real estate investors, professionals (agents, managers, attorneys), property management companies, and accounting firms. It not only safeguards tax savings but also boosts operational efficiency, enabling firms to scale client management while delivering premium services.

        **Technical Excellence:**
        Backed by scalable cloud architecture, bank-level security, and a forward-looking roadmap including international tax support, syndication management, and predictive compliance insights. REPSShield positions itself as the definitive compliance solution in a $500M+ market.

        **ROI & Value Proposition:**
        At its core, REPSShield provides peace of mind: reducing audit anxiety, saving time, and protecting millions in tax benefits—delivering up to 130x ROI for individual users and major efficiency gains for firms.

        Visit the platform at: https://repsshield.com
      `,
      "MemberPulse (SaaS CPD Platform)": `
        MemberPulse is a comprehensive multi-tenant SaaS platform designed for professional associations and organizations. 
        The platform features a complete ecosystem including:
        
        • **Course Management System** - Create, manage, and deliver professional development courses
        • **Event Management** - Full-featured event planning, registration, and management
        • **Subscription System** - Flexible membership tiers and billing management
        • **Job Board** - Career opportunities and professional networking
        • **Business Directory** - Member and organization listings
        • **Sponsorship Management** - Corporate partnership and sponsorship tracking
        • **CPD Points Tracking** - Continuing Professional Development credit system
        
        Built with enterprise-grade security, scalability, and multi-tenancy in mind, supporting both individual professionals and large organizations.
        
        Visit the platform at: https://memberpulse.com.au
      `,
      PlayNow: `
        PlayNow is an innovative SaaS marketplace platform that connects merchants with customers through a unique coupon-based system. 
        The platform enables:
        
        • **Merchant Dashboard** - Comprehensive tools for businesses to create and manage deals
        • **Coupon Management** - Dynamic pricing and promotional campaign tools
        • **Multi-Category Support** - Sports venues, activities, goods, and services
        • **User Experience** - Intuitive interface for discovering and purchasing deals
        • **Payment Integration** - Secure transaction processing and merchant payouts
        • **Analytics & Reporting** - Performance tracking for merchants and platform metrics
        
        The beta version successfully demonstrated the core marketplace functionality before project handoff, showcasing the potential for scalable deal distribution.
      `,
      "Weather Forecasting Application": `
        A modern, responsive weather application built with React and integrated with the OpenWeather API. 
        Key features include:
        
        • **Real-time Weather Data** - Current conditions, forecasts, and weather alerts
        • **Geolocation Support** - Automatic location detection and manual city search
        • **Interactive UI** - Clean, intuitive interface with weather visualizations
        • **Performance Optimized** - Achieving 95% uptime with efficient API usage
        • **Responsive Design** - Seamless experience across desktop and mobile devices
        • **Error Handling** - Robust error management and user feedback systems
        
        Deployed on Vercel with continuous integration and monitoring for optimal performance.
      `,
    }

    return descriptions[title] || project.description
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>

            {/* Project Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

              {/* Enhanced Status Badge */}
              <div className="absolute top-4 left-4">
                <EnhancedStatusBadge status={project.status} size="md" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Layers className="h-4 w-4" />
                  <span className="font-medium">{project.category}</span>
                </div>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="text-white font-medium">{project.period}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <p className="text-white font-medium">{project.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-white font-medium">{project.status}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                <div className="prose prose-gray max-w-none">
                  <div
                    className="text-gray-300 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: getDetailedDescription(project.title).replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-primary">$1</strong>',
                      ),
                    }}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full font-medium hover:bg-primary/30 transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2 px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Live Project
                  </motion.a>
                )}

                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2 px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-5 w-5" />
                    View Source Code
                  </motion.a>
                )}

                {!project.liveUrl && !project.githubUrl && (
                  <div className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 text-gray-400 rounded-lg">
                    <MapPin className="h-5 w-5" />
                    Internal/Confidential Project
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
