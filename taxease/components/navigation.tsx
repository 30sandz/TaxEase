"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Menu,
  X,
  Home,
  BarChart3,
  FileText,
  Settings,
  MessageCircle,
  Calculator,
  Moon,
  Sun,
  Globe,
  User,
  LogOut,
  Crown,
  Search,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface NavigationProps {
  currentView: string
  setCurrentView: (view: string) => void
  darkMode: boolean
  setDarkMode: (mode: boolean) => void
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
  setSearchQuery,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const translations = {
    en: {
      home: "Home",
      dashboard: "Dashboard",
      analytics: "Analytics",
      reports: "Reports",
      settings: "Settings",
      aiChat: "AI Assistant",
      profile: "Profile",
      logout: "Logout",
      upgrade: "Upgrade",
    },
    hi: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      analytics: "विश्लेषण",
      reports: "रिपोर्ट्स",
      settings: "सेटिंग्स",
      aiChat: "AI सहायक",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
      upgrade: "अपग्रेड",
    },
    ta: {
      home: "முகப்பு",
      dashboard: "டாஷ்போர்டு",
      analytics: "பகுப்பாய்வு",
      reports: "அறிக்கைகள்",
      settings: "அமைப்புகள்",
      aiChat: "AI உதவியாளர்",
      profile: "சுயவிவரம்",
      logout: "வெளியேறு",
      upgrade: "மேம்படுத்து",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const navItems = [
    { id: "dashboard", label: t.dashboard, icon: BarChart3 },
    { id: "csv-analyzer", label: "CSV Analyzer", icon: FileText },
    { id: "analytics", label: t.analytics, icon: BarChart3 },
    { id: "ai-assistant", label: "AI Assistant", icon: MessageCircle },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">TaxEase</h1>
              <p className="text-xs text-muted-foreground">Professional Tax Management</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-wrap gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(item.id)}
                className={`transition-all duration-200 ${
                  currentView === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:block relative w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full h-9 bg-muted/30 border-0 focus:bg-background transition-all duration-200" />
            </div>

            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20 h-9 border-0 bg-muted/30">
                <Globe className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 EN</SelectItem>
                <SelectItem value="hi">🇮🇳 हि</SelectItem>
                <SelectItem value="ta">🇮🇳 த</SelectItem>
              </SelectContent>
            </Select>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 p-0 hover:bg-muted/50"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 p-0 relative hover:bg-muted/50"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white border-0">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* Profile Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                <User className="w-4 h-4 mr-2" />
                Alex
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 hover:from-yellow-600 hover:to-orange-600"
              >
                <Crown className="w-4 h-4 mr-2" />
                {t.upgrade}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-9 h-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    currentView === item.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : ""
                  }`}
                  onClick={() => {
                    setCurrentView(item.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  {t.profile}
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
