"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    month: "Jan",
    "Visa Services": 95,
    "Smart Dubai": 92,
    "Traffic Services": 88,
    "Business Licensing": 90,
  },
  {
    month: "Feb",
    "Visa Services": 93,
    "Smart Dubai": 94,
    "Traffic Services": 91,
    "Business Licensing": 89,
  },
  {
    month: "Mar",
    "Visa Services": 96,
    "Smart Dubai": 95,
    "Traffic Services": 93,
    "Business Licensing": 92,
  },
  {
    month: "Apr",
    "Visa Services": 94,
    "Smart Dubai": 96,
    "Traffic Services": 90,
    "Business Licensing": 93,
  },
]

export function ServicePerformance() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Service Performance Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Visa Services" stroke="#D4AF37" strokeWidth={2} />
            <Line type="monotone" dataKey="Smart Dubai" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="Traffic Services" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="Business Licensing" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 