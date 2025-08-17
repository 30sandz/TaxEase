"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  Eye,
  Target,
  LucidePieChart,
  LucideLineChart,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
} from "recharts"

const monthlyData = [
  { month: "Jan", income: 45000, expenses: 32000, savings: 13000, taxes: 8100 },
  { month: "Feb", income: 52000, expenses: 35000, savings: 17000, taxes: 9360 },
  { month: "Mar", income: 48000, expenses: 33000, savings: 15000, taxes: 8640 },
  { month: "Apr", income: 61000, expenses: 38000, savings: 23000, taxes: 10980 },
  { month: "May", income: 55000, expenses: 36000, savings: 19000, taxes: 9900 },
  { month: "Jun", income: 58000, expenses: 39000, savings: 19000, taxes: 10440 },
]

const categoryData = [
  { name: "Business", value: 35, color: "#3b82f6" },
  { name: "Personal", value: 25, color: "#8b5cf6" },
  { name: "Investment", value: 20, color: "#10b981" },
  { name: "Property", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ef4444" },
]

const deductionData = [
  { category: "Home Office", amount: 3600, potential: 4200, saved: 600 },
  { category: "Business Travel", amount: 2400, potential: 2800, saved: 400 },
  { category: "Equipment", amount: 1800, potential: 2200, saved: 400 },
  { category: "Professional Services", amount: 1200, potential: 1500, saved: 300 },
]

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("overview")

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive financial insights and tax optimization</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="hover:bg-muted/50 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-foreground">$319,000</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tax Savings</p>
                <p className="text-2xl font-bold text-foreground">$47,850</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deductions Found</p>
                <p className="text-2xl font-bold text-foreground">$18,400</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+15.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Optimization Score</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-500">Excellent</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideLineChart className="w-5 h-5 text-blue-600" />
              Income vs Expenses Trend
            </CardTitle>
            <CardDescription>Monthly financial performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tax Category Breakdown */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucidePieChart className="w-5 h-5 text-purple-600" />
              Tax Category Breakdown
            </CardTitle>
            <CardDescription>Distribution of tax obligations by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Deduction Opportunities */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Deduction Optimization Opportunities
          </CardTitle>
          <CardDescription>Potential savings identified by AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deductionData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{item.category}</h4>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      +${item.saved} potential
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Current: ${item.amount.toLocaleString()}</span>
                    <span>Potential: ${item.potential.toLocaleString()}</span>
                  </div>
                  <Progress value={(item.amount / item.potential) * 100} className="mt-2 h-2" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4 hover:bg-green-50 hover:text-green-700 hover:border-green-300 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Smart recommendations based on your financial data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Quarterly Tax Planning</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Consider increasing Q4 business expenses to optimize your tax position. Potential savings: $2,400.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">Investment Opportunity</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your cash reserves are optimal for tax-advantaged investments. Consider IRA contributions.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900 dark:text-orange-100">Documentation Alert</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Missing receipts detected for $1,200 in business expenses. Upload for full deduction.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">Optimization Score</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    You're in the top 15% of users for tax optimization. Keep up the excellent work!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
