"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calculator,
  AlertTriangle,
  CheckCircle,
  X,
  Download,
  Eye,
  Zap,
} from "lucide-react"

interface CSVAnalyzerProps {
  selectedFile?: File | null
  setSelectedFile?: (file: File | null) => void
  onAnalysisComplete?: (results: any) => void
}

interface ExpenseData {
  date: string
  description: string
  amount: number
  category: string
  taxDeductible: boolean
  confidence: number
}

interface TaxAnalysis {
  totalExpenses: number
  deductibleExpenses: number
  nonDeductibleExpenses: number
  potentialSavings: number
  taxWithDeductions: number
  taxWithoutDeductions: number
  profitWithTax: number
  profitWithoutTax: number
}

export default function CSVAnalyzer({ selectedFile, setSelectedFile, onAnalysisComplete }: CSVAnalyzerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [csvData, setCsvData] = useState<ExpenseData[]>([])
  const [taxAnalysis, setTaxAnalysis] = useState<TaxAnalysis | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categoryColors: { [key: string]: string } = {
    office: "bg-blue-500",
    travel: "bg-green-500",
    marketing: "bg-purple-500",
    software: "bg-orange-500",
    meals: "bg-red-500",
    utilities: "bg-cyan-500",
    equipment: "bg-yellow-500",
    professional: "bg-indigo-500",
    other: "bg-gray-500",
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/csv") {
      setIsProcessing(true)
      setProgress(0)

      // Simulate CSV processing with progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            processCSVData()
            return 100
          }
          return prev + 10
        })
      }, 300)
    }
  }

  const processCSVData = () => {
    // Simulate AI classification and tax analysis
    const mockData: ExpenseData[] = [
      {
        date: "2024-01-15",
        description: "Office supplies - printer paper, pens",
        amount: 2450,
        category: "office",
        taxDeductible: true,
        confidence: 95,
      },
      {
        date: "2024-01-18",
        description: "Business lunch with client",
        amount: 1800,
        category: "meals",
        taxDeductible: true,
        confidence: 88,
      },
      {
        date: "2024-01-20",
        description: "Personal grocery shopping",
        amount: 3200,
        category: "other",
        taxDeductible: false,
        confidence: 92,
      },
      {
        date: "2024-01-22",
        description: "Software subscription - Adobe Creative",
        amount: 5000,
        category: "software",
        taxDeductible: true,
        confidence: 98,
      },
      {
        date: "2024-01-25",
        description: "Flight tickets for business trip",
        amount: 15000,
        category: "travel",
        taxDeductible: true,
        confidence: 96,
      },
      {
        date: "2024-01-28",
        description: "Personal entertainment",
        amount: 2500,
        category: "other",
        taxDeductible: false,
        confidence: 89,
      },
    ]

    const totalExpenses = mockData.reduce((sum, item) => sum + item.amount, 0)
    const deductibleExpenses = mockData.filter((item) => item.taxDeductible).reduce((sum, item) => sum + item.amount, 0)
    const nonDeductibleExpenses = totalExpenses - deductibleExpenses

    const taxRate = 0.3
    const grossIncome = 100000 // Assumed monthly income
    const taxWithoutDeductions = grossIncome * taxRate
    const taxWithDeductions = (grossIncome - deductibleExpenses) * taxRate
    const potentialSavings = taxWithoutDeductions - taxWithDeductions

    // Detailed profit calculations
    const netIncomeWithoutDeductions = grossIncome - taxWithoutDeductions
    const netIncomeWithDeductions = grossIncome - taxWithDeductions
    const profitWithoutTax = netIncomeWithoutDeductions - totalExpenses
    const profitWithTax = netIncomeWithDeductions - totalExpenses

    const analysis: TaxAnalysis = {
      totalExpenses,
      deductibleExpenses,
      nonDeductibleExpenses,
      potentialSavings,
      taxWithDeductions,
      taxWithoutDeductions,
      profitWithTax,
      profitWithoutTax: profitWithoutTax,
    }

    const categoryBreakdown = getCategoryStats(mockData, analysis)

    const resultsForDashboard = {
      ...analysis,
      categoryBreakdown,
      monthlyTrend: [
        { month: "Current", expenses: totalExpenses, savings: potentialSavings, deductions: deductibleExpenses },
      ],
    }

    setCsvData(mockData)
    setTaxAnalysis(analysis)
    setIsProcessing(false)
    setShowResults(true)

    setAnalysisComplete(true)
  }

  const getCategoryStats = (data: ExpenseData[], analysis: TaxAnalysis) => {
    const stats: { [key: string]: { amount: number; count: number; deductible: number } } = {}

    data.forEach((item) => {
      if (!stats[item.category]) {
        stats[item.category] = { amount: 0, count: 0, deductible: 0 }
      }
      stats[item.category].amount += item.amount
      stats[item.category].count += 1
      if (item.taxDeductible) {
        stats[item.category].deductible += item.amount
      }
    })

    return Object.entries(stats).map(([category, data]) => ({
      category,
      ...data,
      percentage: (data.amount / (analysis?.totalExpenses || 1)) * 100,
    }))
  }

  const handleClose = () => {
    if (taxAnalysis) {
      setAnalysisComplete(true)
    }
  }

  useEffect(() => {
    if (analysisComplete && taxAnalysis && onAnalysisComplete) {
      const categoryBreakdown = getCategoryStats(csvData, taxAnalysis)
      const resultsForDashboard = {
        ...taxAnalysis,
        categoryBreakdown,
        monthlyTrend: [
          {
            month: "Current",
            expenses: taxAnalysis.totalExpenses,
            savings: taxAnalysis.potentialSavings,
            deductions: taxAnalysis.deductibleExpenses,
          },
        ],
      }
      onAnalysisComplete(resultsForDashboard)
      setAnalysisComplete(false) // Reset the flag
    }
  }, [analysisComplete, taxAnalysis, csvData, onAnalysisComplete])

  if (showResults && taxAnalysis) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-background rounded-2xl shadow-2xl">
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b p-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold gradient-text">CSV Analysis Results</h2>
                <p className="text-muted-foreground mt-1">AI-powered expense classification and tax optimization</p>
              </div>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="sm"
                className="rounded-full w-10 h-10 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-morphism border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    With Smart Tax Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ₹{taxAnalysis.profitWithTax.toLocaleString()}
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">Monthly Profit After Tax</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gross Income:</span>
                      <span className="font-medium">₹1,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Deductions:</span>
                      <span className="font-medium text-green-600">
                        ₹{taxAnalysis.deductibleExpenses.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Amount:</span>
                      <span className="font-medium">₹{taxAnalysis.taxWithDeductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Expenses:</span>
                      <span className="font-medium">₹{taxAnalysis.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Net Profit:</span>
                        <span className="text-green-600">₹{taxAnalysis.profitWithTax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <TrendingDown className="w-5 h-5 mr-2" />
                    Without Tax Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 rounded-xl">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      ₹{taxAnalysis.profitWithoutTax.toLocaleString()}
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">Monthly Profit After Tax</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gross Income:</span>
                      <span className="font-medium">₹1,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Deductions:</span>
                      <span className="font-medium text-red-600">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Amount:</span>
                      <span className="font-medium">₹{taxAnalysis.taxWithoutDeductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Expenses:</span>
                      <span className="font-medium">₹{taxAnalysis.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Net Profit:</span>
                        <span className="text-red-600">₹{taxAnalysis.profitWithoutTax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-morphism border-0 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow mx-auto mb-3">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">₹{taxAnalysis.potentialSavings.toLocaleString()}</h3>
                    <p className="text-muted-foreground">Tax Savings</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse-glow mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600">
                      +₹{(taxAnalysis.profitWithTax - taxAnalysis.profitWithoutTax).toLocaleString()}
                    </h3>
                    <p className="text-muted-foreground">Additional Profit</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse-glow mx-auto mb-3">
                      <PieChart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {((taxAnalysis.deductibleExpenses / taxAnalysis.totalExpenses) * 100).toFixed(1)}%
                    </h3>
                    <p className="text-muted-foreground">Deductible Ratio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="glass-morphism border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Expense Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getCategoryStats(csvData, taxAnalysis).map((stat) => (
                    <div
                      key={stat.category}
                      className="p-4 rounded-xl bg-gradient-to-br from-background to-muted/50 border hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${categoryColors[stat.category]}`} />
                          <span className="font-medium capitalize">{stat.category}</span>
                        </div>
                        <Badge variant={stat.deductible > 0 ? "default" : "secondary"} className="text-xs">
                          {stat.deductible > 0 ? "Deductible" : "Personal"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total:</span>
                          <span className="font-medium">₹{stat.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Count:</span>
                          <span className="font-medium">{stat.count} items</span>
                        </div>
                        <Progress value={stat.percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground text-center">
                          {stat.percentage.toFixed(1)}% of total
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Expense Table */}
            <Card className="glass-morphism border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Classified Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Date</th>
                        <th className="text-left p-3 font-medium">Description</th>
                        <th className="text-left p-3 font-medium">Category</th>
                        <th className="text-right p-3 font-medium">Amount</th>
                        <th className="text-center p-3 font-medium">Tax Status</th>
                        <th className="text-center p-3 font-medium">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((expense, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="p-3 text-sm">{expense.date}</td>
                          <td className="p-3 text-sm">{expense.description}</td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${categoryColors[expense.category]}`} />
                              <span className="text-sm capitalize">{expense.category}</span>
                            </div>
                          </td>
                          <td className="p-3 text-right font-medium">₹{expense.amount.toLocaleString()}</td>
                          <td className="p-3 text-center">
                            {expense.taxDeductible ? (
                              <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant={expense.confidence > 90 ? "default" : "secondary"} className="text-xs">
                              {expense.confidence}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover-lift glass-morphism border-0 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover-lift"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="glass-morphism border-0 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold gradient-text">CSV Expense Analyzer</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Upload your monthly expense CSV to get AI-powered classification and tax optimization insights
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {isProcessing ? (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-pulse-glow">
                <Zap className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Processing Your CSV</h3>
                <p className="text-muted-foreground mb-4">
                  AI is classifying expenses and calculating tax implications
                </p>
                <Progress value={progress} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">{progress}% Complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <FileSpreadsheet className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload Monthly Expenses</h3>
                  <p className="text-muted-foreground">
                    Upload a CSV file with your expenses to get detailed analysis and tax optimization suggestions
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover-lift"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose CSV File
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  Expected format: Date, Description, Amount, Category (optional)
                </p>
              </div>

              <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />

              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  What you'll get:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI-powered expense classification</li>
                  <li>• Tax deduction identification</li>
                  <li>• Profit comparison with/without tax optimization</li>
                  <li>• Category-wise spending breakdown</li>
                  <li>• Potential tax savings calculation</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
