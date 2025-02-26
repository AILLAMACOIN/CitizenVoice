import { FeedbackForm } from '../components/feedback/feedback-form'

export const metadata = {
  title: 'Submit Feedback - Citizen Voice',
  description: 'Submit your feedback using voice or text to help us improve government services',
}

export default function FeedbackSubmissionPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Submit Your Feedback</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Your voice matters to us. Use the form below to submit your feedback about any government service. 
        You can type your feedback or use our voice-to-text feature by clicking the microphone button.
      </p>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <FeedbackForm />
      </div>
    </div>
  )
} 