import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Bot, Activity, HelpCircle, Send, MessageCircle, Sparkles, Zap, Target } from "lucide-react"

interface AIAssistantPanelProps {
  setCurrentView: (view: string) => void
}

export default function AIAssistantPanel({ setCurrentView }: AIAssistantPanelProps) {
  return (
    <div className="space-y-6">
      {/* Enhanced AI Tax Assistant */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 hover:shadow-3xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl text-emerald-700">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Bot className="w-6 h-6 text-white animate-pulse" />
            </div>
            AI Tax Assistant
            <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
          </CardTitle>
          <p className="text-sm text-emerald-600 font-medium">Get instant tax advice and intelligent insights</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enhanced Quick AI Insights */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">AI Insights</span>
            </div>
            {[
              {
                icon: "💡",
                text: "You can save ₹2,400 more by categorizing software subscriptions properly",
                type: "tip",
                borderColor: "border-blue-400",
                bgColor: "bg-blue-50"
              },
              {
                icon: "📊",
                text: "Your deduction rate is 15% above industry average - great job!",
                type: "success",
                borderColor: "border-emerald-400",
                bgColor: "bg-emerald-50"
              },
              { 
                icon: "⚠️", 
                text: "GST filing due in 5 days. Need help preparing?", 
                type: "warning",
                borderColor: "border-orange-400",
                bgColor: "bg-orange-50"
              },
            ].map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl text-sm border-l-4 ${insight.borderColor} ${insight.bgColor} backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{insight.icon}</span>
                  <span className="text-gray-700 leading-relaxed">{insight.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Quick Questions */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              <h4 className="font-semibold text-sm text-blue-700 uppercase tracking-wide">
                Quick Questions
              </h4>
            </div>
            {[
              "What expenses can I deduct?",
              "How to optimize tax savings?",
              "Explain my analysis results",
              "Tax planning strategies",
            ].map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full text-left justify-start h-auto p-4 hover:bg-emerald-100/50 hover:border-emerald-200 transition-all duration-300 text-sm border border-transparent hover:border-emerald-200 rounded-xl group"
                onClick={() => setCurrentView("ai-assistant")}
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="truncate text-gray-700 group-hover:text-emerald-700">{question}</span>
              </Button>
            ))}
          </div>

          {/* Enhanced Chat Input */}
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything..."
                className="flex-1 text-sm h-12 border-emerald-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all duration-300"
                onKeyPress={(e) => e.key === "Enter" && setCurrentView("ai-assistant")}
              />
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white h-12 px-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                onClick={() => setCurrentView("ai-assistant")}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-emerald-200 hover:bg-emerald-100/50 hover:border-emerald-300 transition-all duration-300 bg-white/70 rounded-xl h-12 font-medium"
              onClick={() => setCurrentView("ai-assistant")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Open Full Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Performance Metrics */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { label: "Tax Efficiency Score", value: "94/100", progress: 94, icon: "🎯" },
            { label: "Deduction Coverage", value: "87%", progress: 87, icon: "📊" },
            { label: "Compliance Rating", value: "98%", progress: 98, icon: "✅" },
          ].map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{metric.icon}</span>
                  <span className="text-sm font-medium text-blue-700">{metric.label}</span>
                </div>
                <Badge variant="secondary" className="text-xs font-semibold bg-white/60 text-blue-700 border-blue-200">
                  {metric.value}
                </Badge>
              </div>
              <div className="relative">
                <Progress 
                  value={metric.progress} 
                  className="h-3 rounded-full bg-blue-100"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-purple-700 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Add New Expense", action: "expense-entry", icon: "➕" },
            { label: "Run Tax Check", action: "mistake-detector", icon: "🔍" },
            { label: "View Analytics", action: "analytics", icon: "📈" },
            { label: "Upload CSV", action: "csv-analyzer", icon: "📁" },
          ].map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full text-left justify-start h-auto p-4 hover:bg-white/60 hover:border-purple-200 transition-all duration-300 text-sm border border-transparent hover:border-purple-200 rounded-xl group bg-white/40"
              onClick={() => setCurrentView(action.action)}
            >
              <span className="text-lg mr-3">{action.icon}</span>
              <span className="text-gray-700 group-hover:text-purple-700 font-medium">{action.label}</span>
              <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Pro Tip Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-700 mb-2">Pro Tip</h4>
              <p className="text-sm text-amber-600 leading-relaxed">
                Review your expense categories monthly to ensure maximum deductions. AI can help identify missed opportunities!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
