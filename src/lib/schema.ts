import { absoluteUrl, PERSON_ID, PROFILE, SITE_URL } from "@/config/site"

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export function buildPersonSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    jobTitle: PROFILE.alternateRole,
    description:
      "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in building scalable SaaS platforms, optimizing databases, and delivering enterprise-grade solutions.",
    url: SITE_URL,
    image: absoluteUrl(PROFILE.portrait.src),
    email: PROFILE.email,
    telephone: PROFILE.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Initao",
      addressRegion: "Northern Mindanao",
      postalCode: "9022",
      addressCountry: "Philippines",
    },
    sameAs: [PROFILE.linkedinUrl, PROFILE.githubUrl],
    knowsAbout: [
      "Full Stack Development",
      "Laravel",
      "React",
      "Symfony",
      "PHP",
      "JavaScript",
      "TypeScript",
      "Database Design",
      "SaaS Development",
      "Web Development",
      "PostgreSQL",
      "MySQL",
      "Cloud Infrastructure",
      "API Development",
      "AI-assisted software delivery",
      "CI/CD",
      "Infrastructure as Code",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: PROFILE.alternateRole,
      occupationLocation: {
        "@type": "Country",
        name: "Philippines",
      },
      skills: [
        "Laravel Development",
        "React Development",
        "Symfony Development",
        "Database Optimization",
        "SaaS Platform Development",
        "API Development",
        "Cloud Infrastructure",
        "Multi-tenant Architecture",
      ],
    },
    worksFor: {
      "@type": "Organization",
      name: "ClouDesk Pty. Ltd",
      url: "https://cloudesk.co/",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Mindanao State University - Naawan",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Naawan",
        addressRegion: "Misamis Oriental",
        addressCountry: "Philippines",
      },
    },
  }
}
