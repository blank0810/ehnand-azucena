import { type NextRequest, NextResponse } from "next/server"

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  rating: "good" | "needs-improvement" | "poor"
}

// In-memory storage for demo purposes
// In production, you'd use a database
let performanceData: PerformanceMetric[] = []

export async function POST(request: NextRequest) {
  try {
    const metric: PerformanceMetric = await request.json()

    // Validate the metric
    if (!metric.name || typeof metric.value !== "number" || !metric.timestamp || !metric.rating) {
      return NextResponse.json({ error: "Invalid metric data" }, { status: 400 })
    }

    // Store the metric
    performanceData.push(metric)

    // Keep only the last 1000 entries to prevent memory issues
    if (performanceData.length > 1000) {
      performanceData = performanceData.slice(-1000)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing performance metric:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Calculate statistics
    const stats = calculateStatistics(performanceData)

    return NextResponse.json({
      metrics: performanceData,
      statistics: stats,
      count: performanceData.length,
    })
  } catch (error) {
    console.error("Error retrieving performance data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function calculateStatistics(data: PerformanceMetric[]) {
  const groupedData = data.reduce(
    (acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = []
      }
      acc[metric.name].push(metric.value)
      return acc
    },
    {} as Record<string, number[]>,
  )

  const stats: Record<string, any> = {}

  for (const [name, values] of Object.entries(groupedData)) {
    if (values.length === 0) continue

    const sorted = [...values].sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)

    stats[name] = {
      count: values.length,
      average: sum / values.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: Math.min(...values),
      max: Math.max(...values),
    }
  }

  return stats
}
