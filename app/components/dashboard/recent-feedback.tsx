"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { MessageSquare, Star } from "lucide-react"

const recentFeedback = [
  {
    name: "Mohammed A.",
    department: "Smart Dubai",
    comment: "DubaiNow app is very convenient. Love the new updates!",
    rating: 5,
    time: "10 minutes ago",
  },
  {
    name: "Fatima R.",
    department: "Dubai Health Authority",
    comment: "Vaccination booking process was smooth and efficient.",
    rating: 5,
    time: "25 minutes ago",
  },
  {
    name: "Abdullah K.",
    department: "RTA",
    comment: "Nol card recharge through app needs improvement.",
    rating: 3,
    time: "1 hour ago",
  },
  {
    name: "Sarah M.",
    department: "DEWA",
    comment: "Smart meter installation was quick and professional.",
    rating: 5,
    time: "2 hours ago",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export function RecentFeedback() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-blue-500" />
          Recent Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFeedback.map((feedback, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{feedback.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {feedback.department}
                  </p>
                </div>
                <StarRating rating={feedback.rating} />
              </div>
              <p className="text-sm">{feedback.comment}</p>
              <p className="text-xs text-muted-foreground">{feedback.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 