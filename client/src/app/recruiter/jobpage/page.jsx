"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Input } from "../../../components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import {
  Users,
  Clock,
  Star,
  Mail,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Eye,
  Brain,
  Calendar,
  CheckCircle,
  AlertCircle,
  MapPin,
  Briefcase,
  Phone,
} from "lucide-react"

// Mock applicant data for demo
const mockApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    jobId: "job-1",
    appliedDate: "2024-01-15T10:30:00Z",
    status: "pending",
    resumeUrl: "/resume-sarah.pdf",
    experience: "5 years",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    expectedSalary: "NPR 120,000",
    availability: "2 weeks notice",
    interviewStatus: null,
    score: null,
    coverLetter:
      "I am excited to apply for the Senior Frontend Developer position. With 5 years of experience in React and modern web technologies, I believe I would be a great fit for your team...",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    position: "Full Stack Engineer",
    jobId: "job-2",
    appliedDate: "2024-01-14T14:20:00Z",
    status: "interviewed",
    resumeUrl: "/resume-michael.pdf",
    experience: "3 years",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Python", "MongoDB", "React", "AWS"],
    expectedSalary: "NPR 95,000",
    availability: "Immediate",
    interviewStatus: "completed",
    score: 85,
    transcript:
      "Great technical knowledge, strong problem-solving skills, good communication. Showed solid understanding of full-stack development principles and demonstrated experience with modern frameworks.",
    summary: {
      strengths: [
        "Strong technical foundation",
        "Good communication skills",
        "Problem-solving mindset",
        "Full-stack experience",
      ],
      weaknesses: ["Limited leadership experience", "Could improve system design knowledge"],
      recommendation: "Strong candidate for mid-level position. Recommend moving to next round.",
    },
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    position: "UI/UX Designer",
    jobId: "job-3",
    appliedDate: "2024-01-13T09:15:00Z",
    status: "interviewed",
    resumeUrl: "/resume-emily.pdf",
    experience: "4 years",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
    expectedSalary: "NPR 85,000",
    availability: "1 month notice",
    interviewStatus: "completed",
    score: 92,
    transcript:
      "Excellent design thinking, strong portfolio presentation, great understanding of user experience principles. Demonstrated ability to work collaboratively with development teams.",
    summary: {
      strengths: ["Creative problem solving", "Strong portfolio", "User-centered approach", "Collaborative mindset"],
      weaknesses: [
        "Limited technical implementation knowledge",
        "Could benefit from more data-driven design experience",
      ],
      recommendation: "Excellent candidate. Highly recommend for hire.",
    },
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    position: "Backend Developer",
    jobId: "job-1",
    appliedDate: "2024-01-12T16:45:00Z",
    status: "scheduled",
    resumeUrl: "/resume-david.pdf",
    experience: "6 years",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Docker"],
    expectedSalary: "NPR 110,000",
    availability: "3 weeks notice",
    interviewStatus: "scheduled",
    score: null,
    scheduledTime: "2024-01-16T14:00:00Z",
  },
  {
    id: "5",
    name: "Jessica Park",
    email: "jessica.park@email.com",
    phone: "+1 (555) 567-8901",
    position: "Product Manager",
    jobId: "job-4",
    appliedDate: "2024-01-11T11:30:00Z",
    status: "pending",
    resumeUrl: "/resume-jessica.pdf",
    experience: "7 years",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"],
    expectedSalary: "NPR 130,000",
    availability: "1 month notice",
    interviewStatus: null,
    score: null,
  },
  {
    id: "6",
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 678-9012",
    position: "DevOps Engineer",
    jobId: "job-5",
    appliedDate: "2024-01-10T13:20:00Z",
    status: "interviewed",
    resumeUrl: "/resume-alex.pdf",
    experience: "4 years",
    location: "Denver, CO",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"],
    expectedSalary: "NPR 105,000",
    availability: "2 weeks notice",
    interviewStatus: "completed",
    score: 78,
    transcript:
      "Good technical knowledge of DevOps practices, solid understanding of cloud infrastructure. Some gaps in advanced Kubernetes concepts but overall competent.",
    summary: {
      strengths: ["Solid DevOps foundation", "Cloud experience", "Automation mindset"],
      weaknesses: ["Limited advanced Kubernetes knowledge", "Could improve monitoring/observability skills"],
      recommendation: "Good candidate for junior-mid level DevOps role.",
    },
  },
]

const mockJobs = [
  { id: "job-1", title: "Senior Frontend Developer", department: "Engineering" },
  { id: "job-2", title: "Full Stack Engineer", department: "Engineering" },
  { id: "job-3", title: "UI/UX Designer", department: "Design" },
  { id: "job-4", title: "Product Manager", department: "Product" },
  { id: "job-5", title: "DevOps Engineer", department: "Engineering" },
]

