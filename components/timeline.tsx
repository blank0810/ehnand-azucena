"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar, MapPin } from "lucide-react"

interface TimelineItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary"></div>

      {/* Timeline items */}
      {items.map((item, index) => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.1,
        })

        return <TimelineItemComponent key={index} item={item} index={index} ref={ref} inView={inView} />
      })}
    </div>
  )
}

interface TimelineItemComponentProps {
  item: TimelineItem
  index: number
  ref: any
  inView: boolean
}

const TimelineItemComponent = ({ item, index, ref, inView }: TimelineItemComponentProps) => {
  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative mb-12 md:mb-24 ${
        index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
      } md:w-1/2`}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute top-0 ${
          index % 2 === 0 ? "left-0 md:right-0 md:left-auto md:-mr-4" : "left-0 md:-ml-4"
        } w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10`}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
      >
        <Briefcase className="h-4 w-4 text-white" />
      </motion.div>

      <motion.div
        className={`ml-12 md:ml-0 p-6 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 hover:border-primary/50 transition-all duration-300 ${
          index % 2 === 0 ? "" : ""
        }`}
        whileHover={{ scale: 1.03 }}
      >
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <h4 className="text-lg font-semibold text-primary mb-2">{item.company}</h4>
        <div className="flex items-center text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center text-gray-400 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{item.period}</span>
        </div>
        <ul className={`list-disc ${index % 2 === 0 ? "md:text-right md:list-none" : ""} pl-5 md:pl-0 text-gray-300`}>
          {item.description.map((desc, i) => (
            <li key={i} className="mb-2">
              {desc}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
