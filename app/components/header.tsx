"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import {
  Home,
  BarChart2,
  MessageSquare,
  Building2,
  Bell,
  Globe,
  HelpCircle,
  User,
  Accessibility,
  Send,
  ChevronDown
} from "lucide-react"
import { useState } from "react"

export function Header() {
  const [showFeedbackMenu, setShowFeedbackMenu] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-gold">Citizen Voice</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <Home className="h-4 w-4 mr-1 inline-block" />
              Home
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <BarChart2 className="h-4 w-4 mr-1 inline-block" />
              Dashboard
            </Link>
            
            {/* Simple Feedback Dropdown */}
            <div className="relative">
              <button 
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center"
                onClick={() => setShowFeedbackMenu(!showFeedbackMenu)}
              >
                <MessageSquare className="h-4 w-4 mr-1 inline-block" />
                Feedback
                <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
              </button>
              
              {showFeedbackMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <Link 
                    href="/feedback" 
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowFeedbackMenu(false)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Feedback
                  </Link>
                  <Link 
                    href="/feedback-submission" 
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowFeedbackMenu(false)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/departments" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <Building2 className="h-4 w-4 mr-1 inline-block" />
              Departments
            </Link>
            <Link href="/accessibility" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <Accessibility className="h-4 w-4 mr-1 inline-block" />
              Accessibility Features
            </Link>
          </nav>
        </div>
        
        <div className="flex-1 justify-end flex items-center">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
} 