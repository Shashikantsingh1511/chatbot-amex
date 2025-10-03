"use client"

import { motion, useAnimation } from "framer-motion"
import { MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ChatbotButtonProps {
  onClick: () => void
}

export default function ChatbotButton({ onClick }: ChatbotButtonProps) {
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: { duration: 0.8 },
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [controls])

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay: 1,
        type: "spring",
        stiffness: 200,
      }}
    >
      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            marginTop: "-4px",
            marginLeft: "-4px",
          }}
          animate={{
            rotate: 360,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "linear",
          }}
          transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(40px) rotate(-${rotate})`}
        />
      ))}

      <motion.div animate={controls}>
        <Button
          onClick={onClick}
          size="lg"
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border-2 border-white/20 overflow-hidden group"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          />

          {/* Icon with rotation effect */}
          <motion.div
            className="relative z-10"
            whileHover={{
              rotate: [0, -10, 10, 0],
              scale: 1.1,
            }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle className="h-7 w-7 text-white" />

            {/* Floating sparkles */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-300" />
            </motion.div>
          </motion.div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </Button>
      </motion.div>
    </motion.div>
  )
}
