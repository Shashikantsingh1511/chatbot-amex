"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import ServiceCards from "@/components/service-cards"
import ChatbotButton from "@/components/chatbot-button"
import ChatbotPanel from "@/components/chatbot-panel"
import BackgroundEffects from "@/components/background-effects"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const floatingElementPositions = [-10, -25, 5, -15, 10]

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundEffects />
        <Navbar />

        <main className="container mx-auto px-4 pt-24 pb-8 relative z-10">
          {/* Enhanced hero section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Welcome to
              <motion.span
                className="block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                American Express
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience world-class financial services with our comprehensive suite of
              <motion.span
                className="text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {" "}
                AI-powered solutions
              </motion.span>
            </motion.p>

            {/* Floating elements */}
            <div className="relative mt-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${floatingElementPositions[i]}px`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <ServiceCards />
        </main>

        <ChatbotButton onClick={() => setIsChatOpen(true)} />
        <ChatbotPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </ThemeProvider>
  )
}
