"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Brain,
  FileText,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Eye,
  Play,
  Calendar,
  TrendingUp,
} from "lucide-react"

// Mock interview data
const completedInterviews = [
  {
    id: "int-1",
    candidateId: "1",
    candidateName: "Michael Chen",
    candidateEmail: "michael.chen@email.com",
    position: "Full Stack Engineer",
    completedDate: "2024-01-15T14:30:00Z",
    duration: "12 minutes",
    score: 85,
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
    transcript:
      "Great technical knowledge, strong problem-solving skills, good communication. Showed solid understanding of full-stack development principles and demonstrated experience with modern frameworks. Candidate was articulate and provided detailed examples from previous work experience.",
    summary: {
      strengths: [
        "Strong technical foundation in full-stack development",
        "Excellent communication skills",
        "Problem-solving mindset with practical examples",
        "Good understanding of modern frameworks",
        "Professional demeanor throughout interview",
      ],
      weaknesses: [
        "Limited leadership experience mentioned",
        "Could improve system design knowledge",
        "Needs more experience with cloud platforms",
      ],
      recommendation:
        "Strong candidate for mid-level position. Recommend moving to next round for technical deep-dive.",
      overallRating: "Highly Recommended",
    },
    questions: [
      {
        question: "Tell me about your experience with React and modern frontend development.",
        answer: "I have 3 years of experience with React, working on several production applications...",
        score: 9,
      },
      {
        question: "How do you approach debugging complex issues in a full-stack application?",
        answer: "I start by reproducing the issue, then use browser dev tools and server logs...",
        score: 8,
      },
      {
        question: "Describe a challenging project you worked on and how you overcame obstacles.",
        answer: "In my previous role, we had a performance issue with our API that was affecting user experience...",
        score: 9,
      },
    ],
  },
  {
    id: "int-2",
    candidateId: "2",
    candidateName: "Emily Rodriguez",
    candidateEmail: "emily.rodriguez@email.com",
    position: "UI/UX Designer",
    completedDate: "2024-01-14T10:15:00Z",
    duration: "15 minutes",
    score: 92,
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
    transcript:
      "Excellent design thinking, strong portfolio presentation, great understanding of user experience principles. Demonstrated ability to work collaboratively with development teams and showed deep knowledge of design systems and user research methodologies.",
    summary: {
      strengths: [
        "Creative problem solving with user-centered approach",
        "Strong portfolio with diverse projects",
        "Excellent understanding of design systems",
        "Great collaboration skills with development teams",
        "Strong knowledge of user research methods",
      ],
      weaknesses: [
        "Limited technical implementation knowledge",
        "Could benefit from more data-driven design experience",
        "Needs exposure to enterprise-level design challenges",
      ],
      recommendation: "Excellent candidate with strong design skills. Highly recommend for hire.",
      overallRating: "Exceptional",
    },
    questions: [
      {
        question: "Walk me through your design process for a new product feature.",
        answer: "I start with user research to understand the problem, then create user personas...",
        score: 10,
      },
      {
        question: "How do you handle feedback and criticism of your designs?",
        answer: "I view feedback as an opportunity to improve. I listen actively and ask clarifying questions...",
        score: 9,
      },
      {
        question: "Describe a time when you had to advocate for a design decision.",
        answer: "In my last project, I had to convince stakeholders about the importance of accessibility...",
        score: 9,
      },
    ],
  },
  {
    id: "int-3",
    candidateId: "3",
    candidateName: "Alex Thompson",
    candidateEmail: "alex.thompson@email.com",
    position: "DevOps Engineer",
    completedDate: "2024-01-13T16:45:00Z",
    duration: "14 minutes",
    score: 78,
    status: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
    transcript:
      "Good technical knowledge of DevOps practices, solid understanding of cloud infrastructure. Some gaps in advanced Kubernetes concepts but overall competent. Shows enthusiasm for learning and has practical experience with CI/CD pipelines.",
    summary: {
      strengths: [
        "Solid DevOps foundation with practical experience",
        "Good understanding of cloud infrastructure",
        "Strong automation mindset",
        "Experience with CI/CD pipelines",
        "Enthusiasm for continuous learning",
      ],
      weaknesses: [
        "Limited advanced Kubernetes knowledge",
        "Could improve monitoring and observability skills",
        "Needs more experience with infrastructure as code",
      ],
      recommendation: "Good candidate for junior-mid level DevOps role with growth potential.",
      overallRating: "Recommended",
    },
    questions: [
      {
        question: "Explain your experience with containerization and orchestration.",
        answer: "I've worked with Docker for containerization and have basic Kubernetes experience...",
        score: 7,
      },
      {
        question: "How do you approach monitoring and alerting in production systems?",
        answer: "I use tools like Prometheus and Grafana for monitoring, and set up alerts based on SLAs...",
        score: 8,
      },
      {
        question: "Describe your experience with CI/CD pipelines.",
        answer: "I've set up Jenkins pipelines and worked with GitLab CI for automated deployments...",
        score: 8,
      },
    ],
  },
]

