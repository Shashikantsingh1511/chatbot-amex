"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CreditCard, Shield, TrendingUp, Users, Globe, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: CreditCard,
    title: "Credit Cards",
    description: "Discover our premium credit card offerings with exclusive rewards and benefits",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50",
  },
  {
    icon: Shield,
    title: "Security & Protection",
    description: "Advanced fraud protection and security features to keep your finances safe",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50",
  },
  {
    icon: TrendingUp,
    title: "Investment Services",
    description: "Professional investment management and wealth building solutions",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50",
  },
  {
    icon: Users,
    title: "Business Solutions",
    description: "Comprehensive business banking and corporate financial services",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50",
  },
  {
    icon: Globe,
    title: "Global Services",
    description: "International banking and travel services for worldwide convenience",
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50",
  },
]

export default function ServiceCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            y: -10,
            rotateX: 5,
            rotateY: 5,
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
          className="h-full perspective-1000"
        >
          <Card
            className={`h-full relative overflow-hidden group cursor-pointer transform-3d bg-gradient-to-br ${service.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-500`}
          >
            {/* Animated background overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)`,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            />

            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </motion.div>

                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.2, rotate: -45 }}
                >
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>

              <CardTitle className="text-xl font-bold mt-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {service.description}
              </CardDescription>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="opacity-0 group-hover:opacity-100"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </CardContent>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
