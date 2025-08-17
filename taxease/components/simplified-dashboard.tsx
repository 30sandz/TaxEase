import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Calculator, 
  Shield, 
  Target,
  Plus,
  Upload,
  Bot,
  Settings,
  Sparkles,
  Zap,
  PieChart,
  Activity,
  DollarSign,
  Tag,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react"

import DashboardOverview from "./dashboard-overview"
import TaxOptimizationComparison from "./tax-optimization-comparison"
import ExpenseAnalysis from "./expense-analysis"
import AIAssistantPanel from "./ai-assistant-panel"
import ChartsAndGraphs from "./charts-and-graphs"
import EnhancedExpenseManager from "./enhanced-expense-manager"
import InfographicsInsights from "./infographics-insights"
import CSVAnalyzer from "./csv-analyzer"

interface SimplifiedDashboardProps {
  csvAnalysisResults: any
  taxDerived: any
  setCurrentView: (view: string) => void
}

export default function SimplifiedDashboard({ 
  csvAnalysisResults, 
  taxDerived, 
  setCurrentView 
}: SimplifiedDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Show welcome message when no data is available
  if (!csvAnalysisResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Calculator className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Welcome to TaxEase!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                You're all set up! To get started with your tax optimization journey, upload your expense data and let our AI analyze it for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200/30 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">Upload Your Data</h3>
                <p className="text-gray-600 mb-6">
                  Upload CSV files, receipts, or connect your accounting software to get started with AI-powered analysis.
                </p>
                <Button 
                  onClick={() => setCurrentView("csv-analyzer")}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                >
                  Start Data Upload
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/30 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-700 mb-4">AI Assistant</h3>
                <p className="text-gray-600 mb-6">
                  Get instant answers to your tax questions and personalized optimization recommendations.
                </p>
                <Button 
                  onClick={() => setCurrentView("ai-assistant")}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Chat with AI
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-3xl p-8 border border-purple-200/30">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">What You'll Get</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Tax Optimization</h4>
                  <p className="text-sm text-emerald-600">Maximize deductions and minimize tax liability</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-700 mb-2">Compliance</h4>
                  <p className="text-sm text-blue-600">Stay compliant with automated checks</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-purple-700 mb-2">Insights</h4>
                  <p className="text-sm text-purple-600">Detailed analytics and reporting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950">
      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Header with Quick Actions */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    TaxEase Dashboard
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back! Here's your comprehensive financial overview with AI-powered insights.
                  </p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-emerald-200/30">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-emerald-700">
                    ₹{(taxDerived?.taxSavings || 0).toLocaleString()} saved this month
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-200/30">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700">
                    {((csvAnalysisResults.deductibleExpenses / csvAnalysisResults.totalExpenses) * 100).toFixed(1)}% deductible
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-200/30">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    {csvAnalysisResults.categoryBreakdown?.length || 0} categories tracked
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setCurrentView("expense-entry")}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
              </Button>
              <Button 
                onClick={() => setCurrentView("csv-analyzer")}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload CSV
              </Button>
              <Button 
                onClick={() => setCurrentView("ai-assistant")}
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <Bot className="w-5 h-5 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-8 mb-8 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-2 shadow-lg">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-semibold">Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="charts" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <PieChart className="w-5 h-5" />
                  <span className="font-semibold">Charts</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="expenses" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Expenses</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="categories" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <Tag className="w-5 h-5" />
                  <span className="font-semibold">Categories</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="optimization" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Tax Impact</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analysis" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">Analysis</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">Insights</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="compliance" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-300"
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Compliance</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <DashboardOverview 
                  csvAnalysisResults={csvAnalysisResults} 
                  taxDerived={taxDerived} 
                />
              </TabsContent>

              <TabsContent value="charts" className="space-y-6">
                <ChartsAndGraphs 
                  csvAnalysisResults={csvAnalysisResults} 
                  taxDerived={taxDerived} 
                />
              </TabsContent>

              <TabsContent value="expenses" className="space-y-6">
                <EnhancedExpenseManager />
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <Card className="border-0 shadow-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 hover:shadow-3xl transition-all duration-500">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl text-orange-700 flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                      Expense Categories & Budget Management
                    </CardTitle>
                    <p className="text-orange-600 text-lg mt-2">Organize expenses by category and track spending patterns with smart budget alerts</p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Category Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { 
                          name: "Food & Dining", 
                          amount: 12500, 
                          budget: 15000, 
                          trend: "up", 
                          color: "emerald",
                          icon: "🍽️"
                        },
                        { 
                          name: "Transportation", 
                          amount: 8500, 
                          budget: 10000, 
                          trend: "down", 
                          color: "blue",
                          icon: "🚗"
                        },
                        { 
                          name: "Entertainment", 
                          amount: 6800, 
                          budget: 5000, 
                          trend: "up", 
                          color: "red",
                          icon: "🎬"
                        },
                        { 
                          name: "Utilities", 
                          amount: 4200, 
                          budget: 4500, 
                          trend: "stable", 
                          color: "purple",
                          icon: "⚡"
                        }
                      ].map((category, index) => (
                        <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-2xl">{category.icon}</span>
                              <Badge 
                                variant={category.trend === "up" ? "destructive" : 
                                       category.trend === "down" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {category.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> :
                                 category.trend === "down" ? <TrendingDown className="w-3 h-3 mr-1" /> :
                                 <Activity className="w-3 h-3 mr-1" />}
                                {category.trend === "up" ? "Over" : category.trend === "down" ? "Under" : "On Track"}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Spent:</span>
                                <span className="font-semibold text-gray-800">₹{category.amount.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Budget:</span>
                                <span className="font-semibold text-gray-800">₹{category.budget.toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    category.trend === "up" ? "bg-red-500" :
                                    category.trend === "down" ? "bg-emerald-500" : "bg-blue-500"
                                  }`}
                                  style={{ width: `${Math.min((category.amount / category.budget) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Category Management Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-orange-700 flex items-center">
                          <Plus className="w-6 h-6 mr-2 text-orange-500" />
                          Manage Categories
                        </h3>
                        <div className="space-y-4">
                          {[
                            { name: "Healthcare", count: 12, deductible: true, icon: "🏥" },
                            { name: "Education", count: 8, deductible: true, icon: "📚" },
                            { name: "Home Office", count: 15, deductible: true, icon: "🏠" },
                            { name: "Travel", count: 6, deductible: false, icon: "✈️" }
                          ].map((cat, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-orange-200/30 hover:bg-white/80 transition-all duration-300">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{cat.icon}</span>
                                <div>
                                  <div className="font-medium text-gray-800">{cat.name}</div>
                                  <div className="text-sm text-gray-600">{cat.count} expenses</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {cat.deductible && (
                                  <Badge variant="default" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Tax Deductible
                                  </Badge>
                                )}
                                <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-semibold">
                          <Plus className="w-5 h-5 mr-2" />
                          Add New Category
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-orange-700 flex items-center">
                          <AlertCircle className="w-6 h-6 mr-2 text-orange-500" />
                          Smart Alerts & Insights
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-red-100/50 to-pink-100/50 rounded-2xl border border-red-200/50">
                            <div className="flex items-center space-x-3 mb-2">
                              <AlertCircle className="w-5 h-5 text-red-500" />
                              <span className="font-semibold text-red-700">Budget Alert</span>
                            </div>
                            <p className="text-sm text-red-600">Entertainment category is 36% over budget this month</p>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-emerald-100/50 to-green-100/50 rounded-2xl border border-emerald-200/50">
                            <div className="flex items-center space-x-3 mb-2">
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                              <span className="font-semibold text-emerald-700">Tax Optimization</span>
                            </div>
                            <p className="text-sm text-emerald-600">Healthcare expenses increased by 25% - great for tax deductions!</p>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 rounded-2xl border border-blue-200/50">
                            <div className="flex items-center space-x-3 mb-2">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <span className="font-semibold text-blue-700">Trend Analysis</span>
                            </div>
                            <p className="text-sm text-blue-600">Transportation costs decreased by 15% compared to last month</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-orange-200">
                          <Button 
                            variant="outline"
                            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 py-3 rounded-xl font-semibold"
                          >
                            <TrendingUp className="w-5 h-5 mr-2" />
                            View Detailed Analytics
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-6 border-t border-orange-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button 
                          onClick={() => setCurrentView("expense-entry")}
                          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add Categorized Expense
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-orange-300 text-orange-700 hover:bg-orange-50 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                          <Upload className="w-5 h-5 mr-2" />
                          Import Categories
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-orange-300 text-orange-700 hover:bg-orange-50 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                          <Settings className="w-5 h-5 mr-2" />
                          Category Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimization" className="space-y-6">
                <TaxOptimizationComparison 
                  csvAnalysisResults={csvAnalysisResults} 
                  taxDerived={taxDerived} 
                />
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <ExpenseAnalysis 
                  csvAnalysisResults={csvAnalysisResults} 
                  taxDerived={taxDerived} 
                />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <InfographicsInsights 
                  csvAnalysisResults={csvAnalysisResults} 
                  taxDerived={taxDerived} 
                />
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-50 via-violet-50 to-purple-50 hover:shadow-3xl transition-all duration-500">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl text-purple-700 flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      Tax Compliance & Risk Management
                    </CardTitle>
                    <p className="text-purple-600 text-lg mt-2">Stay compliant and minimize risks with our intelligent monitoring system</p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-purple-700 flex items-center">
                          <Zap className="w-6 h-6 mr-2 text-purple-500" />
                          Compliance Status
                        </h3>
                        <div className="space-y-4">
                          {[
                            { item: "GST Filing", status: "Due in 5 days", priority: "high", icon: "⚠️" },
                            { item: "TDS Returns", status: "Up to date", priority: "low", icon: "✅" },
                            { item: "Income Tax Filing", status: "Due in 2 months", priority: "medium", icon: "⏰" },
                            { item: "Audit Requirements", status: "Not required", priority: "low", icon: "✅" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-white/60 rounded-2xl border border-purple-200/30 hover:bg-white/80 transition-all duration-300">
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm font-medium text-purple-700">{item.item}</span>
                              </div>
                              <Badge 
                                variant={item.priority === "high" ? "destructive" : 
                                       item.priority === "medium" ? "secondary" : "default"}
                                className="text-xs font-semibold px-3 py-1"
                              >
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-purple-700 flex items-center">
                          <Target className="w-6 h-6 mr-2 text-purple-500" />
                          Risk Assessment
                        </h3>
                        <div className="space-y-4">
                          <div className="p-6 bg-gradient-to-r from-emerald-100/50 to-green-100/50 rounded-2xl border border-emerald-200/50">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                              <div className="text-lg font-semibold text-emerald-700">Low Risk Areas</div>
                            </div>
                            <div className="text-sm text-emerald-600 space-y-1">
                              <div>• Proper documentation maintained</div>
                              <div>• Deductions properly categorized</div>
                              <div>• Receipts organized</div>
                            </div>
                          </div>
                          <div className="p-6 bg-gradient-to-r from-orange-100/50 to-red-100/50 rounded-2xl border border-orange-200/50">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <div className="text-lg font-semibold text-orange-700">Attention Required</div>
                            </div>
                            <div className="text-sm text-orange-600 space-y-1">
                              <div>• GST filing deadline approaching</div>
                              <div>• Consider professional review for complex transactions</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-purple-200">
                      <Button 
                        onClick={() => setCurrentView("mistake-detector")}
                        className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                      >
                        <Calculator className="w-6 h-6 mr-3" />
                        Run Full Compliance Check
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <AIAssistantPanel setCurrentView={setCurrentView} />
          </div>
        </div>
      </div>
    </div>
  )
}
