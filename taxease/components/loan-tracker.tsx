"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Home,
  Car,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  Calendar,
  DollarSign,
  Percent,
} from "lucide-react"

interface Loan {
  id: string
  type: "home" | "car" | "personal" | "education" | "business"
  name: string
  principal: number
  currentBalance: number
  interestRate: number
  monthlyPayment: number
  remainingMonths: number
  nextPaymentDate: string
  status: "active" | "overdue" | "paid"
  taxDeductible: boolean
}

const mockLoans: Loan[] = [
  {
    id: "1",
    type: "home",
    name: "Home Loan - HDFC",
    principal: 5000000,
    currentBalance: 3200000,
    interestRate: 8.5,
    monthlyPayment: 45000,
    remainingMonths: 180,
    nextPaymentDate: "2024-01-15",
    status: "active",
    taxDeductible: true,
  },
  {
    id: "2",
    type: "car",
    name: "Car Loan - SBI",
    principal: 800000,
    currentBalance: 320000,
    interestRate: 9.2,
    monthlyPayment: 18500,
    remainingMonths: 18,
    nextPaymentDate: "2024-01-10",
    status: "active",
    taxDeductible: false,
  },
  {
    id: "3",
    type: "personal",
    name: "Personal Loan - ICICI",
    principal: 300000,
    currentBalance: 85000,
    interestRate: 12.5,
    monthlyPayment: 12000,
    remainingMonths: 8,
    nextPaymentDate: "2024-01-20",
    status: "overdue",
    taxDeductible: false,
  },
]

export default function LoanTracker() {
  const [loans, setLoans] = useState<Loan[]>(mockLoans)
  const [showAddForm, setShowAddForm] = useState(false)

  const getLoanIcon = (type: Loan["type"]) => {
    switch (type) {
      case "home":
        return Home
      case "car":
        return Car
      case "education":
        return GraduationCap
      case "personal":
      case "business":
      default:
        return CreditCard
    }
  }

  const getStatusColor = (status: Loan["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "overdue":
        return "bg-red-500"
      case "paid":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.currentBalance, 0)
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0)
  const taxDeductibleAmount = loans
    .filter((loan) => loan.taxDeductible)
    .reduce((sum, loan) => sum + loan.monthlyPayment * 12, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Loan Management</h2>
          <p className="text-muted-foreground">Track and optimize your loan portfolio</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Loan
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
                <p className="text-2xl font-bold text-foreground">₹{(totalOutstanding / 100000).toFixed(1)}L</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly EMI</p>
                <p className="text-2xl font-bold text-foreground">₹{totalMonthlyPayment.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tax Deductible</p>
                <p className="text-2xl font-bold text-green-600">₹{(taxDeductibleAmount / 100000).toFixed(1)}L</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan List */}
      <div className="space-y-4">
        {loans.map((loan) => {
          const Icon = getLoanIcon(loan.type)
          const progressPercentage = ((loan.principal - loan.currentBalance) / loan.principal) * 100

          return (
            <Card
              key={loan.id}
              className="border-0 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{loan.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {loan.interestRate}% APR
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(loan.status)}`} />
                        <span className="text-xs text-muted-foreground capitalize">{loan.status}</span>
                        {loan.taxDeductible && (
                          <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                            Tax Deductible
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="text-lg font-bold text-foreground">₹{(loan.currentBalance / 100000).toFixed(1)}L</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Repayment Progress</span>
                      <span className="text-foreground">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Monthly EMI</p>
                      <p className="font-medium text-foreground">₹{loan.monthlyPayment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Remaining Months</p>
                      <p className="font-medium text-foreground">{loan.remainingMonths}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Payment</p>
                      <p className="font-medium text-foreground">{loan.nextPaymentDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Principal</p>
                      <p className="font-medium text-foreground">₹{(loan.principal / 100000).toFixed(1)}L</p>
                    </div>
                  </div>

                  {loan.status === "overdue" && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-700 dark:text-red-300">
                        Payment overdue - Please make payment immediately
                      </span>
                    </div>
                  )}

                  {loan.taxDeductible && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        Annual tax deduction: ₹{(loan.monthlyPayment * 12).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tax Optimization Tips */}
      <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700 dark:text-green-300">
            <TrendingUp className="w-5 h-5 mr-2" />
            Loan Tax Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-300">Home Loan Benefits</p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Claim up to ₹2L deduction on principal (80C) + ₹2L on interest (24b)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-300">Education Loan Interest</p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Full interest amount is deductible under Section 80E with no upper limit
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-700 dark:text-yellow-300">Missing Deductions</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  You're missing ₹45,000 in potential tax savings from your home loan interest
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
