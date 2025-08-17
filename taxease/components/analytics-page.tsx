"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, DollarSign, Target } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Analytics & Reports</h1>
        <p className="text-muted-foreground">Detailed insights into your financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: DollarSign, title: "Total Revenue", value: "₹1,45,000", change: "+12.5%" },
          { icon: TrendingUp, title: "Tax Savings", value: "₹18,750", change: "+8.2%" },
          { icon: Target, title: "Deductions", value: "₹32,400", change: "+15.3%" },
          { icon: BarChart3, title: "Efficiency", value: "94.2%", change: "+2.1%" },
        ].map((stat, index) => (
          <Card key={index} className="glass-morphism border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-morphism border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Detailed Analytics Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Advanced analytics and reporting features are being developed to provide you with comprehensive insights.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
