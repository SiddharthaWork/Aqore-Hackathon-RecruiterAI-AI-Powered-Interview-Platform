"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Users,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Building,
  Star,
  CheckCircle,
  Mail,
  Phone,
  Download,
  Brain,
  TrendingUp,
  Copy,
  Share,
  Pause,
  Play,
} from "lucide-react"

// Mock job posts data
const mockJobPosts = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "NPR 120,000 - NPR 150,000",
    experience: "5+ years",
    postedDate: "2024-01-10T09:00:00Z",
    status: "active",
    applicantCount: 12,
    viewCount: 245,
    description:
      "We are looking for a Senior Frontend Developer to join our growing engineering team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend technologies.",
    requirements: [
      "5+ years of experience with React and JavaScript",
      "Strong knowledge of TypeScript",
      "Experience with modern CSS frameworks (Tailwind, Styled Components)",
      "Familiarity with state management (Redux, Zustand)",
      "Experience with testing frameworks (Jest, React Testing Library)",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "job-2",
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    salary: "NPR 90,000 - NPR 120,000",
    experience: "3+ years",
    postedDate: "2024-01-08T14:30:00Z",
    status: "active",
    applicantCount: 8,
    viewCount: 189,
    description:
      "Join our team as a Full Stack Engineer and work on both frontend and backend systems. You'll be building scalable web applications and APIs using modern technologies.",
    requirements: [
      "3+ years of full-stack development experience",
      "Proficiency in Node.js and React",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Knowledge of cloud platforms (AWS, GCP)",
      "Understanding of RESTful APIs and GraphQL",
    ],
    benefits: [
      "Competitive salary",
      "Health and wellness benefits",
      "Remote work options",
      "Learning and development opportunities",
      "Team building events",
    ],
    skills: ["Node.js", "React", "PostgreSQL", "AWS", "GraphQL"],
  },
  {
    id: "job-3",
    title: "UI/UX Designer",
    department: "Design",
    location: "Austin, TX",
    type: "Full-time",
    salary: "NPR 80,000 - NPR 100,000",
    experience: "4+ years",
    postedDate: "2024-01-05T11:15:00Z",
    status: "active",
    applicantCount: 15,
    viewCount: 312,
    description:
      "We're seeking a talented UI/UX Designer to create intuitive and beautiful user experiences. You'll work closely with product managers and engineers to design user-centered solutions.",
    requirements: [
      "4+ years of UI/UX design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio showcasing design process",
      "Experience with user research and testing",
      "Knowledge of design systems and accessibility",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Creative freedom and autonomy",
      "Latest design tools and equipment",
      "Conference and workshop attendance",
      "Collaborative work environment",
    ],
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
  },
  {
    id: "job-4",
    title: "Product Manager",
    department: "Product",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "NPR 130,000 - NPR 160,000",
    experience: "6+ years",
    postedDate: "2024-01-03T16:45:00Z",
    status: "paused",
    applicantCount: 6,
    viewCount: 156,
    description:
      "Lead product strategy and execution for our core platform. You'll work with cross-functional teams to define product roadmaps and drive feature development.",
    requirements: [
      "6+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Experience with agile development methodologies",
      "Data-driven decision making approach",
      "Excellent communication and leadership skills",
    ],
    benefits: [
      "Competitive compensation package",
      "Equity participation",
      "Comprehensive health benefits",
      "Flexible work schedule",
      "Professional growth opportunities",
    ],
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"],
  },
  {
    id: "job-5",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "NPR 110,000 - NPR 140,000",
    experience: "4+ years",
    postedDate: "2024-01-01T10:20:00Z",
    status: "active",
    applicantCount: 4,
    viewCount: 98,
    description:
      "Join our infrastructure team as a DevOps Engineer. You'll be responsible for maintaining and scaling our cloud infrastructure, implementing CI/CD pipelines, and ensuring system reliability.",
    requirements: [
      "4+ years of DevOps/Infrastructure experience",
      "Strong knowledge of AWS or GCP",
      "Experience with containerization (Docker, Kubernetes)",
      "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
      "Knowledge of monitoring and logging tools",
    ],
    benefits: [
      "Competitive salary and stock options",
      "Comprehensive health coverage",
      "Remote work flexibility",
      "Technical conference budget",
      "On-call compensation",
    ],
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
  },
]

