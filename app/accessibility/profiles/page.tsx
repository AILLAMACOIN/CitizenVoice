"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { 
  Eye, 
  EyeOff, 
  Ear, 
  Scroll, 
  MousePointer, 
  Plus, 
  Edit, 
  Trash, 
  Save,
  SunMoon
} from "lucide-react"

type AccessibilityProfile = {
  id: string
  name: string
  type: "visual" | "hearing" | "motor" | "cognitive" | "senior"
  settings: Record<string, any>
}

export default function AccessibilityProfiles() {
  const [profiles, setProfiles] = useState<AccessibilityProfile[]>([
    {
      id: "profile-1",
      name: "High Contrast",
      type: "visual",
      settings: {
        contrast: "high",
        fontSize: "large",
        animations: "reduced",
        screenReader: true
      }
    },
    {
      id: "profile-2",
      name: "Hearing Assistance",
      type: "hearing",
      settings: {
        closedCaptions: true,
        visualNotifications: true,
        transcripts: true
      }
    },
    {
      id: "profile-3",
      name: "Motor Assistance",
      type: "motor",
      settings: {
        keyboardOnly: true,
        largeClickTargets: true,
        autoScroll: true
      }
    },
    {
      id: "profile-4",
      name: "Senior Mode",
      type: "senior",
      settings: {
        fontSize: "x-large",
        contrast: "medium",
        simplifiedInterface: true,
        voiceAssistance: true
      }
    }
  ])

  const profileTypeIcons = {
    visual: <Eye className="h-5 w-5" />,
    hearing: <Ear className="h-5 w-5" />,
    motor: <MousePointer className="h-5 w-5" />,
    cognitive: <Scroll className="h-5 w-5" />,
    senior: <SunMoon className="h-5 w-5" />
  }

  const [activeTab, setActiveTab] = useState("visual")

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Accessibility Profiles</h1>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Create and manage accessibility profiles for different user needs
        </p>
        <Button className="bg-gold text-white hover:bg-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Profile
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-5">
          <TabsTrigger value="visual" className="flex flex-col items-center py-2">
            <Eye className="h-4 w-4 mb-1" />
            <span className="text-xs">Visual</span>
          </TabsTrigger>
          <TabsTrigger value="hearing" className="flex flex-col items-center py-2">
            <Ear className="h-4 w-4 mb-1" />
            <span className="text-xs">Hearing</span>
          </TabsTrigger>
          <TabsTrigger value="motor" className="flex flex-col items-center py-2">
            <MousePointer className="h-4 w-4 mb-1" />
            <span className="text-xs">Motor</span>
          </TabsTrigger>
          <TabsTrigger value="cognitive" className="flex flex-col items-center py-2">
            <Scroll className="h-4 w-4 mb-1" />
            <span className="text-xs">Cognitive</span>
          </TabsTrigger>
          <TabsTrigger value="senior" className="flex flex-col items-center py-2">
            <SunMoon className="h-4 w-4 mb-1" />
            <span className="text-xs">Senior</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Visual Tab Content */}
        <TabsContent value="visual" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles
              .filter(profile => profile.type === "visual")
              .map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  icon={profileTypeIcons[profile.type]} 
                />
              ))
            }
            <NewProfileCard type="visual" />
          </div>
        </TabsContent>
        
        {/* Hearing Tab Content */}
        <TabsContent value="hearing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles
              .filter(profile => profile.type === "hearing")
              .map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  icon={profileTypeIcons[profile.type]} 
                />
              ))
            }
            <NewProfileCard type="hearing" />
          </div>
        </TabsContent>
        
        {/* Motor Tab Content */}
        <TabsContent value="motor" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles
              .filter(profile => profile.type === "motor")
              .map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  icon={profileTypeIcons[profile.type]} 
                />
              ))
            }
            <NewProfileCard type="motor" />
          </div>
        </TabsContent>
        
        {/* Cognitive Tab Content */}
        <TabsContent value="cognitive" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles
              .filter(profile => profile.type === "cognitive")
              .map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  icon={profileTypeIcons[profile.type]} 
                />
              ))
            }
            <NewProfileCard type="cognitive" />
          </div>
        </TabsContent>
        
        {/* Senior Tab Content */}
        <TabsContent value="senior" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles
              .filter(profile => profile.type === "senior")
              .map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  icon={profileTypeIcons[profile.type]} 
                />
              ))
            }
            <NewProfileCard type="senior" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProfileCardProps {
  profile: AccessibilityProfile
  icon: React.ReactNode
}

function ProfileCard({ profile, icon }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{profile.name}</span>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {Object.entries(profile.settings).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span>{value === true ? "Enabled" : value === false ? "Disabled" : value}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4 bg-gold hover:bg-gold/90">Apply Profile</Button>
      </CardContent>
    </Card>
  )
}

interface NewProfileCardProps {
  type: "visual" | "hearing" | "motor" | "cognitive" | "senior"
}

function NewProfileCard({ type }: NewProfileCardProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center p-6 h-[225px]">
        <Plus className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">Create a new {type} profile</p>
        <Button variant="outline">
          Create Profile
        </Button>
      </CardContent>
    </Card>
  )
} 