"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Mic, MicOff, User, Sparkles, TrendingUp, HelpCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI tax advisor. I can help you with tax planning, expense optimization, deduction strategies, and answer questions about your financial data. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    "What expenses can I deduct?",
    "How to optimize my tax savings?",
    "Explain my CSV analysis results",
    "Best practices for expense tracking",
    "Tax planning strategies for next year",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const history = [...messages, userMessage].map((m) => ({ role: m.type === "assistant" ? "assistant" : "user", content: m.content }))
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, system: "You are a helpful tax assistant for Indian SMBs. Keep answers concise and actionable." }),
      })
      const data = await res.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (e) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "There was an error contacting the AI service. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("deduct") || lowerQuestion.includes("expense")) {
      return "Based on your business activities, you can typically deduct:\n\n• Office supplies and equipment\n• Business meals (50% deductible)\n• Travel expenses for business purposes\n• Software subscriptions and tools\n• Professional services and consulting\n• Marketing and advertising costs\n\nFrom your recent CSV analysis, I noticed you have ₹24,250 in deductible expenses. Would you like me to explain any specific category?"
    }

    if (lowerQuestion.includes("optimize") || lowerQuestion.includes("savings")) {
      return "Here are key strategies to optimize your tax savings:\n\n1. **Maximize Business Deductions**: Ensure all legitimate business expenses are properly categorized\n2. **Timing Strategy**: Consider timing large purchases at year-end\n3. **Record Keeping**: Maintain detailed receipts and documentation\n4. **Professional Consultation**: Consider quarterly tax planning sessions\n\nYour current analysis shows potential savings of ₹9,000 monthly. We can potentially increase this by 15-20% with better categorization."
    }

    if (lowerQuestion.includes("csv") || lowerQuestion.includes("analysis")) {
      return "Your CSV analysis revealed some great insights:\n\n• Total monthly expenses: ₹30,250\n• Tax-deductible expenses: ₹24,250 (80.2%)\n• Potential tax savings: ₹9,000\n• Profit improvement: ₹9,000 with proper deductions\n\nThe AI classified your expenses with 92% average confidence. Would you like me to explain any specific transactions or suggest improvements?"
    }

    if (lowerQuestion.includes("track") || lowerQuestion.includes("record")) {
      return "Best practices for expense tracking:\n\n1. **Digital Receipts**: Use apps to scan and store receipts immediately\n2. **Categorization**: Assign categories as soon as expenses occur\n3. **Monthly Reviews**: Review and reconcile expenses monthly\n4. **Separate Accounts**: Keep business and personal expenses separate\n5. **Documentation**: Include business purpose for each expense\n\nOur CSV analyzer can help automate much of this process. Would you like tips on preparing your data for analysis?"
    }

    return "I'd be happy to help you with that! As your AI tax advisor, I can assist with:\n\n• Tax deduction strategies\n• Expense optimization\n• Financial planning advice\n• Analysis of your spending patterns\n• Compliance guidance\n\nCould you provide more specific details about what you'd like to know? I'm here to help you maximize your tax efficiency and financial success."
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Tax Assistant</h1>
        <p className="text-muted-foreground">Get personalized tax advice and insights powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="glass-morphism border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start h-auto p-3 hover:bg-primary/10 transition-all duration-300"
                  onClick={() => handleQuickQuestion(question)}
                >
                  <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-morphism border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tax Savings</span>
                <Badge variant="secondary">₹9,000/mo</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Deductible %</span>
                <Badge variant="secondary">80.2%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <Badge variant="default">92%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="glass-morphism border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-6 h-6 mr-2 text-primary" />
                AI Chat Assistant
                <Badge variant="secondary" className="ml-auto">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "bg-muted/50 border"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "assistant" && <Bot className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />}
                        {message.type === "user" && <User className="w-5 h-5 mt-0.5 text-white flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p
                            className={`text-xs mt-2 ${
                              message.type === "user" ? "text-white/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 border rounded-2xl p-4 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-primary" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about taxes, expenses, or financial planning..."
                      className="pr-12 rounded-xl border-0 bg-muted/50 focus:bg-background transition-colors"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0 rounded-lg"
                      onClick={toggleVoiceInput}
                    >
                      {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
