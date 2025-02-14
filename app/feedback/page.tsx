"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Star, StarHalf } from "lucide-react"

const feedbackData = [
  {
    customerName: "Ahmed Al Mansouri",
    ministryName: "Ministry of Interior",
    departmentName: "General Directorate of Residency and Foreigners Affairs",
    eServiceName: "Visa Renewal",
    date: "2025-02-10",
    rating: 4,
    comment: "The process was smooth, but it took a bit longer than expected. Overall, a good experience.",
  },
  {
    customerName: "Fatima Al Hashimi",
    ministryName: "Ministry of Health and Prevention",
    departmentName: "Health Centers and Clinics",
    eServiceName: "COVID-19 Vaccination Appointment",
    date: "2025-02-09",
    rating: 5,
    comment: "Excellent service! The online booking system was user-friendly and I got my appointment quickly.",
  },
  {
    customerName: "Mohammed Al Suwaidi",
    ministryName: "Ministry of Education",
    departmentName: "Higher Education",
    eServiceName: "University Application",
    date: "2025-02-08",
    rating: 3,
    comment:
      "The application process was a bit confusing. It would be helpful to have more guidance on required documents.",
  },
  {
    customerName: "Aisha Al Zaabi",
    ministryName: "Ministry of Economy",
    departmentName: "Small and Medium Enterprises",
    eServiceName: "Business License Renewal",
    date: "2025-02-07",
    rating: 4.5,
    comment: "Very efficient process. The only improvement could be clearer instructions on fee payment.",
  },
  {
    customerName: "Saeed Al Naqbi",
    ministryName: "Ministry of Climate Change and Environment",
    departmentName: "Environmental Affairs",
    eServiceName: "Environmental Impact Assessment Submission",
    date: "2025-02-06",
    rating: 2,
    comment:
      "The system was down for maintenance during my submission. Better communication about downtime would be appreciated.",
  },
  {
    customerName: "Mariam Al Shamsi",
    ministryName: "Ministry of Energy and Infrastructure",
    departmentName: "Transportation",
    eServiceName: "Vehicle Registration Renewal",
    date: "2025-02-05",
    rating: 5,
    comment: "Fantastic service! I completed the entire process online without any issues. Highly recommended.",
  },
  {
    customerName: "Khalid Al Qasimi",
    ministryName: "Ministry of Justice",
    departmentName: "Courts",
    eServiceName: "Case Status Inquiry",
    date: "2025-02-04",
    rating: 4,
    comment: "The online case status system is very helpful. It saves time from having to visit the court in person.",
  },
  {
    customerName: "Noura Al Kaabi",
    ministryName: "Ministry of Culture and Youth",
    departmentName: "National Library",
    eServiceName: "E-book Borrowing",
    date: "2025-02-03",
    rating: 4.5,
    comment:
      "Great selection of e-books. The borrowing process is straightforward. Would love to see more recent titles added.",
  },
  {
    customerName: "Hassan Al Marzouqi",
    ministryName: "Ministry of Human Resources and Emiratisation",
    departmentName: "Labour Relations",
    eServiceName: "Work Permit Application",
    date: "2025-02-02",
    rating: 3.5,
    comment:
      "The process was okay, but there were some delays in processing. More status updates would be appreciated.",
  },
  {
    customerName: "Latifa Al Maktoum",
    ministryName: "Ministry of Community Development",
    departmentName: "Social Services",
    eServiceName: "Social Support Application",
    date: "2025-02-01",
    rating: 5,
    comment:
      "The online application for social support was very user-friendly. The staff were also very helpful in guiding me through the process.",
  },
  {
    customerName: "Zayed Al Nahyan",
    ministryName: "Ministry of Presidential Affairs",
    departmentName: "Citizen Services",
    eServiceName: "Presidential Scholarship Application",
    date: "2025-01-01",
    rating: 5,
    comment: "The scholarship application process was seamless. Very impressed with the efficiency and transparency.",
  },
  {
    customerName: "Reem Al Falasi",
    ministryName: "Ministry of Interior",
    departmentName: "Federal Traffic Council",
    eServiceName: "Traffic Fine Payment",
    date: "2025-01-15",
    rating: 4,
    comment: "Quick and easy fine payment process. The mobile app works great.",
  },
  {
    customerName: "Sultan Al Dhaheri",
    ministryName: "Ministry of Energy and Infrastructure",
    departmentName: "Water Resources",
    eServiceName: "Water Connection Request",
    date: "2025-01-20",
    rating: 4.5,
    comment: "Professional service and quick response time. Very satisfied with the outcome.",
  },
  {
    customerName: "Maitha Al Mansoori",
    ministryName: "Ministry of Education",
    departmentName: "General Education",
    eServiceName: "School Registration",
    date: "2025-01-25",
    rating: 4,
    comment: "The online registration system is well-designed. Would appreciate more language options.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? (
            <Star className="w-5 h-5 fill-gold text-gold" />
          ) : star - 0.5 <= rating ? (
            <StarHalf className="w-5 h-5 fill-gold text-gold" />
          ) : (
            <Star className="w-5 h-5 text-gray-300" />
          )}
        </span>
      ))}
    </div>
  )
}

export default function FeedbackPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10
  const totalPages = Math.ceil(feedbackData.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentFeedback = feedbackData.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Customer Feedback</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Ministry Name</TableHead>
              <TableHead>Department Name</TableHead>
              <TableHead>E-service Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFeedback.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{feedback.customerName}</TableCell>
                <TableCell>{feedback.ministryName}</TableCell>
                <TableCell>{feedback.departmentName}</TableCell>
                <TableCell>{feedback.eServiceName}</TableCell>
                <TableCell>{feedback.date}</TableCell>
                <TableCell>
                  <StarRating rating={feedback.rating} />
                </TableCell>
                <TableCell>{feedback.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
} 