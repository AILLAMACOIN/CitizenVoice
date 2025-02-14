"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  {
    keyword: "Smart Services",
    count: 245,
  },
  {
    keyword: "Digital ID",
    count: 198,
  },
  {
    keyword: "Visa Process",
    count: 186,
  },
  {
    keyword: "Healthcare",
    count: 165,
  },
  {
    keyword: "Traffic Services",
    count: 145,
  },
  {
    keyword: "Business License",
    count: 134,
  },
  {
    keyword: "Education",
    count: 128,
  },
  {
    keyword: "Public Transport",
    count: 115,
  },
]

export function TopKeywords() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Top Keywords</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 70 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="keyword" type="category" />
            <Tooltip />
            <Bar dataKey="count" fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 