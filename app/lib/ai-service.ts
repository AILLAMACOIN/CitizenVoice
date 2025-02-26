export type FeedbackCategory = 
  | 'service-quality' 
  | 'technical-issue' 
  | 'policy-suggestion'
  | 'compliment'
  | 'urgent-matter'
  | 'general-inquiry';

export interface CategorizedFeedback {
  category: FeedbackCategory;
  confidence: number;
  keywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'low' | 'medium' | 'high';
}

// This is a mock implementation that simulates AI categorization
// In a real application, this would use OpenAI API or another AI service
export async function categorizeFeedback(feedbackText: string): Promise<CategorizedFeedback> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword-based categorization
  const lowercaseText = feedbackText.toLowerCase();
  
  let category: FeedbackCategory = 'general-inquiry';
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  let priority: 'low' | 'medium' | 'high' = 'low';
  
  // Simple keyword matching for categories
  if (lowercaseText.match(/broken|error|bug|not working|issue|problem|crash|failed/i)) {
    category = 'technical-issue';
    priority = 'high';
  } else if (lowercaseText.match(/suggest|suggestion|idea|improve|improvement|recommend|proposal/i)) {
    category = 'policy-suggestion';
    priority = 'medium';
  } else if (lowercaseText.match(/great|good|excellent|amazing|thank|thanks|appreciate|helpful|impressed/i)) {
    category = 'compliment';
    sentiment = 'positive';
  } else if (lowercaseText.match(/urgent|immediately|emergency|asap|critical|quickly/i)) {
    category = 'urgent-matter';
    priority = 'high';
  } else if (lowercaseText.match(/service|experience|staff|employee|officer|wait time|queue|appointment/i)) {
    category = 'service-quality';
  }
  
  // Simple sentiment analysis
  const positiveTerms = ['good', 'great', 'excellent', 'amazing', 'thank', 'thanks', 'appreciate', 'helpful', 'impressed', 'like', 'love'];
  const negativeTerms = ['bad', 'poor', 'terrible', 'awful', 'complaint', 'disappointed', 'dissatisfied', 'unhappy', 'slow', 'rude'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveTerms.forEach(term => {
    if (lowercaseText.includes(term)) positiveCount++;
  });
  
  negativeTerms.forEach(term => {
    if (lowercaseText.includes(term)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
  }
  
  // Extract keywords (simplified version)
  const words = lowercaseText.split(/\s+/);
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'is', 'am', 'are', 'was', 'were'];
  const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 3);
  
  // Create unique keywords array without using Set
  const uniqueWords: string[] = [];
  filteredWords.forEach(word => {
    if (!uniqueWords.includes(word)) {
      uniqueWords.push(word);
    }
  });
  
  const keywords = uniqueWords.slice(0, 5); // Take up to 5 keywords
  
  // Calculate a mock confidence score
  const confidence = 0.7 + (Math.random() * 0.25); // Between 0.7 and 0.95
  
  return {
    category,
    confidence,
    keywords,
    sentiment,
    priority
  };
}

// Function to generate response suggestions (mock implementation)
export async function generateResponseSuggestions(
  feedbackText: string, 
  category: FeedbackCategory
): Promise<string[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Standard responses based on category
  const responses: Record<FeedbackCategory, string[]> = {
    'service-quality': [
      "Thank you for sharing your experience with our service. Your feedback is valuable in helping us improve our service quality.",
      "We appreciate your feedback about our service. Your insights will be shared with the relevant department to enhance our service delivery.",
      "Thank you for taking the time to provide feedback on our service. We are committed to continuously improving our customer experience."
    ],
    'technical-issue': [
      "We apologize for the technical issues you've encountered. Our technical team has been notified and will work on resolving this promptly.",
      "Thank you for reporting this technical issue. We take these matters seriously and have escalated this to our IT department for immediate attention.",
      "We're sorry for the inconvenience caused by this technical problem. Our team is investigating the issue and will implement a fix as soon as possible."
    ],
    'policy-suggestion': [
      "Thank you for your thoughtful suggestion regarding our policies. We value such input and will consider it in our next policy review.",
      "We appreciate your suggestion for improving our policies. Your recommendation has been forwarded to our policy development team for consideration.",
      "Thank you for taking the time to share your policy suggestion. Citizen input is vital to our continuous improvement process."
    ],
    'compliment': [
      "We're delighted to hear about your positive experience. Thank you for your kind words, which will be shared with our team.",
      "Thank you for your complimentary feedback. It's encouraging to know our efforts are making a positive difference in your experience.",
      "We appreciate your positive feedback. Your support motivates us to maintain and enhance the quality of our services."
    ],
    'urgent-matter': [
      "We understand the urgency of your matter and are treating it with priority. A representative will contact you shortly to address this issue.",
      "Thank you for bringing this urgent matter to our attention. We have flagged this for immediate action and will follow up with you directly.",
      "We apologize for any distress caused by this urgent situation. We are taking immediate steps to address this and will keep you informed of our progress."
    ],
    'general-inquiry': [
      "Thank you for your inquiry. We value your interest in our services and will use your feedback to improve our information resources.",
      "We appreciate your inquiry. Your questions help us identify areas where we can provide clearer information to citizens.",
      "Thank you for reaching out to us. Your engagement helps us understand how we can better serve our community's information needs."
    ]
  };
  
  return responses[category];
} 