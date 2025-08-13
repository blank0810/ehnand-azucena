"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react"
import PerformanceMonitor from "@/lib/performance-monitor"
import PerformanceDashboard from "./performance-dashboard"

export default function PerformanceWidget() {
  const [monitor] = useState(() => new PerformanceMonitor())
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<"good" | "needs-improvement" | "poor">("good")
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    const updateMetrics = () => {
      const currentScore = monitor.calculateScore()
      setScore(currentScore)

      if (currentScore >= 80) setStatus("good")
      else if (currentScore >= 50) setStatus("needs-improvement")
      else setStatus("poor")
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 30000) // Update every 30 seconds

    return () => {
      clearInterval(interval)
      monitor.destroy()
    }
  }, [monitor])

  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "needs-improvement":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "good":
        return <TrendingUp className="h-4 w-4" />
      case "needs-improvement":
        return <Minus className="h-4 w-4" />
      case "poor":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setShowDashboard(true)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-primary/50 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Activity className="h-4 w-4 text-primary" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Performance:</span>
          <div className={`flex items-center gap-1 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm font-medium">{score}</span>
          </div>
        </div>
      </motion.button>

      <PerformanceDashboard isOpen={showDashboard} onClose={() => setShowDashboard(false)} />
    </>
  )
}
