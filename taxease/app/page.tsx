"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import {
  Calculator,
  Plus,
  Shield,
  Zap,
  Briefcase,
  Users,
  Cpu,
  Car,
  Megaphone,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Search,
  MessageCircle,
  Upload,
  Camera,
  Bot,
  Eye,
  Monitor,
  FileSpreadsheet,
  Target,
  CheckCircle,
  DollarSign,
  Percent,
  Activity,
  Send,
  HelpCircle,
} from "lucide-react"
import CSVAnalyzer from "@/components/csv-analyzer"
import LoginPage from "@/components/login-page"
import AnalyticsPage from "@/components/analytics-page"
import AIAssistantPage from "@/components/ai-assistant-page"
import QuickActionsPage from "@/components/quick-actions-page"
import ExpenseEntryPage from "@/components/expense-entry-page"
import AIAssistantScreen from "@/components/ai-assistant-screen"
import ExpenseEntry from "@/components/expense-entry"
import MistakeDetector from "@/components/mistake-detector"
import AnalyticsScreen from "@/components/analytics-screen"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface CSVAnalysisResults {
  totalExpenses: number
  deductibleExpenses: number
  nonDeductibleExpenses: number
  potentialSavings: number
  taxWithDeductions: number
  taxWithoutDeductions: number
  profitWithTax: number
  profitWithoutTax: number
  categoryBreakdown: Array<{
    category: string
    amount: number
    count: number
    deductible: number
    percentage: number
  }>
  monthlyTrend: Array<{
    month: string
    expenses: number
    savings: number
    deductions: number
  }>
}

const expenseData = [
  {
    month: "Jan",
    expenses: 45000,
    savings: 8000,
    income: 120000,
    profit: 67000,
    taxSaved: 5200,
    gstCredit: 2800,
    investments: 15000,
    cashFlow: 52000,
  },
  {
    month: "Feb",
    expenses: 52000,
    savings: 9500,
    income: 135000,
    profit: 73500,
    taxSaved: 6100,
    gstCredit: 3200,
    investments: 18000,
    cashFlow: 61500,
  },
  {
    month: "Mar",
    expenses: 48000,
    savings: 8800,
    income: 128000,
    profit: 71200,
    taxSaved: 5800,
    gstCredit: 3000,
    investments: 16500,
    cashFlow: 63700,
  },
  {
    month: "Apr",
    expenses: 61000,
    savings: 11200,
    income: 145000,
    profit: 72800,
    taxSaved: 7200,
    gstCredit: 4000,
    investments: 20000,
    cashFlow: 51800,
  },
  {
    month: "May",
    expenses: 55000,
    savings: 10100,
    income: 138000,
    profit: 72900,
    taxSaved: 6500,
    gstCredit: 3500,
    investments: 17500,
    cashFlow: 65400,
  },
  {
    month: "Jun",
    expenses: 67000,
    savings: 12300,
    income: 155000,
    profit: 75700,
    taxSaved: 8100,
    gstCredit: 4200,
    investments: 22000,
    cashFlow: 66000,
  },
]

const categoryData = [
  { name: "Office Supplies", amount: 12500, icon: Briefcase, color: "bg-chart-1", transactions: 24, trend: "+5.2%" },
  { name: "Travel", amount: 8900, icon: Car, color: "bg-chart-2", transactions: 18, trend: "-2.1%" },
  { name: "Marketing", amount: 15600, icon: Megaphone, color: "bg-chart-3", transactions: 31, trend: "+12.8%" },
  { name: "Software", amount: 7800, icon: Cpu, color: "bg-chart-4", transactions: 12, trend: "+3.4%" },
  { name: "Utilities", amount: 4200, icon: Zap, color: "bg-chart-5", transactions: 8, trend: "-1.2%" },
  { name: "Equipment", amount: 9300, icon: Monitor, color: "bg-chart-1", transactions: 15, trend: "+8.7%" },
  { name: "Professional Services", amount: 11200, icon: Users, color: "bg-chart-2", transactions: 9, trend: "+15.3%" },
  { name: "Insurance", amount: 3800, icon: Shield, color: "bg-chart-3", transactions: 4, trend: "0%" },
]

const aiChatMessages = [
  { id: 1, type: "ai", message: "Hello! I'm your AI tax assistant. How can I help you today?", timestamp: "10:30 AM" },
  { id: 2, type: "user", message: "Can you analyze my Q2 expenses?", timestamp: "10:31 AM" },
  {
    id: 3,
    type: "ai",
    message:
      "I've analyzed your Q2 expenses. You spent ₹1,66,000 total with marketing being your highest category at ₹15,600. I recommend optimizing your software subscriptions to save ₹2,400 annually.",
    timestamp: "10:32 AM",
  },
]

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Tax deadline reminder",
    message: "GST filing due in 5 days",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    type: "success",
    title: "Payment received",
    message: "Invoice #INV-2024-001 paid",
    time: "4 hours ago",
    priority: "medium",
  },
  {
    id: 3,
    type: "info",
    title: "New tax regulation",
    message: "Updated GST rates effective next month",
    time: "1 day ago",
    priority: "low",
  },
  {
    id: 4,
    type: "warning",
    title: "Expense limit reached",
    message: "Marketing budget 90% utilized",
    time: "2 days ago",
    priority: "medium",
  },
]

