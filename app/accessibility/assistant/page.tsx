"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { MessageSquare, User, Send, Mic, Image, Settings } from "lucide-react"

export default function AccessibilityAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your Accessibility Assistant. How can I help you navigate government services today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ]
    setMessages(newMessages)
    setInput("")

    // Simulate assistant response
    setTimeout(() => {
      let response = ""
      
      if (input.toLowerCase().includes("visa")) {
        response = "For visa services, I recommend using the Ministry of Interior's smart services portal. Would you like me to guide you through the process with screen reader-friendly instructions?"
      } else if (input.toLowerCase().includes("health") || input.toLowerCase().includes("medical")) {
        response = "For health services, the Ministry of Health and Prevention offers special assistance for people of determination. Would you like me to help you book an appointment with accessibility support?"
      } else if (input.toLowerCase().includes("senior") || input.toLowerCase().includes("elderly")) {
        response = "Senior citizens have priority services available. I can help you access simplified versions of services with larger text and voice guidance. What specific service are you looking for?"
      } else {
        response = "I can help you navigate any government service with accessibility support. Could you tell me more specifically what service you're looking for?"
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }])
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gold mb-10">AI Accessibility Assistant</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-gold" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[calc(100%-88px)]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] rounded-lg p-3 
                        ${message.role === "assistant" 
                          ? "bg-muted text-foreground" 
                          : "bg-gold text-white"
                        }
                      `}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    title="Voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    title="Image input"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <input 
                    type="text" 
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Type your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button 
                    className="bg-gold hover:bg-gold/90"
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gold" />
                Assistant Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Voice Type</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Female Voice</option>
                  <option>Male Voice</option>
                  <option>Natural Voice</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Speaking Rate</label>
                <input type="range" className="w-full" min="0.5" max="2" step="0.1" defaultValue="1" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Text Size</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Normal</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                </select>
              </div>
              
              <div className="pt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Simplified language</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>Voice feedback</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>Visual cues</span>
                </label>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-gold" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  Find accessible services
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  Connect to live assistance
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  Request document in accessible format
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  Report accessibility issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 