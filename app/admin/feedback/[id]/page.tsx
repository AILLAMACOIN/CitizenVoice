import { ResponseSuggestions } from '../../../components/admin/response-suggestions'

async function getFeedback(id: string) {
  // In a real app, this would fetch from your database
  // This is a mock implementation
  const mockFeedbacks = {
    '1': {
      id: '1',
      text: "I visited the RTA office yesterday and the service was excellent. The staff was very helpful and the process was smooth.",
      category: "service-quality",
      department: "rta",
      createdAt: new Date().toISOString(),
    },
    '2': {
      id: '2',
      text: "The application crashed when I tried to upload my documents. This is frustrating as I have a deadline to meet!",
      category: "technical-issue",
      department: "dha",
      createdAt: new Date().toISOString(),
    },
    '3': {
      id: '3',
      text: "I suggest adding a feature that allows users to track the status of their applications in real-time. It would be very helpful.",
      category: "policy-suggestion",
      department: "smart-dubai",
      createdAt: new Date().toISOString(),
    }
  };
  
  return mockFeedbacks[id as keyof typeof mockFeedbacks] || {
    id,
    text: "Sample feedback text for testing purposes.",
    category: "general-inquiry",
    department: "general",
    createdAt: new Date().toISOString(),
  };
}

export default async function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const feedback = await getFeedback(params.id)
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Feedback Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Feedback details card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Feedback #{feedback.id}</h2>
            <p className="mb-4">{feedback.text}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {feedback.department}
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {feedback.category}
              </span>
            </div>
          </div>
          
          {/* Response form would go here in a real application */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Respond to Feedback</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You can use the AI-generated suggestions from the sidebar to help craft your response.
              </p>
              
              <div>
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Response
                </label>
                <textarea
                  id="response"
                  rows={6}
                  className="w-full border rounded-md p-2 focus:ring-gold focus:border-gold"
                  placeholder="Type your response here..."
                ></textarea>
              </div>
              
              <button
                type="button"
                className="px-4 py-2 bg-gold text-black rounded-md hover:bg-gold/90"
              >
                Send Response
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <ResponseSuggestions 
            feedbackId={feedback.id}
            feedbackText={feedback.text}
            category={feedback.category as any}
          />
          
          {/* Other sidebar components could go here */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Customer Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Submission Date:</span>{" "}
                {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Response Time:</span>{" "}
                <span className="text-amber-600">12 hours remaining</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 