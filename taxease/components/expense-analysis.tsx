import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Shield, Target } from "lucide-react"

interface ExpenseAnalysisProps {
  csvAnalysisResults: any
  taxDerived: any
}

export default function ExpenseAnalysis({ csvAnalysisResults, taxDerived }: ExpenseAnalysisProps) {
  if (!csvAnalysisResults) return null

  return (
    <div className="space-y-8">
      {/* Expense Category Analysis */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
          Expense Category Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csvAnalysisResults.categoryBreakdown.slice(0, 6).map((category: any, index: number) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-background to-muted/30 rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold capitalize text-lg">{category.category}</span>
                <Badge
                  variant={category.deductible > 0 ? "default" : "secondary"}
                  className="text-xs font-semibold"
                >
                  {category.deductible > 0 ? "✓ Deductible" : "Personal"}
                </Badge>
              </div>
              
              <div className="text-2xl font-bold text-primary mb-2">₹{category.amount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {category.count} transactions • {category.percentage.toFixed(1)}% of total
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Category Share</span>
                  <span>{category.percentage.toFixed(1)}%</span>
                </div>
                <Progress value={category.percentage} className="h-3 bg-muted/50" />
                
                {category.deductible > 0 && (
                  <>
                    <div className="flex justify-between text-xs text-emerald-600">
                      <span>Tax Deductible</span>
                      <span>₹{category.deductible.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={(category.deductible / category.amount) * 100}
                      className="h-2 bg-emerald-100"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cash Flow Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Before Tax Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-blue-100/50 rounded-xl">
                <span className="font-medium">Total Expenses</span>
                <span className="font-bold text-blue-700">₹{csvAnalysisResults.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-emerald-100/50 rounded-xl">
                <span className="font-medium">Deductible Expenses</span>
                <span className="font-bold text-emerald-700">₹{csvAnalysisResults.deductibleExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-100/50 rounded-xl">
                <span className="font-medium">Non-deductible</span>
                <span className="font-bold text-orange-700">₹{csvAnalysisResults.nonDeductibleExpenses.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {((csvAnalysisResults.deductibleExpenses / csvAnalysisResults.totalExpenses) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-blue-700">Deductible Ratio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-700 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              After Tax (Cash Outflow)
            </CardTitle>
            <p className="text-sm text-muted-foreground">Expenses + Taxes paid after deductions</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-emerald-100/50 rounded-xl">
                <span className="font-medium">Total Expenses</span>
                <span className="font-bold text-emerald-700">₹{csvAnalysisResults.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-emerald-100/50 rounded-xl">
                <span className="font-medium">Taxes Paid</span>
                <span className="font-bold text-emerald-700">₹{(taxDerived?.taxesPaid || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-emerald-100/50 rounded-xl">
                <span className="font-medium">Vs. No Deductions (Outflow)</span>
                <span className="font-bold text-emerald-700">₹{(taxDerived?.cashOutflowWithoutDeductions || 0).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-emerald-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  ₹{(taxDerived?.cashOutflowReduction || 0).toLocaleString()}
                </div>
                <p className="text-sm text-emerald-700">Total Savings from Deductions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Law Compliance */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-violet-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-700 flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            Tax Law Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700">Compliance Checklist</h4>
              <div className="space-y-2">
                {[
                  { item: "Business Purpose Documentation", status: "✓ Complete", color: "emerald" },
                  { item: "Receipt Management", status: "✓ Complete", color: "emerald" },
                  { item: "Expense Categorization", status: "✓ Complete", color: "emerald" },
                  { item: "GST Compliance", status: "⚠️ Due Soon", color: "orange" },
                ].map((check, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                    <span className="text-sm">{check.item}</span>
                    <Badge variant="secondary" className={`text-xs ${
                      check.color === "emerald" ? "bg-emerald-100 text-emerald-700" : 
                      check.color === "orange" ? "bg-orange-100 text-orange-700" : ""
                    }`}>
                      {check.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700">Risk Assessment</h4>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-100/50 rounded-lg">
                  <div className="text-sm font-medium text-emerald-700">Low Risk</div>
                  <div className="text-xs text-emerald-600">Proper documentation maintained</div>
                </div>
                <div className="p-3 bg-orange-100/50 rounded-lg">
                  <div className="text-sm font-medium text-orange-700">Medium Risk</div>
                  <div className="text-xs text-orange-600">GST filing due in 5 days</div>
                </div>
                <div className="p-3 bg-blue-100/50 rounded-lg">
                  <div className="text-sm font-medium text-blue-700">Recommendation</div>
                  <div className="text-xs text-blue-600">Consider professional review for complex transactions</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
