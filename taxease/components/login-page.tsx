"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, User, Building, CheckCircle, Upload, FileText, Calculator, TrendingUp } from "lucide-react"

interface LoginPageProps {
  onSuccess?: () => void
  setCurrentView?: (view: string) => void
}

export default function LoginPage({ onSuccess, setCurrentView }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: auth, 2: onboarding, 3: data upload

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate auth process
    setTimeout(() => {
      setIsLoading(false)
      if (isSignup) {
        setStep(2) // Move to onboarding
      } else {
        onSuccess?.()
      }
    }, 2000)
  }

  const handleOnboarding = () => {
    setStep(3) // Move to data upload
  }

  const handleDataUpload = () => {
    // Redirect to CSV analyzer
    setCurrentView?.("csv-analyzer")
  }

  const renderAuthStep = () => (
    <form onSubmit={handleAuth} className="space-y-6">
      {isSignup && (
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10 glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
              required={isSignup}
            />
          </div>
        </div>
      )}

      {isSignup && (
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-medium">
            Company Name
          </Label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="companyName"
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="pl-10 glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
              required={isSignup}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      {isSignup && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-10 glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
              required={isSignup}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Eye className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white transition-all duration-300 hover-lift"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <ArrowRight className="w-4 h-4 mr-2" />
        )}
        {isLoading ? "Processing..." : (isSignup ? "Create Account" : "Sign In")}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm text-primary hover:underline transition-colors"
        >
          {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </form>
  )

  const renderOnboardingStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Welcome to TaxEase!</h3>
        <p className="text-gray-600">Let's get you started with your tax optimization journey</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-emerald-800">Smart Tax Analysis</h4>
            <p className="text-sm text-emerald-600">AI-powered expense analysis and optimization</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-800">Maximize Deductions</h4>
            <p className="text-sm text-blue-600">Identify every possible tax-saving opportunity</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-purple-800">Compliance Assurance</h4>
            <p className="text-sm text-purple-600">Stay compliant with automated checks</p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleOnboarding}
        className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
      >
        Continue to Data Upload
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  const renderDataUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Upload Your Data</h3>
        <p className="text-gray-600">Let's analyze your expenses and optimize your taxes</p>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            What We Need
          </h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Expense receipts and invoices</li>
            <li>• Bank statements or credit card statements</li>
            <li>• Any existing expense tracking data</li>
            <li>• Business-related purchase records</li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
          <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            What You'll Get
          </h4>
          <ul className="text-sm text-emerald-700 space-y-2">
            <li>• AI-powered expense categorization</li>
            <li>• Tax deduction optimization</li>
            <li>• Compliance risk assessment</li>
            <li>• Detailed financial insights</li>
          </ul>
        </div>
      </div>

      <Button
        onClick={handleDataUpload}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
      >
        Start Data Upload
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return isSignup ? "Create Your Account" : "Welcome Back"
      case 2:
        return "Getting Started"
      case 3:
        return "Data Upload"
      default:
        return "Welcome"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return isSignup ? "Join thousands of businesses optimizing their taxes" : "Sign in to your TaxEase account"
      case 2:
        return "Discover how TaxEase can transform your tax management"
      case 3:
        return "Upload your data to start optimizing your taxes"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg glass-morphism border-0 shadow-2xl animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold gradient-text">{getStepTitle()}</CardTitle>
          <p className="text-muted-foreground">{getStepDescription()}</p>
        </CardHeader>
        <CardContent>
          {step === 1 && renderAuthStep()}
          {step === 2 && renderOnboardingStep()}
          {step === 3 && renderDataUploadStep()}
        </CardContent>
      </Card>
    </div>
  )
}
