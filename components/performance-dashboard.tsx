"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  rating: "good" | "needs-improvement" | "poor"
}

interface PerformanceStats {
  count: number
  average: number
  median: number
  p95: number
  min: number
  max: number
}

interface PerformanceDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function PerformanceDashboard({ isOpen, onClose }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [statistics, setStatistics] = useState<Record<string, PerformanceStats>>({})
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/analytics/performance")
      const data = await response.json()
      setMetrics(data.metrics || [])
      setStatistics(data.statistics || {})
    } catch (error) {
      console.error("Failed to fetch performance data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchData()
      const interval = setInterval(fetchData, 5 * 60 * 1000) // Refresh every 5 minutes
      return () => clearInterval(interval)
    }
  }, [isOpen])

  const getLatestMetrics = () => {
    const latest: Record<string, PerformanceMetric> = {}

    for (const metric of metrics) {
      if (!latest[metric.name] || metric.timestamp > latest[metric.name].timestamp) {
        latest[metric.name] = metric
      }
    }

    return latest
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
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

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "good":
        return <TrendingUp className="h-4 w-4" />
      case "needs-improvement":
        return <Minus className="h-4 w-4" />
      case "poor":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const formatValue = (name: string, value: number) => {
    if (name === "CLS") return value.toFixed(3)
    return `${Math.round(value)}ms`
  }

  const getProgressPercentage = (name: string, value: number) => {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25, max: 0.5 },
      FID: { good: 100, poor: 300, max: 500 },
      FCP: { good: 1800, poor: 3000, max: 5000 },
      LCP: { good: 2500, poor: 4000, max: 6000 },
      TTFB: { good: 800, poor: 1800, max: 3000 },
    }

    const threshold = thresholds[name as keyof typeof thresholds]
    if (!threshold) return 0

    return Math.min((value / threshold.max) * 100, 100)
  }

  const latestMetrics = getLatestMetrics()

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Performance Dashboard</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(latestMetrics).map(([name, metric]) => (
              <div key={name} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{name}</h3>
                  <div className={`flex items-center gap-1 ${getRatingColor(metric.rating)}`}>
                    {getRatingIcon(metric.rating)}
                    <span className="text-sm capitalize">{metric.rating.replace("-", " ")}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{formatValue(name, metric.value)}</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      metric.rating === "good"
                        ? "bg-green-500"
                        : metric.rating === "needs-improvement"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${getProgressPercentage(name, metric.value)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {Object.keys(statistics).length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Detailed Statistics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-gray-300">Metric</th>
                      <th className="text-right py-2 text-gray-300">Count</th>
                      <th className="text-right py-2 text-gray-300">Average</th>
                      <th className="text-right py-2 text-gray-300">Median</th>
                      <th className="text-right py-2 text-gray-300">95th %</th>
                      <th className="text-right py-2 text-gray-300">Min</th>
                      <th className="text-right py-2 text-gray-300">Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(statistics).map(([name, stats]) => (
                      <tr key={name} className="border-b border-gray-700/50">
                        <td className="py-2 text-white font-medium">{name}</td>
                        <td className="text-right py-2 text-gray-300">{stats.count}</td>
                        <td className="text-right py-2 text-gray-300">{formatValue(name, stats.average)}</td>
                        <td className="text-right py-2 text-gray-300">{formatValue(name, stats.median)}</td>
                        <td className="text-right py-2 text-gray-300">{formatValue(name, stats.p95)}</td>
                        <td className="text-right py-2 text-gray-300">{formatValue(name, stats.min)}</td>
                        <td className="text-right py-2 text-gray-300">{formatValue(name, stats.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
