"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Activity, Clock, Zap, Eye, Server, TrendingUp, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PerformanceMetrics {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  timestamp: number
  url: string
}

interface PerformanceStats {
  count: number
  averages: Record<string, number>
  medians: Record<string, number>
  percentiles: Record<string, number>
  min: Record<string, number>
  max: Record<string, number>
}

interface PerformanceDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function PerformanceDashboard({ isOpen, onClose }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([])
  const [stats, setStats] = useState<PerformanceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchData = async () => {
    try {
      setLoading(true)
      const [metricsRes, statsRes] = await Promise.all([
        fetch("/api/analytics/performance?limit=50"),
        fetch("/api/analytics/performance?page=stats"),
      ])

      if (metricsRes.ok && statsRes.ok) {
        const metricsData = await metricsRes.json()
        const statsData = await statsRes.json()
        setMetrics(metricsData)
        setStats(statsData)
        setLastUpdated(new Date())
      }
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

  const getStatusColor = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      ttfb: { good: 800, poor: 1800 },
    }

    const threshold = thresholds[metric]
    if (!threshold) return "text-gray-400"

    if (value <= threshold.good) return "text-green-400"
    if (value <= threshold.poor) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusText = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      ttfb: { good: 800, poor: 1800 },
    }

    const threshold = thresholds[metric]
    if (!threshold) return "Unknown"

    if (value <= threshold.good) return "Good"
    if (value <= threshold.poor) return "Needs Improvement"
    return "Poor"
  }

  const getProgressValue = (metric: string, value: number) => {
    const maxValues: Record<string, number> = {
      cls: 0.5,
      fid: 500,
      fcp: 5000,
      lcp: 6000,
      ttfb: 3000,
    }

    const max = maxValues[metric] || 100
    return Math.min((value / max) * 100, 100)
  }

  const formatValue = (metric: string, value: number) => {
    if (metric === "cls") return value.toFixed(3)
    return Math.round(value).toString()
  }

  const getUnit = (metric: string) => {
    if (metric === "cls") return ""
    return "ms"
  }

  const metricLabels: Record<string, { name: string; icon: any; description: string }> = {
    cls: {
      name: "Cumulative Layout Shift",
      icon: Activity,
      description: "Visual stability of the page",
    },
    fid: {
      name: "First Input Delay",
      icon: Clock,
      description: "Responsiveness to user interactions",
    },
    fcp: {
      name: "First Contentful Paint",
      icon: Eye,
      description: "Time to first visible content",
    },
    lcp: {
      name: "Largest Contentful Paint",
      icon: Zap,
      description: "Loading performance",
    },
    ttfb: {
      name: "Time to First Byte",
      icon: Server,
      description: "Server response time",
    },
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-white">Performance Dashboard</h2>
              <p className="text-gray-400 text-sm">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 text-gray-300 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="h-4 w-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Loading performance data...</p>
            </div>
          ) : stats ? (
            <div className="space-y-8">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Measurements</h3>
                  <p className="text-3xl font-bold text-primary">{stats.count}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Data Points</h3>
                  <p className="text-3xl font-bold text-primary">{metrics.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Monitoring Since</h3>
                  <p className="text-lg text-gray-300">
                    {metrics.length > 0 ? new Date(metrics[0].timestamp).toLocaleDateString() : "No data"}
                  </p>
                </div>
              </div>

              {/* Core Web Vitals */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Core Web Vitals</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(metricLabels).map(([key, { name, icon: Icon, description }]) => {
                    const avgValue = stats.averages[key] || 0
                    const medianValue = stats.medians[key] || 0
                    const p95Value = stats.percentiles[key] || 0
                    const minValue = stats.min[key] || 0
                    const maxValue = stats.max[key] || 0

                    return (
                      <div key={key} className="bg-gray-800/50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-semibold text-white">{name}</h4>
                            <p className="text-sm text-gray-400">{description}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Average */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-300">Average</span>
                              <span className={`text-sm font-medium ${getStatusColor(key, avgValue)}`}>
                                {formatValue(key, avgValue)}
                                {getUnit(key)} ({getStatusText(key, avgValue)})
                              </span>
                            </div>
                            <Progress value={getProgressValue(key, avgValue)} className="h-2" />
                          </div>

                          {/* Statistics */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Median:</span>
                              <span className="ml-2 text-white">
                                {formatValue(key, medianValue)}
                                {getUnit(key)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">95th %:</span>
                              <span className="ml-2 text-white">
                                {formatValue(key, p95Value)}
                                {getUnit(key)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Min:</span>
                              <span className="ml-2 text-white">
                                {formatValue(key, minValue)}
                                {getUnit(key)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Max:</span>
                              <span className="ml-2 text-white">
                                {formatValue(key, maxValue)}
                                {getUnit(key)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Measurements */}
              {metrics.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Recent Measurements</h3>
                  <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th className="text-left p-3 text-gray-300">Time</th>
                            <th className="text-left p-3 text-gray-300">CLS</th>
                            <th className="text-left p-3 text-gray-300">FID (ms)</th>
                            <th className="text-left p-3 text-gray-300">FCP (ms)</th>
                            <th className="text-left p-3 text-gray-300">LCP (ms)</th>
                            <th className="text-left p-3 text-gray-300">TTFB (ms)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {metrics
                            .slice(-10)
                            .reverse()
                            .map((metric, index) => (
                              <tr key={index} className="border-t border-gray-700/50">
                                <td className="p-3 text-gray-300">{new Date(metric.timestamp).toLocaleTimeString()}</td>
                                <td className={`p-3 ${getStatusColor("cls", metric.cls)}`}>
                                  {formatValue("cls", metric.cls)}
                                </td>
                                <td className={`p-3 ${getStatusColor("fid", metric.fid)}`}>
                                  {formatValue("fid", metric.fid)}
                                </td>
                                <td className={`p-3 ${getStatusColor("fcp", metric.fcp)}`}>
                                  {formatValue("fcp", metric.fcp)}
                                </td>
                                <td className={`p-3 ${getStatusColor("lcp", metric.lcp)}`}>
                                  {formatValue("lcp", metric.lcp)}
                                </td>
                                <td className={`p-3 ${getStatusColor("ttfb", metric.ttfb)}`}>
                                  {formatValue("ttfb", metric.ttfb)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No performance data available</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
