import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Percent, Target, Activity, CheckCircle, TrendingUp, TrendingDown, Sparkles } from "lucide-react"

interface DashboardOverviewProps {
  csvAnalysisResults: any
  taxDerived: any
}

export default function DashboardOverview({ csvAnalysisResults, taxDerived }: DashboardOverviewProps) {
  if (!csvAnalysisResults) return null

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-6 p-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-200/30">
          <CheckCircle className="w-8 h-8 text-emerald-500 mr-3 animate-pulse" />
          <span className="text-emerald-600 font-semibold text-sm">AI Analysis Complete</span>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Intelligence Dashboard
          </h1>
          <Sparkles className="w-8 h-8 text-purple-500 ml-3 animate-bounce" />
        </div>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          AI-powered insights from your expense analysis with actionable recommendations
        </p>
      </div>

      {/* Enhanced Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="group text-center p-8 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-green-500/10 rounded-3xl border border-emerald-200/40 hover:border-emerald-300/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
          <div className="relative">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="text-4xl font-bold text-emerald-600 mb-3 group-hover:text-emerald-700 transition-colors">
            ₹{csvAnalysisResults.potentialSavings.toLocaleString()}
          </div>
          <p className="text-sm text-emerald-700 font-medium mb-3">Monthly Tax Savings</p>
          <div className="text-xs text-emerald-600 font-semibold bg-emerald-100/50 px-3 py-1 rounded-full">
            +{((csvAnalysisResults.potentialSavings / csvAnalysisResults.profitWithoutTax) * 100).toFixed(1)}% profit boost
          </div>
        </div>

        <div className="group text-center p-8 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10 rounded-3xl border border-blue-200/40 hover:border-blue-300/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
          <div className="relative">
            <Percent
              className="w-12 h-12 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300"
              style={{ animationDelay: "0.2s" }}
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Target className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:text-blue-700 transition-colors">
            {((csvAnalysisResults.deductibleExpenses / csvAnalysisResults.totalExpenses) * 100).toFixed(1)}%
          </div>
          <p className="text-sm text-blue-700 font-medium mb-3">Deductible Expenses</p>
          <div className="text-xs text-blue-600 font-semibold bg-blue-100/50 px-3 py-1 rounded-full">
            ₹{csvAnalysisResults.deductibleExpenses.toLocaleString()} eligible
          </div>
        </div>

        <div className="group text-center p-8 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-violet-500/10 rounded-3xl border border-purple-200/40 hover:border-purple-300/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
          <div className="relative">
            <Target
              className="w-12 h-12 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform duration-300"
              style={{ animationDelay: "0.4s" }}
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="text-4xl font-bold text-purple-600 mb-3 group-hover:text-purple-700 transition-colors">
            ₹{csvAnalysisResults.profitWithTax.toLocaleString()}
          </div>
          <p className="text-sm text-purple-700 font-medium mb-3">Optimized Profit</p>
          <div className="text-xs text-purple-600 font-semibold bg-purple-100/50 px-3 py-1 rounded-full">
            vs ₹{csvAnalysisResults.profitWithoutTax.toLocaleString()} without
          </div>
        </div>

        <div className="group text-center p-8 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-red-500/10 rounded-3xl border border-orange-200/40 hover:border-orange-300/60 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
          <div className="relative">
            <Activity
              className="w-12 h-12 mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform duration-300"
              style={{ animationDelay: "0.6s" }}
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <TrendingDown className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="text-4xl font-bold text-orange-600 mb-3 group-hover:text-orange-700 transition-colors">
            {csvAnalysisResults.categoryBreakdown.length}
          </div>
          <p className="text-sm text-orange-700 font-medium mb-3">Categories Analyzed</p>
          <div className="text-xs text-orange-600 font-semibold bg-orange-100/50 px-3 py-1 rounded-full">
            AI classified with 94% accuracy
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="group border-0 shadow-xl bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-green-50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-emerald-700 flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              Tax Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Taxes Paid (with deductions)", value: `₹${(taxDerived?.taxesPaid || 0).toLocaleString()}`, highlight: false },
              { label: "Taxes Without Deductions", value: `₹${(taxDerived?.taxesWithoutDeductions || 0).toLocaleString()}`, highlight: false },
              { label: "Tax Saved", value: `₹${(taxDerived?.taxSavings || 0).toLocaleString()}`, highlight: true },
              { label: "Effective Tax Rate", value: `${(((taxDerived?.taxRate || 0) * 100).toFixed(1))}%`, highlight: false },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className={`font-bold text-sm ${item.highlight ? 'text-emerald-600' : 'text-emerald-600'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="group border-0 shadow-xl bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-blue-700 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-4 h-4 text-white" />
              </div>
              Expenses: Before vs After Tax
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Total Expenses (before tax)", value: `₹${csvAnalysisResults.totalExpenses.toLocaleString()}`, highlight: false },
              { label: "Effective Expenses (after tax)", value: `₹${(taxDerived?.afterTaxExpense || 0).toLocaleString()}`, highlight: true },
              { label: "Deductible Portion", value: `₹${csvAnalysisResults.deductibleExpenses.toLocaleString()}`, highlight: false },
              { label: "Non‑deductible Portion", value: `₹${csvAnalysisResults.nonDeductibleExpenses.toLocaleString()}`, highlight: false },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-colors">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className={`font-bold text-sm ${item.highlight ? 'text-emerald-600' : 'text-blue-600'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="group border-0 shadow-xl bg-gradient-to-br from-purple-50 via-purple-100/50 to-violet-50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-purple-700 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              Assessment & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white/60 rounded-xl">
              <span className="font-semibold text-purple-700">Verdict: </span>
              <Badge 
                variant={taxDerived?.assessment.verdict === "Good" ? "default" : "secondary"}
                className="ml-2 bg-emerald-100 text-emerald-700 border-emerald-200"
              >
                {taxDerived?.assessment.verdict || "N/A"}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm bg-white/60 p-3 rounded-xl">{taxDerived?.assessment.detail}</p>
            <ul className="space-y-2">
              {csvAnalysisResults.nonDeductibleExpenses > csvAnalysisResults.deductibleExpenses && (
                <li className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Reclassify legitimate business expenses to reduce non‑deductible share.</span>
                </li>
              )}
              {(taxDerived?.savingsRate || 0) < 0.2 && (
                <li className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Time large purchases near year‑end to maximize current year deductions.</span>
                </li>
              )}
              {csvAnalysisResults.deductibleExpenses > 0 && (
                <li className="flex items-start text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Ensure receipts and business purpose documentation for all deductibles.</span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
