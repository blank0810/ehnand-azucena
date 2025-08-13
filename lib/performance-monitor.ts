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
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeObservers()
    }
  }

  private initializeObservers() {
    // CLS Observer
    if ("PerformanceObserver" in window) {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput) {
            this.updateMetric("cls", (entry as any).value)
          }
        }
      })
      clsObserver.observe({ entryTypes: ["layout-shift"] })
      this.observers.push(clsObserver)

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "first-input") {
            this.updateMetric("fid", (entry as any).processingStart - entry.startTime)
          }
        }
      })
      fidObserver.observe({ entryTypes: ["first-input"] })
      this.observers.push(fidObserver)

      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.updateMetric("lcp", lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
      this.observers.push(lcpObserver)

      // Navigation timing for FCP and TTFB
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        if (navigation) {
          this.updateMetric("ttfb", navigation.responseStart - navigation.requestStart)
        }

        const paintEntries = performance.getEntriesByType("paint")
        const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint")
        if (fcpEntry) {
          this.updateMetric("fcp", fcpEntry.startTime)
        }
      })
    }
  }

  private updateMetric(type: keyof Omit<PerformanceMetrics, "timestamp" | "url">, value: number) {
    const currentMetrics = this.getCurrentMetrics()
    currentMetrics[type] = value
    this.saveMetrics(currentMetrics)
  }

  private getCurrentMetrics(): PerformanceMetrics {
    return {
      cls: 0,
      fid: 0,
      fcp: 0,
      lcp: 0,
      ttfb: 0,
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.href : "",
    }
  }

  private saveMetrics(metrics: PerformanceMetrics) {
    this.metrics.push(metrics)

    // Send to analytics API
    if (typeof window !== "undefined") {
      fetch("/api/analytics/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metrics),
      }).catch(console.error)
    }
  }

  public getMetrics(): PerformanceMetrics[] {
    return this.metrics
  }

  public getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null
  }

  public getResourceTimings(): ResourceTiming[] {
    if (typeof window === "undefined") return []

    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[]
    return resources
      .map((resource) => ({
        name: resource.name,
        duration: resource.duration,
        size: (resource as any).transferSize || 0,
        type: this.getResourceType(resource.name),
      }))
      .filter((resource) => resource.duration > 0)
  }

  private getResourceType(url: string): string {
    if (url.includes(".js")) return "script"
    if (url.includes(".css")) return "stylesheet"
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return "image"
    if (url.includes(".woff") || url.includes(".ttf")) return "font"
    return "other"
  }

  public calculatePerformanceScore(): number {
    const latest = this.getLatestMetrics()
    if (!latest) return 0

    const scores = {
      cls: this.getClsScore(latest.cls),
      fid: this.getFidScore(latest.fid),
      fcp: this.getFcpScore(latest.fcp),
      lcp: this.getLcpScore(latest.lcp),
      ttfb: this.getTtfbScore(latest.ttfb),
    }

    // Weighted average (LCP and CLS are most important)
    return Math.round(scores.lcp * 0.25 + scores.cls * 0.25 + scores.fid * 0.2 + scores.fcp * 0.15 + scores.ttfb * 0.15)
  }

  private getClsScore(cls: number): number {
    if (cls <= 0.1) return 100
    if (cls <= 0.25) return Math.round(100 - ((cls - 0.1) / 0.15) * 50)
    return Math.max(0, Math.round(50 - ((cls - 0.25) / 0.25) * 50))
  }

  private getFidScore(fid: number): number {
    if (fid <= 100) return 100
    if (fid <= 300) return Math.round(100 - ((fid - 100) / 200) * 50)
    return Math.max(0, Math.round(50 - ((fid - 300) / 300) * 50))
  }

  private getFcpScore(fcp: number): number {
    if (fcp <= 1800) return 100
    if (fcp <= 3000) return Math.round(100 - ((fcp - 1800) / 1200) * 50)
    return Math.max(0, Math.round(50 - ((fcp - 3000) / 3000) * 50))
  }

  private getLcpScore(lcp: number): number {
    if (lcp <= 2500) return 100
    if (lcp <= 4000) return Math.round(100 - ((lcp - 2500) / 1500) * 50)
    return Math.max(0, Math.round(50 - ((lcp - 4000) / 4000) * 50))
  }

  private getTtfbScore(ttfb: number): number {
    if (ttfb <= 800) return 100
    if (ttfb <= 1800) return Math.round(100 - ((ttfb - 800) / 1000) * 50)
    return Math.max(0, Math.round(50 - ((ttfb - 1800) / 1800) * 50))
  }

  public destroy() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers = []
  }
}

export const performanceMonitor = new PerformanceMonitor()
export type { PerformanceMetrics, ResourceTiming }
