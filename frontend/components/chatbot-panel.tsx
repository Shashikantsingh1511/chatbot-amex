"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Trash2, Sparkles, Zap, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatbotPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

const sampleQuestions = [
  "What credit cards do you offer?",
  "How do I apply for a business account?",
  "What are your current interest rates?",
  "How can I track my rewards points?",
]

export default function ChatbotPanel({ isOpen, onClose }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your enhanced Amex assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async (text: string) => {
  if (!text.trim()) return

  // Add user message immediately
  const userMessage: Message = {
    id: Date.now().toString(),
    text: text.trim(),
    sender: "user",
    timestamp: new Date(),
  }
  setMessages(prev => [...prev, userMessage])
  setInputValue("")
  setIsTyping(true)

  // Add empty bot message as placeholder for streaming
  const botMsgId = (Date.now() + 1).toString()
  setMessages(prev => [
    ...prev,
    {
      id: botMsgId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isTyping: true,
    }
  ])

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text.trim() }),
    })

    if (!response.body) throw new Error("No response streaming body")

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let botText = ""

    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      botText += decoder.decode(value, { stream: true })

      // Update the bot message with new streamed text
      setMessages(prev =>
        prev.map(msg => msg.id === botMsgId ? { ...msg, text: botText } : msg)
      )
    }

    // Mark bot done typing
    setMessages(prev =>
      prev.map(msg =>
        msg.id === botMsgId ? { ...msg, text: botText, isTyping: false } : msg
      )
    )
  } catch (error) {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === botMsgId
          ? { ...msg, text: "Sorry, bot failed to respond.", isTyping: false }
          : msg
      )
    )
  } finally {
    setIsTyping(false)
  }
}


  const handleQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your enhanced Amex assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Enhanced chat panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              opacity: { duration: 0.3 },
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass-morphism z-50 flex flex-col shadow-2xl"
          >
            {/* Enhanced header */}
            <motion.div
              className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Bot className="h-5 w-5 text-white" />

                  {/* Orbiting sparkle */}
                  <motion.div
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{
                      transformOrigin: "15px 0px",
                    }}
                  />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    Amex AI Assistant
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    </motion.div>
                  </h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    Enhanced AI Mode
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearChat}
                    className="text-muted-foreground hover:text-destructive hover:bg-red-500/10 transition-all duration-300"
                    title="Clear chat history"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced sample questions */}
            {messages.length === 1 && (
              <motion.div
                className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/5 to-blue-500/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Quick questions:
                </p>
                <div className="space-y-2">
                  {sampleQuestions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto py-3 px-4 text-xs bg-white/5 hover:bg-white/10 border-white/20 hover:border-blue-500/50 transition-all duration-300"
                        onClick={() => handleQuestionClick(question)}
                      >
                        <MessageSquare className="h-3 w-3 mr-2 text-blue-500" />
                        {question}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Enhanced messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${
                        message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600"
                            : "bg-gradient-to-br from-green-500 to-teal-600"
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {message.sender === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </motion.div>
                      <motion.div
                        className={`rounded-2xl p-4 shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                            : "bg-white/10 backdrop-blur-sm text-foreground border border-white/20"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        layout
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced input */}
            <motion.div
              className="p-4 border-t border-white/10 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 focus:border-blue-500/50 focus:ring-blue-500/25 text-foreground placeholder:text-muted-foreground pr-12 transition-all duration-300"
                    disabled={isTyping}
                  />
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    animate={{ rotate: inputValue ? 0 : 360 }}
                    transition={{ duration: 2, repeat: inputValue ? 0 : Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    size="sm"
                    className="px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isTyping || !inputValue.trim()}
                  >
                    <motion.div
                      animate={{ x: isTyping ? [0, 5, 0] : 0 }}
                      transition={{ duration: 0.5, repeat: isTyping ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <Send className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
