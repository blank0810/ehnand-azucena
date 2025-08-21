interface PerformanceMetrics {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  timestamp: number
  url: string
}

interface ResourceTiming {
  name: string
  duration: number
  size?: number
  type: string
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = []
  private observer: PerformanceObserver | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeObserver()
      this.collectInitialMetrics()
    }
  }

  private initializeObserver() {
    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry)
        }
      })

      this.observer.observe({
        entryTypes: ["navigation", "paint", "largest-contentful-paint", "first-input", "layout-shift"],
      })
    } catch (error) {
      console.warn("Performance Observer not supported:", error)
    }
  }

  private processEntry(entry: PerformanceEntry) {
    const currentMetrics = this.getCurrentMetrics()

    switch (entry.entryType) {
      case "largest-contentful-paint":
        currentMetrics.lcp = entry.startTime
        break
      case "first-input":
        currentMetrics.fid = (entry as any).processingStart - entry.startTime
        break
      case "layout-shift":
        if (!(entry as any).hadRecentInput) {
          currentMetrics.cls += (entry as any).value
        }
        break
      case "paint":
        if (entry.name === "first-contentful-paint") {
          currentMetrics.fcp = entry.startTime
        }
        break
      case "navigation":
        currentMetrics.ttfb = (entry as PerformanceNavigationTiming).responseStart
        break
    }

    this.updateMetrics(currentMetrics)
  }

  private getCurrentMetrics(): PerformanceMetrics {
    const latest = this.metrics[this.metrics.length - 1]
    return latest
      ? { ...latest }
      : {
          cls: 0,
          fid: 0,
          fcp: 0,
          lcp: 0,
          ttfb: 0,
          timestamp: Date.now(),
          url: typeof window !== "undefined" ? window.location.href : "",
        }
  }

  private updateMetrics(metrics: PerformanceMetrics) {
    metrics.timestamp = Date.now()
    metrics.url = typeof window !== "undefined" ? window.location.href : ""

    this.metrics.push(metrics)

    // Keep only last 100 entries
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100)
    }

    // Send to analytics
    this.sendToAnalytics(metrics)
  }

  private collectInitialMetrics() {
    if (typeof window === "undefined") return

    setTimeout(() => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType("paint")
      const lcp = performance.getEntriesByType("largest-contentful-paint")

      const metrics: PerformanceMetrics = {
        cls: 0,
        fid: 0,
        fcp: paint.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0,
        lcp: lcp[lcp.length - 1]?.startTime || 0,
        ttfb: navigation?.responseStart || 0,
        timestamp: Date.now(),
        url: window.location.href,
      }

      this.metrics.push(metrics)
      this.sendToAnalytics(metrics)
    }, 1000)
  }

  private async sendToAnalytics(metrics: PerformanceMetrics) {
    try {
      await fetch("/api/analytics/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metrics),
      })
    } catch (error) {
      console.warn("Failed to send analytics:", error)
    }
  }

  public getMetrics(): PerformanceMetrics[] {
    return [...this.metrics]
  }

  public getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics[this.metrics.length - 1] || null
  }

  public getPerformanceScore(): number {
    const latest = this.getLatestMetrics()
    if (!latest) return 0

    // Calculate score based on Core Web Vitals thresholds
    let score = 100

    // CLS scoring (0-25 points)
    if (latest.cls > 0.25) score -= 25
    else if (latest.cls > 0.1) score -= 15
    else score -= Math.max(0, latest.cls * 150)

    // FID scoring (0-25 points)
    if (latest.fid > 300) score -= 25
    else if (latest.fid > 100) score -= 15
    else score -= Math.max(0, latest.fid / 20)

    // FCP scoring (0-25 points)
    if (latest.fcp > 3000) score -= 25
    else if (latest.fcp > 1800) score -= 15
    else score -= Math.max(0, latest.fcp / 120)

    // LCP scoring (0-25 points)
    if (latest.lcp > 4000) score -= 25
    else if (latest.lcp > 2500) score -= 15
    else score -= Math.max(0, latest.lcp / 160)

    return Math.max(0, Math.round(score))
  }

  public getResourceTimings(): ResourceTiming[] {
    if (typeof window === "undefined") return []

    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[]

    return resources
      .filter((resource) => resource.duration > 100) // Only slow resources
      .map((resource) => ({
        name: resource.name.split("/").pop() || resource.name,
        duration: Math.round(resource.duration),
        size: resource.transferSize,
        type: this.getResourceType(resource.name),
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10) // Top 10 slowest
  }

  private getResourceType(url: string): string {
    if (url.includes(".js")) return "script"
    if (url.includes(".css")) return "stylesheet"
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return "image"
    if (url.includes(".woff") || url.includes(".ttf")) return "font"
    return "other"
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}

export const performanceMonitor = new PerformanceMonitor()
export type { PerformanceMetrics, ResourceTiming }
