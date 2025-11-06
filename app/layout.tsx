import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
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
    url: "https://your-portfolio-domain.com",
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
    site: "@ehnandazucena",
    creator: "@ehnandazucena",
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
    canonical: "https://your-portfolio-domain.com",
  },
  category: "Technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
    generator: 'v0.app'
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
        <link rel="preload" href="/images/profile-new.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

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
              url: "https://your-portfolio-domain.com",
              image: [
                "https://your-portfolio-domain.com/images/profile-new.jpg",
                "https://your-portfolio-domain.com/images/og-image.jpg",
              ],
              email: "ehnand.azucena00@gmail.com",
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
                "https://twitter.com/ehnandazucena",
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
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
