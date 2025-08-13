"use client"

import { motion } from "framer-motion"

interface StatusBadgeProps {
  status: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function EnhancedStatusBadge({ status, size = "md", className = "" }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const baseConfig = {
      background: "",
      text: "",
      border: "",
      icon: "",
      description: "",
    }

    switch (status.toLowerCase()) {
      case "live production":
      case "live":
        return {
          ...baseConfig,
          background: "bg-gradient-to-r from-green-800/95 to-green-900/95",
          text: "text-green-50",
          border: "border-green-500/80",
          icon: "🟢",
          description: "Currently live and accessible",
        }
      case "deployed":
        return {
          ...baseConfig,
          background: "bg-gradient-to-r from-blue-800/95 to-blue-900/95",
          text: "text-blue-50",
          border: "border-blue-500/80",
          icon: "🚀",
          description: "Successfully deployed",
        }
      case "beta":
        return {
          ...baseConfig,
          background: "bg-gradient-to-r from-yellow-800/95 to-yellow-900/95",
          text: "text-yellow-50",
          border: "border-yellow-500/80",
          icon: "⚡",
          description: "In beta testing phase",
        }
      case "completed":
        return {
          ...baseConfig,
          background: "bg-gradient-to-r from-purple-800/95 to-purple-900/95",
          text: "text-purple-50",
          border: "border-purple-500/80",
          icon: "✅",
          description: "Project completed",
        }
      default:
        return {
          ...baseConfig,
          background: "bg-gradient-to-r from-gray-800/95 to-gray-900/95",
          text: "text-gray-50",
          border: "border-gray-500/80",
          icon: "📋",
          description: "Project status",
        }
    }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs"
      case "lg":
        return "px-4 py-2 text-base"
      default:
        return "px-3 py-1.5 text-sm"
    }
  }

  const config = getStatusConfig(status)
  const sizeClasses = getSizeClasses(size)

  return (
    <motion.span
      className={`
        ${config.background} ${config.text} ${config.border} ${sizeClasses}
        font-semibold rounded-full border-2 shadow-lg backdrop-blur-sm
        ring-2 ring-black/30 transition-all duration-300 hover:scale-105
        flex items-center gap-1.5 whitespace-nowrap
        ${className}
      `}
      role="status"
      aria-label={`${config.description}: ${status}`}
      title={config.description}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xs" aria-hidden="true">
        {config.icon}
      </span>
      <span className="font-bold tracking-wide">{status}</span>
    </motion.span>
  )
}