// Mock applicants data for specific jobs
const mockJobApplicants = {
  "job-1": [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      appliedDate: "2024-01-15T10:30:00Z",
      status: "pending",
      experience: "5 years",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
      expectedSalary: "NPR 120,000",
      resumeUrl: "/resume-sarah.pdf",
      coverLetter: "I am excited to apply for the Senior Frontend Developer position...",
      score: null,
      interviewStatus: null,
    },
    {
      id: "2",
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 456-7890",
      appliedDate: "2024-01-12T16:45:00Z",
      status: "interviewed",
      experience: "6 years",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "Vue.js", "TypeScript", "GraphQL", "AWS"],
      expectedSalary: "NPR 135,000",
      resumeUrl: "/resume-david.pdf",
      score: 88,
      interviewStatus: "completed",
    },
  ],
  "job-2": [
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      appliedDate: "2024-01-14T14:20:00Z",
      status: "shortlisted",
      experience: "3 years",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Node.js", "Python", "MongoDB", "React", "AWS"],
      expectedSalary: "NPR 95,000",
      resumeUrl: "/resume-michael.pdf",
      score: 85,
      interviewStatus: "completed",
    },
  ],
  "job-3": [
    {
      id: "4",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      appliedDate: "2024-01-13T09:15:00Z",
      status: "interviewed",
      experience: "4 years",
      location: "Austin, TX",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      expectedSalary: "NPR 85,000",
      resumeUrl: "/resume-emily.pdf",
      score: 92,
      interviewStatus: "completed",
    },
  ],
}

