"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface SkillProgressProps {
  name: string
  percentage: number
  color?: string
}

export default function SkillProgress({ name, percentage, color = "bg-primary" }: SkillProgressProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  )
}
