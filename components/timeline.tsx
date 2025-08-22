"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"

interface TimelineItem {
  title: string
  company: string
  companyUrl?: string
  location: string
  period: string
  description: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  // Debug logging for production
  console.log("Timeline component rendering with items:", items?.length || 0)

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>No experience data available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary"></div>

      {/* Timeline items */}
      {items.map((item, index) => (
        <TimelineItemComponent key={`${item.company}-${index}`} item={item} index={index} />
      ))}
    </div>
  )
}

interface TimelineItemComponentProps {
  item: TimelineItem
  index: number
}

function TimelineItemComponent({ item, index }: TimelineItemComponentProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Debug logging for each timeline item
  console.log(`Timeline item ${index} rendering:`, {
    title: item.title,
    company: item.company,
    inView,
  })

  // Determine if this card should be on the left (even index) or right (odd index)
  const isLeftSide = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative mb-12 md:mb-24 ${
        isLeftSide
          ? "md:pr-12 md:ml-0 md:mr-auto" // Left side: add right padding, align to left
          : "md:pl-12 md:ml-auto md:mr-0" // Right side: add left padding, align to right
      } md:w-1/2`}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute top-0 ${
          isLeftSide
            ? "left-0 md:right-0 md:left-auto md:-mr-4" // Left side card: dot on the right edge
            : "left-0 md:-ml-4" // Right side card: dot on the left edge
        } w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10`}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
      >
        <Briefcase className="h-4 w-4 text-white" />
      </motion.div>

      {/* Card content - always left-aligned text regardless of card position */}
      <motion.div
        className="ml-12 md:ml-0 p-6 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 hover:border-primary/50 transition-all duration-300"
        whileHover={{ scale: 1.03 }}
      >
        {/* All text content is left-aligned regardless of card position */}
        <div className="text-left">
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <h4 className="text-lg font-semibold mb-2">
            {item.companyUrl ? (
              <motion.a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Visit ${item.company} website`}
              >
                {item.company}
                <ExternalLink className="inline h-4 w-4 ml-1 opacity-70" />
              </motion.a>
            ) : (
              <span className="text-primary">{item.company}</span>
            )}
          </h4>
          <div className="flex items-center text-gray-400 mb-2">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center text-gray-400 mb-4">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{item.period}</span>
          </div>
          {/* Bullet points always left-aligned with consistent styling */}
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {item.description.map((desc, i) => (
              <li key={i} className="text-left">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
