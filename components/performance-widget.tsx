"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, TrendingUp } from "lucide-react"
import PerformanceDashboard from "./performance-dashboard"
import { performanceMonitor } from "@/lib/performance-monitor"

export default function PerformanceWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<"good" | "needs-improvement" | "poor">("good")

  useEffect(() => {
    const updateScore = () => {
      const currentScore = performanceMonitor.getPerformanceScore()
      setScore(currentScore)

      if (currentScore >= 90) setStatus("good")
      else if (currentScore >= 70) setStatus("needs-improvement")
      else setStatus("poor")
    }

    updateScore()
    const interval = setInterval(updateScore, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-green-400"
      case "needs-improvement":
        return "text-yellow-400"
      case "poor":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "good":
        return "Good"
      case "needs-improvement":
        return "Needs Improvement"
      case "poor":
        return "Poor"
      default:
        return "Unknown"
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg transition-all duration-200 border border-gray-700/50 hover:border-primary/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title="View Performance Dashboard"
      >
        <Activity className="h-4 w-4 text-primary" />
        <div className="text-left">
          <div className="text-xs text-gray-400">Performance</div>
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {score}/100 ({getStatusText()})
          </div>
        </div>
        <TrendingUp className="h-3 w-3 text-gray-400" />
      </motion.button>

      <PerformanceDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
