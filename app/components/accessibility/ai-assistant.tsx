"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card"
import { 
  Bot, 
  Mic, 
  MicOff, 
  X, 
  MessageCircle, 
  ChevronUp, 
  ChevronDown,
  VolumeX,
  Volume2,
  Settings,
  RefreshCw,
  Sparkles
} from "lucide-react"

// Mock assistant responses for demo purposes
const mockResponses = [
  "I can help you navigate the website and provide assistance with government services.",
  "Would you like me to read this page to you?",
  "I can help you fill out forms, navigate complex processes, or find specific information.",
  "You can ask me how to complete specific tasks or request simplified explanations.",
  "I'm designed to support various accessibility needs and make government services easier to use.",
  "Would you like to increase the text size or change the color theme for better visibility?",
  "I can translate content or provide simplified explanations of government terminology.",
  "To submit feedback, you can use the form on the contact page. Would you like me to guide you there?",
  "You can view your customized accessibility profile in the accessibility settings section."
]

export function AIAssistant() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMicActive, setIsMicActive] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Hello! I'm your AI accessibility assistant. How can I help you today?", isUser: false}
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  // Toggle assistant visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    if (!isVisible) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }
  
  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }
  
  // Toggle microphone
  const toggleMic = () => {
    setIsMicActive(!isMicActive)
    
    if (!isMicActive) {
      // Demo recognition after 2 seconds
      setTimeout(() => {
        addUserMessage("How can I get help with accessibility features?")
        setIsMicActive(false)
      }, 2000)
    }
  }
  
  // Toggle voice output
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled)
  }
  
  // Add a user message
  const addUserMessage = (text: string) => {
    if (!text.trim()) return
    
    setMessages([...messages, {text, isUser: true}])
    setInputValue("")
    
    // Simulate typing indicator
    setIsTyping(true)
    
    // Simulate assistant response
    setTimeout(() => {
      setIsTyping(false)
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      const newMessage = {text: response, isUser: false}
      setMessages(prev => [...prev, newMessage])
      
      // Read response if voice is enabled
      if (isVoiceEnabled) {
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.rate = 0.9
        window.speechSynthesis.speak(utterance)
      }
    }, 1500)
  }
  
  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addUserMessage(inputValue)
  }
  
  // Handle keydown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addUserMessage(inputValue)
    }
  }
  
  // Reset conversation
  const resetConversation = () => {
    setMessages([
      {text: "Hello! I'm your AI accessibility assistant. How can I help you today?", isUser: false}
    ])
  }

  if (!isVisible) {
    return (
      <Button
        onClick={toggleVisibility}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gold hover:bg-gold/90 text-white"
        aria-label="Open Accessibility Assistant"
      >
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isExpanded ? 'w-96' : 'w-72'}`}>
      <Card className="border border-gold/20 shadow-xl">
        <CardHeader className="bg-muted/50 p-3 flex flex-row items-center justify-between border-b">
          <CardTitle className="text-md text-gold flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            AI Accessibility Assistant
          </CardTitle>
          <div className="flex space-x-1">
            {isExpanded ? (
              <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-8 w-8">
                <ChevronDown className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-8 w-8">
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={toggleVisibility} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className={`p-3 ${isExpanded ? 'h-96' : 'h-64'} overflow-y-auto bg-white`}>
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] px-3 py-2 rounded-lg 
                    ${message.isUser 
                      ? 'bg-gold/10 text-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[85%] px-3 py-2 rounded-lg text-muted-foreground flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="p-3 border-t bg-muted/30">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <div className="flex items-center w-full relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="w-full py-2 px-3 rounded-l-md border outline-none focus:ring-1 focus:ring-gold bg-white"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={toggleMic} 
                className={`h-10 w-10 absolute right-0 ${isMicActive ? 'text-red-500' : ''}`}
              >
                {isMicActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button type="submit" className="rounded-r-md bg-gold hover:bg-gold/90 text-white">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      {/* Controls Bar */}
      {isExpanded && (
        <div className="mt-2 bg-white rounded-md shadow-md px-3 py-2 flex justify-between">
          <Button variant="ghost" size="sm" onClick={toggleVoice} className="h-8 w-8 p-0">
            {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetConversation} className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 