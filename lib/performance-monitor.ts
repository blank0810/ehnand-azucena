interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  rating: "good" | "needs-improvement" | "poor"
}

interface ResourceTiming {
  name: string
  duration: number
  size?: number
  type: string
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeObservers()
    }
  }

  private initializeObservers() {
    // Core Web Vitals Observer
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry)
        }
      })

      try {
        observer.observe({
          entryTypes: ["navigation", "paint", "largest-contentful-paint", "layout-shift", "first-input"],
        })
        this.observers.push(observer)
      } catch (e) {
        console.warn("Performance Observer not supported:", e)
      }
    }

    // Resource timing observer
    if ("PerformanceObserver" in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processResourceEntry(entry as PerformanceResourceTiming)
        }
      })

      try {
        resourceObserver.observe({ entryTypes: ["resource"] })
        this.observers.push(resourceObserver)
      } catch (e) {
        console.warn("Resource Performance Observer not supported:", e)
      }
    }
  }

  private processEntry(entry: PerformanceEntry) {
    const timestamp = Date.now()

    switch (entry.entryType) {
      case "navigation":
        const navEntry = entry as PerformanceNavigationTiming
        this.addMetric("TTFB", navEntry.responseStart - navEntry.requestStart, timestamp)
        break

      case "paint":
        if (entry.name === "first-contentful-paint") {
          this.addMetric("FCP", entry.startTime, timestamp)
        }
        break

      case "largest-contentful-paint":
        this.addMetric("LCP", entry.startTime, timestamp)
        break

      case "layout-shift":
        const layoutEntry = entry as any
        if (!layoutEntry.hadRecentInput) {
          this.addMetric("CLS", layoutEntry.value, timestamp)
        }
        break

      case "first-input":
        const fidEntry = entry as any
        this.addMetric("FID", fidEntry.processingStart - fidEntry.startTime, timestamp)
        break
    }
  }

  private processResourceEntry(entry: PerformanceResourceTiming) {
    const duration = entry.responseEnd - entry.requestStart

    // Log slow resources
    if (duration > 1000) {
      console.warn(`Slow resource detected: ${entry.name} took ${duration.toFixed(2)}ms`)
    }
  }

  private addMetric(name: string, value: number, timestamp: number) {
    const rating = this.getRating(name, value)

    this.metrics.push({
      name,
      value,
      timestamp,
      rating,
    })

    // Send to analytics
    this.sendToAnalytics({ name, value, timestamp, rating })
  }

  private getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    }

    const threshold = thresholds[name as keyof typeof thresholds]
    if (!threshold) return "good"

    if (value <= threshold.good) return "good"
    if (value <= threshold.poor) return "needs-improvement"
    return "poor"
  }

  private async sendToAnalytics(metric: PerformanceMetric) {
    try {
      await fetch("/api/analytics/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
      })
    } catch (error) {
      console.warn("Failed to send performance metric:", error)
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  public getLatestMetrics(): Record<string, PerformanceMetric> {
    const latest: Record<string, PerformanceMetric> = {}

    for (const metric of this.metrics) {
      if (!latest[metric.name] || metric.timestamp > latest[metric.name].timestamp) {
        latest[metric.name] = metric
      }
    }

    return latest
  }

  public calculateScore(): number {
    const latest = this.getLatestMetrics()
    const weights = { CLS: 0.15, FID: 0.25, FCP: 0.15, LCP: 0.25, TTFB: 0.2 }

    let totalScore = 0
    let totalWeight = 0

    for (const [name, weight] of Object.entries(weights)) {
      const metric = latest[name]
      if (metric) {
        const score = metric.rating === "good" ? 100 : metric.rating === "needs-improvement" ? 50 : 0
        totalScore += score * weight
        totalWeight += weight
      }
    }

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0
  }

  public destroy() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers = []
    this.metrics = []
  }
}

export default PerformanceMonitor
