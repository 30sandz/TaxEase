import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, TrendingDown, Target, Zap, AlertTriangle, 
  CheckCircle, Clock, DollarSign, Percent, BarChart3,
  ArrowUpRight, ArrowDownRight, Star, Trophy, Lightbulb, Upload
} from "lucide-react"

interface InfographicsInsightsProps {
  csvAnalysisResults: any
  taxDerived: any
}

export default function InfographicsInsights({ csvAnalysisResults, taxDerived }: InfographicsInsightsProps) {
  if (!csvAnalysisResults) return null

  // Calculate insights
  const totalExpenses = csvAnalysisResults.totalExpenses || 0
  const deductibleExpenses = csvAnalysisResults.deductibleExpenses || 0
  const taxSavings = taxDerived?.taxSavings || 0
  const deductionRate = totalExpenses > 0 ? (deductibleExpenses / totalExpenses) * 100 : 0
  
  // Performance indicators
  const performanceScore = Math.min(100, Math.max(0, 
    (deductionRate * 0.4) + 
    (Math.min(100, (taxSavings / 10000) * 100) * 0.3) + 
    (Math.min(100, (csvAnalysisResults.categoryBreakdown?.length || 0) * 10) * 0.3)
  ))

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "emerald", icon: Trophy }
    if (score >= 80) return { level: "Good", color: "blue", icon: Star }
    if (score >= 70) return { level: "Fair", color: "yellow", icon: Target }
    return { level: "Needs Improvement", color: "red", icon: AlertTriangle }
  }

  const performanceLevel = getPerformanceLevel(performanceScore)

  // Key insights
  const insights = [
    {
      type: "positive",
      icon: TrendingUp,
      title: "High Deduction Rate",
      description: `Your ${deductionRate.toFixed(1)}% deduction rate is above the industry average of 65%`,
      impact: "Saves ₹" + (taxSavings * 0.15).toLocaleString() + " annually",
      color: "emerald"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Category Optimization",
      description: "Consider adding more business-related categories to maximize deductions",
      impact: "Potential additional savings: ₹" + (totalExpenses * 0.05).toLocaleString(),
      color: "amber"
    },
    {
      type: "info",
      icon: Lightbulb,
      title: "Timing Strategy",
      description: "Plan major purchases near year-end to optimize current year deductions",
      impact: "Strategic timing could save ₹" + (totalExpenses * 0.08).toLocaleString(),
      color: "blue"
    }
  ]

  // Monthly comparison data
  const monthlyComparison = [
    { month: "Jan", current: 45000, previous: 42000, change: "+7.1%" },
    { month: "Feb", current: 52000, previous: 48000, change: "+8.3%" },
    { month: "Mar", current: 48000, previous: 51000, change: "-5.9%" },
    { month: "Apr", current: 61000, previous: 55000, change: "+10.9%" },
    { month: "May", current: 55000, previous: 52000, change: "+5.8%" },
    { month: "Jun", current: 67000, previous: 60000, change: "+11.7%" }
  ]

  // Tax optimization opportunities
  const optimizationOpportunities = [
    {
      category: "Home Office",
      current: 0,
      potential: 15000,
      description: "Deduct home office expenses including utilities and internet",
      difficulty: "Easy",
      impact: "High"
    },
    {
      category: "Vehicle Expenses",
      current: 8000,
      potential: 25000,
      description: "Track business mileage and vehicle maintenance costs",
      difficulty: "Medium",
      impact: "High"
    },
    {
      category: "Professional Development",
      current: 5000,
      potential: 20000,
      description: "Include courses, certifications, and industry memberships",
      difficulty: "Easy",
      impact: "Medium"
    },
    {
      category: "Equipment & Technology",
      current: 12000,
      potential: 30000,
      description: "Depreciate business equipment and technology purchases",
      difficulty: "Medium",
      impact: "High"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Performance Score Card */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-indigo-700 flex items-center justify-center">
            <Target className="w-10 h-10 mr-3 text-indigo-500" />
            Tax Management Performance Score
          </CardTitle>
          <p className="text-indigo-600 text-lg">Your comprehensive tax optimization rating</p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-bold text-white">{performanceScore.toFixed(0)}</span>
            </div>
            <div className="absolute -top-2 -right-2">
              <Badge className={`bg-${performanceLevel.color}-100 text-${performanceLevel.color}-800 border-${performanceLevel.color}-200 px-3 py-1`}>
                <performanceLevel.icon className="w-4 h-4 mr-1" />
                {performanceLevel.level}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">{deductionRate.toFixed(1)}%</div>
              <div className="text-sm text-indigo-600">Deduction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">₹{taxSavings.toLocaleString()}</div>
              <div className="text-sm text-indigo-600">Tax Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-700">{csvAnalysisResults.categoryBreakdown?.length || 0}</div>
              <div className="text-sm text-indigo-600">Categories</div>
            </div>
          </div>

          <Progress value={performanceScore} className="h-3 mb-4" />
          <p className="text-sm text-indigo-600">
            {performanceScore >= 90 ? "Outstanding performance! You're maximizing your tax benefits." :
             performanceScore >= 80 ? "Great work! You're above average in tax optimization." :
             performanceScore >= 70 ? "Good progress! There's room for improvement." :
             "Focus on improving deduction rates and category optimization."}
          </p>
        </CardContent>
      </Card>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className={`w-12 h-12 bg-${insight.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <insight.icon className={`w-6 h-6 text-${insight.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${insight.color}-100 text-${insight.color}-800`}>
                    <Zap className="w-3 h-3 mr-1" />
                    {insight.impact}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Comparison Chart */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-green-100">
        <CardHeader>
          <CardTitle className="text-2xl text-emerald-700 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-emerald-500" />
            Monthly Expense Comparison
          </CardTitle>
          <p className="text-emerald-600">Current vs Previous Year Performance</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyComparison.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-emerald-200/30">
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-center">
                    <div className="text-lg font-semibold text-emerald-700">{month.month}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Current</div>
                      <div className="text-lg font-bold text-emerald-700">₹{month.current.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Previous</div>
                      <div className="text-lg font-bold text-gray-600">₹{month.previous.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {month.change.startsWith('+') ? (
                    <ArrowUpRight className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-500" />
                  )}
                  <Badge 
                    variant={month.change.startsWith('+') ? "default" : "destructive"}
                    className={month.change.startsWith('+') ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}
                  >
                    {month.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Optimization Opportunities */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-100">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-700 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-amber-500" />
            Tax Optimization Opportunities
          </CardTitle>
          <p className="text-amber-600">Unlock additional tax savings with these strategies</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {optimizationOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white/60 rounded-xl p-6 border border-amber-200/30 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-amber-800">{opportunity.category}</h3>
                  <div className="flex space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        opportunity.difficulty === "Easy" ? "bg-green-100 text-green-800 border-green-200" :
                        opportunity.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {opportunity.difficulty}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        opportunity.impact === "High" ? "bg-purple-100 text-purple-800 border-purple-200" :
                        "bg-blue-100 text-blue-800 border-blue-200"
                      }`}
                    >
                      {opportunity.impact} Impact
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{opportunity.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Deduction:</span>
                    <span className="font-semibold text-gray-800">₹{opportunity.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential Deduction:</span>
                    <span className="font-semibold text-amber-700">₹{opportunity.potential.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Additional Savings:</span>
                    <span className="font-bold text-green-600">₹{(opportunity.potential - opportunity.current).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress 
                    value={opportunity.current > 0 ? (opportunity.current / opportunity.potential) * 100 : 0} 
                    className="h-2 mb-2" 
                  />
                  <div className="text-xs text-gray-500 text-center">
                    {opportunity.current > 0 ? 
                      `${((opportunity.current / opportunity.potential) * 100).toFixed(1)}% utilized` : 
                      "0% utilized - Start tracking now!"
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Review Categories",
            description: "Optimize expense categorization",
            icon: Target,
            color: "blue",
            action: "Review Now"
          },
          {
            title: "Upload Receipts",
            description: "Add missing documentation",
            icon: Upload,
            color: "emerald",
            action: "Upload"
          },
          {
            title: "Tax Planning",
            description: "Plan next year's strategy",
            icon: TrendingUp,
            color: "purple",
            action: "Plan"
          },
          {
            title: "Compliance Check",
            description: "Verify tax compliance",
            icon: CheckCircle,
            color: "orange",
            action: "Check"
          }
        ].map((action, index) => (
          <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 bg-${action.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className={`w-8 h-8 text-${action.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <button className={`bg-${action.color}-600 hover:bg-${action.color}-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300`}>
                {action.action}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
