"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    name: "Service Quality",
    value: 85,
    fill: "#D4AF37",
  },
  {
    name: "System Performance",
    value: 78,
    fill: "#22c55e",
  },
  {
    name: "User Experience",
    value: 72,
    fill: "#3b82f6",
  },
  {
    name: "Staff Interaction",
    value: 88,
    fill: "#8b5cf6",
  },
  {
    name: "Process Efficiency",
    value: 76,
    fill: "#ec4899",
  },
]

export function FeedbackCategories() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Feedback Categories</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="35%"
            innerRadius="15%"
            outerRadius="85%"
            barSize={18}
            data={data}
          >
            <RadialBar
              label={{
                fill: "#fff",
                position: "insideStart",
                fontSize: 11,
              }}
              background
              dataKey="value"
            />
            <Legend
              iconSize={12}
              layout="vertical"
              verticalAlign="bottom"
              wrapperStyle={{
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: "2rem",
                display: "flex",
                justifyContent: "center"
              }}
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 