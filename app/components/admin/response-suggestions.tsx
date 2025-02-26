'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { MessageSquare, Copy, CheckCircle } from 'lucide-react'
import { FeedbackCategory, generateResponseSuggestions } from '../../lib/ai-service'

interface ResponseSuggestionsProps {
  feedbackId: string
  feedbackText: string
  category: FeedbackCategory
}

export function ResponseSuggestions({ feedbackId, feedbackText, category }: ResponseSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerateSuggestions = async () => {
    setIsLoading(true)
    try {
      const responses = await generateResponseSuggestions(feedbackText, category)
      setSuggestions(responses)
    } catch (error) {
      console.error('Error generating suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gold" />
          Response Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Generate AI-powered response suggestions based on this feedback.
            </p>
            <Button
              onClick={handleGenerateSuggestions}
              disabled={isLoading}
              className="bg-gold text-black hover:bg-gold/90"
            >
              {isLoading ? 'Generating...' : 'Generate Suggestions'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md relative">
                <p className="text-sm pr-8">{suggestion}</p>
                <button
                  onClick={() => copyToClipboard(suggestion, index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gold"
                  title="Copy to clipboard"
                >
                  {copiedIndex === index ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            ))}
            <Button
              onClick={handleGenerateSuggestions}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              Regenerate
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 