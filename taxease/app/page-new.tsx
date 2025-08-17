"use client"

import React, { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
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
import SimplifiedDashboard from "@/components/simplified-dashboard"

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

export default function TaxEaseApp() {
  const [currentView, setCurrentView] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [csvAnalysisResults, setCsvAnalysisResults] = useState<CSVAnalysisResults | null>(null)
  const [notificationCount, setNotificationCount] = useState(4)
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")

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
  }

  const guardedSetCurrentView = (view: string) => {
    if (!isAuthenticated && view !== "home" && view !== "login") {
      setCurrentView("login")
      return
    }
    setCurrentView(view)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
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
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          TaxEase
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Professional Tax Management
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-500 mb-12">
          AI-powered financial intelligence for modern businesses
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => guardedSetCurrentView("login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => guardedSetCurrentView("csv-analyzer")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )

  const DashboardPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-green-50 dark:from-emerald-950/20 dark:via-background dark:to-green-950/20">
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
      <SimplifiedDashboard
        csvAnalysisResults={csvAnalysisResults}
        taxDerived={taxDerived}
        setCurrentView={guardedSetCurrentView}
      />
    </div>
  )

  const CSVAnalyzerPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
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
      case "mistake-detector":
        return <MistakeDetector />
      default:
        return <HomePage />
    }
  }

  return <div className="min-h-screen">{renderPage()}</div>
}
