import { MessageSquare, Star, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../components/ui/button'

export const metadata = {
  title: 'Feedback - Citizen Voice',
  description: 'View feedback submitted to government departments',
}

// Mock data for public feedback view
const publicFeedbackData = [
  {
    id: '101',
    text: "The new smart queuing system at the Ministry of Interior has significantly reduced waiting times.",
    category: "service-quality",
    department: "Ministry of Interior",
    createdAt: "2023-12-10T10:30:00.000Z",
    sentiment: "positive",
    status: "addressed"
  },
  {
    id: '102',
    text: "The e-services portal for the Health Authority is very user-friendly and intuitive.",
    category: "compliment",
    department: "Ministry of Health",
    createdAt: "2023-12-05T14:15:00.000Z",
    sentiment: "positive",
    status: "acknowledged"
  },
  {
    id: '103',
    text: "I suggest adding more educational resources about sustainability on the Ministry of Climate Change website.",
    category: "policy-suggestion",
    department: "Ministry of Climate Change",
    createdAt: "2023-11-28T09:45:00.000Z",
    sentiment: "neutral",
    status: "under-review"
  },
  {
    id: '104',
    text: "The roads near Al Wasl require maintenance as there are several potholes causing traffic issues.",
    category: "service-quality",
    department: "Ministry of Infrastructure",
    createdAt: "2023-11-20T16:20:00.000Z",
    sentiment: "negative",
    status: "in-progress"
  },
  {
    id: '105',
    text: "The online education platform implemented by the Ministry of Education has been a great help for remote learning.",
    category: "service-quality",
    department: "Ministry of Education",
    createdAt: "2023-11-15T11:05:00.000Z",
    sentiment: "positive",
    status: "addressed"
  },
  {
    id: '106',
    text: "The recent update to the business licensing portal has made registration much faster. Thank you!",
    category: "compliment",
    department: "Ministry of Economy",
    createdAt: "2023-11-10T13:40:00.000Z",
    sentiment: "positive",
    status: "acknowledged"
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

function getStatusColor(status: string) {
  switch(status) {
    case 'addressed': return 'bg-green-100 text-green-800'
    case 'in-progress': return 'bg-purple-100 text-purple-800'
    case 'acknowledged': return 'bg-blue-100 text-blue-800'
    case 'under-review': return 'bg-amber-100 text-amber-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function FeedbackPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gold mb-4">Public Feedback</h1>
        <Link href="/feedback-submission">
          <Button className="bg-gold text-black hover:bg-gold/90">
            Submit New Feedback
          </Button>
        </Link>
      </div>
      
      <p className="text-gray-600 mb-6">
        Browse feedback submitted by citizens to various government departments. 
        This transparency helps us improve our services and build trust.
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Filter by:</span>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>All Departments</option>
            <option>Ministry of Interior</option>
            <option>Ministry of Health</option>
            <option>Ministry of Education</option>
            <option>Ministry of Infrastructure</option>
            <option>Ministry of Economy</option>
            <option>Ministry of Climate Change</option>
          </select>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>All Categories</option>
            <option>Service Quality</option>
            <option>Technical Issue</option>
            <option>Policy Suggestion</option>
            <option>Compliment</option>
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
        {publicFeedbackData.map((feedback) => (
          <div 
            key={feedback.id} 
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getCategoryIcon(feedback.category)}
                </div>
                <div>
                  <h3 className="font-medium">{feedback.department}</h3>
                  <p className="text-gray-600 mt-1">
                    {feedback.text}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(feedback.status)}`}>
                      {feedback.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
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