export default function TaxEaseApp() {
  const [currentView, setCurrentView] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [language, setLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [chatMessages, setChatMessages] = useState(aiChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [notificationCount, setNotificationCount] = useState(4)
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("all")
  const [expenseFilter, setExpenseFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [csvAnalysisResults, setCsvAnalysisResults] = useState<CSVAnalysisResults | null>(null)
  const [showExpenseEntry, setShowExpenseEntry] = useState(false)
  const [dashboardTab, setDashboardTab] = useState("csv-analyzer")
  const [showOverview, setShowOverview] = useState(false)
  const taxDerived = React.useMemo(() => {
    if (!csvAnalysisResults) return null
    const grossIncome =
      csvAnalysisResults.profitWithoutTax +
      csvAnalysisResults.taxWithoutDeductions +
      csvAnalysisResults.totalExpenses
    const taxRate = grossIncome > 0 ? csvAnalysisResults.taxWithoutDeductions / grossIncome : 0
    const afterTaxExpense =
      csvAnalysisResults.nonDeductibleExpenses +
      csvAnalysisResults.deductibleExpenses * (1 - taxRate)
    const taxesPaid = csvAnalysisResults.taxWithDeductions
    const taxesWithoutDeductions = csvAnalysisResults.taxWithoutDeductions
    const taxSavings = Math.max(taxesWithoutDeductions - taxesPaid, 0)
    const cashOutflowAfterTax = csvAnalysisResults.totalExpenses + taxesPaid
    const cashOutflowWithoutDeductions = csvAnalysisResults.totalExpenses + taxesWithoutDeductions
    const cashOutflowReduction = Math.max(cashOutflowWithoutDeductions - cashOutflowAfterTax, 0)
    const deductibleRatio =
      csvAnalysisResults.totalExpenses > 0
        ? csvAnalysisResults.deductibleExpenses / csvAnalysisResults.totalExpenses
        : 0
    const savingsRate = taxesWithoutDeductions > 0 ? taxSavings / taxesWithoutDeductions : 0
    const assessment =
      savingsRate >= 0.2 || deductibleRatio >= 0.6
        ? {
            verdict: "Good",
            detail:
              "Your deductions are effectively reducing tax. Maintain documentation and look for minor optimizations.",
          }
        : {
            verdict: "Can Improve",
            detail:
              "You may be overpaying. Reclassify eligible expenses and time purchases to increase deductions.",
          }
    return {
      grossIncome,
      taxRate,
      afterTaxExpense,
      taxesPaid,
      taxesWithoutDeductions,
      taxSavings,
      cashOutflowAfterTax,
      cashOutflowWithoutDeductions,
      cashOutflowReduction,
      deductibleRatio,
      savingsRate,
      assessment,
    }
  }, [csvAnalysisResults])

  const handleCSVAnalysisComplete = (results: CSVAnalysisResults) => {
    setCsvAnalysisResults(results)
    setCurrentView("dashboard")
    setDashboardTab("overview")
  }

  const guardedSetCurrentView = (view: string) => {
    if (!isAuthenticated && view !== "home" && view !== "login") {
      setCurrentView("login")
      return
    }
    setCurrentView(view)
  }

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsLoading(false)
            return 0
          }
          return prev + 10
        })
      }, 200)
      return () => clearInterval(timer)
    }
  }, [isLoading])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const translations = {
    en: {
      welcome: "Professional Tax Management",
      tagline: "AI-powered financial intelligence for modern businesses",
      login: "Sign In",
      signup: "Get Started",
      dashboard: "Dashboard",
      addExpense: "Add Expense",
      reports: "Reports",
      settings: "Settings",
      analytics: "Analytics",
      insights: "AI Insights",
      features: "Features",
      getStarted: "Get Started",
      learnMore: "Learn More",
      keyFeatures: "Key Features",
      howItWorks: "How It Works",
      aiAssistant: "AI Assistant",
      notifications: "Notifications",
      profile: "Profile",
      help: "Help & Support",
      upgrade: "Upgrade Plan",
      loanTracker: "Loan Tracker",
      mistakeDetector: "Mistake Detector",
    },
    hi: {
      welcome: "व्यावसायिक कर प्रबंधन",
      tagline: "आधुनिक व्यवसायों के लिए AI-संचालित वित्तीय बुद्धिमत्ता",
      login: "साइन इन करें",
      signup: "शुरू करें",
      dashboard: "डैशबोर्ड",
      addExpense: "खर्च जोड़ें",
      reports: "रिपोर्ट्स",
      settings: "सेटिंग्स",
      analytics: "विश्लेषण",
      insights: "AI अंतर्दृष्टि",
      features: "विशेषताएं",
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      keyFeatures: "मुख्य विशेषताएं",
      howItWorks: "यह कैसे काम करता है",
      aiAssistant: "AI सहायक",
      notifications: "सूचनाएं",
      profile: "प्रोफ़ाइल",
      help: "सहायता और समर्थन",
      upgrade: "प्लान अपग्रेड करें",
      loanTracker: "लोन ट्रैकर",
      mistakeDetector: "गलती डिटेक्टर",
    },
    ta: {
      welcome: "தொழில்முறை வரி மேலாண்மை",
      tagline: "நவீன வணிகங்களுக்கான AI-இயங்கும் நிதி நுண்ணறிவு",
      login: "உள்நுழையவும்",
      signup: "தொடங்குங்கள்",
      dashboard: "டாஷ்போர்டு",
      addExpense: "செலவு சேர்க்கவும்",
      reports: "அறிக்கைகள்",
      settings: "அமைப்புகள்",
      analytics: "பகுப்பாய்வு",
      insights: "AI நுண்ணறிவு",
      features: "அம்சங்கள்",
      getStarted: "தொடங்குங்கள்",
      learnMore: "மேலும் அறிக",
      keyFeatures: "முख்ய அம்சங்கள்",
      howItWorks: "இது எப்படி வேலை செய்கிறது",
      aiAssistant: "AI உதவியாளர்",
      notifications: "அறிவிப்புகள்",
      profile: "சுயவிவரம்",
      help: "உதவி மற்றும் ஆதரவு",
      upgrade: "திட்டத்தை மேம்படுத்தவும்",
      loanTracker: "கடன் கண்காணிப்பு",
      mistakeDetector: "தவறு கண்டறிதல்",
    },
  }

  const t = translations[language as keyof typeof translations]

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-float floating-particles"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-lg animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-primary/15 to-secondary/30 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-accent/25 to-primary/15 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <Navigation
        currentView={currentView}
        setCurrentView={guardedSetCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        notificationCount={notificationCount}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 morphing-gradient rounded-full flex items-center justify-center shadow-2xl animate-glow-pulse relative">
            <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
              <FileSpreadsheet className="w-16 h-16 text-primary animate-magnetic" />
            </div>
          </div>
          <h1 className="text-6xl font-bold gradient-text mb-6 animate-scale-in">TaxEase — AI Tax Companion</h1>
          <p
            className="text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            A professional demo of our product: see features, benefits, and how TaxEase saves you money. When ready,
            proceed to your dashboard.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-bounce-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="morphing-gradient hover:shadow-2xl text-white px-10 py-6 rounded-2xl font-semibold text-lg transition-all duration-500 hover-lift animate-pulse-glow relative overflow-hidden group"
              onClick={() => guardedSetCurrentView(isAuthenticated ? "dashboard" : "login")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Upload className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Go to Dashboard</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-morphism border-2 border-primary/30 hover:border-accent/50 hover:bg-primary/10 transition-all duration-500 hover-lift bg-transparent px-10 py-6 rounded-2xl font-semibold text-lg magnetic-hover"
              onClick={() => guardedSetCurrentView(isAuthenticated ? "dashboard" : "login")}
            >
              <Eye className="w-6 h-6 mr-3" />
              View Dashboard
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {[
            {
              icon: Bot,
              title: "AI Classification",
              description: "Advanced AI automatically categorizes your expenses with 95%+ accuracy and smart insights",
              gradient: "from-blue-500 via-primary to-cyan-500",
              delay: "0s",
            },
            {
              icon: Calculator,
              title: "Tax Optimization",
              description:
                "Compare profit scenarios with and without tax deductions to maximize your savings potential",
              gradient: "from-green-500 via-accent to-emerald-500",
              delay: "0.2s",
            },
            {
              icon: BarChart3,
              title: "Visual Analytics",
              description: "Beautiful interactive charts and insights to understand your spending patterns deeply",
              gradient: "from-purple-500 via-primary to-violet-500",
              delay: "0.4s",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="glass-morphism border-2 border-primary/20 shadow-2xl hover:shadow-3xl hover:border-accent/40 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-bounce-in group relative overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div
                  className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl animate-float group-hover:animate-glow-pulse relative`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className="absolute inset-1 bg-white/20 rounded-xl"></div>
                  <feature.icon className="w-10 h-10 text-white relative z-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-morphism border-2 border-primary/30 shadow-3xl mb-16 animate-slide-up relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <CardHeader className="text-center relative z-10 pb-8">
            <CardTitle className="text-3xl font-bold gradient-text mb-4">See What You'll Get</CardTitle>
            <p className="text-muted-foreground text-lg">Sample analysis from a monthly expense CSV with AI insights</p>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6 animate-slide-in">
                <h4 className="font-bold text-xl flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-green-500 animate-bounce" />
                  With Tax Optimization
                </h4>
                <div className="bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 rounded-2xl border-2 border-green-200/50 hover:border-green-300/70 transition-all duration-300 hover-lift">
                  <div className="text-4xl font-bold text-green-600 mb-3 animate-scale-in">₹67,500</div>
                  <p className="text-green-700 dark:text-green-300 text-lg font-medium">Monthly Profit After Tax</p>
                  <div className="mt-6 space-y-3 text-base">
                    <div className="flex justify-between items-center p-2 bg-green-50/50 rounded-lg">
                      <span>Tax Deductions:</span>
                      <span className="font-bold">₹24,250</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-100/50 rounded-lg">
                      <span>Tax Savings:</span>
                      <span className="font-bold text-green-600">₹7,275</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <h4 className="font-bold text-xl flex items-center">
                  <TrendingDown
                    className="w-6 h-6 mr-3 text-red-500 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />
                  Without Optimization
                </h4>
                <div className="bg-gradient-to-br from-red-50 via-red-100/50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 p-8 rounded-2xl border-2 border-red-200/50 hover:border-red-300/70 transition-all duration-300 hover-lift">
                  <div className="text-4xl font-bold text-red-600 mb-3 animate-scale-in">₹60,225</div>
                  <p className="text-red-700 dark:text-red-300 text-lg font-medium">Monthly Profit After Tax</p>
                  <div className="mt-6 space-y-3 text-base">
                    <div className="flex justify-between items-center p-2 bg-red-50/50 rounded-lg">
                      <span>No Deductions:</span>
                      <span className="font-bold">₹0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-100/50 rounded-lg">
                      <span>Missed Savings:</span>
                      <span className="font-bold text-red-600">₹7,275</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center animate-bounce-in" style={{ animationDelay: "0.6s" }}>
              <div className="inline-flex items-center space-x-6 glass-morphism px-12 py-8 rounded-2xl border-2 border-primary/30 hover:border-accent/50 transition-all duration-300 hover-lift group">
                <Calculator className="w-12 h-12 text-primary group-hover:animate-spin transition-transform duration-300" />
                <div>
                  <div className="text-4xl font-bold gradient-text">₹7,275</div>
                  <p className="text-muted-foreground text-lg font-medium">Monthly Tax Savings Potential</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Plus,
              title: "Manual Entry",
              description: "Add expenses manually with smart AI-powered categorization and insights",
              onClick: () => setCurrentView("expense-entry"),
              gradient: "from-blue-500 to-cyan-500",
              delay: "0s",
            },
            {
              icon: Camera,
              title: "Receipt Scan",
              description: "Scan receipts with advanced AI-powered data extraction and processing",
              onClick: () => setCurrentView("expense-entry"),
              gradient: "from-green-500 to-emerald-500",
              delay: "0.1s",
            },
            {
              icon: MessageCircle,
              title: "AI Assistant",
              description: "Get personalized tax advice and financial insights from our AI expert",
              onClick: () => setCurrentView("ai-assistant"),
              gradient: "from-purple-500 to-violet-500",
              delay: "0.2s",
            },
            {
              icon: Shield,
              title: "Compliance Check",
              description: "Ensure all deductions meet tax regulations with automated compliance verification",
              onClick: () => setCurrentView("mistake-detector"),
              gradient: "from-orange-500 to-red-500",
              delay: "0.3s",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="glass-morphism border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:border-accent/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group animate-bounce-in relative overflow-hidden"
              onClick={feature.onClick}
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-float`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-3 text-foreground text-lg group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const DashboardPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-green-50 dark:from-emerald-950/20 dark:via-background dark:to-green-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-secondary/15 to-primary/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/8 to-secondary/12 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <Navigation
        currentView={currentView}
        setCurrentView={guardedSetCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        notificationCount={notificationCount}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {csvAnalysisResults && dashboardTab === "overview" && (
          <Card className="mb-8 glass-morphism border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 animate-fade-in overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-3xl font-bold gradient-text flex items-center">
                <CheckCircle className="w-8 h-8 mr-3 text-emerald-500 animate-pulse" />
                Financial Intelligence Dashboard
              </CardTitle>
              <p className="text-muted-foreground text-lg">AI-powered insights from your expense analysis</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center text-emerald-600">
                    <TrendingUp className="w-6 h-6 mr-2 animate-bounce" />
                    With Tax Optimization
                  </h3>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-950/30 p-8 rounded-3xl border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-500 hover-lift shadow-xl">
                    <div className="text-5xl font-bold text-emerald-600 mb-4 animate-scale-in">
                      ₹{csvAnalysisResults.profitWithTax.toLocaleString()}
                    </div>
                    <p className="text-emerald-700 dark:text-emerald-300 text-xl font-semibold mb-6">
                      Monthly Profit After Tax
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-emerald-50/80 dark:bg-emerald-950/50 rounded-xl">
                        <span className="font-medium">Total Deductions:</span>
                        <span className="font-bold text-emerald-600">
                          ₹{csvAnalysisResults.deductibleExpenses.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-emerald-100/80 dark:bg-emerald-900/50 rounded-xl">
                        <span className="font-medium">Tax Savings:</span>
                        <span className="font-bold text-emerald-600">
                          ₹{csvAnalysisResults.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-emerald-200/80 dark:bg-emerald-800/50 rounded-xl">
                        <span className="font-medium">Effective Tax Rate:</span>
                        <span className="font-bold text-emerald-600">
                          {(
                            (csvAnalysisResults.taxWithDeductions /
                              (csvAnalysisResults.profitWithTax + csvAnalysisResults.taxWithDeductions)) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center text-red-600">
                    <TrendingDown className="w-6 h-6 mr-2 animate-bounce" style={{ animationDelay: "0.5s" }} />
                    Without Optimization
                  </h3>
                  <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/30 dark:to-rose-950/30 p-8 rounded-3xl border-2 border-red-200/50 hover:border-red-300/70 transition-all duration-500 hover-lift shadow-xl">
                    <div className="text-5xl font-bold text-red-600 mb-4 animate-scale-in">
                      ₹{csvAnalysisResults.profitWithoutTax.toLocaleString()}
                    </div>
                    <p className="text-red-700 dark:text-red-300 text-xl font-semibold mb-6">
                      Monthly Profit After Tax
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-red-50/80 dark:bg-red-950/50 rounded-xl">
                        <span className="font-medium">No Deductions:</span>
                        <span className="font-bold text-red-600">₹0</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-red-100/80 dark:bg-red-900/50 rounded-xl">
                        <span className="font-medium">Missed Savings:</span>
                        <span className="font-bold text-red-600">
                          ₹{csvAnalysisResults.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-red-200/80 dark:bg-red-800/50 rounded-xl">
                        <span className="font-medium">Higher Tax Rate:</span>
                        <span className="font-bold text-red-600">
                          {(
                            (csvAnalysisResults.taxWithoutDeductions /
                              (csvAnalysisResults.profitWithoutTax + csvAnalysisResults.taxWithoutDeductions)) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before vs After-Tax Expenses cards (Cash Outflow vs Effective) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Before Tax Expenses */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">Before Tax Expenses</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-8 rounded-3xl border-2 border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 hover-lift shadow-xl">
                    <div className="text-5xl font-bold text-blue-600 mb-4">₹{csvAnalysisResults.totalExpenses.toLocaleString()}</div>
                    <p className="text-blue-700 dark:text-blue-300 text-lg font-semibold mb-6">Total Expenses (Pre‑Tax)</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl">
                        <span className="font-medium">Deductible Portion</span>
                        <span className="font-bold">₹{csvAnalysisResults.deductibleExpenses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-100/80 dark:bg-blue-900/40 rounded-xl">
                        <span className="font-medium">Non‑deductible Portion</span>
                        <span className="font-bold">₹{csvAnalysisResults.nonDeductibleExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* After Tax Expenses */}
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-emerald-600">After Tax (Cash Outflow)</h3>
                  <p className="text-sm text-muted-foreground mb-4">Expenses + Taxes paid after deductions</p>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 p-8 rounded-3xl border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-300 hover-lift shadow-xl">
                    <div className="text-5xl font-bold text-emerald-600 mb-4">₹{(taxDerived?.cashOutflowAfterTax || 0).toLocaleString()}</div>
                    <p className="text-emerald-700 dark:text-emerald-300 text-lg font-semibold mb-6">Cash Outflow After Tax</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl">
                        <span className="font-medium">Expenses</span>
                        <span className="font-bold">₹{csvAnalysisResults.totalExpenses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl">
                        <span className="font-medium">Taxes Paid</span>
                        <span className="font-bold">₹{(taxDerived?.taxesPaid || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-xl">
                        <span className="font-medium">Vs. No Deductions (Outflow)</span>
                        <span className="font-bold text-emerald-700">₹{(taxDerived?.cashOutflowWithoutDeductions || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm pl-1 pr-1">
                        <span className="text-muted-foreground">Savings from Deductions</span>
                        <span className="font-semibold text-emerald-700">₹{(taxDerived?.cashOutflowReduction || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pl-1 pr-1">
                        <span className="text-muted-foreground">Effective Cost (net of tax shield)</span>
                        <span className="font-semibold">₹{(taxDerived?.afterTaxExpense || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl border border-emerald-200/30 hover-lift">
                  <DollarSign className="w-10 h-10 mx-auto mb-3 text-emerald-500 animate-bounce" />
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    ₹{csvAnalysisResults.potentialSavings.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Monthly Tax Savings</p>
                  <div className="mt-2 text-xs text-emerald-600 font-semibold">
                    +{((csvAnalysisResults.potentialSavings / csvAnalysisResults.profitWithoutTax) * 100).toFixed(1)}%
                    profit boost
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-200/30 hover-lift">
                  <Percent
                    className="w-10 h-10 mx-auto mb-3 text-blue-500 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {((csvAnalysisResults.deductibleExpenses / csvAnalysisResults.totalExpenses) * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Deductible Expenses</p>
                  <div className="mt-2 text-xs text-blue-600 font-semibold">
                    ₹{csvAnalysisResults.deductibleExpenses.toLocaleString()} eligible
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-2xl border border-purple-200/30 hover-lift">
                  <Target
                    className="w-10 h-10 mx-auto mb-3 text-purple-500 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ₹{csvAnalysisResults.profitWithTax.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Optimized Profit</p>
                  <div className="mt-2 text-xs text-purple-600 font-semibold">
                    vs ₹{csvAnalysisResults.profitWithoutTax.toLocaleString()} without
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-200/30 hover-lift">
                  <Activity
                    className="w-10 h-10 mx-auto mb-3 text-orange-500 animate-bounce"
                    style={{ animationDelay: "0.6s" }}
                  />
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {csvAnalysisResults.categoryBreakdown.length}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Categories Analyzed</p>
                  <div className="mt-2 text-xs text-orange-600 font-semibold">AI classified with 94% accuracy</div>
                </div>
              </div>

              {/* Tax Summary and Before vs After-Tax Expenses */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <Card className="glass-morphism border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Tax Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Taxes Paid (with deductions)</span>
                      <span className="font-semibold">₹{(taxDerived?.taxesPaid || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes Without Deductions</span>
                      <span className="font-semibold">₹{(taxDerived?.taxesWithoutDeductions || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax Saved</span>
                      <span className="font-semibold text-emerald-600">₹{(taxDerived?.taxSavings || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Effective Tax Rate</span>
                      <span className="font-semibold">{(((taxDerived?.taxRate || 0) * 100).toFixed(1))}%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-morphism border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Expenses: Before vs After Tax</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Expenses (before tax)</span>
                      <span className="font-semibold">₹{csvAnalysisResults.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Effective Expenses (after tax)</span>
                      <span className="font-semibold text-emerald-700">₹{(taxDerived?.afterTaxExpense || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Deductible Portion</span>
                      <span className="font-semibold">₹{csvAnalysisResults.deductibleExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Non‑deductible Portion</span>
                      <span className="font-semibold">₹{csvAnalysisResults.nonDeductibleExpenses.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-morphism border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Assessment & Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold">Verdict: </span>
                      <Badge variant={taxDerived?.assessment.verdict === "Good" ? "default" : "secondary"}>
                        {taxDerived?.assessment.verdict || "N/A"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{taxDerived?.assessment.detail}</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {csvAnalysisResults.nonDeductibleExpenses > csvAnalysisResults.deductibleExpenses && (
                        <li>Reclassify legitimate business expenses to reduce non‑deductible share.</li>
                      )}
                      {(taxDerived?.savingsRate || 0) < 0.2 && (
                        <li>Time large purchases near year‑end to maximize current year deductions.</li>
                      )}
                      {csvAnalysisResults.deductibleExpenses > 0 && (
                        <li>Ensure receipts and business purpose documentation for all deductibles.</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <h4 className="text-2xl font-bold mb-6 gradient-text">Expense Category Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {csvAnalysisResults.categoryBreakdown.slice(0, 6).map((category, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-background to-muted/30 rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover-lift shadow-lg"
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="glass-morphism border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Shield className="w-6 h-6 mr-2 text-emerald-500" />
                      Tax Law Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                      <h5 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                        Section 80C Deductions
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Your business expenses qualify for standard deductions under Income Tax Act Section 37(1)
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                      <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">GST Input Credit</h5>
                      <p className="text-sm text-muted-foreground">
                        Eligible for ₹{(csvAnalysisResults.deductibleExpenses * 0.18).toLocaleString()} GST input credit
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                      <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        Documentation Required
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        All expenses have proper receipts and business justification
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphism border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Calculator className="w-6 h-6 mr-2 text-blue-500" />
                      Optimization Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl">
                      <h5 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Quarterly Planning</h5>
                      <p className="text-sm text-muted-foreground">
                        Schedule equipment purchases in Q4 for maximum tax benefit
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl">
                      <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Expense Timing</h5>
                      <p className="text-sm text-muted-foreground">
                        Prepay annual subscriptions to increase current year deductions
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl">
                      <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        Investment Opportunities
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Consider business equipment depreciation for additional ₹
                        {(csvAnalysisResults.potentialSavings * 0.3).toLocaleString()} savings
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-morphism border-0 hover:bg-primary/10 transition-all duration-300 hover-lift bg-transparent px-8 py-4 text-lg"
                  onClick={() => setCurrentView("analytics")}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Detailed Analytics & Charts
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* CSV Analyzer CTA Banner */}
            {!csvAnalysisResults && (
              <Card className="glass-morphism border-0 shadow-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 animate-fade-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-pulse-glow shadow-xl">
                        <FileSpreadsheet className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold gradient-text mb-2">Upload Your Monthly Expenses</h3>
                        <p className="text-muted-foreground text-lg">
                          Get AI-powered analysis, tax optimization insights, and profit comparisons in seconds
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover-lift shadow-xl"
                      onClick={() => setCurrentView("csv-analyzer")}
                    >
                      <Upload className="w-6 h-6 mr-3" />
                      Analyze CSV Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Header with quick actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold gradient-text mb-3">Financial Command Center 🚀</h1>
                <p className="text-muted-foreground text-lg">
                  {csvAnalysisResults
                    ? "Your CSV analysis is complete. Here's your optimized financial intelligence dashboard."
                    : "Upload your expense CSV to unlock AI-powered tax optimization and profit analysis"}
                </p>
              </div>
              <div className="flex items-center space-x-4 animate-slide-up">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 w-80 glass-morphism border-0 focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-12 text-base"
                  />
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white transition-all duration-300 hover-lift animate-pulse-glow px-6 py-3"
                  onClick={() => setShowExpenseEntry(true)}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Expense
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: DollarSign,
                  label: "Monthly Revenue",
                  value: "₹1,45,000",
                  change: "+12.5%",
                  color: "emerald",
                  trend: "up",
                },
                {
                  icon: TrendingDown,
                  label: "Total Expenses",
                  value: "₹67,500",
                  change: "-3.2%",
                  color: "blue",
                  trend: "down",
                },
                {
                  icon: Percent,
                  label: "Tax Efficiency",
                  value: "87.3%",
                  change: "+5.1%",
                  color: "purple",
                  trend: "up",
                },
                { icon: Target, label: "Profit Margin", value: "53.4%", change: "+8.7%", color: "orange", trend: "up" },
              ].map((metric, index) => (
                <Card
                  key={index}
                  className="glass-morphism border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 rounded-xl flex items-center justify-center shadow-lg animate-float`}
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                    <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rich Charts & Plots */}
            {/* Sliding feature tabs */}
            {csvAnalysisResults && (
            <div className="sticky top-16 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <div className="overflow-x-auto no-scrollbar">
                <div className="flex gap-2 p-2 min-w-max">
                  {[
                    { id: "overview", label: "Overview", icon: BarChart3 },
                    { id: "csv-analyzer", label: "CSV Analyzer", icon: FileSpreadsheet },
                    { id: "analytics", label: "Analytics", icon: BarChart3 },
                    { id: "ai-assistant", label: "AI Assistant", icon: MessageCircle },
                    { id: "mistake-detector", label: "Compliance", icon: Shield },
                    { id: "expense-entry", label: "Add Expense", icon: Plus },
                    { id: "quick-actions", label: "Tax Calculator", icon: Calculator },
                  ].map((tab) => (
                    <Button
                      key={tab.id}
                      variant={dashboardTab === tab.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setDashboardTab(tab.id)}
                      className={`rounded-full px-4 ${dashboardTab === tab.id ? "shadow" : "hover:bg-muted/50"}`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Show only the active tab content; default asks to upload CSV */}
            <div className="mt-8">
              {csvAnalysisResults ? (
                <>
                  {dashboardTab === "csv-analyzer" && <CSVAnalyzer />}
                  {dashboardTab === "analytics" && <AnalyticsScreen />}
                  {dashboardTab === "ai-assistant" && <AIAssistantScreen />}
                  {dashboardTab === "expense-entry" && <ExpenseEntryPage />}
                  {dashboardTab === "mistake-detector" && <MistakeDetector />}
                  {dashboardTab === "quick-actions" && <QuickActionsPage />}
                </>
              ) : (
                <CSVAnalyzer
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  onAnalysisComplete={handleCSVAnalysisComplete}
                />
              )}
            </div>

            {/* Dashboard Hub: Segmented options with infographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* CSV Analyzer */}
              <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileSpreadsheet className="w-5 h-5 mr-2 text-primary" />
                    CSV Analyzer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">₹{(csvAnalysisResults?.totalExpenses || 30250).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Sample monthly expenses</div>
                    </div>
                    <div className="w-24 h-16">
                      <ResponsiveContainer>
                        <AreaChart data={expenseData}>
                          <Area type="monotone" dataKey="expenses" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setCurrentView("csv-analyzer")}>
                    Open Analyzer
                  </Button>
                </CardContent>
              </Card>

              {/* Add Expense */}
              <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                    Add Expense
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">Fast Entry</div>
                      <div className="text-xs text-muted-foreground">Scan or manual with AI</div>
                    </div>
                    <div className="w-24 h-16">
                      <ResponsiveContainer>
                        <LineChart data={expenseData}>
                          <Line type="monotone" dataKey="cashFlow" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setShowExpenseEntry(true)}>
                    Add Now
                  </Button>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">Insights</div>
                      <div className="text-xs text-muted-foreground">Trends & reports</div>
                    </div>
                    <div className="w-24 h-16">
                      <ResponsiveContainer>
                        <ReBarChart data={expenseData}>
                          <Bar dataKey="expenses" fill="#8b5cf6" />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setCurrentView("analytics")}>
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">Chat Help</div>
                      <div className="text-xs text-muted-foreground">Ask anything about taxes</div>
                    </div>
                    <div className="w-24 h-16">
                      <ResponsiveContainer>
                        <AreaChart data={expenseData}>
                          <Area type="monotone" dataKey="savings" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setCurrentView("ai-assistant")}>
                    Open Chat
                  </Button>
                </CardContent>
              </Card>

              {/* Tax Calculator */}
              <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Calculator className="w-5 h-5 mr-2 text-pink-600" />
                    Tax Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">Estimate</div>
                      <div className="text-xs text-muted-foreground">Quick tax scenarios</div>
                    </div>
                    <div className="w-24 h-16">
                      <ResponsiveContainer>
                        <LineChart data={expenseData}>
                          <Line type="monotone" dataKey="taxSaved" stroke="#ec4899" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setCurrentView("quick-actions")}>
                    Open Calculator
                  </Button>
                </CardContent>
              </Card>

              {/* Compliance Check */}
              <Card className="glass-morphism border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Shield className="w-5 h-5 mr-2 text-orange-600" />
                    Compliance Check
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">Review</div>
                      <div className="text-xs text-muted-foreground">Flags & docs</div>
                    </div>
                    <div className="w-24 h-16">
                      <ResponsiveContainer>
                        <ReBarChart data={expenseData}>
                          <Bar dataKey="investments" fill="#f59e0b" />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => setCurrentView("mistake-detector")}>
                    Run Check
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-morphism border-0 shadow-xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Bot className="w-6 h-6 mr-2 text-primary animate-bounce" />
                  AI Tax Assistant
                  <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200">
                    Online
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Get instant tax advice and insights</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick AI Insights */}
                <div className="space-y-3">
                  {[
                    {
                      icon: "💡",
                      text: "You can save ₹2,400 more by categorizing software subscriptions properly",
                      type: "tip",
                    },
                    {
                      icon: "📊",
                      text: "Your deduction rate is 15% above industry average - great job!",
                      type: "success",
                    },
                    { icon: "⚠️", text: "GST filing due in 5 days. Need help preparing?", type: "warning" },
                  ].map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl text-sm ${
                        insight.type === "tip"
                          ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50"
                          : insight.type === "success"
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50"
                            : "bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50"
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <span className="mr-2">{insight.icon}</span>
                      {insight.text}
                    </div>
                  ))}
                </div>

                {/* Quick Questions */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Quick Questions
                  </h4>
                  {[
                    "What expenses can I deduct?",
                    "How to optimize tax savings?",
                    "Explain my analysis results",
                    "Tax planning strategies",
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-3 hover:bg-primary/10 transition-all duration-300 text-xs"
                      onClick={() => setCurrentView("ai-assistant")}
                    >
                      <HelpCircle className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{question}</span>
                    </Button>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything..."
                      className="flex-1 text-sm h-10 glass-morphism border-0 bg-muted/50 focus:bg-background"
                      onKeyPress={(e) => e.key === "Enter" && setCurrentView("ai-assistant")}
                    />
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-10 px-4"
                      onClick={() => setCurrentView("ai-assistant")}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full glass-morphism border-0 hover:bg-primary/10 transition-all duration-300 bg-transparent"
                    onClick={() => setCurrentView("ai-assistant")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open Full Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="glass-morphism border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-emerald-500" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Tax Efficiency Score", value: "94/100", progress: 94, color: "emerald" },
                  { label: "Deduction Coverage", value: "87%", progress: 87, color: "blue" },
                  { label: "Compliance Rating", value: "98%", progress: 98, color: "purple" },
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {metric.value}
                      </Badge>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const CSVAnalyzerPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        notificationCount={notificationCount}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CSVAnalyzer
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        onAnalysisComplete={handleCSVAnalysisComplete}
      />
    </div>
  )

  const renderPage = () => {
    switch (currentView) {
      case "home":
        return <HomePage />
      case "login":
        return <LoginPage onSuccess={() => { setIsAuthenticated(true); setCurrentView("dashboard") }} />
      case "dashboard":
        return <DashboardPage />
      case "analytics":
        return <AnalyticsPage />
      case "ai-assistant":
        return <AIAssistantPage />
      case "quick-actions":
        return <QuickActionsPage />
      case "expense-entry":
        return <ExpenseEntryPage />
      case "csv-analyzer":
        return <CSVAnalyzerPage />
      default:
        return <HomePage />
    }
  }

  return <div className="min-h-screen">{renderPage()}</div>
}
