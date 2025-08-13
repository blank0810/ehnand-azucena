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

// In-memory storage (in production, use a database)
let performanceData: PerformanceMetrics[] = []

export async function POST(request: NextRequest) {
  try {
    const metrics: PerformanceMetrics = await request.json()

    // Validate the metrics
    if (!metrics || typeof metrics.timestamp !== "number") {
      return NextResponse.json({ error: "Invalid metrics data" }, { status: 400 })
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Calculate statistics
    const stats = calculateStats(performanceData)

    return NextResponse.json({
      data: performanceData,
      stats,
      count: performanceData.length,
    })
  } catch (error) {
    console.error("Error retrieving performance metrics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function calculateStats(data: PerformanceMetrics[]) {
  if (data.length === 0) {
    return {
      cls: { avg: 0, median: 0, p95: 0, min: 0, max: 0 },
      fid: { avg: 0, median: 0, p95: 0, min: 0, max: 0 },
      fcp: { avg: 0, median: 0, p95: 0, min: 0, max: 0 },
      lcp: { avg: 0, median: 0, p95: 0, min: 0, max: 0 },
      ttfb: { avg: 0, median: 0, p95: 0, min: 0, max: 0 },
    }
  }

  const metrics = ["cls", "fid", "fcp", "lcp", "ttfb"] as const
  const stats: any = {}

  metrics.forEach((metric) => {
    const values = data
      .map((d) => d[metric])
      .filter((v) => v > 0)
      .sort((a, b) => a - b)

    if (values.length === 0) {
      stats[metric] = { avg: 0, median: 0, p95: 0, min: 0, max: 0 }
      return
    }

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length
    const median = values[Math.floor(values.length / 2)]
    const p95 = values[Math.floor(values.length * 0.95)]
    const min = values[0]
    const max = values[values.length - 1]

    stats[metric] = { avg, median, p95, min, max }
  })

  return stats
}
