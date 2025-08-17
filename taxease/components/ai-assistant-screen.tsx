"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  FileText,
  Calculator,
  TrendingUp,
  Lightbulb,
  Zap,
  Brain,
  Target,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react"

const chatHistory = [
  {
    id: 1,
    type: "assistant",
    message:
      "Hello! I'm your AI tax assistant. I can help you with tax planning, deduction optimization, and financial advice. What would you like to know?",
    timestamp: "10:30 AM",
    category: "greeting",
  },
  {
    id: 2,
    type: "user",
    message: "Can you help me understand if I can deduct my home office expenses?",
    timestamp: "10:32 AM",
    category: "question",
  },
  {
    id: 3,
    type: "assistant",
    message:
      "Based on your profile, you qualify for home office deductions. You can deduct expenses for the portion of your home used exclusively for business. This includes utilities, rent/mortgage interest, and maintenance costs. For your 200 sq ft office in a 2000 sq ft home, you can deduct 10% of qualifying expenses. Would you like me to calculate your potential savings?",
    timestamp: "10:33 AM",
    category: "advice",
    confidence: 95,
  },
  {
    id: 4,
    type: "user",
    message: "Yes, please calculate that for me.",
    timestamp: "10:35 AM",
    category: "request",
  },
  {
    id: 5,
    type: "assistant",
    message:
      "Based on your expenses: Rent ($2,400/month × 10% = $240/month), Utilities ($300/month × 10% = $30/month), Internet ($80/month × 10% = $8/month). Your annual home office deduction could be approximately $3,336, potentially saving you $800-1,200 in taxes depending on your bracket.",
    timestamp: "10:36 AM",
    category: "calculation",
    confidence: 92,
    calculation: {
      totalDeduction: 3336,
      potentialSavings: "800-1200",
    },
  },
]

const quickActions = [
  { icon: Calculator, label: "Tax Calculator", description: "Calculate estimated taxes", color: "blue" },
  { icon: FileText, label: "Deduction Finder", description: "Find missed deductions", color: "green" },
  { icon: TrendingUp, label: "Tax Planning", description: "Optimize tax strategy", color: "purple" },
  { icon: Lightbulb, label: "Smart Tips", description: "Personalized advice", color: "orange" },
]

const aiCapabilities = [
  {
    icon: Brain,
    title: "Smart Analysis",
    description: "AI analyzes your financial data to find optimization opportunities",
  },
  {
    icon: Target,
    title: "Personalized Advice",
    description: "Tailored recommendations based on your unique situation",
  },
  { icon: Zap, title: "Real-time Calculations", description: "Instant tax calculations and scenario modeling" },
  { icon: CheckCircle, title: "Compliance Check", description: "Ensures all advice follows current tax regulations" },
]

export default function AIAssistantScreen() {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const [history, setHistory] = useState(chatHistory)
  const handleSendMessage = async () => {
    const text = message.trim()
    if (!text) return
    const newUser = { id: Date.now(), type: "user" as const, message: text, timestamp: new Date().toLocaleTimeString(), category: "user_input" }
    setHistory((h) => [...h, newUser])
    setMessage("")
    setIsTyping(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...history, newUser].map((m) => ({ role: m.type === "assistant" ? "assistant" : "user", content: m.message })),
          system: "You are a concise, friendly tax assistant. Prefer INR formatting and Indian tax context.",
        }),
      })
      const data = await res.json()
      const reply = data.reply || "Sorry, I couldn't respond."
      setHistory((h) => [
        ...h,
        {
          id: Date.now() + 1,
          type: "assistant",
          message: reply,
          timestamp: new Date().toLocaleTimeString(),
          category: "advice",
          confidence: 90,
        },
      ])
    } catch (e) {
      setHistory((h) => [
        ...h,
        {
          id: Date.now() + 1,
          type: "assistant",
          message: "AI service error. Please try again.",
          timestamp: new Date().toLocaleTimeString(),
          category: "error",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Tax Assistant</h1>
          <p className="text-muted-foreground">Get instant, personalized tax advice powered by advanced AI</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <Bot className="w-4 h-4 mr-1" />
            Online
          </Badge>
          <Button variant="outline" className="hover:bg-muted/50 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Tax Assistant Chat
              </CardTitle>
              <CardDescription>Ask questions about taxes, deductions, and financial planning</CardDescription>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.map((chat) => (
                <div key={chat.id} className={`flex gap-3 ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${chat.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        chat.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gradient-to-br from-purple-500 to-blue-600 text-white"
                      }`}
                    >
                      {chat.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        chat.type === "user" ? "bg-blue-500 text-white" : "bg-muted/50 text-foreground"
                      }`}
                    >
                      <p className="text-sm">{chat.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${chat.type === "user" ? "text-blue-100" : "text-muted-foreground"}`}>
                          {chat.timestamp}
                        </span>
                        {chat.confidence && (
                          <Badge variant="secondary" className="text-xs">
                            {chat.confidence}% confident
                          </Badge>
                        )}
                      </div>
                      {chat.calculation && (
                        <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs">
                          <div className="font-medium text-green-700 dark:text-green-400">
                            Potential Annual Savings: ${chat.calculation.potentialSavings}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ask about taxes, deductions, or financial planning..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common tax assistance tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3 hover:bg-muted/50 bg-transparent"
                >
                  <action.icon className={`w-5 h-5 mr-3 text-${action.color}-600`} />
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <capability.icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{capability.title}</h4>
                    <p className="text-xs text-muted-foreground">{capability.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                Recent Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Deduction Found</span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-500">
                  $1,200 in business meal deductions identified
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Tax Optimization</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-500">
                  Consider IRA contribution for additional savings
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-400">Action Needed</span>
                </div>
                <p className="text-xs text-orange-600 dark:text-orange-500">Upload Q3 receipts for complete analysis</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
