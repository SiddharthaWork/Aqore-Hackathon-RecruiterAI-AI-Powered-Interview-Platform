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
  CheckCircle,
  MapPin,
  Briefcase,
  Phone,
  Plus,
} from "lucide-react"

// Mock applicant data
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
    status: "reviewed",
    resumeUrl: "/resume-michael.pdf",
    experience: "3 years",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Python", "MongoDB", "React", "AWS"],
    expectedSalary: "NPR 95,000",
    availability: "Immediate",
    interviewStatus: null,
    score: null,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    position: "UI/UX Designer",
    jobId: "job-3",
    appliedDate: "2024-01-13T09:15:00Z",
    status: "shortlisted",
    resumeUrl: "/resume-emily.pdf",
    experience: "4 years",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
    expectedSalary: "NPR 85,000",
    availability: "1 month notice",
    interviewStatus: null,
    score: null,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    position: "Backend Developer",
    jobId: "job-1",
    appliedDate: "2024-01-12T16:45:00Z",
    status: "pending",
    resumeUrl: "/resume-david.pdf",
    experience: "6 years",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Java", "Spring Boot", "PostgreSQL", "AWS", "Docker"],
    expectedSalary: "NPR 110,000",
    availability: "3 weeks notice",
    interviewStatus: null,
    score: null,
  },
  {
    id: "5",
    name: "Jessica Park",
    email: "jessica.park@email.com",
    phone: "+1 (555) 567-8901",
    position: "Product Manager",
    jobId: "job-4",
    appliedDate: "2024-01-11T11:30:00Z",
    status: "reviewed",
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
    status: "shortlisted",
    resumeUrl: "/resume-alex.pdf",
    experience: "4 years",
    location: "Denver, CO",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"],
    expectedSalary: "NPR 105,000",
    availability: "2 weeks notice",
    interviewStatus: null,
    score: null,
  },
]

export default function ApplicantsPage() {
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter
    const matchesPosition = positionFilter === "all" || applicant.position === positionFilter
    return matchesSearch && matchesStatus && matchesPosition
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Pending Review", color: "bg-gray-100 text-gray-800" },
      reviewed: { label: "Reviewed", color: "bg-blue-100 text-blue-800" },
      shortlisted: { label: "Shortlisted", color: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <Badge className={config.color}>{config.label}</Badge>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applicants</h1>
          <p className="text-gray-600 mt-1">Review and manage candidates who have applied for your positions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockApplicants.filter((a) => a.status === "shortlisted").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-gray-900">4</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
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
                <DropdownMenuItem onClick={() => setStatusFilter("reviewed")}>Reviewed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("shortlisted")}>Shortlisted</DropdownMenuItem>
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
          <CardTitle>All Applicants ({filteredApplicants.length})</CardTitle>
          <CardDescription>Complete list of candidates who have applied for your open positions</CardDescription>
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
                  <TableHead>Experience</TableHead>
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
                        <div className="text-sm text-gray-500">{applicant.expectedSalary}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{formatDate(applicant.appliedDate)}</TableCell>
                    <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{applicant.experience}</TableCell>
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
                          <DropdownMenuItem>
                            <Brain className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </DropdownMenuItem>
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
                    <div>
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <span className="text-sm ml-2">{getStatusBadge(selectedApplicant.status)}</span>
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
              </div>

              {/* Right Column - Cover Letter */}
              <div className="space-y-6">
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

                <Card>
                  <CardContent className="p-8 text-center">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for AI Interview</h3>
                    <p className="text-gray-600 mb-4">This candidate is ready to be scheduled for an AI interview.</p>
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Schedule AI Interview
                    </Button>
                  </CardContent>
                </Card>
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
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Schedule AI Interview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
