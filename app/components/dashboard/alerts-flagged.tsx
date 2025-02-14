"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AlertTriangle, Clock } from "lucide-react"

const alerts = [
  {
    department: "Smart Dubai",
    issue: "DubaiNow App Maintenance",
    time: "2 hours ago",
    priority: "High",
  },
  {
    department: "Roads & Transport Authority",
    issue: "Nol Card System Update",
    time: "3 hours ago",
    priority: "Medium",
  },
  {
    department: "Dubai Health Authority",
    issue: "Vaccination Booking System",
    time: "4 hours ago",
    priority: "High",
  },
  {
    department: "DEWA",
    issue: "Smart Meter Connection",
    time: "5 hours ago",
    priority: "Medium",
  },
]

export function AlertsFlagged() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          Flagged Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{alert.department}</p>
                <p className="text-sm text-muted-foreground">{alert.issue}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {alert.time}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                    alert.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {alert.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 