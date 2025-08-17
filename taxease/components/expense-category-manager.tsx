import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, Search, Filter, Download, Upload, Bot, Target,
  TrendingUp, DollarSign, PieChart, Settings, Edit, Trash2,
  Eye, Star, Zap, Lightbulb, AlertTriangle, CheckCircle,
  Clock, BarChart3, Tag, Calculator, Sparkles, ArrowUpRight
} from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  isDefault: boolean
  isActive: boolean
  expenseCount: number
  totalAmount: number
  deductiblePercentage: number
  taxEfficiency: number
  suggestions: string[]
  lastUsed: string
}

interface CategorySuggestion {
  name: string
  confidence: number
  reason: string
  similarCategories: string[]
  taxBenefits: string[]
}

export default function ExpenseCategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Office Supplies",
      description: "Stationery, paper, printer ink, and general office materials",
      color: "#3B82F6",
      icon: "📄",
      isDefault: true,
      isActive: true,
      expenseCount: 45,
      totalAmount: 25000,
      deductiblePercentage: 95,
      taxEfficiency: 92,
      suggestions: ["Consider bulk purchases for better rates", "Track seasonal office needs"],
      lastUsed: "2024-01-15"
    },
    {
      id: "2",
      name: "Software & Technology",
      description: "Software licenses, cloud services, and tech tools",
      color: "#10B981",
      icon: "💻",
      isDefault: true,
      isActive: true,
      expenseCount: 23,
      totalAmount: 18000,
      deductiblePercentage: 100,
      taxEfficiency: 98,
      suggestions: ["Evaluate annual vs monthly subscriptions", "Consider open-source alternatives"],
      lastUsed: "2024-01-10"
    },
    {
      id: "3",
      name: "Travel & Transportation",
      description: "Business travel, fuel, and transportation costs",
      color: "#F59E0B",
      icon: "🚗",
      isDefault: true,
      isActive: true,
      expenseCount: 18,
      totalAmount: 15000,
      deductiblePercentage: 85,
      taxEfficiency: 78,
      suggestions: ["Track mileage for personal vehicle use", "Separate business vs personal travel"],
      lastUsed: "2024-01-08"
    }
  ])

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
    icon: "📄"
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<CategorySuggestion[]>([])

  const generateAISuggestions = () => {
    const suggestions: CategorySuggestion[] = [
      {
        name: "Home Office Expenses",
        confidence: 0.95,
        reason: "High potential for tax deductions based on your work pattern",
        similarCategories: ["Office Supplies", "Utilities"],
        taxBenefits: ["100% deductible", "Simplified method available", "Regular monthly expenses"]
      },
      {
        name: "Equipment & Machinery",
        confidence: 0.88,
        reason: "Capital expenses that can be depreciated over time",
        similarCategories: ["Software & Technology", "Office Supplies"],
        taxBenefits: ["Depreciation benefits", "Section 179 deduction", "Bonus depreciation available"]
      }
    ]
    setAiSuggestions(suggestions)
    setShowAIInsights(true)
  }

  const addCategory = () => {
    if (newCategory.name && newCategory.description) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        color: newCategory.color,
        icon: newCategory.icon,
        isDefault: false,
        isActive: true,
        expenseCount: 0,
        totalAmount: 0,
        deductiblePercentage: 100,
        taxEfficiency: 100,
        suggestions: ["New category - monitor usage patterns", "Consider tax implications"],
        lastUsed: new Date().toISOString().split('T')[0]
      }
      setCategories([...categories, category])
      setNewCategory({ name: "", description: "", color: "#3B82F6", icon: "📄" })
    }
  }

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "active" && category.isActive) ||
                         (selectedFilter === "inactive" && !category.isActive)
    return matchesSearch && matchesFilter
  })

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.totalAmount, 0)
  const activeCategories = categories.filter(cat => cat.isActive).length

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Total Categories</p>
                <p className="text-2xl font-bold text-emerald-700">{categories.length}</p>
              </div>
              <Tag className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Categories</p>
                <p className="text-2xl font-bold text-blue-700">{activeCategories}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Expenses</p>
                <p className="text-2xl font-bold text-purple-700">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Insights */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-700 flex items-center">
            <Bot className="w-8 h-8 mr-3 text-indigo-500" />
            AI-Powered Category Optimization
          </CardTitle>
          <p className="text-indigo-600">Get intelligent suggestions for optimizing your expense categories</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-4">
            <Button 
              onClick={generateAISuggestions}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate AI Suggestions
            </Button>
            <Button 
              onClick={() => setShowAIInsights(!showAIInsights)}
              variant="outline"
              className="border-indigo-300 text-indigo-700"
            >
              {showAIInsights ? "Hide Insights" : "Show Insights"}
            </Button>
          </div>

          {showAIInsights && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiSuggestions.map((suggestion, index) => (
                <Card key={index} className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-indigo-800">{suggestion.name}</h3>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                        {Math.round(suggestion.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{suggestion.reason}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Tax Benefits:</h4>
                        <div className="space-y-1">
                          {suggestion.taxBenefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => {
                        setNewCategory({
                          name: suggestion.name,
                          description: suggestion.reason,
                          color: "#8B5CF6",
                          icon: "✨"
                        })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add This Category
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Category */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center">
            <Plus className="w-8 h-8 mr-3 text-blue-500" />
            Add New Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-10"
            />
            <Input
              placeholder="Icon (emoji)"
              value={newCategory.icon}
              onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 mt-6">
            <Button onClick={addCategory} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Upload className="w-4 h-4 mr-2" />
              Import Categories
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Download className="w-4 h-4 mr-2" />
              Export Categories
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center justify-between">
            <span>Category Management</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filteredCategories.length} categories
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: category.color + '20', color: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                          {category.isDefault && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Default
                            </Badge>
                          )}
                          <Badge 
                            variant={category.isActive ? "default" : "secondary"}
                            className={category.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}
                          >
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold">₹{category.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4 text-gray-400" />
                            <span>{category.expenseCount} expenses</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-gray-400" />
                            <span>{category.deductiblePercentage}% deductible</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className={category.taxEfficiency >= 90 ? "text-emerald-600" : "text-blue-600"}>
                              {category.taxEfficiency}% efficient
                            </span>
                          </div>
                        </div>

                        {/* Tax Efficiency Progress */}
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Tax Efficiency</span>
                            <Badge className={category.taxEfficiency >= 90 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-blue-100 text-blue-800 border-blue-200"}>
                              {category.taxEfficiency}%
                            </Badge>
                          </div>
                          <Progress value={category.taxEfficiency} className="h-2" />
                        </div>

                        {/* AI Suggestions */}
                        {category.suggestions.length > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">AI Suggestions</span>
                            </div>
                            <div className="space-y-1">
                              {category.suggestions.map((suggestion, idx) => (
                                <div key={idx} className="text-sm text-blue-700 flex items-start space-x-2">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{suggestion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                      <Settings className="w-4 h-4" />
                    </Button>
                    {!category.isDefault && (
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
