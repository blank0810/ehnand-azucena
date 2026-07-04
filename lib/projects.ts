// Single source of truth for portfolio projects.
//
// Consumed by the Projects section (components/projects.tsx) and the per-project
// detail pages (app/projects/[slug]/page.tsx) + the sitemap. Keeping it here means
// titles, descriptions, and the long-form copy live in ONE place — no drift between
// the cards, the detail routes, and the structured data.
//
// All projects render identically here; curation/highlighting is the CV's job, not the portfolio's.
export interface Project {
  slug: string
  title: string
  /** Short card description — keep unique and concrete (~40+ words). */
  description: string
  /** Long-form copy for the detail page. Supports **bold** and bullet lines. */
  longDescription?: string
  image: string
  technologies: string[]
  period: string
  role: string
  status: string
  category: string
  liveUrl?: string
  githubUrl?: string
}

export const PROJECTS: Project[] = [
  // --------------------------------------------------- Production / Client Work
  {
    slug: "adam-ai",
    title: "Adam AI (Multi-Tenant Document Intelligence SaaS)",
    description:
      "B2B platform enabling tenants to subscribe to document-processing modules, commission custom pipelines, and publish to a Module Store. Agentic AI pipelines with 8 comparison algorithms power schema auto-detection, live extraction preview, and Gemini-driven matching rules for the first tenant -- a Swiss energy client operating a petrol station group.",
    longDescription: `
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
    image: "/images/projects/adam-one.png",
    technologies: ["TanStack Start", "React 19", "TypeScript", "PostgreSQL 16", "Drizzle ORM", "Trigger.dev v4", "LlamaCloud", "Google Gemini", "Cloudflare R2", "Better Auth", "Bun"],
    period: "Jan 2026 – Present",
    role: "Lead Developer",
    status: "Live Production",
    category: "SaaS Platform",
  },
  {
    slug: "repsshield",
    title: "REPSShield (AI-Powered Real Estate Tax Compliance)",
    description:
      "Three AI modes protect real estate investors' IRS REP status: agentic time-tracking that auto-classifies activities, RAG advisory over 282 IRS documents, and a 14-check IRS examiner simulation. Multi-provider circuit-breaker failover, calendar sync, Stripe billing, and mobile apps via Capacitor.js round out the platform.",
    longDescription: `
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
    `,
    image: "/images/projects/repsshield.png",
    technologies: ["React 18", "Node.js", "Express", "TypeScript", "PostgreSQL 16", "Drizzle ORM", "Vercel AI SDK v4", "Stripe", "Capacitor.js", "Astro 5", "Cloudflare Workers", "Trigger.dev"],
    period: "Aug 2025 – Present",
    role: "Backend Developer",
    status: "Live Production",
    category: "SaaS Platform",
    liveUrl: "https://repsshield.com",
  },
  {
    slug: "memberpulse",
    title: "MemberPulse (SaaS CPD Platform)",
    description:
      "Multi-tenant SaaS for professional associations, built from the ground up: CPD points tracking, courses, events, subscriptions, job boards, directories, and a sponsorship system. Supports both individual and organizational members on live, scalable infrastructure with cross-tenant payment and CRM integrations.",
    longDescription: `
      MemberPulse is a comprehensive multi-tenant SaaS platform designed for professional associations and organizations. The platform features a complete ecosystem including:

      • **Course Management System** — Create, manage, and deliver professional development courses
      • **Event Management** — Full-featured event planning, registration, and management
      • **Subscription System** — Flexible membership tiers and billing management
      • **Job Board** — Career opportunities and professional networking
      • **Business Directory** — Member and organization listings
      • **Sponsorship Management** — Corporate partnership and sponsorship tracking
      • **CPD Points Tracking** — Continuing Professional Development credit system

      Integrated Stripe, Xero, HubSpot, and PayPal for cross-tenant payment processing, CRM synchronization, and automated invoicing. Built with enterprise-grade security, scalability, and multi-tenancy in mind, supporting both individual professionals and large organizations.
    `,
    image: "/images/projects/memberpulse.png",
    technologies: ["Symfony", "Bootstrap", "Vultr", "PostgreSQL", "OAuth2"],
    period: "Feb 2025 – Aug 2025",
    role: "Lead Developer",
    status: "Live Production",
    category: "SaaS Platform",
    liveUrl: "https://memberpulse.com.au",
  },
  {
    slug: "initao-water-billing-system",
    title: "Initao Water Billing System",
    description:
      "Won via competitive government bidding for the Municipality of Initao. Full billing lifecycle from meter reading to payment collection, offline-first mobile API for field workers, WebSocket real-time notifications, and a double-entry ledger ensuring audit-grade financial integrity.",
    longDescription: `
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
    image: "/images/projects/water-billing-placeholder.svg",
    technologies: ["Laravel 12", "PHP 8.2+", "MySQL 8", "Alpine.js 3", "Tailwind CSS 3", "Laravel Reverb", "Pest PHP", "Docker", "Laravel Sanctum"],
    period: "Feb 2026 – Present",
    role: "Lead Developer",
    status: "Deployed",
    category: "Government / Enterprise",
    githubUrl: "https://github.com/blank0810/initao-water-billing",
  },
  {
    slug: "swiss-energy-platform-suite",
    title: "Swiss Energy Platform Suite",
    description:
      "Consolidated 20 services and 6 financial matching engines serving a Swiss petrol station group. Daily orchestration reconciles pickup slips, invoices, purchases, and delivery notes across 4 companies and 8 stations. Includes a WhatsApp AI document classification pipeline and wholesale invoice generation.",
    longDescription: `
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
    image: "/images/projects/swiss-energy-placeholder.svg",
    technologies: ["Node.js", "MongoDB", "Google Sheets API", "CSV/XML Processing", "PM2", "GitHub Actions", "Hetzner"],
    period: "Dec 2025 – Present",
    role: "Lead Developer",
    status: "Live Production",
    category: "Internal Tool",
  },
  {
    slug: "personal-budget-finance-manager",
    title: "Personal Budget & Finance Manager",
    description:
      "A personal finance manager built on a true double-entry accounting engine — tracking accounts, transactions, net worth, and profit-and-loss statements with budget analytics and interactive charts. Self-serve authentication and categorized ledgers give a complete, accurate picture of personal cash flow. Built solo with Next.js 15, Prisma, and PostgreSQL.",
    longDescription: `
      A personal finance manager built around a real double-entry accounting engine rather than a simple expense list, giving every transaction a debit and credit for audit-grade accuracy.

      **Key Capabilities:**

      • **Double-Entry Ledger** — Proper accounting entries for every transaction, keeping accounts always balanced
      • **Net Worth Tracking** — Aggregates assets and liabilities into a single trend over time
      • **P&L Statements** — Income vs. expense reporting across configurable periods
      • **Budget Analytics** — Category budgets with progress tracking and interactive charts (Recharts)
      • **Authentication** — Self-serve accounts via NextAuth.js

      **Technical Stack:**

      Next.js 15, TypeScript, PostgreSQL with Prisma ORM, Tailwind CSS, shadcn/ui, NextAuth.js, and Recharts. A solo side project demonstrating modern full-stack patterns on exactly the stack clients hire for.
    `,
    image: "/images/projects/budget-app.png",
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "shadcn/ui", "NextAuth.js", "Recharts"],
    period: "Dec 2025 – Present",
    role: "Solo Developer",
    status: "Live Production",
    category: "Finance",
    liveUrl: "https://ehnand-budget.vercel.app/",
  },
  {
    slug: "playnow",
    title: "PlayNow",
    description:
      "A SaaS marketplace connecting merchants and customers through coupon-based commerce — merchants create and manage deals across goods, venues, and activities while customers discover and purchase them. Built end-to-end from a NestJS API to a Next.js frontend with Stripe payments and a merchant analytics dashboard, delivered as a working beta before handoff.",
    longDescription: `
      PlayNow is a SaaS marketplace platform that connects merchants with customers through a coupon-based commerce system. The platform enables:

      • **Merchant Dashboard** — Comprehensive tools for businesses to create and manage deals
      • **Coupon Management** — Dynamic pricing and promotional campaign tools
      • **Multi-Category Support** — Sports venues, activities, goods, and services
      • **User Experience** — Intuitive interface for discovering and purchasing deals
      • **Payment Integration** — Secure Stripe transaction processing and merchant payouts
      • **Analytics & Reporting** — Performance tracking for merchants and platform metrics

      Built end-to-end from a NestJS API to a Next.js frontend on Vercel. The beta successfully demonstrated the core marketplace functionality before project handoff.
    `,
    image: "/images/projects/playnow.png",
    technologies: ["Next.js", "NestJS", "Vercel", "Stripe"],
    period: "Mar 2025 – Apr 2025",
    role: "Solo Developer",
    status: "Beta",
    category: "Marketplace",
    liveUrl: "https://dev.playnow.ae",
  },

  // ------------------------------------------------- Earlier & Academic Work
  {
    slug: "weather-forecasting-application",
    title: "Weather Forecasting Application",
    description:
      "A React single-page weather application using the OpenWeather API with geolocation-based lookup, current conditions, and multi-day forecasts, deployed on Vercel at roughly 95% uptime. A focused front-end project demonstrating third-party API integration, asynchronous data handling, and responsive UI design.",
    image: "/images/weather_app.png",
    technologies: ["React", "OpenWeather API", "Vercel", "Geolocation"],
    period: "Jan 2025 – Feb 2025",
    role: "Solo Developer",
    status: "Live",
    category: "Web App",
    liveUrl: "https://ehnand-weather-app.vercel.app/",
    githubUrl: "https://github.com/blank0810/weather-app",
  },
  {
    slug: "edutracker-system",
    title: "EduTracker System",
    description:
      "A Laravel and MySQL reporting tool integrating the Google Sheets and Gmail APIs to automate administrative reporting for an education provider — replacing manual spreadsheet-and-email workflows with scheduled, structured exports and cutting reporting time by around 40%.",
    image: "/images/edutracker.jpg",
    technologies: ["Laravel", "MySQL", "Google APIs", "Reporting"],
    period: "Jul 2024",
    role: "Solo Developer",
    status: "Deployed",
    category: "Education",
  },
  {
    slug: "email-automation-script",
    title: "Email Automation Script",
    description:
      "A Python automation script using the MXroute API to programmatically provision 500+ email accounts, cutting manual setup time by roughly 70% while enforcing consistent configuration and naming conventions across every mailbox.",
    image: "/images/email_auto.jpg",
    technologies: ["Python", "MXroute API", "Automation"],
    period: "Jul 2024",
    role: "Solo Developer",
    status: "Completed",
    category: "Automation",
  },
  {
    slug: "m1-web-hris",
    title: "M1 – WEB HRIS",
    description:
      "A cloud-hosted HR information system built in Laravel with SQL Server for MORESCO-1, centralizing employee records across multiple offices with a focus on data integrity, role-based access, and security compliance.",
    image: "/images/lgu_hris.jpg",
    technologies: ["Laravel", "SQL Server", "Cloud", "HR System", "Security"],
    period: "Jan 2024 – Jun 2024",
    role: "Team Developer",
    status: "Deployed",
    category: "Enterprise",
  },
  {
    slug: "m1-helpdesk-system",
    title: "M1-Helpdesk System",
    description:
      "A centralized IT helpdesk platform built in Laravel with SQL Server and VMware-hosted infrastructure for MORESCO-1, streamlining IT ticket intake and resolution across offices and roughly halving average response times.",
    image: "/placeholder.svg",
    technologies: ["Laravel", "SQL Server", "IT Helpdesk", "VMware"],
    period: "Jan 2024 – Jun 2024",
    role: "Lead Developer",
    status: "Deployed",
    category: "Internal Tool",
  },
  {
    slug: "desktop-hris",
    title: "Desktop Human Resources Information System",
    description:
      "A C#/.NET desktop human-resources information system backed by SQL Server, securing payroll and employee records with role-based access while speeding routine HR processing by about 30%. An early internship-era enterprise project.",
    image: "/images/lgu_hris.jpg",
    technologies: ["C#.NET", "SQL Server", "Desktop", "HR", "Payroll"],
    period: "Aug 2023 – Jan 2024",
    role: "Lead Developer",
    status: "Deployed",
    category: "Desktop App",
  },
  {
    slug: "file-repository-system",
    title: "File Repository System",
    description:
      "A secure document-management system built in PHP and MySQL with role-based access control and version tracking, giving teams a controlled repository to store, organize, and retrieve documents with a full audit trail.",
    image: "/images/file_repo.jpg",
    technologies: ["PHP", "MySQL", "Document Management", "Security", "Version Control"],
    period: "Jun 2023 – Aug 2023",
    role: "Solo Developer",
    status: "Completed",
    category: "Document Management",
  },
  {
    slug: "medical-diagnostic-expert-system",
    title: "Medical Diagnostic Expert System",
    description:
      "An academic rule-based expert system in PHP that applies inference rules over symptom inputs to suggest possible diagnoses — built to explore knowledge representation and decision-support concepts for healthcare.",
    image: "/images/expert_sys.jpg",
    technologies: ["PHP", "Expert Systems", "Healthcare", "Diagnostics"],
    period: "Mar 2023 – May 2023",
    role: "Solo Developer",
    status: "Completed",
    category: "AI / Healthcare",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
