import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PerformanceOptimizedLayout from "@/components/performance-optimized-layout"

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
      "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms, database optimization, and scalable web applications.",
    siteName: "Ehnand Azucena Portfolio",
    images: [
      {
        url: "/images/profile-new.jpg",
        width: 1200,
        height: 630,
        alt: "Ehnand Azucena - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ehnand Azucena - Full Stack Developer | Laravel, React, Symfony Expert",
    description:
      "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies. Expert in SaaS platforms and scalable web applications.",
    images: ["/images/profile-new.jpg"],
    creator: "@ehnandazucena",
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
                "Professional Full Stack Developer specializing in Laravel, React, Symfony, and modern web technologies",
              url: "https://your-portfolio-domain.com",
              image: "https://your-portfolio-domain.com/images/profile-new.jpg",
              email: "ehnand.azucena00@gmail.com",
              telephone: "+639534678287",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Initao",
                addressRegion: "Northern Mindanao",
                postalCode: "9022",
                addressCountry: "Philippines",
              },
              sameAs: ["https://www.linkedin.com/in/ehnand-azucena-3028a7194", "https://github.com/blank0810"],
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
                ],
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PerformanceOptimizedLayout>{children}</PerformanceOptimizedLayout>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
