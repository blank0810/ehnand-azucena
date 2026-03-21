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
      "Adam AI (Multi-Tenant Document Intelligence SaaS)": `
        Adam AI is a multi-tenant B2B document intelligence SaaS platform that enables tenants to subscribe to document-processing modules, commission custom pipelines, and publish to a Module Store. Built for the first tenant -- a Swiss energy client operating a petrol station group.

        **Architecture & Scale:**

        • **Module Marketplace** — tenants subscribe to capabilities, commission custom modules, and publish to the Module Store for cross-tenant distribution
        • **Agentic AI Pipelines** — 8 comparison algorithms power document matching with configurable tolerance, multi-pass strategies, and 3-way verification
        • **AI-Powered Configuration** — schema auto-detection, live extraction preview, and Gemini-driven matching rules eliminate manual setup

        **Key Capabilities:**

        • **Document Processing Pipelines** — Automated ingestion, classification, and extraction across invoices, pickup slips, delivery notes, and purchase orders
        • **Smart Matching Engine** — Reconciles documents across multiple companies and stations with per-tenant algorithm configuration
        • **Live Extraction Preview** — Real-time feedback loop where users see extraction results before committing pipeline configurations
        • **Multi-Tenant Isolation** — Each tenant operates in a fully isolated environment with independent module subscriptions and data boundaries

        **Technical Stack:**

        TanStack Start with React 19, TypeScript, PostgreSQL 16 with Drizzle ORM, Trigger.dev v4 for background jobs, LlamaCloud for document AI, Google Gemini for intelligent matching, Cloudflare R2 for storage and Email Workers for notifications, Better Auth for authentication, and Bun as the runtime.

        **Impact:**

        Transforms manual document reconciliation into an automated, tenant-configurable intelligence platform -- enabling non-technical users to build and deploy document processing workflows through AI-assisted configuration rather than custom development.
      `,
      "Swiss Energy Platform Suite": `
        The Swiss Energy Platform Suite consolidates 20 services and 6 financial matching engines serving a Swiss petrol station group. It automates the reconciliation of pickup slips, invoices, purchases, and delivery notes across 4 companies (CICA, SOCAR, LANDI, MINEROL) and 8 petrol stations.

        **Services Architecture:**

        • **20 Services** organized into 5 categories: Document Matching (10), Data Management (2), Reporting (3), Orchestration (2), and Automation (3)
        • **6 Financial Matching Engines** — Each reconciles transactions between a specific payment terminal system and its settlement provider (KSW-WorldLine, KSW-Post, Hectronic-TWINT, Hectronic-Post, Traffitec-Post, Traffitec-Nexi)
        • **10 Matching Algorithms** — tailored per company with varying criteria (group matching, direct matching, two-pass, delta-based, 3-way verification)

        **Key Capabilities:**

        • **Daily Matching Orchestrator** — Runs all 12 operations sequentially: duplicate cleanup, 4 pickup/invoice matchings, 3 pickup/purchase matchings, invoice/purchase reconciliation, 3-way verification, station reports, and inventory summaries
        • **WhatsApp AI Pipeline** — Automated document classification that fetches WhatsApp group images, classifies documents using AI, and routes them via email with attachments
        • **Wholesale Invoice Generator** — Generates invoices with PDF creation, QR bills, automatic numbering, and VAT calculation
        • **Transaction Reconciliation** — Multi-tier matching with Swiss financial format handling, duplicate prevention, and tolerance-based matching across 3 terminal systems and 4 settlement providers

        **Infrastructure:**

        Self-hosted on Hetzner VPS with PM2 process management, node-cron scheduling, MongoDB for state tracking, and GitHub Actions CI/CD. All document data flows through Google Sheets API with dynamic column lookup.

        **Impact:**

        Replaced manual document reconciliation and financial transaction matching across thousands of records, serving as the operational backbone for the company's entire document processing and payment verification workflow.
      `,
      "Initao Water Billing System": `
        The Initao Water Billing System is a government enterprise platform won via competitive bidding for the Municipality of Initao. It manages the full water billing lifecycle from meter reading to payment collection.

        **Key Capabilities:**

        • **Full Billing Lifecycle** — Meter reading capture, consumption calculation, bill generation, payment collection, and receipt issuance in a single integrated workflow
        • **Offline-First Mobile API** — Field workers can record meter readings without connectivity, with automatic synchronization when back online via Laravel Sanctum-secured endpoints
        • **WebSocket Notifications** — Real-time updates via Laravel Reverb for payment confirmations, overdue alerts, and system events
        • **Double-Entry Ledger** — Audit-grade financial integrity with proper accounting entries for every transaction, ensuring full traceability for government audits

        **Technical Stack:**

        Laravel 12 with PHP 8.2+, MySQL 8 for relational data, Alpine.js 3 and Tailwind CSS 3 for the frontend, Laravel Reverb for WebSocket support, Pest PHP for testing, Docker for containerized deployment, and Laravel Sanctum for API authentication.

        **Architecture Highlights:**

        • **Multi-zone billing** — Supports different rate structures across municipal water zones
        • **Penalty and discount engine** — Configurable late payment penalties and early payment discounts
        • **Audit trail** — Every modification to billing records is logged with user attribution and timestamps
        • **Report generation** — Monthly collection reports, outstanding balance summaries, and consumption analytics for municipal officials

        **Impact:**

        Digitized water billing operations for the municipality, replacing manual ledger-based processes with a system that ensures accurate billing, real-time payment tracking, and audit-ready financial records.
      `,
      "REPSShield (AI-Powered Real Estate Tax Compliance)": `
        REPSShield is a purpose-built SaaS platform protecting real estate investors' IRS Real Estate Professional (REP) status under Section 469(c)(7). Qualifying professionals can save $50,000+ annually in taxes by deducting unlimited rental property losses -- but compliance requires 750+ hours of documented real estate activity, material participation, and meticulous recordkeeping.

        **Three AI Modes:**

        • **Agentic Time-Tracking** — AI auto-classifies real estate activities, validates entries against IRS requirements, and provides real-time logging with voice-to-text support
        • **RAG Advisory** — Retrieval-augmented generation over 282 IRS documents, enabling natural-language queries about tax compliance with source citations
        • **14-Check IRS Examiner Simulation** — Runs a comprehensive audit simulation mirroring actual IRS examination procedures to identify compliance gaps before they become problems

        **Key Features & Capabilities:**

        • **Multi-Provider Circuit-Breaker Failover** — Automatic failover across AI providers ensures zero downtime for compliance-critical operations
        • **Calendar Sync** — Google Calendar integration for automatic activity capture and hour tracking
        • **Stripe Billing** — Subscription management with usage-based pricing tiers
        • **Mobile Apps** — Native iOS and Android apps via Capacitor.js for on-the-go time tracking
        • **Audit-Ready Reporting** — Professional, IRS-formatted reports with real-time dashboards and goal tracking
        • **CPA Collaboration** — Secure sharing, role-based team management, and export formats for accounting firms

        **Technical Stack:**

        React 18 frontend, Node.js/Express backend, TypeScript throughout, PostgreSQL 16 (Neon) with Drizzle ORM, Vercel AI SDK v4 for multi-provider AI integration, Stripe for payments, Capacitor.js for mobile, Astro 5 for the marketing site, Cloudflare Workers for edge functions, and Trigger.dev for background jobs.

        **Impact:**

        Protects millions in tax benefits for real estate professionals -- reducing audit anxiety, saving time, and delivering up to 130x ROI for individual users and major efficiency gains for accounting firms.

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
