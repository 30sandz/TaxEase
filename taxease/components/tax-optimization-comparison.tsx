import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TaxOptimizationComparisonProps {
  csvAnalysisResults: any
  taxDerived: any
}

export default function TaxOptimizationComparison({ csvAnalysisResults, taxDerived }: TaxOptimizationComparisonProps) {
  if (!csvAnalysisResults) return null

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Tax Optimization Impact</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* With Tax Optimization */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-green-100 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-emerald-600 mr-2" />
              <CardTitle className="text-2xl text-emerald-700">With Tax Optimization</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              ₹{csvAnalysisResults.profitWithTax.toLocaleString()}
            </div>
            <p className="text-lg text-emerald-700 font-medium">Monthly Profit After Tax</p>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center p-3 bg-emerald-100/50 rounded-lg">
                <span className="font-medium">Total Deductions:</span>
                <span className="font-bold text-emerald-700">₹{csvAnalysisResults.deductibleExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-100/50 rounded-lg">
                <span className="font-medium">Tax Savings:</span>
                <span className="font-bold text-emerald-700">₹{(taxDerived?.taxSavings || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-100/50 rounded-lg">
                <span className="font-medium">Effective Tax Rate:</span>
                <span className="font-bold text-emerald-700">{(((taxDerived?.taxRate || 0) * 100).toFixed(1))}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Without Optimization */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-100 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingDown className="w-8 h-8 text-red-600 mr-2" />
              <CardTitle className="text-2xl text-red-700">Without Optimization</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-red-600 mb-2">
              ₹{csvAnalysisResults.profitWithoutTax.toLocaleString()}
            </div>
            <p className="text-lg text-red-700 font-medium">Monthly Profit After Tax</p>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center p-3 bg-red-100/50 rounded-lg">
                <span className="font-medium">No Deductions:</span>
                <span className="font-bold text-red-700">₹0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-100/50 rounded-lg">
                <span className="font-medium">Missed Savings:</span>
                <span className="font-bold text-red-700">₹{(taxDerived?.taxSavings || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-100/50 rounded-lg">
                <span className="font-medium">Higher Tax Rate:</span>
                <span className="font-bold text-red-700">42.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Optimization Impact Summary</h3>
            <p className="text-muted-foreground">See how tax optimization transforms your financial position</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                +₹{(csvAnalysisResults.profitWithTax - csvAnalysisResults.profitWithoutTax).toLocaleString()}
              </div>
              <p className="text-sm text-emerald-700 font-medium">Additional Monthly Profit</p>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                +{((taxDerived?.taxSavings || 0) / csvAnalysisResults.profitWithoutTax * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-blue-700 font-medium">Profit Increase</p>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ₹{(taxDerived?.cashOutflowReduction || 0).toLocaleString()}
              </div>
              <p className="text-sm text-purple-700 font-medium">Reduced Cash Outflow</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
