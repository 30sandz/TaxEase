"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Upload,
  X,
  Check,
  Receipt,
  DollarSign,
  Calendar,
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Save,
  Scan,
} from "lucide-react"

interface ExpenseEntryProps {
  onClose: () => void
}

export default function ExpenseEntry({ onClose }: ExpenseEntryProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<any>(null)
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    receipt: null as File | null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const steps = [
    { id: 1, title: "Amount & Category", icon: DollarSign },
    { id: 2, title: "Receipt Scan", icon: Camera },
    { id: 3, title: "Review & Save", icon: Check },
  ]

  const categories = [
    { value: "office", label: "Office Supplies", color: "bg-blue-500" },
    { value: "travel", label: "Travel", color: "bg-green-500" },
    { value: "marketing", label: "Marketing", color: "bg-purple-500" },
    { value: "software", label: "Software", color: "bg-orange-500" },
    { value: "meals", label: "Meals & Entertainment", color: "bg-red-500" },
    { value: "utilities", label: "Utilities", color: "bg-cyan-500" },
  ]

  const handleReceiptScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setScannedData({
        amount: "₹2,450",
        vendor: "Office Depot",
        date: "2024-01-15",
        category: "office",
        items: ["Printer Paper", "Ink Cartridge", "Stapler"],
      })
      setFormData((prev) => ({
        ...prev,
        amount: "2450",
        category: "office",
        description: "Office supplies from Office Depot",
      }))
      setIsScanning(false)
      setCurrentStep(3)
    }, 3000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, receipt: file }))
      // Simulate AI processing
      setTimeout(() => {
        setScannedData({
          amount: "₹1,250",
          vendor: "Starbucks",
          date: "2024-01-15",
          category: "meals",
          items: ["Coffee", "Sandwich"],
        })
        setFormData((prev) => ({
          ...prev,
          amount: "1250",
          category: "meals",
          description: "Business meal at Starbucks",
        }))
        setCurrentStep(3)
      }, 2000)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">
            Amount
          </Label>
          <div className="relative">
            <DollarSign className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              className="pl-10 text-lg font-semibold glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={formData.category === category.value ? "default" : "outline"}
                className={`justify-start h-12 transition-all duration-300 hover-lift ${
                  formData.category === category.value
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass-morphism border-0 hover:bg-primary/10"
                }`}
                onClick={() => setFormData((prev) => ({ ...prev, category: category.value }))}
              >
                <div className={`w-3 h-3 rounded-full ${category.color} mr-3`} />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Date
          </Label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              className="pl-10 glass-morphism border-0 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description (Optional)
          </Label>
          <Textarea
            id="description"
            placeholder="Add a note about this expense..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="glass-morphism border-0 focus:ring-2 focus:ring-primary/20 resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => setCurrentStep(2)}
          disabled={!formData.amount || !formData.category}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover-lift disabled:opacity-50"
        >
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-pulse-glow">
          <Receipt className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Add Receipt</h3>
          <p className="text-muted-foreground">Scan or upload your receipt for automatic data extraction</p>
        </div>
      </div>

      {isScanning ? (
        <div className="space-y-6">
          <div className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Scan className="w-16 h-16 text-primary mx-auto animate-pulse" />
                <div className="space-y-2">
                  <p className="font-medium">Scanning Receipt...</p>
                  <Progress value={66} className="w-48 mx-auto" />
                  <p className="text-sm text-muted-foreground">Extracting data with AI</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary receipt-scan-animation" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleReceiptScan}
            className="h-32 flex-col space-y-3 glass-morphism border-2 border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover-lift bg-transparent"
            variant="outline"
          >
            <Camera className="w-8 h-8 text-primary" />
            <div className="text-center">
              <p className="font-medium">Scan Receipt</p>
              <p className="text-xs text-muted-foreground">Use camera to scan</p>
            </div>
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="h-32 flex-col space-y-3 glass-morphism border-2 border-dashed border-secondary/30 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 hover-lift"
            variant="outline"
          >
            <Upload className="w-8 h-8 text-secondary" />
            <div className="text-center">
              <p className="font-medium">Upload File</p>
              <p className="text-xs text-muted-foreground">Choose from gallery</p>
            </div>
          </Button>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(1)}
          variant="outline"
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover-lift glass-morphism border-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep(3)}
          variant="outline"
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover-lift glass-morphism border-0"
        >
          Skip for now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
      {scannedData && (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">AI Extraction Complete!</h4>
              <p className="text-sm text-green-600 dark:text-green-400">We've automatically filled in the details</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Vendor</p>
              <p className="font-medium">{scannedData.vendor}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Amount</p>
              <p className="font-medium">{scannedData.amount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{scannedData.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <Badge variant="secondary" className="capitalize">
                {scannedData.category}
              </Badge>
            </div>
          </div>
        </div>
      )}

      <Card className="glass-morphism border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Expense Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Amount</Label>
              <p className="text-2xl font-bold text-primary">₹{formData.amount}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Category</Label>
              <div className="flex items-center space-x-2 mt-1">
                <div
                  className={`w-3 h-3 rounded-full ${categories.find((c) => c.value === formData.category)?.color}`}
                />
                <p className="font-medium capitalize">{categories.find((c) => c.value === formData.category)?.label}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Date</Label>
              <p className="font-medium">{formData.date}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Receipt</Label>
              <p className="font-medium">{formData.receipt ? "Attached" : scannedData ? "Scanned" : "None"}</p>
            </div>
          </div>

          {formData.description && (
            <div>
              <Label className="text-sm text-muted-foreground">Description</Label>
              <p className="font-medium mt-1">{formData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(2)}
          variant="outline"
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover-lift glass-morphism border-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => {
            // Save expense logic here
            onClose()
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover-lift"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Expense
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-morphism border-0 shadow-2xl animate-scale-in">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold gradient-text">Add New Expense</CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="rounded-full w-8 h-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center space-x-2 ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                        : "bg-muted"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>
    </div>
  )
}
