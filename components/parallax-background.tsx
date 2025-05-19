"use client"

import { useEffect, useRef } from "react"

export default function ParallaxBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return

      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      backgroundRef.current.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        ref={backgroundRef}
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translate(0, 0)",
        }}
      ></div>
    </div>
  )
}
