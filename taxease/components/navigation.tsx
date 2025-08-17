"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  Globe, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  Home,
  BarChart3,
  Bot,
  Zap,
  Calculator,
  FileText,
  TrendingUp,
  ChevronDown,
  Building2,
  Briefcase,
  Users,
  Award
} from "lucide-react"

interface NavigationProps {
  currentView: string
  setCurrentView: (view: string) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
  language: string
  setLanguage: (lang: string) => void
  notificationCount: number
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function Navigation({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  notificationCount,
  showNotifications,
  setShowNotifications,
  searchQuery,
  setSearchQuery
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, description: "Overview & Analytics" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "Detailed Reports" },
    { id: "ai-assistant", label: "AI Assistant", icon: Bot, description: "Smart Insights" },
    { id: "quick-actions", label: "Quick Actions", icon: Zap, description: "Common Tasks" },
    { id: "expense-entry", label: "Expense Entry", icon: Calculator, description: "Add Expenses" },
    { id: "mistake-detector", label: "Mistake Detector", icon: FileText, description: "Find Issues" }
  ]

  const userMenuItems = [
    { label: "Profile Settings", icon: User, action: () => console.log("Profile") },
    { label: "Company Settings", icon: Building2, action: () => console.log("Company") },
    { label: "Team Management", icon: Users, action: () => console.log("Team") },
    { label: "Billing & Plans", icon: Briefcase, action: () => console.log("Billing") },
    { label: "Help & Support", icon: Award, action: () => console.log("Support") },
    { label: "Sign Out", icon: LogOut, action: () => setCurrentView("home") }
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">TaxEase</h1>
              <p className="text-xs text-gray-500">Professional Tax Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => setCurrentView(item.id)}
                  className={`h-12 px-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search expenses, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Language Selector */}
            <div className="hidden md:flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0"
              >
                <option value="en">EN</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[
                      { title: "Tax filing deadline approaching", time: "2 hours ago", type: "warning" },
                      { title: "New deduction opportunity found", time: "1 day ago", type: "success" },
                      { title: "Monthly report ready", time: "2 days ago", type: "info" },
                      { title: "Compliance check completed", time: "3 days ago", type: "success" }
                    ].map((notification, index) => (
                      <div key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "warning" ? "bg-yellow-400" :
                            notification.type === "success" ? "bg-green-400" : "bg-blue-400"
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="h-10 px-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-2">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">John Doe</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@company.com</p>
                  </div>
                  {userMenuItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => {
                      setCurrentView(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full justify-start h-12 px-4 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
