"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    month: "Jan",
    satisfaction: 85,
    responses: 420,
    resolution: 92,
  },
  {
    month: "Feb",
    satisfaction: 88,
    responses: 450,
    resolution: 94,
  },
  {
    month: "Mar",
    satisfaction: 87,
    responses: 480,
    resolution: 93,
  },
  {
    month: "Apr",
    satisfaction: 89,
    responses: 520,
    resolution: 95,
  },
  {
    month: "May",
    satisfaction: 91,
    responses: 550,
    resolution: 96,
  },
  {
    month: "Jun",
    satisfaction: 90,
    responses: 580,
    resolution: 95,
  },
]

export function FeedbackTrends() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Feedback Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="satisfaction"
              stroke="#D4AF37"
              name="Satisfaction %"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="resolution"
              stroke="#22c55e"
              name="Resolution %"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="responses"
              stroke="#3b82f6"
              name="Total Responses"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 