const upcomingInterviews = [
  {
    id: "int-4",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    position: "Backend Developer",
    scheduledDate: "2024-01-16T14:00:00Z",
    status: "scheduled",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "int-5",
    candidateName: "Jessica Park",
    candidateEmail: "jessica.park@email.com",
    position: "Product Manager",
    scheduledDate: "2024-01-17T10:00:00Z",
    status: "scheduled",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AllInterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInterviews = completedInterviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600 bg-green-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getScoreBadge = (score) => {
    if (score >= 85) return "bg-green-100 text-green-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getRatingColor = (rating) => {
    switch (rating) {
      case "Exceptional":
        return "text-green-700 bg-green-100"
      case "Highly Recommended":
        return "text-blue-700 bg-blue-100"
      case "Recommended":
        return "text-yellow-700 bg-yellow-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const averageScore = Math.round(
    completedInterviews.reduce((sum, interview) => sum + interview.score, 0) / completedInterviews.length,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Interviews</h1>
          <p className="text-gray-600 mt-1">View and analyze all AI interview results</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                <p className="text-3xl font-bold text-gray-900">
                  {completedInterviews.length + upcomingInterviews.length}
                </p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completedInterviews.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">{averageScore}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingInterviews.length}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="completed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="completed">Completed Interviews</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Completed Interviews Tab */}
        <TabsContent value="completed" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by candidate name or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Score: {statusFilter === "all" ? "All" : statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Scores</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("high")}>High (85+)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("medium")}>Medium (70-84)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("low")}>Low (&lt;70)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Completed Interviews Table */}
          <Card>
            <CardHeader>
              <CardTitle>Completed Interviews ({filteredInterviews.length})</CardTitle>
              <CardDescription>AI interview results and candidate assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterviews.map((interview) => (
                      <TableRow key={interview.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={interview.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {interview.candidateName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{interview.candidateName}</div>
                              <div className="text-sm text-gray-500">{interview.candidateEmail}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{interview.position}</div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{formatDate(interview.completedDate)}</TableCell>
                        <TableCell className="text-sm text-gray-600">{interview.duration}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getScoreBadge(interview.score)}`}
                          >
                            {interview.score}/100
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRatingColor(interview.summary.overallRating)}>
                            {interview.summary.overallRating}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedInterview(interview)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                View Transcript
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Play className="h-4 w-4 mr-2" />
                                Play Recording
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Interviews Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews ({upcomingInterviews.length})</CardTitle>
              <CardDescription>Scheduled AI interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={interview.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {interview.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{interview.candidateName}</div>
                        <div className="text-sm text-gray-500">{interview.position}</div>
                        <div className="text-sm text-gray-500">{interview.candidateEmail}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{formatDate(interview.scheduledDate)}</div>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Scheduled
                      </Badge>
                    </div>
                  </div>
                ))}

                {upcomingInterviews.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No upcoming interviews scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Interview scores breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Exceptional (85+)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "33%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Good (70-84)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "67%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">2</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Needs Improvement (&lt;70)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Insights</CardTitle>
                <CardDescription>Key metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Interview Duration</span>
                    <span className="text-sm font-semibold">13.7 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completion Rate</span>
                    <span className="text-sm font-semibold">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Most Common Position</span>
                    <span className="text-sm font-semibold">Full Stack Engineer</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Recommendation Rate</span>
                    <span className="text-sm font-semibold">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Interview performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Showing interview scores and trends over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Interview Detail Modal */}
      {selectedInterview && (
        <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedInterview.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedInterview.candidateName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-semibold">{selectedInterview.candidateName}</div>
                  <div className="text-gray-600">{selectedInterview.position}</div>
                  <div className="text-sm text-gray-500">
                    Completed on {formatDate(selectedInterview.completedDate)}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Score and Summary */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold ${selectedInterview.score >= 85 ? "text-green-600" : selectedInterview.score >= 70 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {selectedInterview.score}/100
                      </div>
                      <Badge className={`mt-2 ${getRatingColor(selectedInterview.summary.overallRating)}`}>
                        {selectedInterview.summary.overallRating}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedInterview.summary.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedInterview.summary.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedInterview.summary.recommendation}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Questions and Transcript */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Questions & Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {selectedInterview.questions.map((qa, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">
                              Q{index + 1}: {qa.question}
                            </h4>
                            <Badge className={getScoreBadge(qa.score * 10)}>{qa.score}/10</Badge>
                          </div>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Full Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedInterview.transcript}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Play Recording
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Move to Next Round
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
