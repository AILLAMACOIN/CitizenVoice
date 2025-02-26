"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { 
  Accessibility, 
  Users, 
  Settings, 
  BarChart, 
  Ear, 
  Eye, 
  MousePointer, 
  Scroll,
  SunMoon,
  CheckCircle,
  Globe,
  FileText
} from "lucide-react"

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-4">Accessibility Services</h1>
      
      <div className="bg-gradient-to-r from-gold/10 to-transparent p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Globe className="mr-2 h-5 w-5 text-gold" />
          UAE Digital Accessibility Commitment
        </h2>
        <p className="text-lg max-w-3xl mb-4">
          Citizen Voice is committed to making government services accessible to everyone, 
          including people of determination and senior citizens in the UAE, in alignment with:
        </p>
        <ul className="space-y-2 ml-6 mb-4">
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span>TDRA Digital Government Standards and Guidelines</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span>UAE National Policy for Empowering People of Determination</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</span>
          </li>
        </ul>
        <Link href="/accessibility/compliance">
          <Button variant="outline" className="mt-2">
            <FileText className="mr-2 h-4 w-4" />
            View Compliance Statement
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Accessibility Profiles Card */}
        <Link href="/accessibility/profiles">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center text-gold">
                <Users className="mr-2 h-5 w-5" />
                Accessibility Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create and manage personalized accessibility profiles for different needs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge icon={<Eye className="h-3 w-3" />} label="Visual" />
                <Badge icon={<Ear className="h-3 w-3" />} label="Hearing" />
                <Badge icon={<MousePointer className="h-3 w-3" />} label="Motor" />
                <Badge icon={<Scroll className="h-3 w-3" />} label="Cognitive" />
                <Badge icon={<SunMoon className="h-3 w-3" />} label="Senior" />
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* AI Assistant Card */}
        <Link href="/accessibility/assistant">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center text-gold">
                <Accessibility className="mr-2 h-5 w-5" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                Get personalized help navigating government services with our accessibility-focused AI assistant.
              </p>
              <div className="text-xs bg-purple-50 text-purple-700 p-2 rounded-md">
                Supports Arabic & English voice commands with dialects from all 7 Emirates
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Accessibility Dashboard Card */}
        <Link href="/accessibility/dashboard">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-gold">
                <BarChart className="mr-2 h-5 w-5" />
                Accessibility Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                View analytics and insights on accessibility usage and improvements across government services.
              </p>
              <div className="text-xs bg-green-50 text-green-700 p-2 rounded-md">
                Monitor compliance with UAE's accessibility standards in real-time
              </div>
            </CardContent>
          </Card>
        </Link>
        
        {/* Settings Card */}
        <Link href="/accessibility/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center text-gold">
                <Settings className="mr-2 h-5 w-5" />
                Accessibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                Configure global accessibility settings and preferences for your Citizen Voice experience.
              </p>
              <div className="text-xs bg-amber-50 text-amber-700 p-2 rounded-md">
                Personalized settings are automatically saved and synced across all government services
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="mt-10 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <p className="mb-4">
          Our dedicated support team for people of determination is available 24/7.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline">
            Call 800-ACCESS (800-222377)
          </Button>
          <Button variant="outline">
            Live Chat with Support
          </Button>
        </div>
      </div>
    </div>
  )
}

interface BadgeProps {
  icon: React.ReactNode
  label: string
}

function Badge({ icon, label }: BadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground">
      {icon}
      <span className="ml-1">{label}</span>
    </div>
  )
} 