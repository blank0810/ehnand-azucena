"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Activity, TrendingUp } from "lucide-react"
import { PerformanceDashboard } from "./performance-dashboard"
import { performanceMonitor } from "@/lib/performance-monitor"

export function PerformanceWidget() {
  const [score, setScore] = useState<number>(0)
  const [status, setStatus] = useState<"good" | "needs-improvement" | "poor">("good")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateScore = () => {
      const currentScore = performanceMonitor.calculatePerformanceScore()
      setScore(currentScore)

      if (currentScore >= 90) setStatus("good")
      else if (currentScore >= 50) setStatus("needs-improvement")
      else setStatus("poor")
    }

    updateScore()
    const interval = setInterval(updateScore, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-50 border-green-200"
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "poor":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "good":
        return "Good"
      case "needs-improvement":
        return "Needs Improvement"
      case "poor":
        return "Poor"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Performance</p>
                    <p className="text-xs text-gray-500">Core Web Vitals</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{score}</div>
                    <Badge className={`text-xs ${getStatusColor()}`}>{getStatusText()}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Analytics
          </DialogTitle>
        </DialogHeader>
        <PerformanceDashboard />
      </DialogContent>
    </Dialog>
  )
}
