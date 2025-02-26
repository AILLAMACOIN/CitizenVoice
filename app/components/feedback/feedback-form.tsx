'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { VoiceRecorder } from './voice-recorder'
import { CheckCircle, MessageSquare, AlertTriangle, ThumbsUp } from 'lucide-react'
import { CategorizedFeedback, categorizeFeedback } from '../../lib/ai-service'

export function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('')
  const [department, setDepartment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedbackAnalysis, setFeedbackAnalysis] = useState<CategorizedFeedback | null>(null)
  
  const handleTranscription = (text: string) => {
    setFeedbackText(text)
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!feedbackText.trim() || !department) {
      setError('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Get AI categorization of the feedback
      const analysis = await categorizeFeedback(feedbackText)
      setFeedbackAnalysis(analysis)
      
      // In a real app, this would make an API call to submit the feedback
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSuccess(true)
      
      // Don't reset the form right away so users can see their submitted feedback with the analysis
      setTimeout(() => {
        setFeedbackText('')
        setDepartment('')
        setSuccess(false)
        setFeedbackAnalysis(null)
      }, 8000) // Reset after 8 seconds
    } catch (err) {
      setError('Failed to submit feedback. Please try again.')
      console.error('Error submitting feedback:', err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'service-quality': return <MessageSquare className="h-5 w-5 text-blue-500" />
      case 'compliment': return <ThumbsUp className="h-5 w-5 text-green-500" />
      case 'urgent-matter': return <AlertTriangle className="h-5 w-5 text-red-500" />
      default: return <CheckCircle className="h-5 w-5 text-gray-500" />
    }
  }
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            name="department"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm rounded-md"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select a department</option>
            <option value="smart-dubai">Smart Dubai</option>
            <option value="rta">Roads & Transport Authority</option>
            <option value="dha">Dubai Health Authority</option>
            <option value="dewa">Dubai Electricity & Water Authority</option>
            <option value="dubai-police">Dubai Police</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={5}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
            placeholder="Please share your experience or suggestion..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="border-t border-b py-4">
          <h3 className="text-sm font-medium mb-2">Record your feedback</h3>
          <VoiceRecorder 
            onTranscription={handleTranscription}
            locale="en-US" // You can make this dynamic for Arabic support
          />
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="bg-gold text-black hover:bg-gold/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Feedback submitted successfully
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Analysis Display */}
      {feedbackAnalysis && (
        <div className="mt-6 border rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
              {getCategoryIcon(feedbackAnalysis.category)}
              AI Analysis
            </h3>
          </div>
          <div className="px-4 py-3 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Category:</span>
                <span className="text-sm capitalize">{feedbackAnalysis.category.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Sentiment:</span>
                <span className="text-sm capitalize">{feedbackAnalysis.sentiment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Priority:</span>
                <span className={`text-sm capitalize ${
                  feedbackAnalysis.priority === 'high' 
                    ? 'text-red-600' 
                    : feedbackAnalysis.priority === 'medium'
                    ? 'text-amber-600'
                    : 'text-green-600'
                }`}>
                  {feedbackAnalysis.priority}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">Keywords:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {feedbackAnalysis.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 