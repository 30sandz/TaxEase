import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, Upload, FileText, Camera, Search, Filter, Download, 
  Calendar, Tag, DollarSign, Receipt, BarChart3, TrendingUp,
  AlertCircle, CheckCircle, Clock, Edit, Trash2, Eye
} from "lucide-react"

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  receipt: string
  deductible: boolean
  status: 'pending' | 'approved' | 'rejected'
  notes: string
}

export default function EnhancedExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Office Supplies - Printer Paper",
      amount: 2500,
      category: "Office Supplies",
      date: "2024-01-15",
      receipt: "receipt_001.jpg",
      deductible: true,
      status: 'approved',
      notes: "Monthly office supplies purchase"
    },
    {
      id: "2",
      description: "Software Subscription - Adobe Creative Suite",
      amount: 18000,
      category: "Software",
      date: "2024-01-10",
      receipt: "receipt_002.jpg",
      deductible: true,
      status: 'approved',
      notes: "Annual software license renewal"
    },
    {
      id: "3",
      description: "Business Travel - Client Meeting",
      amount: 8500,
      category: "Travel",
      date: "2024-01-08",
      receipt: "receipt_003.jpg",
      deductible: true,
      status: 'pending',
      notes: "Travel expenses for client presentation"
    }
  ])

  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    deductible: true,
    notes: ""
  })

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    "Office Supplies", "Software", "Travel", "Marketing", 
    "Utilities", "Insurance", "Equipment", "Professional Services"
  ]

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const deductibleExpenses = expenses.filter(exp => exp.deductible).reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses.filter(exp => exp.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0)

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category && newExpense.date) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        receipt: "",
        deductible: newExpense.deductible,
        status: 'pending',
        notes: newExpense.notes
      }
      setExpenses([...expenses, expense])
      setNewExpense({ description: "", amount: "", category: "", date: "", deductible: true, notes: "" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'rejected': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Total Expenses</p>
                <p className="text-2xl font-bold text-emerald-700">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Deductible</p>
                <p className="text-2xl font-bold text-blue-700">₹{deductibleExpenses.toLocaleString()}</p>
              </div>
              <Tag className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Pending</p>
                <p className="text-2xl font-bold text-orange-700">₹{pendingExpenses.toLocaleString()}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Deduction Rate</p>
                <p className="text-2xl font-bold text-purple-700">
                  {totalExpenses > 0 ? ((deductibleExpenses / totalExpenses) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Expense */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center">
            <Plus className="w-8 h-8 mr-3 text-blue-500" />
            Add New Expense
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Expense Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              type="number"
              placeholder="Amount (₹)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              className="border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              placeholder="Notes (optional)"
              value={newExpense.notes}
              onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newExpense.deductible}
                  onChange={(e) => setNewExpense({...newExpense, deductible: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Tax Deductible</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <Button onClick={addExpense} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Upload className="w-4 h-4 mr-2" />
              Upload Receipt
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Camera className="w-4 h-4 mr-2" />
              Scan Receipt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center justify-between">
            <span>Expense Records</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filteredExpenses.length} expenses
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{expense.description}</h3>
                      <Badge className={getStatusColor(expense.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(expense.status)}
                          <span className="capitalize">{expense.status}</span>
                        </div>
                      </Badge>
                      {expense.deductible && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          Deductible
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span>{expense.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">₹{expense.amount.toLocaleString()}</span>
                      </div>
                      {expense.notes && (
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{expense.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown Progress */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-100">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-700 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-indigo-500" />
            Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => {
              const categoryTotal = expenses
                .filter(exp => exp.category === category)
                .reduce((sum, exp) => sum + exp.amount, 0)
              const percentage = totalExpenses > 0 ? (categoryTotal / totalExpenses) * 100 : 0
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">₹{categoryTotal.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
