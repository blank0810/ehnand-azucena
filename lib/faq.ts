// Single source of truth for FAQ content.
// Consumed by both the visible FAQ section (components/faq.tsx) and the FAQPage
// JSON-LD in app/layout.tsx — Google requires the structured-data answers to match
// the on-page text, so keeping them in one place prevents drift.
export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Ehnand Azucena available for contract or project-based work?",
    answer:
      "Yes. Ehnand is a Philippines-based full stack developer available for remote contract, project-based, and freelance engagements, as well as long-term roles. He works in UTC+8 and has delivered systems for clients across Australia, Switzerland, the UAE, the United States, and the Philippines.",
  },
  {
    question: "What kind of applications does Ehnand build?",
    answer:
      "Multi-tenant SaaS platforms, AI-powered applications, and government and enterprise systems — including subscription billing, agentic document-intelligence pipelines, and full billing and payment platforms backed by production-grade APIs and optimized databases.",
  },
  {
    question: "What technologies does Ehnand specialize in?",
    answer:
      "Backend: Laravel, Symfony, NestJS, and Node.js. Frontend: React, Next.js, TypeScript, and Tailwind CSS. Databases: PostgreSQL and MySQL. AI/ML: LlamaCloud, Google Gemini, OpenAI, and RAG/agentic tool-calling pipelines. Plus Docker-based CI/CD deployed on Vercel, Hetzner, and AWS.",
  },
  {
    question: "Where is Ehnand based and what time zone does he work in?",
    answer:
      "Ehnand is based in Initao, Northern Mindanao, Philippines (UTC+8) and works remotely with international clients.",
  },
  {
    question: "How can I hire Ehnand or request a quote?",
    answer:
      "Reach out by email at ehnand.azucena00@gmail.com, on WhatsApp at +63 953 467 8287, or via LinkedIn. He responds to contract, project-based, and full-time inquiries.",
  },
]
