"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (isComplete) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <svg className="w-32 h-32" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="8"
            strokeDasharray={264}
            strokeDashoffset={264 - (progress / 100) * 264}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
          {progress}%
        </div>
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Ehnand Azucena</h1>
        <p className="text-gray-400">Full Stack Systems Engineer</p>
      </div>
      <div className="mt-8 w-64 flex items-center justify-center">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.div>
  )
}
