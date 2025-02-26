"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { 
  Eye, 
  Ear, 
  MousePointer, 
  Scroll, 
  SunMoon, 
  Type, 
  Palette, 
  Volume2,
  Clock,
  Save,
  RotateCcw
} from "lucide-react"

export default function AccessibilitySettings() {
  const [contrastMode, setContrastMode] = useState("normal")
  const [fontSize, setFontSize] = useState("medium")
  const [animationReduced, setAnimationReduced] = useState(false)
  const [colorBlindMode, setColorBlindMode] = useState("none")
  const [voiceControl, setVoiceControl] = useState(false)
  const [keyboardNavigation, setKeyboardNavigation] = useState(false)
  const [autoScroll, setAutoScroll] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [simplifiedInterface, setSimplifiedInterface] = useState(false)
  const [captionsEnabled, setCaptionsEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(10)
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Accessibility Settings</h1>
      
      <div className="mb-8">
        <p className="text-lg max-w-3xl">
          Customize your accessibility preferences to make Citizen Voice work better for you.
          These settings will be saved in your browser for future visits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2 h-5 w-5 text-gold" />
              Visual Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Display Contrast</label>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setContrastMode("normal")} 
                  variant={contrastMode === "normal" ? "default" : "outline"}
                  className={contrastMode === "normal" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  Normal
                </Button>
                <Button 
                  onClick={() => setContrastMode("high")} 
                  variant={contrastMode === "high" ? "default" : "outline"}
                  className={contrastMode === "high" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  High Contrast
                </Button>
                <Button 
                  onClick={() => setContrastMode("dark")} 
                  variant={contrastMode === "dark" ? "default" : "outline"}
                  className={contrastMode === "dark" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  Dark Mode
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setFontSize("small")} 
                  variant={fontSize === "small" ? "default" : "outline"}
                  className={fontSize === "small" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  <Type className="h-3 w-3" />
                </Button>
                <Button 
                  onClick={() => setFontSize("medium")} 
                  variant={fontSize === "medium" ? "default" : "outline"}
                  className={fontSize === "medium" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  <Type className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => setFontSize("large")} 
                  variant={fontSize === "large" ? "default" : "outline"}
                  className={fontSize === "large" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  <Type className="h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => setFontSize("x-large")} 
                  variant={fontSize === "x-large" ? "default" : "outline"}
                  className={fontSize === "x-large" ? "bg-gold hover:bg-gold/90" : ""}
                >
                  <Type className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Color Blind Mode</label>
              <select 
                className="w-full border rounded-lg px-3 py-2"
                value={colorBlindMode}
                onChange={(e) => setColorBlindMode(e.target.value)}
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia (Red-Blind)</option>
                <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
                <option value="tritanopia">Tritanopia (Blue-Blind)</option>
                <option value="achromatopsia">Achromatopsia (Monochromacy)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={animationReduced}
                  onChange={() => setAnimationReduced(!animationReduced)}
                />
                <span>Reduce animations</span>
              </label>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      
        {/* Hearing & Speech Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ear className="mr-2 h-5 w-5 text-gold" />
              Hearing & Speech Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={captionsEnabled}
                  onChange={() => setCaptionsEnabled(!captionsEnabled)}
                />
                <span>Enable closed captions</span>
              </label>
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={voiceControl}
                  onChange={() => setVoiceControl(!voiceControl)}
                />
                <span>Enable voice control</span>
              </label>
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Audio Speed</label>
              <input 
                type="range" 
                className="w-full" 
                min="0.5" 
                max="2" 
                step="0.1" 
                defaultValue="1" 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Slower</span>
                <span>Normal</span>
                <span>Faster</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Audio Volume</label>
              <input 
                type="range" 
                className="w-full" 
                min="0" 
                max="100" 
                step="5" 
                defaultValue="80" 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Motor Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MousePointer className="mr-2 h-5 w-5 text-gold" />
              Motor Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={keyboardNavigation}
                  onChange={() => setKeyboardNavigation(!keyboardNavigation)}
                />
                <span>Enhanced keyboard navigation</span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={autoScroll}
                  onChange={() => setAutoScroll(!autoScroll)}
                />
                <span>Auto-scroll long pages</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cursor Size</label>
              <div className="flex space-x-2">
                <Button variant="outline">Small</Button>
                <Button className="bg-gold hover:bg-gold/90">Medium</Button>
                <Button variant="outline">Large</Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Focus Highlight Intensity</label>
              <input 
                type="range" 
                className="w-full" 
                min="1" 
                max="5" 
                step="1" 
                defaultValue="3" 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Cognitive & Senior Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scroll className="mr-2 h-5 w-5 text-gold" />
              Cognitive & Senior Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={simplifiedInterface}
                  onChange={() => setSimplifiedInterface(!simplifiedInterface)}
                />
                <span>Simplified interface</span>
              </label>
              <SunMoon className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={screenReader}
                  onChange={() => setScreenReader(!screenReader)}
                />
                <span>Screen reader compatibility mode</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  className="border rounded-lg px-3 py-2 w-20"
                  min="1"
                  max="60"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                />
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                How long to keep you logged in when inactive
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between mt-10">
        <Button variant="outline" className="flex items-center">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button className="bg-gold hover:bg-gold/90">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
} 