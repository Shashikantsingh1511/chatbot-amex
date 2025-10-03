"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function BackgroundEffects() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([])
  const [windowHeight, setWindowHeight] = useState(800) // Default fallback height

  useEffect(() => {
    setWindowHeight(window.innerHeight)

    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
    }))
    setParticles(newParticles)

    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
          style={{ left: `${particle.x}%` }}
          animate={{
            y: [windowHeight + 20, -20],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-blue-200/30 dark:border-blue-800/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 border border-purple-200/30 dark:border-purple-800/30 rotate-45"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}
