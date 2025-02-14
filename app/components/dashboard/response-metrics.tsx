"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Clock, CheckCircle, AlertCircle, Clock4 } from "lucide-react"

const metrics = [
  {
    title: "Average Response Time",
    value: "4.2 hours",
    icon: Clock,
    description: "15% faster than last month",
    color: "text-blue-500",
  },
  {
    title: "Resolution Rate",
    value: "94.8%",
    icon: CheckCircle,
    description: "2.3% increase from last month",
    color: "text-green-500",
  },
  {
    title: "Pending Responses",
    value: "28",
    icon: AlertCircle,
    description: "Requires attention",
    color: "text-yellow-500",
  },
  {
    title: "SLA Compliance",
    value: "97.5%",
    icon: Clock4,
    description: "Within 24-hour target",
    color: "text-purple-500",
  },
]

export function ResponseMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 