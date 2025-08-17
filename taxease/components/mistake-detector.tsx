"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Calculator,
  Shield,
  Lightbulb,
  RefreshCw,
  Eye,
  DollarSign,
  ArrowLeft,
} from "lucide-react"

interface TaxMistake {
  id: string
  category: "deduction" | "filing" | "compliance" | "optimization"
  severity: "high" | "medium" | "low"
  title: string
  description: string
  impact: string
  solution: string
  potentialSavings: number
  status: "detected" | "resolved" | "ignored"
  detectedDate: string
}

const mockMistakes: TaxMistake[] = [
  {
    id: "1",
    category: "deduction",
    severity: "high",
    title: "Missing HRA Deduction",
    description: "You're paying rent but haven't claimed HRA deduction for the last 6 months",
    impact: "Overpaying tax by ₹18,000 annually",
    solution: "Submit rent receipts and landlord PAN to claim HRA under Section 10(13A)",
    potentialSavings: 18000,
    status: "detected",
    detectedDate: "2024-01-10",
  },
  {
    id: "2",
    category: "filing",
    severity: "medium",
    title: "Incorrect ITR Form Selection",
    description: "Using ITR-1 instead of ITR-2 due to capital gains from mutual funds",
    impact: "Risk of notice from IT department",
    solution: "File revised return using ITR-2 form before deadline",
    potentialSavings: 0,
    status: "detected",
    detectedDate: "2024-01-08",
  },
  {
    id: "3",
    category: "optimization",
    severity: "medium",
    title: "Suboptimal Investment Allocation",
    description: "80C limit not fully utilized - only ₹1.2L invested out of ₹1.5L limit",
    impact: "Missing tax savings of ₹9,300",
    solution: "Invest additional ₹30,000 in ELSS, PPF, or life insurance",
    potentialSavings: 9300,
    status: "detected",
    detectedDate: "2024-01-05",
  },
  {
    id: "4",
    category: "compliance",
    severity: "high",
    title: "TDS Mismatch",
    description: "TDS shown in Form 16 doesn't match with 26AS statement",
    impact: "Potential penalty and interest charges",
    solution: "Reconcile with employer and file correction statement",
    potentialSavings: 0,
    status: "detected",
    detectedDate: "2024-01-12",
  },
  {
    id: "5",
    category: "deduction",
    severity: "low",
    title: "Medical Insurance Premium",
    description: "Health insurance premium of ₹25,000 not claimed under Section 80D",
    impact: "Missing tax benefit of ₹7,750",
    solution: "Include health insurance premium in 80D deductions",
    potentialSavings: 7750,
    status: "resolved",
    detectedDate: "2024-01-01",
  },
]

interface MistakeDetectorProps {
  setCurrentView?: (view: string) => void
}

export default function MistakeDetector({ setCurrentView }: MistakeDetectorProps) {
  const [mistakes, setMistakes] = useState<TaxMistake[]>(mockMistakes)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isScanning, setIsScanning] = useState(false)

  const getSeverityColor = (severity: TaxMistake["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category: TaxMistake["category"]) => {
    switch (category) {
      case "deduction":
        return DollarSign
      case "filing":
        return FileText
      case "compliance":
        return Shield
      case "optimization":
        return TrendingUp
      default:
        return AlertTriangle
    }
  }

  const getStatusIcon = (status: TaxMistake["status"]) => {
    switch (status) {
      case "detected":
        return AlertTriangle
      case "resolved":
        return CheckCircle
      case "ignored":
        return XCircle
      default:
        return AlertTriangle
    }
  }

  const filteredMistakes =
    selectedCategory === "all" ? mistakes : mistakes.filter((mistake) => mistake.category === selectedCategory)

  const totalPotentialSavings = mistakes
    .filter((m) => m.status === "detected")
    .reduce((sum, mistake) => sum + mistake.potentialSavings, 0)

  const detectedCount = mistakes.filter((m) => m.status === "detected").length
  const resolvedCount = mistakes.filter((m) => m.status === "resolved").length

  const runScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      // Simulate finding new mistakes
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950">
      <div className="container mx-auto px-6 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          {setCurrentView && (
            <Button
              onClick={() => setCurrentView("simplified-dashboard")}
              variant="outline"
              className="mb-4 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                    Tax Mistake Detector
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    AI-powered analysis to identify tax optimization opportunities and compliance issues
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              onClick={runScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-105"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-red-50 to-pink-50 hover:shadow-3xl transition-all duration-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Issues Detected</p>
                  <p className="text-3xl font-bold text-red-700">{detectedCount}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-green-50 hover:shadow-3xl transition-all duration-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium">Potential Savings</p>
                  <p className="text-3xl font-bold text-emerald-700">₹{totalPotentialSavings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-3xl transition-all duration-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Issues Resolved</p>
                  <p className="text-3xl font-bold text-blue-700">{resolvedCount}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {["all", "deduction", "filing", "compliance", "optimization"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-lg shadow-red-500/25" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Mistakes List */}
        <div className="space-y-6">
          {filteredMistakes.map((mistake) => {
            const CategoryIcon = getCategoryIcon(mistake.category)
            const StatusIcon = getStatusIcon(mistake.status)

            return (
              <Card
                key={mistake.id}
                className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center shadow-lg">
                        <CategoryIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{mistake.title}</h3>
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(mistake.severity)}`} />
                          <Badge variant="outline" className="text-sm capitalize font-semibold">
                            {mistake.severity} Priority
                          </Badge>
                          <Badge
                            className={`text-sm font-semibold ${
                              mistake.status === "resolved"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200"
                                : mistake.status === "ignored"
                                  ? "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300 border-gray-200"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200"
                            }`}
                          >
                            {mistake.status}
                          </Badge>
                        </div>
                        
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{mistake.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200/50">
                            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-1">Impact</p>
                              <p className="text-sm text-orange-600 dark:text-orange-400">{mistake.impact}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50">
                            <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">Solution</p>
                              <p className="text-sm text-blue-600 dark:text-blue-400">{mistake.solution}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-3">
                      {mistake.potentialSavings > 0 && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50">
                          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Potential Savings</p>
                          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">₹{mistake.potentialSavings.toLocaleString()}</p>
                        </div>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">Detected: {mistake.detectedDate}</p>
                    </div>
                  </div>

                  {mistake.status === "detected" && (
                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25"
                        onClick={() => {
                          setMistakes(mistakes.map((m) => (m.id === mistake.id ? { ...m, status: "resolved" } : m)))
                        }}
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark Resolved
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => {
                          setMistakes(mistakes.map((m) => (m.id === mistake.id ? { ...m, status: "ignored" } : m)))
                        }}
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Ignore
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Get Help
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Analysis Progress */}
        {isScanning && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 mt-8">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Analyzing Your Tax Data</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Our AI is reviewing your financial records for optimization opportunities and compliance issues...
                </p>
                <Progress value={66} className="w-full max-w-md mx-auto h-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Checking deductions and compliance...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
