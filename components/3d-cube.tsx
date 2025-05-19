"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

export default function ThreeDCube() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(200, 200)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)

    // Create materials with tech-themed textures
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, opacity: 0.8, transparent: true }), // Primary blue
      new THREE.MeshBasicMaterial({ color: 0x10b981, opacity: 0.8, transparent: true }), // Secondary green
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, opacity: 0.8, transparent: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, opacity: 0.8, transparent: true }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, opacity: 0.8, transparent: true }), // Accent orange
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, opacity: 0.8, transparent: true }),
    ]

    // Create wireframe
    const edges = new THREE.EdgesGeometry(geometry)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))

    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)
    scene.add(line)

    camera.position.z = 2.5

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      line.rotation.x += 0.01
      line.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const offsetX = (x - centerX) / centerX
      const offsetY = (y - centerY) / centerY

      cube.rotation.x = offsetY * 0.5
      cube.rotation.y = offsetX * 0.5
      line.rotation.x = offsetY * 0.5
      line.rotation.y = offsetX * 0.5
    }

    document.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <motion.div
      ref={mountRef}
      className="w-[200px] h-[200px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    />
  )
}
