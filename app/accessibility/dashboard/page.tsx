"use client"

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from "recharts"
import { Eye, Users, Clock, Lightbulb, Settings, Check, ArrowUpRight } from "lucide-react"

// Sample data for accessibility metrics
const accessibilityScoreData = [
  { name: "Visual Impairment", score: 87, color: "#D4AF37" },
  { name: "Hearing Impairment", score: 92, color: "#22c55e" },
  { name: "Motor Disability", score: 76, color: "#3b82f6" },
  { name: "Cognitive Disability", score: 68, color: "#8b5cf6" },
  { name: "Senior Friendly", score: 82, color: "#ec4899" },
]

const assistiveUsageData = [
  { name: "Screen Readers", value: 45, color: "#D4AF37" },
  { name: "Voice Controls", value: 25, color: "#22c55e" },
  { name: "Magnifiers", value: 15, color: "#3b82f6" },
  { name: "Text to Speech", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#ec4899" },
]

const monthlyImprovementData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 78 },
  { month: "May", score: 82 },
  { month: "Jun", score: 81 },
]

export default function AccessibilityDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Accessibility Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accessibility Score</CardTitle>
            <Eye className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81/100</div>
            <p className="text-xs text-muted-foreground">
              +12% from initial assessment
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TDRA Compliance</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Meets 23/25 requirements
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People of Determination</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,320</div>
            <p className="text-xs text-muted-foreground">
              Active users this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Assistance Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 min</div>
            <p className="text-xs text-muted-foreground">
              1.1 min faster than target
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Accessibility Score by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Score by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={accessibilityScoreData}
                layout="vertical"
                margin={{ left: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Compliance Score">
                  {accessibilityScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Assistive Technology Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Assistive Technology Usage</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assistiveUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {assistiveUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Improvement & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Accessibility Improvement</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyImprovementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#D4AF37" name="Accessibility Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-gold" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start pb-2 border-b">
                <span className="flex-1 text-sm">Improve keyboard navigation for main navigation menu</span>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-start pb-2 border-b">
                <span className="flex-1 text-sm">Add alternative text to infographics on feedback page</span>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-start pb-2 border-b">
                <span className="flex-1 text-sm">Enhance form field labels for screen readers</span>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-start pb-2 border-b">
                <span className="flex-1 text-sm">Improve color contrast on department cards</span>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-start">
                <span className="flex-1 text-sm">Add text alternatives for chart data</span>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Configure Accessibility */}
      <div className="flex justify-end">
        <Button className="bg-gold text-white hover:bg-gold/90">
          <Settings className="h-4 w-4 mr-2" />
          Configure Accessibility Settings
        </Button>
      </div>
    </div>
  )
} 