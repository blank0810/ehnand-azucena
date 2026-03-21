# Ehnand Azucena

**Full Stack Developer | Backend-Focused**

Philippines (UTC+8) | Open to Remote
+63 953 467 8287 | ehnand.azucena00@gmail.com
ehnand-azucena.vercel.app | linkedin.com/in/ehnand-azucena-3028a7194 | github.com/blank0810

---

## Professional Summary

Full Stack Developer with production experience building multi-tenant SaaS platforms, AI-powered applications, and government enterprise systems. Architected Adam AI, a B2B SaaS with agentic document-processing pipelines and a module marketplace, and delivered a full water utility system for a Philippine municipality won through competitive government bidding. Hands-on experience integrating LLMs (LlamaCloud, Gemini, OpenAI) into production — from RAG-based advisory engines to autonomous document extraction and classification. Delivered systems for clients in Australia, Switzerland, the UAE, and the United States across finance, energy, e-commerce, and professional associations. Proficient in TypeScript, SQL optimization, third-party API integration (Stripe, Xero, HubSpot), and Docker-based deployment pipelines.

---

## Professional Experience

### Full Stack Developer
**ClouDesk Pty. Ltd.** — Remote (Sydney, Australia)
Jan 2025 – Present

- Led backend development of MemberPulse, a multi-tenant SaaS platform serving professional associations across Australia — built CPD tracking, job boards, event management, and subscription billing modules using Symfony, PostgreSQL, and Bootstrap.
- Integrated Stripe, Xero, HubSpot, and PayPal APIs for cross-tenant payment processing, CRM synchronization, and automated invoicing.
- Built computer vision pipelines using Ultralytics YOLO to automate product classification and employee tracking for warehouse operations.
- Stabilized PG Pay, a high-value e-commerce platform for precious metals — resolved critical transaction reliability issues and payment edge cases.
- Maintained and extended educational platforms for ICOM International School (Malaysia) and a China-based internal learning system using Laravel.

### Software Developer (IT Systems)
**EduQuest Inc.** — Cagayan de Oro, Philippines
Jul 2024 – Jan 2025

- Re-architected the company's LMS infrastructure using Laravel, reducing system downtime by 20% and increasing user engagement by 30%.
- Automated administrative reporting by integrating Google Sheets and Gmail APIs, eliminating 40% of manual data processing.
- Led platform onboarding for 200+ users (staff, students, parents), driving a 50% increase in LMS adoption.

### Software Development Intern
**MORESCO-1** — Laguindingan, Misamis Oriental, Philippines
Jan 2024 – May 2024

- Developed features for M1-HRIS and M1-Helpdesk using Laravel and SQL Server, supporting centralized HR management and IT ticket resolution across multiple offices.
- Optimized slow-running SQL queries for employee record retrieval, reducing page load times in the HRIS dashboard.

---

## Key Projects

### Adam AI — Multi-Tenant B2B Document Intelligence SaaS
**TanStack Start (React 19), TypeScript, PostgreSQL 16, Drizzle ORM, Trigger.dev v4, LlamaCloud, Google Gemini, Cloudflare R2 & Email Workers, Better Auth** | Dec 2025 – Present
First tenant: Swiss energy client (petrol station group)

- Architected a module marketplace where tenants subscribe to capabilities, commission custom modules, and publish to a shared Module Store — creating a revenue-sharing ecosystem between publishers and the platform.
- Built agentic AI document-processing pipelines: email ingestion via Cloudflare Workers → AI classification → LlamaCloud extraction → field normalization → auto-matching with 8 comparison algorithms (exact, fuzzy/Levenshtein, numeric tolerance, date equality, contains, case-insensitive, common substring, last-N-chars).
- Implemented AI-powered configuration: schema auto-detection from sample documents, live extraction preview, and Gemini-driven matching rule suggestions with per-rule reasoning — reducing tenant onboarding from days to under one hour.

### Swiss Energy Platform Suite — Document Reconciliation & Financial Matching
**Node.js, MongoDB, Google Sheets API, CSV/XML Processing, PM2, GitHub Actions, Hetzner** | Dec 2025 – Present
Swiss energy client (petrol station group) — 4 companies, 8 stations

- Consolidated 20 independent reconciliation services into a single mono-repo with 10 company-specific matching algorithms (multi-pass, delta-based, group, 3-way verification), plus 6 financial matching engines for payment terminal reconciliation across KSW, Hectronic, and Traffitec systems.
- Engineered a daily orchestration pipeline running 12 sequential matching and reporting operations, with ID-based, time-window, and amount-tolerance strategies automating reconciliation of thousands of transactions across 3 terminal systems and 4 settlement providers.
- Built an AI-powered WhatsApp document ingestion pipeline for automated classification and routing, a wholesale invoice generation system (PDF, QR bills, VAT), and a data validation pipeline across 13 RAW data sources.
- Deployed on self-hosted Hetzner VPS with PM2 process management, MongoDB state tracking, node-cron scheduling, and GitHub Actions CI/CD.

