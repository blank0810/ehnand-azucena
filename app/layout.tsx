import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/lib/site"
import { FAQ_ITEMS } from "@/lib/faq"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
  description:
    "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms, database optimization, and scalable web applications. Available for hire.",
  keywords: [
    "Full Stack Developer",
    "Full Stack Engineer",
    "Laravel Developer",
    "React Developer",
    "Symfony Developer",
    "Web Developer",
    "SaaS Developer",
    "Backend Developer",
    "Frontend Developer",
    "Database Developer",
    "PHP Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Remote Developer",
    "Freelance Developer",
    "Full Stack Developer Philippines",
    "Freelance Full Stack Developer Philippines",
    "Contract Developer Philippines",
    "Project-based Developer",
    "Laravel Developer Philippines",
    "Hire Full Stack Developer",
    "Ehnand Azucena",
  ],
  authors: [{ name: "Ehnand Azucena" }],
  creator: "Ehnand Azucena",
  publisher: "Ehnand Azucena",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
    description:
      "Professional Full Stack Developer with expertise in Laravel, React, Symfony, and modern web technologies. Specialized in building scalable SaaS platforms, optimizing databases, and delivering enterprise-grade solutions. Currently working with ClouDesk Pty. Ltd on multi-tenant platforms and high-value e-commerce systems.",
    siteName: "Ehnand Azucena Portfolio",
    images: [
      {
        url: "/images/profile-new.jpg",
        width: 800,
        height: 800,
        alt: "Ehnand Azucena - Professional Full Stack Developer specializing in Laravel, React, and Symfony",
        type: "image/jpeg",
      },
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ehnand Azucena - Full Stack Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
    description:
      "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms, database optimization, and scalable web applications.",
    images: [
      {
        url: "/images/profile-new.jpg",
        alt: "Ehnand Azucena - Professional Full Stack Developer",
        width: 800,
        height: 800,
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  category: "Technology",
  classification: "Portfolio Website",
  generator: 'v0.app',
  // No fallback value on purpose: Search Console verification tokens are
  // per-property secrets. Set GOOGLE_SITE_VERIFICATION once the property is
  // added at https://search.google.com/search-console — see .env.example.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//vercel.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ehnand Azucena",
              jobTitle: "Full Stack Developer",
              description:
                "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in building scalable SaaS platforms, optimizing databases, and delivering enterprise-grade solutions.",
              url: SITE_URL,
              image: [
                `${SITE_URL}/images/profile-new.jpg`,
                `${SITE_URL}/images/og-image.jpg`,
              ],
              email: "contact@ehnand.com",
              telephone: "+639534678287",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Initao",
                addressRegion: "Northern Mindanao",
                postalCode: "9022",
                addressCountry: "Philippines",
              },
              sameAs: [
                "https://www.linkedin.com/in/ehnand-azucena-3028a7194",
                "https://github.com/blank0810",
              ],
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
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Full Stack Developer",
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
            }),
          }}
        />

        {/* FAQ structured data — mirrors the visible FAQ section (lib/faq.ts) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
