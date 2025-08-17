import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Scatter, ScatterPlot
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, Activity, Target, BarChart3, PieChart as PieChartIcon2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react" // or wherever Upload comes from

interface ChartsAndGraphsProps {
  csvAnalysisResults: any
  taxDerived: any
}

export default function ChartsAndGraphs({ csvAnalysisResults, taxDerived }: ChartsAndGraphsProps) {
  // Enhanced mock data for better visualizations with proper fallbacks
  const monthlyData = csvAnalysisResults?.monthlyTrend || [
    { month: "Jan", expenses: 45000, savings: 12000, deductions: 18000, income: 120000, taxPaid: 15000 },
    { month: "Feb", expenses: 52000, savings: 15000, deductions: 21000, income: 125000, taxPaid: 16000 },
    { month: "Mar", expenses: 48000, savings: 13500, deductions: 19500, income: 118000, taxPaid: 14500 },
    { month: "Apr", expenses: 61000, savings: 18000, deductions: 24500, income: 132000, taxPaid: 18500 },
    { month: "May", expenses: 55000, savings: 16500, deductions: 22000, income: 128000, taxPaid: 17000 },
    { month: "Jun", expenses: 67000, savings: 20000, deductions: 27000, income: 135000, taxPaid: 20000 },
    { month: "Jul", expenses: 59000, savings: 17500, deductions: 23500, income: 130000, taxPaid: 18000 },
    { month: "Aug", expenses: 63000, savings: 19000, deductions: 25000, income: 133000, taxPaid: 19000 },
    { month: "Sep", expenses: 54000, savings: 16000, deductions: 21500, income: 127000, taxPaid: 16500 },
    { month: "Oct", expenses: 68000, savings: 20500, deductions: 27500, income: 136000, taxPaid: 21000 },
    { month: "Nov", expenses: 56000, savings: 17000, deductions: 22500, income: 129000, taxPaid: 17500 },
    { month: "Dec", expenses: 72000, savings: 22000, deductions: 29000, income: 140000, taxPaid: 23000 },
  ]

  const categoryData = csvAnalysisResults?.categoryBreakdown || [
    { name: "Office Supplies", value: 25000, color: "#3B82F6", deductible: 22000, nonDeductible: 3000, count: 45 },
    { name: "Software & Tech", value: 18000, color: "#10B981", deductible: 17500, nonDeductible: 500, count: 12 },
    { name: "Travel & Meals", value: 15000, color: "#F59E0B", deductible: 12000, nonDeductible: 3000, count: 28 },
    { name: "Marketing", value: 12000, color: "#EF4444", deductible: 11000, nonDeductible: 1000, count: 22 },
    { name: "Utilities", value: 8000, color: "#8B5CF6", deductible: 7500, nonDeductible: 500, count: 8 },
    { name: "Insurance", value: 6000, color: "#06B6D4", deductible: 6000, nonDeductible: 0, count: 4 },
    { name: "Professional Services", value: 4500, color: "#84CC16", deductible: 4500, nonDeductible: 0, count: 6 },
    { name: "Equipment", value: 3500, color: "#F97316", deductible: 3200, nonDeductible: 300, count: 3 },
  ]

  const performanceData = [
    { metric: "Tax Efficiency", score: 94, target: 90, color: "#10B981", trend: "up", change: "+4%" },
    { metric: "Deduction Rate", score: 87, target: 85, color: "#3B82F6", trend: "up", change: "+2%" },
    { metric: "Compliance Score", score: 98, target: 95, color: "#8B5CF6", trend: "up", change: "+3%" },
    { metric: "Documentation", score: 92, target: 90, color: "#F59E0B", trend: "up", change: "+2%" },
    { metric: "Timing Optimization", score: 89, target: 88, color: "#EF4444", trend: "up", change: "+1%" },
    { metric: "Risk Management", score: 96, target: 92, color: "#06B6D4", trend: "up", change: "+4%" },
  ]

  const radarData = [
    { subject: "Tax Planning", A: 95, B: 85, fullMark: 100, color: "#10B981" },
    { subject: "Expense Tracking", A: 88, B: 78, fullMark: 100, color: "#3B82F6" },
    { subject: "Documentation", A: 92, B: 82, fullMark: 100, color: "#8B5CF6" },
    { subject: "Compliance", A: 98, B: 88, fullMark: 100, color: "#F59E0B" },
    { subject: "Optimization", A: 87, B: 77, fullMark: 100, color: "#EF4444" },
    { subject: "Reporting", A: 90, B: 80, fullMark: 100, color: "#06B6D4" },
  ]

  const quarterlyData = [
    { quarter: "Q1", expenses: 145000, deductions: 58500, taxSavings: 17550, efficiency: 87 },
    { quarter: "Q2", expenses: 183000, deductions: 73500, taxSavings: 22050, efficiency: 89 },
    { quarter: "Q3", expenses: 176000, deductions: 69000, taxSavings: 20700, efficiency: 91 },
    { quarter: "Q4", expenses: 200000, deductions: 79500, taxSavings: 23850, efficiency: 93 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC0CB', '#DDA0DD']

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ₹{entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Safe calculation functions with fallbacks
  const getTotalDeductions = () => {
    if (!categoryData || categoryData.length === 0) return 0
    return categoryData.reduce((sum: number, cat: any) => sum + (cat.deductible || 0), 0)
  }

  const getTaxEfficiency = () => {
    if (!categoryData || categoryData.length === 0) return 0
    const totalDeductions = getTotalDeductions()
    const totalExpenses = categoryData.reduce((sum: number, cat: any) => sum + (cat.value || 0), 0)
    return totalExpenses > 0 ? Math.round((totalDeductions / totalExpenses) * 100) : 0
  }

  const getMonthlyAverage = () => {
    if (!monthlyData || monthlyData.length === 0) return 0
    return Math.round(monthlyData.reduce((sum: number, month: any) => sum + (month.expenses || 0), 0) / monthlyData.length)
  }

  const getCategoryCount = () => {
    return categoryData?.length || 0
  }

  return (
    <div className="space-y-8">
      {/* Data Notice */}
      {!csvAnalysisResults && (
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Demo Data</h3>
              <p className="text-blue-600 mb-4">
                You're currently viewing sample data. Upload your actual expense data to see personalized insights and recommendations.
              </p>
              <Button 
                onClick={() => window.location.href = '/csv-analyzer'}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                Upload Your Data
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Trends - Enhanced Line Chart */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 hover:shadow-3xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl text-blue-700 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-blue-500" />
            Monthly Financial Trends
          </CardTitle>
          <p className="text-blue-600 text-lg">Comprehensive view of your financial performance over time</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.3} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                fill="#10B981" 
                fillOpacity={0.1}
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#EF4444', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="deductions" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="taxPaid" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown - Enhanced Pie Chart */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 hover:shadow-3xl transition-all duration-500">
          <CardHeader className="pb-4">
          <CardTitle className="text-3xl text-emerald-700 flex items-center">
            <PieChartIcon2 className="w-8 h-8 mr-3 text-emerald-500" />
            Expense Category Analysis
            </CardTitle>
          <p className="text-emerald-600 text-lg">Detailed breakdown of your expenses by category with tax implications</p>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-emerald-800 mb-4">Category Details</h4>
              {categoryData.map((category: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-emerald-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">₹{category.value?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{category.count} items</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </CardContent>
        </Card>

      {/* Performance Metrics - Enhanced Bar Chart */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 hover:shadow-3xl transition-all duration-500">
          <CardHeader className="pb-4">
          <CardTitle className="text-3xl text-purple-700 flex items-center">
            <Target className="w-8 h-8 mr-3 text-purple-500" />
            Performance Metrics Dashboard
            </CardTitle>
          <p className="text-purple-600 text-lg">Track your tax optimization performance against targets</p>
          </CardHeader>
          <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.3} />
              <XAxis dataKey="metric" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
                <Legend />
              <Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {performanceData.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-white/60 rounded-xl border border-purple-200/30">
                <div className="text-2xl font-bold text-purple-700">{metric.score}%</div>
                <div className="text-sm text-purple-600">{metric.metric}</div>
                <div className="text-xs text-green-600 mt-1">{metric.change}</div>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>

      {/* Quarterly Analysis - Area Chart */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 hover:shadow-3xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl text-orange-700 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-orange-500" />
            Quarterly Performance Analysis
          </CardTitle>
          <p className="text-orange-600 text-lg">Quarterly trends showing your tax optimization progress</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.3} />
              <XAxis dataKey="quarter" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stackId="1" 
                stroke="#F59E0B" 
                fill="#F59E0B" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="deductions" 
                stackId="2" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="taxSavings" 
                stackId="3" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar Chart - Performance Comparison */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 hover:shadow-3xl transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl text-cyan-700 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-cyan-500" />
            Performance Radar Analysis
          </CardTitle>
          <p className="text-cyan-600 text-lg">Multi-dimensional view of your tax management capabilities</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" strokeOpacity={0.3} />
              <PolarAngleAxis dataKey="subject" stroke="#64748B" fontSize={12} />
              <PolarRadiusAxis stroke="#E2E8F0" strokeOpacity={0.3} />
              <Radar 
                name="Your Performance"
                dataKey="A" 
                stroke="#06B6D4" 
                fill="#06B6D4" 
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <Radar 
                name="Industry Average"
                dataKey="B" 
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-50 to-green-50 hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Total Deductions</p>
                <p className="text-2xl font-bold text-emerald-700">₹{getTotalDeductions().toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Tax Efficiency</p>
                <p className="text-2xl font-bold text-blue-700">{getTaxEfficiency()}%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-violet-50 hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Monthly Average</p>
                <p className="text-2xl font-bold text-purple-700">₹{getMonthlyAverage().toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-50 to-amber-50 hover:shadow-2xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Categories</p>
                <p className="text-2xl font-bold text-orange-700">{getCategoryCount()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <PieChartIcon className="w-6 h-6 text-white" />
              </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}
