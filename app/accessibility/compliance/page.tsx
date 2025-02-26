"use client"

import { ArrowLeft, Check, FileText, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

export default function AccessibilityCompliancePage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/accessibility">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Accessibility
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gold mb-2">Accessibility Compliance Statement</h1>
      
      <div className="bg-muted p-6 rounded-lg mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold">UAE TDRA Digital Accessibility Compliance</h2>
        </div>
        <p className="mb-4">
          Citizen Voice is committed to ensuring digital accessibility for people of determination. We are continually 
          improving the user experience for everyone and applying the relevant accessibility standards.
        </p>
        <p className="mb-4">
          This platform is designed to comply with both the UAE's Telecommunications and Digital Government 
          Regulatory Authority (TDRA) Digital Government Standards and Guidelines and the Web Content 
          Accessibility Guidelines (WCAG) 2.1 Level AA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-gold" />
              TDRA Standards
            </CardTitle>
            <CardDescription>
              UAE Digital Government Standards compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Digital Services Standards",
                "UAE Design System Guidelines",
                "UAE Information Architecture Standards",
                "Digital Content Guidelines",
                "Accessibility Requirements for People of Determination"
              ].map((standard, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{standard}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-gold" /> 
              WCAG 2.1 Level AA
            </CardTitle>
            <CardDescription>
              Web Content Accessibility Guidelines compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Perceivable - Information is presented in ways users can perceive",
                "Operable - Interface components are fully operable",
                "Understandable - Information and operation are understandable",
                "Robust - Content is compatible with current and future tools"
              ].map((principle, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
      <div className="space-y-4 mb-8">
        <p>Citizen Voice includes the following accessibility features:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Text resizing and font adjustments</li>
          <li>Color contrast controls</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader compatibility</li>
          <li>Focus indicators</li>
          <li>Reduced motion options</li>
          <li>Arabic and English language support</li>
          <li>Voice commands and audio assistance</li>
          <li>Alternative text for images</li>
          <li>Customizable accessibility profiles</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-4">Accessibility Testing</h2>
      <div className="space-y-4 mb-8">
        <p>Our accessibility testing methodology includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Automated testing using WCAG 2.1 AA tools</li>
          <li>Manual testing with keyboard navigation</li>
          <li>Screen reader testing with NVDA and VoiceOver</li>
          <li>User testing with people of determination</li>
          <li>Regular compliance audits</li>
          <li>Compatibility testing across devices and browsers</li>
        </ul>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          We welcome your feedback on the accessibility of Citizen Voice. Please contact us with any questions or suggestions:
        </p>
        <div className="space-y-2">
          <p><strong>Email:</strong> accessibility@citizenvoice.gov.ae</p>
          <p><strong>Phone:</strong> 800-ACCESS (800-222377)</p>
          <p><strong>Live Chat:</strong> Available 24/7 through our accessibility assistant</p>
        </div>
      </div>
    </div>
  )
} 