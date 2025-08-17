"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Calculator,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Star,
  Filter,
} from "lucide-react"

const quickActionCategories = [
  {
    title: "Tax Calculations",
    icon: Calculator,
    color: "blue",
    actions: [
      {
        name: "Estimate Quarterly Taxes",
        description: "Calculate upcoming tax payments",
        time: "2 min",
        status: "ready",
      },
      { name: "Tax Bracket Calculator", description: "Find your current tax bracket", time: "1 min", status: "ready" },
      { name: "Refund Estimator", description: "Estimate your tax refund", time: "3 min", status: "ready" },
      { name: "Self-Employment Tax", description: "Calculate SE tax obligations", time: "2 min", status: "ready" },
    ],
  },
  {
    title: "Document Management",
    icon: FileText,
    color: "green",
    actions: [
      { name: "Upload Receipts", description: "Scan and categorize receipts", time: "30 sec", status: "ready" },
      { name: "Generate Tax Summary", description: "Create comprehensive report", time: "1 min", status: "ready" },
      { name: "Export to TurboTax", description: "Export data for tax software", time: "2 min", status: "ready" },
      { name: "Backup Documents", description: "Secure cloud backup", time: "5 min", status: "ready" },
    ],
  },
  {
    title: "Deduction Optimization",
    icon: Target,
    color: "purple",
    actions: [
      {
        name: "Find Missing Deductions",
        description: "AI-powered deduction discovery",
        time: "3 min",
        status: "recommended",
      },
      { name: "Business Expense Tracker", description: "Log business expenses", time: "1 min", status: "ready" },
      { name: "Mileage Calculator", description: "Calculate vehicle deductions", time: "2 min", status: "ready" },
      { name: "Home Office Deduction", description: "Calculate home office savings", time: "2 min", status: "ready" },
    ],
  },
  {
    title: "Financial Planning",
    icon: TrendingUp,
    color: "orange",
    actions: [
      { name: "Retirement Planning", description: "Optimize retirement contributions", time: "5 min", status: "ready" },
      { name: "Tax Loss Harvesting", description: "Identify investment opportunities", time: "4 min", status: "ready" },
      { name: "Estimated Payment Setup", description: "Schedule quarterly payments", time: "3 min", status: "ready" },
      {
        name: "Year-End Tax Planning",
        description: "Optimize year-end strategy",
        time: "10 min",
        status: "recommended",
      },
    ],
  },
]

const recentActions = [
  { name: "Quarterly Tax Estimate", date: "2 hours ago", status: "completed", savings: "$1,200" },
  { name: "Receipt Upload", date: "1 day ago", status: "completed", savings: "$340" },
  { name: "Deduction Analysis", date: "3 days ago", status: "completed", savings: "$2,100" },
  { name: "Mileage Calculation", date: "1 week ago", status: "completed", savings: "$890" },
]

const upcomingTasks = [
  { name: "Q4 Estimated Payment", dueDate: "Jan 15, 2024", priority: "high", amount: "$3,200" },
  { name: "Upload December Receipts", dueDate: "Jan 31, 2024", priority: "medium", amount: null },
  { name: "Review Investment Gains", dueDate: "Feb 15, 2024", priority: "low", amount: null },
  { name: "Annual Tax Planning", dueDate: "Mar 1, 2024", priority: "high", amount: null },
]

export default function QuickActionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredActions =
    selectedCategory === "all"
      ? quickActionCategories
      : quickActionCategories.filter((cat) => cat.title.toLowerCase().includes(selectedCategory))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quick Actions</h1>
          <p className="text-muted-foreground">Streamline your tax management with one-click actions</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" className="hover:bg-muted/50 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Actions Completed</p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Saved</p>
                <p className="text-2xl font-bold text-foreground">12.5h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Money Saved</p>
                <p className="text-2xl font-bold text-foreground">$4,530</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Categories */}
        <div className="lg:col-span-2 space-y-6">
          {filteredActions.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                  {category.title}
                </CardTitle>
                <CardDescription>Quick access to {category.title.toLowerCase()} tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.actions.map((action, actionIndex) => (
                    <div
                      key={actionIndex}
                      className="p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground group-hover:text-blue-600 transition-colors">
                          {action.name}
                        </h4>
                        {action.status === "recommended" && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {action.time}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Actions</CardTitle>
              <CardDescription>Your latest completed tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{action.name}</h4>
                    <p className="text-xs text-muted-foreground">{action.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done
                    </Badge>
                    {action.savings && <p className="text-xs text-green-600 mt-1">+{action.savings}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
              <CardDescription>Important deadlines and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{task.name}</h4>
                    <Badge
                      variant="secondary"
                      className={`${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : task.priority === "medium"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                    {task.amount && <p className="text-xs font-medium text-foreground">{task.amount}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Quick Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">Annual Income</label>
                <Input placeholder="$75,000" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Filing Status</label>
                <select className="w-full mt-1 p-2 border rounded-md bg-background">
                  <option>Single</option>
                  <option>Married Filing Jointly</option>
                  <option>Head of Household</option>
                </select>
              </div>
              <Button className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Tax
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
