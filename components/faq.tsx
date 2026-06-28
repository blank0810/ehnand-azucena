"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import { FAQ_ITEMS } from "@/lib/faq"

export default function Faq() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="faq" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Availability, stack, and how to start a contract or project-based engagement.
        </motion.p>

        <div ref={ref} className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <details className="card group" open={index === 0}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {item.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-gray-300 leading-relaxed">{item.answer}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