export default function JobPostsPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreatingJob, setIsCreatingJob] = useState(false)
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salary: "",
    experience: "",
    description: "",
    requirements: "",
    benefits: "",
    skills: "",
  })

  const filteredJobs = mockJobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      paused: { label: "Paused", color: "bg-yellow-100 text-yellow-800" },
      closed: { label: "Closed", color: "bg-red-100 text-red-800" },
      draft: { label: "Draft", color: "bg-gray-100 text-gray-800" },
    }
    const config = statusConfig[status] || statusConfig.active
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getApplicantStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Pending Review", color: "bg-gray-100 text-gray-800" },
      reviewed: { label: "Reviewed", color: "bg-blue-100 text-blue-800" },
      shortlisted: { label: "Shortlisted", color: "bg-green-100 text-green-800" },
      interviewed: { label: "Interviewed", color: "bg-purple-100 text-purple-800" },
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

  const handleCreateJob = async () => {
    setIsCreatingJob(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsCreatingJob(false)
    // Reset form and close modal
    setNewJobForm({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      salary: "",
      experience: "",
      description: "",
      requirements: "",
      benefits: "",
      skills: "",
    })
    alert("Job posted successfully!")
  }

  const totalApplicants = mockJobPosts.reduce((sum, job) => sum + job.applicantCount, 0)
  const activeJobs = mockJobPosts.filter((job) => job.status === "active").length
  const totalViews = mockJobPosts.reduce((sum, job) => sum + job.viewCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Posts</h1>
          <p className="text-gray-600 mt-1">Manage your job postings and view applicant details</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Post</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJobForm.title}
                    onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newJobForm.department}
                    onValueChange={(value) => setNewJobForm({ ...newJobForm, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select
                    value={newJobForm.type}
                    onValueChange={(value) => setNewJobForm({ ...newJobForm, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={newJobForm.salary}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                    placeholder="e.g. NPR 120,000 - NPR 150,000"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience Required</Label>
                  <Input
                    id="experience"
                    value={newJobForm.experience}
                    onChange={(e) => setNewJobForm({ ...newJobForm, experience: e.target.value })}
                    placeholder="e.g. 5+ years"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={newJobForm.description}
                    onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                    placeholder="Describe the role and responsibilities..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={newJobForm.requirements}
                    onChange={(e) => setNewJobForm({ ...newJobForm, requirements: e.target.value })}
                    placeholder="List the required skills and qualifications..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    value={newJobForm.benefits}
                    onChange={(e) => setNewJobForm({ ...newJobForm, benefits: e.target.value })}
                    placeholder="List the benefits and perks..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input
                    id="skills"
                    value={newJobForm.skills}
                    onChange={(e) => setNewJobForm({ ...newJobForm, skills: e.target.value })}
                    placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleCreateJob} disabled={isCreatingJob}>
                {isCreatingJob ? "Publishing..." : "Publish Job"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{mockJobPosts.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{activeJobs}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900">{totalApplicants}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {!selectedJob ? (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs by title or department..."
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
                    <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("paused")}>Paused</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("closed")}>Closed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                      </CardDescription>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Salary:</span>
                        <div className="font-medium">{job.salary}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Experience:</span>
                        <div className="font-medium">{job.experience}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.applicantCount} applicants
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={() => setSelectedJob(job)} className="flex-1" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Share Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {job.status === "active" ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause Job
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Activate Job
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Job Details View */
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setSelectedJob(null)}>
              ← Back to Jobs
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
              <p className="text-gray-600">
                {selectedJob.department} • {selectedJob.location}
              </p>
            </div>
          </div>

          <Tabs defaultValue="applicants" className="space-y-6">
            <TabsList>
              <TabsTrigger value="applicants">
                Applicants ({mockJobApplicants[selectedJob.id]?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Applicants Tab */}
            <TabsContent value="applicants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applicants</CardTitle>
                  <CardDescription>Candidates who have applied for {selectedJob.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockJobApplicants[selectedJob.id]?.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>AI Score</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockJobApplicants[selectedJob.id].map((applicant) => (
                          <TableRow key={applicant.id}>
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
                                  <div className="font-medium">{applicant.name}</div>
                                  <div className="text-sm text-gray-500">{applicant.email}</div>
                                  <div className="text-xs text-gray-400">{applicant.location}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(applicant.appliedDate)}</TableCell>
                            <TableCell>{getApplicantStatusBadge(applicant.status)}</TableCell>
                            <TableCell>
                              {applicant.score ? (
                                <Badge
                                  className={
                                    applicant.score >= 85
                                      ? "bg-green-100 text-green-800"
                                      : applicant.score >= 70
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {applicant.score}/100
                                </Badge>
                              ) : (
                                <span className="text-gray-400">Not interviewed</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
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
                  ) : (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants yet</h3>
                      <p className="text-gray-500">
                        Applications will appear here once candidates apply for this position.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits & Perks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Department:</span>
                        <div className="text-sm mt-1">{selectedJob.department}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Location:</span>
                        <div className="text-sm mt-1">{selectedJob.location}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Job Type:</span>
                        <div className="text-sm mt-1">{selectedJob.type}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Salary:</span>
                        <div className="text-sm mt-1">{selectedJob.salary}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Experience:</span>
                        <div className="text-sm mt-1">{selectedJob.experience}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Posted:</span>
                        <div className="text-sm mt-1">{formatDate(selectedJob.postedDate)}</div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <div className="mt-1">{getStatusBadge(selectedJob.status)}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Required Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Applications:</span>
                        <span className="text-sm font-medium">{selectedJob.applicantCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Views:</span>
                        <span className="text-sm font-medium">{selectedJob.viewCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Conversion:</span>
                        <span className="text-sm font-medium">
                          {((selectedJob.applicantCount / selectedJob.viewCount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Funnel</CardTitle>
                    <CardDescription>Track how candidates progress through your hiring process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Job Views</span>
                        <span className="text-sm font-semibold">{selectedJob.viewCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Applications</span>
                        <span className="text-sm font-semibold">{selectedJob.applicantCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Interviews</span>
                        <span className="text-sm font-semibold">
                          {mockJobApplicants[selectedJob.id]?.filter((a) => a.interviewStatus === "completed").length ||
                            0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Key performance indicators for this job posting</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Analytics chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

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
                  <div className="text-gray-600">Applied for {selectedJob.title}</div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <span className="text-sm font-medium text-gray-600">Applied:</span>
                      <span className="text-sm ml-2">{formatDate(selectedApplicant.appliedDate)}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <span className="text-sm ml-2">{getApplicantStatusBadge(selectedApplicant.status)}</span>
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

              <div className="space-y-6">
                {selectedApplicant.score ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Interview Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold ${selectedApplicant.score >= 85 ? "text-green-600" : selectedApplicant.score >= 70 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {selectedApplicant.score}/100
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Overall Interview Score</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Interview Yet</h3>
                      <p className="text-gray-600 mb-4">This candidate hasn't been interviewed by AI yet.</p>
                      <Button>
                        <Brain className="h-4 w-4 mr-2" />
                        Schedule AI Interview
                      </Button>
                    </CardContent>
                  </Card>
                )}

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
                Schedule Interview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
