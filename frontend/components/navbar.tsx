"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform } from "framer-motion"
import { Moon, Sun, Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 1])
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      style={{
        opacity: navbarOpacity,
        backdropFilter: `blur(${navbarBlur}px)`,
      }}
      className={`fixed top-0 w-full z-50 pt-2.5 pb-1 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 shadow-lg shadow-blue-500/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with 3D effect */}
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div
              className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.span className="text-white font-bold text-sm" style={{ backfaceVisibility: "hidden" }}>
                AX
              </motion.span>
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              American Express
            </motion.span>
          </motion.div>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            {["Personal", "Business", "Corporate", "Support"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="relative text-foreground hover:text-primary transition-colors group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Enhanced theme toggle and mobile menu */}
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-200/50 dark:border-purple-800/50"
              >
                <motion.div
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center justify-center"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div className="md:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 glass-morphism rounded-lg mt-2 p-4">
            {["Personal", "Business", "Corporate", "Support"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="block text-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-950/50"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
