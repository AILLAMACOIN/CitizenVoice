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
} from "lucide-react"

export function Header() {
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
            <Link href="/feedback" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <MessageSquare className="h-4 w-4 mr-1 inline-block" />
              Feedback
            </Link>
            <Link href="/departments" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <Building2 className="h-4 w-4 mr-1 inline-block" />
              Departments
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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