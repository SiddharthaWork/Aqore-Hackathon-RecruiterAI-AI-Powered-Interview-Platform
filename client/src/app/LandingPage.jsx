"use client";
import {
    ArrowRight,
    Clock,
    DollarSign,
    Users,
    Brain,
    Calendar,
    MessageSquare,
    BarChart3,
    CheckCircle,
    Star,
  } from "lucide-react"
  import { Card, CardContent } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { useRouter } from "next/navigation";
  
  const LandingPage = () => {

    const router = useRouter();
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AI Recruiter</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Benefits
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How It Works
                </a>
                <Button variant="outline" className="mr-2 bg-transparent" onClick={() => router.push("/login")}>
                  Sign In
                </Button>
                <Button onClick={() => router.push("/login")}>Get Started</Button>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Revolutionize Your Hiring with <span className="text-blue-600">AI-Powered Interviews</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Automate candidate interviews, reduce hiring time by 75%, and find the perfect candidates with intelligent
                AI assessment. Transform your recruitment process today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-3">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-12">
                <img
                  src="/hero.png"
                  alt="AI Recruiter Dashboard"
                  className="mx-auto rounded-lg shadow-2xl border border-gray-200"
                />
              </div>
            </div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
                <div className="text-gray-600">Faster Hiring Process</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                <div className="text-gray-600">Cost Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Candidate Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI recruiter combines cutting-edge technology with human insight to deliver exceptional hiring
                results.
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <Calendar className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Scheduling</h3>
                  <p className="text-gray-600">
                    Seamlessly coordinate interviews across time zones with intelligent calendar integration and automated
                    reminders.
                  </p>
                </CardContent>
              </Card>
  
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Question Generation</h3>
                  <p className="text-gray-600">
                    AI generates role-specific questions tailored to job requirements, ensuring comprehensive candidate
                    evaluation.
                  </p>
                </CardContent>
              </Card>
  
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Assessment</h3>
                  <p className="text-gray-600">
                    Advanced AI analyzes responses, body language, and communication skills to provide detailed candidate
                    insights.
                  </p>
                </CardContent>
              </Card>
  
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Bias-Free Screening</h3>
                  <p className="text-gray-600">
                    Eliminate unconscious bias with objective, data-driven candidate evaluation based on skills and
                    qualifications.
                  </p>
                </CardContent>
              </Card>
  
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <Clock className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Conduct interviews anytime, anywhere. Our AI never sleeps, ensuring global candidate accessibility.
                  </p>
                </CardContent>
              </Card>
  
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <Star className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Candidate Experience</h3>
                  <p className="text-gray-600">
                    Provide a modern, engaging interview experience that reflects positively on your employer brand.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  
        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Transform Your Hiring Process</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Save 75% of Your Time</h3>
                      <p className="text-gray-600">
                        Automate initial screenings and focus your time on the most promising candidates.
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-start space-x-4">
                    <DollarSign className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reduce Costs by 90%</h3>
                      <p className="text-gray-600">
                        Eliminate expensive recruitment agencies and reduce time-to-hire significantly.
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-start space-x-4">
                    <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Improve Quality of Hires</h3>
                      <p className="text-gray-600">
                        Data-driven insights ensure you select candidates who truly fit your requirements.
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Scale Effortlessly</h3>
                      <p className="text-gray-600">
                        Handle hundreds of interviews simultaneously without compromising quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div>
                <img
                  src="/footer.png"
                  alt="Benefits of AI Recruiting"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
  
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started in minutes with our simple three-step process
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Setup Your Requirements</h3>
                <p className="text-gray-600">
                  Define job roles, required skills, and interview preferences in our intuitive dashboard.
                </p>
              </div>
  
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Conducts Interviews</h3>
                <p className="text-gray-600">
                  Our AI automatically schedules and conducts personalized interviews with your candidates.
                </p>
              </div>
  
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Review & Hire</h3>
                <p className="text-gray-600">
                  Get detailed candidate reports and make informed hiring decisions with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-20 bg-blue-600 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Hiring?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of companies already using AI to hire better, faster, and smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold">AI Recruiter</span>
                </div>
                <p className="text-gray-400">Revolutionizing recruitment with intelligent AI-powered interviews.</p>
              </div>
  
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 AI Recruiter. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
  
  export default LandingPage