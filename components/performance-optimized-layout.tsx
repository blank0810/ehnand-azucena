"use client"

import type React from "react"

import { useEffect } from "react"
import { performanceOptimizer } from "@/lib/performance-optimizer"
import { criticalResourceLoader } from "@/lib/critical-resource-loader"

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode
}

export default function PerformanceOptimizedLayout({ children }: PerformanceOptimizedLayoutProps) {
  useEffect(() => {
    performanceOptimizer.initialize()

    const criticalResources = [
      { url: "/images/profile-new.jpg", type: "image" as const, priority: "high" as const, preload: true },
      { url: "/fonts/inter.woff2", type: "font" as const, priority: "high" as const, preload: true },
      { url: "/api/performance-data", type: "script" as const, priority: "medium" as const },
    ]

    criticalResourceLoader.loadCriticalResources(criticalResources)

    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType("paint")

        const fcp = paint.find((entry) => entry.name === "first-contentful-paint")
        const lcp = performance.getEntriesByType("largest-contentful-paint")

        console.log("Performance Metrics:", {
          FCP: fcp ? `${Math.round(fcp.startTime)}ms` : "Not available",
          LCP: lcp.length ? `${Math.round(lcp[lcp.length - 1].startTime)}ms` : "Not available",
          TTFB: navigation ? `${Math.round(navigation.responseStart)}ms` : "Not available",
          DOMContentLoaded: navigation ? `${Math.round(navigation.domContentLoadedEventEnd)}ms` : "Not available",
        })
      }
    }

    setTimeout(measurePerformance, 2000)
  }, [])

  return <>{children}</>
}
