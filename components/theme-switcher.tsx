"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"

type Theme = "light" | "dark" | "system"

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.documentElement.classList.toggle("dark", systemTheme === "dark")
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }
  }

  if (!isMounted) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-700"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="flex space-x-2">
        <button
          onClick={() => toggleTheme("light")}
          className={`p-2 rounded-full ${
            theme === "light" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          aria-label="Light mode"
        >
          <Sun className="h-5 w-5" />
        </button>
        <button
          onClick={() => toggleTheme("dark")}
          className={`p-2 rounded-full ${
            theme === "dark" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          aria-label="Dark mode"
        >
          <Moon className="h-5 w-5" />
        </button>
        <button
          onClick={() => toggleTheme("system")}
          className={`p-2 rounded-full ${
            theme === "system" ? "bg-primary text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          aria-label="System preference"
        >
          <Monitor className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}
