"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function QuickActionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Quick Actions</h1>
        <p className="text-muted-foreground">Fast access to common tasks</p>
      </div>

      <Card className="glass-morphism border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            Quick Actions Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Quick actions interface is being developed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