### REPSShield — AI-Powered Real Estate Tax Compliance Platform
**React 18, Node.js/Express, TypeScript, PostgreSQL 16 (Neon), Drizzle ORM, Vercel AI SDK v4, Stripe, Capacitor.js (iOS/Android), Astro 5, Cloudflare Workers, Trigger.dev** | Aug 2025 – Present
US-based client | repsshield.com

- Engineered three AI modes: (1) agentic time-tracking with 8 tool-calling functions and confidence-based auto-approval, (2) RAG advisory over 282 IRS documents with citation-backed answers and authority ranking personalized to user tax profiles, (3) 14-check IRS examiner simulation following the Passive Activity Loss Audit Technique Guide.
- Built multi-provider AI circuit-breaker failover (SambaNova → Groq → Gemini → OpenAI → Cerebras), calendar sync (Google + Outlook), email scanning, voice transcription, and geofencing for automated location-based time logging.
- Delivered cross-platform mobile apps via Capacitor.js and a marketing site on Astro 5 / Cloudflare Pages with CI/CD via GitHub Actions and Docker.

### Initao Water Billing System — Government Enterprise Platform
**Laravel 12, PHP 8.2+, MySQL 8, Alpine.js 3, Tailwind CSS 3, Laravel Reverb (WebSockets), Pest PHP, Docker, Laravel Sanctum** | Feb 2026 – Present (Deployed)
Municipality of Initao, Philippines — won via competitive government bidding

- Delivered a full water utility management system handling the complete billing lifecycle: customer registration, meter reading capture with photo evidence and QR code scanning, automated bill generation from configurable rate schedules, and payment processing with a double-entry accounting ledger.
- Built a dedicated offline-first mobile API for field meter readers using Laravel Sanctum, enabling reliable data collection in areas with limited connectivity — sync when connectivity returns.
- Implemented real-time WebSocket notifications via Laravel Reverb, role-based access control with audit logging (Spatie Activity Log), and analytics dashboards with Excel/PDF export for municipal reporting.

### MemberPulse — Multi-Tenant SaaS CPD Platform
**Symfony, PostgreSQL, Bootstrap, Vultr, Docker, Bitbucket CI/CD** | Feb 2025 – Aug 2025
Australia-based client | memberpulse.com.au

- Designed and built a multi-tenant SaaS platform for Australian professional associations — CPD courses, events, job boards, directories, and sponsorship modules with AI-powered course generation and personalized analytics.
- Integrated Salesforce, Xero, Stripe, PayPal, and HubSpot APIs for cross-tenant CRM, accounting, and payment workflows with multi-tier subscription billing and recurring payments.

### PlayNow — SaaS Coupon Marketplace
**Next.js, NestJS, TypeScript, Vercel, DigitalOcean** | Mar 2025 – Apr 2025
UAE-based client | playnow.ae

- Built a full-stack marketplace connecting merchants and customers through coupon-based commerce — end-to-end from NestJS API to Next.js frontend, with Stripe payment integration and merchant analytics dashboard.

---

## Technical Skills

**Backend:**        Laravel 12, Symfony, NestJS, Node.js, Express.js, C#/.NET, Python
**Frontend:**       React 19, Next.js, TanStack Start, Astro, Alpine.js, TypeScript, Tailwind CSS, shadcn/ui, Radix UI
**Databases:**      PostgreSQL 16, MySQL 8, SQL Server, Drizzle ORM, Prisma, Neon Serverless, query optimization
**AI/ML:**          Vercel AI SDK v4, LlamaCloud, Google Gemini, OpenAI API, RAG pipelines, agentic tool-calling, YOLO/Ultralytics, n8n
**Infrastructure:** Docker, Nginx, CI/CD (GitHub Actions, Bitbucket Pipelines), Linux, PM2, Trigger.dev v4
**Cloud:**          Cloudflare (Workers, R2, Pages, Email Workers), Vercel, Vultr, Hetzner, DigitalOcean, AWS (EC2, S3)
**Auth & Payments:** Better Auth, Laravel Sanctum, JWT, OAuth 2.0 (Google, Microsoft), Stripe, Xero, HubSpot, PayPal
**APIs:**           REST, GraphQL, WebSockets (Laravel Reverb), Google APIs, Twilio

---

## Education

**Mindanao State University – Naawan** | 2024
Bachelor of Science in Information Technology, Major in Database Systems | Cum Laude

---

## Certifications

- Symfony 7 Fundamentals, Doctrine & Database, Cosmic Coding — SymfonyCasts (2025)
- React Basics & Advanced React — Meta (2025)
