"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Smart Dubai",
    positive: 850,
    negative: 45,
    neutral: 105,
  },
  {
    name: "RTA",
    positive: 780,
    negative: 65,
    neutral: 155,
  },
  {
    name: "DHA",
    positive: 720,
    negative: 40,
    neutral: 140,
  },
  {
    name: "DEWA",
    positive: 680,
    negative: 35,
    neutral: 85,
  },
  {
    name: "Dubai Police",
    positive: 750,
    negative: 30,
    neutral: 120,
  },
]

export function DepartmentBreakdown() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Department Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" stackId="a" fill="#22c55e" name="Positive" />
            <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral" />
            <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 