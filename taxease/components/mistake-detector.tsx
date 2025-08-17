"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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

export default function MistakeDetector() {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tax Mistake Detector</h2>
          <p className="text-muted-foreground">AI-powered analysis to identify tax optimization opportunities</p>
        </div>
        <Button
          onClick={runScan}
          disabled={isScanning}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Run Analysis
            </>
          )}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues Detected</p>
                <p className="text-2xl font-bold text-red-600">{detectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-bold text-green-600">₹{totalPotentialSavings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues Resolved</p>
                <p className="text-2xl font-bold text-blue-600">{resolvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {["all", "deduction", "filing", "compliance", "optimization"].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : ""}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {filteredMistakes.map((mistake) => {
          const CategoryIcon = getCategoryIcon(mistake.category)
          const StatusIcon = getStatusIcon(mistake.status)

          return (
            <Card
              key={mistake.id}
              className="border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{mistake.title}</h3>
                        <div className={`w-2 h-2 rounded-full ${getSeverityColor(mistake.severity)}`} />
                        <Badge variant="outline" className="text-xs capitalize">
                          {mistake.severity} Priority
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            mistake.status === "resolved"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                              : mistake.status === "ignored"
                                ? "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                          }`}
                        >
                          {mistake.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{mistake.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Impact</p>
                            <p className="text-sm text-orange-600 dark:text-orange-400">{mistake.impact}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Solution</p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{mistake.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {mistake.potentialSavings > 0 && (
                      <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Potential Savings</p>
                        <p className="text-lg font-bold text-green-600">₹{mistake.potentialSavings.toLocaleString()}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">Detected: {mistake.detectedDate}</p>
                  </div>
                </div>

                {mistake.status === "detected" && (
                  <div className="flex space-x-2 pt-4 border-t border-border">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      onClick={() => {
                        setMistakes(mistakes.map((m) => (m.id === mistake.id ? { ...m, status: "resolved" } : m)))
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setMistakes(mistakes.map((m) => (m.id === mistake.id ? { ...m, status: "ignored" } : m)))
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Ignore
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
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
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Analyzing Your Tax Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI is reviewing your financial records for optimization opportunities...
              </p>
              <Progress value={66} className="w-full max-w-md mx-auto" />
              <p className="text-xs text-muted-foreground mt-2">Checking deductions and compliance...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
