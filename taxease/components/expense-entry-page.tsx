"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function ExpenseEntryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Add Expense</h1>
        <p className="text-muted-foreground">Record new expenses and receipts</p>
      </div>

      <Card className="glass-morphism border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-6 h-6 mr-2 text-primary" />
            Expense Entry Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Plus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Expense entry form is being developed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