export default function RecruiterDashboard() {
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [isSchedulingInterview, setIsSchedulingInterview] = useState(false)

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter
    const matchesPosition = positionFilter === "all" || applicant.position === positionFilter
    return matchesSearch && matchesStatus && matchesPosition
  })

  const handleScheduleInterview = async (applicantId) => {
    setIsSchedulingInterview(true)
    // Simulate API call to schedule AI interview
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSchedulingInterview(false)

    // Update applicant status (in real app, this would come from backend)
    console.log(`Scheduling AI interview for applicant ${applicantId}`)
    alert("AI Interview scheduled! Email sent to candidate.")
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Pending Review", variant: "secondary", color: "bg-gray-100 text-gray-800" },
      scheduled: { label: "Interview Scheduled", variant: "default", color: "bg-blue-100 text-blue-800" },
      interviewed: { label: "Interviewed", variant: "default", color: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", variant: "destructive", color: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600 bg-green-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const uniquePositions = [...new Set(mockApplicants.map((a) => a.position))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
                <p className="text-gray-600">Manage job applicants and AI interviews</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interviews
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                  <p className="text-3xl font-bold text-gray-900">{mockApplicants.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockApplicants.filter((a) => a.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockApplicants.filter((a) => a.interviewStatus === "completed").length}
                  </p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Score</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round(
                      mockApplicants.filter((a) => a.score).reduce((sum, a) => sum + a.score, 0) /
                        mockApplicants.filter((a) => a.score).length,
                    )}
                  </p>
                </div>
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>Scheduled</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("interviewed")}>Interviewed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Position: {positionFilter === "all" ? "All" : positionFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPositionFilter("all")}>All Positions</DropdownMenuItem>
                  {uniquePositions.map((position) => (
                    <DropdownMenuItem key={position} onClick={() => setPositionFilter(position)}>
                      {position}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Job Applicants ({filteredApplicants.length})</CardTitle>
            <CardDescription>Review and manage candidates who have applied for your open positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {applicant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-sm text-gray-500">{applicant.email}</div>
                            <div className="text-xs text-gray-400">{applicant.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{applicant.position}</div>
                          <div className="text-sm text-gray-500">{applicant.experience} experience</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{formatDate(applicant.appliedDate)}</TableCell>
                      <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                      <TableCell>
                        {applicant.score ? (
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(applicant.score)}`}
                          >
                            {applicant.score}/100
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Not interviewed</span>
                        )}
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
                            <DropdownMenuItem onClick={() => setSelectedApplicant(applicant)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            {applicant.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleScheduleInterview(applicant.id)}
                                disabled={isSchedulingInterview}
                              >
                                <Brain className="h-4 w-4 mr-2" />
                                {isSchedulingInterview ? "Scheduling..." : "Schedule AI Interview"}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
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

        {/* Applicant Detail Modal */}
        {selectedApplicant && (
          <Dialog open={!!selectedApplicant} onOpenChange={() => setSelectedApplicant(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedApplicant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedApplicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-semibold">{selectedApplicant.name}</div>
                    <div className="text-gray-600">{selectedApplicant.position}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedApplicant.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedApplicant.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedApplicant.location}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Application Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Experience:</span>
                        <span className="text-sm ml-2">{selectedApplicant.experience}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Expected Salary:</span>
                        <span className="text-sm ml-2">{selectedApplicant.expectedSalary}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Availability:</span>
                        <span className="text-sm ml-2">{selectedApplicant.availability}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Applied:</span>
                        <span className="text-sm ml-2">{formatDate(selectedApplicant.appliedDate)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplicant.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {selectedApplicant.coverLetter && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cover Letter</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedApplicant.coverLetter}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Interview Results */}
                <div className="space-y-6">
                  {selectedApplicant.score ? (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Brain className="h-5 w-5 text-purple-600" />
                            <span>AI Interview Results</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center mb-4">
                            <div
                              className={`text-4xl font-bold ${selectedApplicant.score >= 85 ? "text-green-600" : selectedApplicant.score >= 70 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              {selectedApplicant.score}/100
                            </div>
                            <p className="text-sm text-gray-500">Overall Score</p>
                          </div>
                        </CardContent>
                      </Card>

                      {selectedApplicant.summary && (
                        <>
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {selectedApplicant.summary.strengths.map((strength, index) => (
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
                                {selectedApplicant.summary.weaknesses.map((weakness, index) => (
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
                                {selectedApplicant.summary.recommendation}
                              </p>
                            </CardContent>
                          </Card>
                        </>
                      )}

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Interview Transcript</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedApplicant.transcript}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Interview Yet</h3>
                        <p className="text-gray-600 mb-4">This candidate hasn't been interviewed by AI yet.</p>
                        {selectedApplicant.status === "pending" && (
                          <Button onClick={() => handleScheduleInterview(selectedApplicant.id)}>
                            <Brain className="h-4 w-4 mr-2" />
                            Schedule AI Interview
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                {selectedApplicant.status === "pending" && (
                  <Button onClick={() => handleScheduleInterview(selectedApplicant.id)}>
                    <Brain className="h-4 w-4 mr-2" />
                    Schedule AI Interview
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
