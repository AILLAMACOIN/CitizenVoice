'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { Mic, Square, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface VoiceRecorderProps {
  onTranscription: (text: string) => void
  locale?: string // For language support
}

export function VoiceRecorder({ onTranscription, locale = 'en-US' }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const recognitionRef = useRef<any>(null)
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser.')
      return
    }
    
    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = locale // Set language
    
    recognition.onresult = (event: any) => {
      let interimTranscript = ''
      let finalTranscript = ''
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }
      
      setTranscript(finalTranscript || interimTranscript)
    }
    
    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`)
      setIsRecording(false)
    }
    
    recognition.onend = () => {
      if (isRecording && !isPaused) {
        recognition.start()
      } else {
        setIsRecording(false)
      }
    }
    
    recognitionRef.current = recognition
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          // Ignore errors when stopping
        }
      }
    }
  }, [isRecording, isPaused, locale])
  
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }
      setIsRecording(false)
      
      // Transfer the transcript to the parent component
      if (transcript) {
        onTranscription(transcript)
      }
    } else {
      setTranscript('')
      setError(null)
      setIsRecording(true)
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
        } catch (e) {
          console.error("Error starting recognition:", e);
          setError("Could not start speech recognition");
          setIsRecording(false);
        }
      }
    }
  }
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={toggleRecording}
          className={cn(
            "rounded-full w-12 h-12 flex items-center justify-center",
            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-gold hover:bg-gold/90"
          )}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? (
            <Square className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        <span className="text-sm font-medium">
          {isRecording ? 'Recording...' : 'Click to record feedback'}
        </span>
        {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
      
      {transcript && (
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 