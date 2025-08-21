import { type NextRequest, NextResponse } from "next/server"

interface PerformanceMetrics {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  timestamp: number
  url: string
}

// In-memory storage for demo purposes
// In production, use a proper database
let performanceData: PerformanceMetrics[] = []

export async function POST(request: NextRequest) {
  try {
    const metrics: PerformanceMetrics = await request.json()

    // Validate the metrics
    if (
      typeof metrics.cls !== "number" ||
      typeof metrics.fid !== "number" ||
      typeof metrics.fcp !== "number" ||
      typeof metrics.lcp !== "number" ||
      typeof metrics.ttfb !== "number"
    ) {
      return NextResponse.json({ error: "Invalid metrics data" }, { status: 400 })
    }

    // Add timestamp if not provided
    if (!metrics.timestamp) {
      metrics.timestamp = Date.now()
    }

    // Store the metrics
    performanceData.push(metrics)

    // Keep only the last 1000 entries to prevent memory issues
    if (performanceData.length > 1000) {
      performanceData = performanceData.slice(-1000)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing performance metrics:", error)
    return NextResponse.json({ error: "Failed to store metrics" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const limit = Number.parseInt(url.searchParams.get("limit") || "100")
    const page = url.searchParams.get("page")

    if (page === "stats") {
      // Return statistics
      if (performanceData.length === 0) {
        return NextResponse.json({
          count: 0,
          averages: { cls: 0, fid: 0, fcp: 0, lcp: 0, ttfb: 0 },
          medians: { cls: 0, fid: 0, fcp: 0, lcp: 0, ttfb: 0 },
          percentiles: { cls: 0, fid: 0, fcp: 0, lcp: 0, ttfb: 0 },
        })
      }

      const stats = calculateStatistics(performanceData)
      return NextResponse.json(stats)
    }

    // Return recent metrics
    const recentData = performanceData.slice(-limit)
    return NextResponse.json(recentData)
  } catch (error) {
    console.error("Error retrieving performance metrics:", error)
    return NextResponse.json({ error: "Failed to retrieve metrics" }, { status: 500 })
  }
}

function calculateStatistics(data: PerformanceMetrics[]) {
  const metrics = ["cls", "fid", "fcp", "lcp", "ttfb"] as const
  const stats: any = {
    count: data.length,
    averages: {},
    medians: {},
    percentiles: {},
    min: {},
    max: {},
  }

  metrics.forEach((metric) => {
    const values = data
      .map((d) => d[metric])
      .filter((v) => v > 0)
      .sort((a, b) => a - b)

    if (values.length === 0) {
      stats.averages[metric] = 0
      stats.medians[metric] = 0
      stats.percentiles[metric] = 0
      stats.min[metric] = 0
      stats.max[metric] = 0
      return
    }

    // Average
    stats.averages[metric] = Math.round(values.reduce((a, b) => a + b, 0) / values.length)

    // Median
    const mid = Math.floor(values.length / 2)
    stats.medians[metric] =
      values.length % 2 === 0 ? Math.round((values[mid - 1] + values[mid]) / 2) : Math.round(values[mid])

    // 95th percentile
    const p95Index = Math.floor(values.length * 0.95)
    stats.percentiles[metric] = Math.round(values[p95Index] || values[values.length - 1])

    // Min/Max
    stats.min[metric] = Math.round(values[0])
    stats.max[metric] = Math.round(values[values.length - 1])
  })

  return stats
}
