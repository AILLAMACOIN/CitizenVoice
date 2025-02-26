import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Brain, BarChart, Bell, Shield, ArrowRight, CheckCircle, Users, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gold/10 via-white to-white">
        <div className="absolute inset-0 grid grid-cols-3 -space-x-52 opacity-10 md:space-x-32 md:opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-gold via-transparent to-transparent"></div>
          <div className="h-full w-full bg-gradient-to-r from-gold via-transparent to-transparent"></div>
          <div className="h-full w-full bg-gradient-to-l from-gold via-transparent to-transparent"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
                Citizen Voice: Empowering Real-Time Public Feedback
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
                Harnessing AI to transform public sentiment into actionable insights—building better services for
                everyone.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-gold text-white hover:bg-gold/90" size="lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-gold mb-2">12K+</div>
              <div className="text-gray-600">Monthly Feedback</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-gold mb-2">95%</div>
              <div className="text-gray-600">Resolution Rate</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-gold mb-2">15+</div>
              <div className="text-gray-600">Government Entities</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-gold mb-2">4.8/5</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Key Features</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover how GovPulse transforms government-citizen communication with cutting-edge technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-gold" />}
              title="AI-Powered Insights"
              description="Advanced sentiment analysis and topic extraction powered by state-of-the-art AI models."
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-gold" />}
              title="Real-Time Analytics"
              description="Interactive dashboards with live updates and comprehensive data visualization."
            />
            <FeatureCard
              icon={<Bell className="h-10 w-10 text-gold" />}
              title="Smart Notifications"
              description="Intelligent alert system for urgent issues and emerging trends requiring attention."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-gold" />}
              title="Enterprise Security"
              description="Bank-grade encryption and compliance with international security standards."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Why Choose GovPulse?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Leading government entities trust GovPulse to enhance their citizen engagement
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard
              icon={<CheckCircle className="h-8 w-8 text-green-500" />}
              title="Improved Efficiency"
              description="Reduce response times by 60% with automated feedback processing"
            />
            <BenefitCard
              icon={<Users className="h-8 w-8 text-blue-500" />}
              title="Enhanced Engagement"
              description="Increase citizen participation by 85% through accessible feedback channels"
            />
            <BenefitCard
              icon={<Award className="h-8 w-8 text-purple-500" />}
              title="Better Decisions"
              description="Make data-driven policy decisions based on real-time citizen feedback"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold/10 to-gold/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Citizen Feedback?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading government entities in revolutionizing public service delivery
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-gold text-white hover:bg-gold/90" size="lg">
              Request Demo
            </Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gold mb-4">Citizen Voice</h3>
              <p className="text-sm text-gray-600">
                Transforming government-citizen communication through AI-powered insights
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Features</li>
                <li>Solutions</li>
                <li>Security</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Documentation</li>
                <li>Case Studies</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 Citizen Voice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
        <div className="p-3 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function BenefitCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
} 