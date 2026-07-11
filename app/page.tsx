import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Certificates from "@/components/certificates"
import Faq from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import SectionIndicator from "@/components/section-indicator"
import { FAQ_ITEMS } from "@/lib/faq"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
]

export default function Page() {
  return (
    <>
      {/* FAQ structured data — lives here, not in the root layout, so it is emitted
          only on the page that actually renders the FAQ section (components/faq.tsx).
          Google discounts FAQPage markup whose Q&As are absent from the page. */}
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
      <ScrollProgress />
      <Navigation />
      <SectionIndicator sections={sections} />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certificates />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
