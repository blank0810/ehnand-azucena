"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

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
  cls: { avg: number; median: number; p95: number; min: number; max: number }
  fid: { avg: number; median: number; p95: number; min: number; max: number }
  fcp: { avg: number; median: number; p95: number; min: number; max: number }
  lcp: { avg: number; median: number; p95: number; min: number; max: number }
  ttfb: { avg: number; median: number; p95: number; min: number; max: number }
}

export function PerformanceDashboard() {
  const [data, setData] = useState<PerformanceMetrics[]>([])
  const [stats, setStats] = useState<PerformanceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/analytics/performance")
      const result = await response.json()
      setData(result.data || [])
      setStats(result.stats || null)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching performance data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5 * 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const getMetricStatus = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return "good"
    if (value <= thresholds.poor) return "needs-improvement"
    return "poor"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500"
      case "needs-improvement":
        return "bg-yellow-500"
      case "poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800">Good</Badge>
      case "needs-improvement":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
      case "poor":
        return <Badge className="bg-red-100 text-red-800">Poor</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const formatMetric = (value: number, unit: string) => {
    if (value === 0) return "0" + unit
    if (unit === "ms") return Math.round(value) + unit
    if (unit === "s") return (value / 1000).toFixed(2) + unit
    return value.toFixed(3)
  }

  const metricConfigs = [
    {
      key: "cls" as keyof PerformanceMetrics,
      name: "Cumulative Layout Shift",
      description: "Visual stability of the page",
      unit: "",
      thresholds: { good: 0.1, poor: 0.25 },
    },
    {
      key: "fid" as keyof PerformanceMetrics,
      name: "First Input Delay",
      description: "Responsiveness to user interactions",
      unit: "ms",
      thresholds: { good: 100, poor: 300 },
    },
    {
      key: "fcp" as keyof PerformanceMetrics,
      name: "First Contentful Paint",
      description: "Time to first content render",
      unit: "s",
      thresholds: { good: 1800, poor: 3000 },
    },
    {
      key: "lcp" as keyof PerformanceMetrics,
      name: "Largest Contentful Paint",
      description: "Loading performance",
      unit: "s",
      thresholds: { good: 2500, poor: 4000 },
    },
    {
      key: "ttfb" as keyof PerformanceMetrics,
      name: "Time to First Byte",
      description: "Server response time",
      unit: "ms",
      thresholds: { good: 800, poor: 1800 },
    },
  ]

  if (loading && !stats) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Performance Dashboard</h2>
          <RefreshCw className="h-5 w-5 animate-spin" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time Core Web Vitals monitoring
            {lastUpdated && <span className="ml-2">• Last updated: {lastUpdated.toLocaleTimeString()}</span>}
          </p>
        </div>
        <Button onClick={fetchData} disabled={loading} size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricConfigs.map((config) => {
          const latestValue = data.length > 0 ? data[data.length - 1][config.key] : 0
          const avgValue = stats?.[config.key]?.avg || 0
          const status = getMetricStatus(avgValue, config.thresholds)
          const progress = Math.min((avgValue / config.thresholds.poor) * 100, 100)

          return (
            <Card key={config.key}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{config.name}</CardTitle>
                  {getStatusBadge(status)}
                </div>
                <CardDescription className="text-xs">{config.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{formatMetric(avgValue, config.unit)}</span>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Latest: {formatMetric(latestValue, config.unit)}</div>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                  {stats && (
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>
                        <div className="font-medium">P95</div>
                        <div>{formatMetric(stats[config.key].p95, config.unit)}</div>
                      </div>
                      <div>
                        <div className="font-medium">Median</div>
                        <div>{formatMetric(stats[config.key].median, config.unit)}</div>
                      </div>
                      <div>
                        <div className="font-medium">Min/Max</div>
                        <div>
                          {formatMetric(stats[config.key].min, config.unit)}/
                          {formatMetric(stats[config.key].max, config.unit)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Based on {data.length} measurements collected over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {metricConfigs.map((config) => {
                const avgValue = stats?.[config.key]?.avg || 0
                const status = getMetricStatus(avgValue, config.thresholds)
                return (
                  <div key={config.key} className="space-y-2">
                    <div className={`w-4 h-4 rounded-full mx-auto ${getStatusColor(status)}`}></div>
                    <div className="text-sm font-medium">{config.name}</div>
                    <div className="text-lg font-bold">{formatMetric(avgValue, config.unit)}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
