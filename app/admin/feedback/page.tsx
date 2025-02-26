import Link from 'next/link'
import { MessageSquare, Star, AlertTriangle, CheckCircle } from 'lucide-react'

// Mock data for feedback list
const feedbackData = [
  {
    id: '1',
    text: "I visited the RTA office yesterday and the service was excellent. The staff was very helpful and the process was smooth.",
    category: "service-quality",
    department: "rta",
    createdAt: new Date().toISOString(),
    sentiment: "positive",
    priority: "low",
    status: "unread"
  },
  {
    id: '2',
    text: "The application crashed when I tried to upload my documents. This is frustrating as I have a deadline to meet!",
    category: "technical-issue",
    department: "dha",
    createdAt: new Date().toISOString(),
    sentiment: "negative",
    priority: "high",
    status: "unread"
  },
  {
    id: '3',
    text: "I suggest adding a feature that allows users to track the status of their applications in real-time. It would be very helpful.",
    category: "policy-suggestion",
    department: "smart-dubai",
    createdAt: new Date().toISOString(),
    sentiment: "neutral",
    priority: "medium",
    status: "unread"
  },
  {
    id: '4',
    text: "Thank you for the excellent service at the Dubai Police smart station. I was able to report my lost items quickly and efficiently.",
    category: "compliment",
    department: "dubai-police",
    createdAt: new Date().toISOString(),
    sentiment: "positive",
    priority: "low",
    status: "responded"
  },
  {
    id: '5',
    text: "URGENT: My water has been disconnected without notice and I have small children at home. Please resolve immediately!",
    category: "urgent-matter",
    department: "dewa",
    createdAt: new Date().toISOString(),
    sentiment: "negative",
    priority: "high",
    status: "in-progress"
  }
]

function getCategoryIcon(category: string) {
  switch(category) {
    case 'service-quality': return <MessageSquare className="h-5 w-5 text-blue-500" />
    case 'compliment': return <Star className="h-5 w-5 text-green-500" />
    case 'urgent-matter': return <AlertTriangle className="h-5 w-5 text-red-500" />
    case 'technical-issue': return <AlertTriangle className="h-5 w-5 text-amber-500" />
    default: return <CheckCircle className="h-5 w-5 text-gray-500" />
  }
}

function getPriorityColor(priority: string) {
  switch(priority) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-amber-100 text-amber-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getStatusColor(status: string) {
  switch(status) {
    case 'unread': return 'bg-blue-100 text-blue-800'
    case 'in-progress': return 'bg-purple-100 text-purple-800'
    case 'responded': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function FeedbackListPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-4">Customer Feedback</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Filter by:</span>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>All Departments</option>
            <option>Smart Dubai</option>
            <option>RTA</option>
            <option>Dubai Health Authority</option>
            <option>DEWA</option>
            <option>Dubai Police</option>
          </select>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>All Categories</option>
            <option>Service Quality</option>
            <option>Technical Issue</option>
            <option>Policy Suggestion</option>
            <option>Compliment</option>
            <option>Urgent Matter</option>
          </select>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>All Status</option>
            <option>Unread</option>
            <option>In Progress</option>
            <option>Responded</option>
          </select>
        </div>
        
        <div>
          <input 
            type="search" 
            placeholder="Search feedback..." 
            className="border rounded-md px-3 py-1 w-64" 
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {feedbackData.map((feedback) => (
          <Link 
            key={feedback.id} 
            href={`/admin/feedback/${feedback.id}`}
            className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getCategoryIcon(feedback.category)}
                </div>
                <div>
                  <h3 className="font-medium">{feedback.department} - Feedback #{feedback.id}</h3>
                  <p className="text-gray-600 line-clamp-2 mt-1">
                    {feedback.text}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority} priority
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
          Load More
        </button>
      </div>
    </div>
  )
} 