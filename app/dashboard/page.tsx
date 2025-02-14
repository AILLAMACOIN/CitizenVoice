"use client"

import { MainSummary } from "../components/dashboard/main-summary"
import { SentimentDistribution } from "../components/dashboard/sentiment-distribution"
import { TopKeywords } from "../components/dashboard/top-keywords"
import { AlertsFlagged } from "../components/dashboard/alerts-flagged"
import { RecentFeedback } from "../components/dashboard/recent-feedback"
import { DepartmentBreakdown } from "../components/dashboard/department-breakdown"
import { ResponseMetrics } from "../components/dashboard/response-metrics"
import { FeedbackCategories } from "../components/dashboard/feedback-categories"
import { FeedbackTrends } from "../components/dashboard/feedback-trends"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">Dashboard</h1>
      
      <div className="mb-8">
        <ResponseMetrics />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        <FeedbackTrends />
        <FeedbackCategories />
      </div>

      <MainSummary />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SentimentDistribution />
        <TopKeywords />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsFlagged />
        <RecentFeedback />
      </div>
      <DepartmentBreakdown />
    </div>
  )
} 