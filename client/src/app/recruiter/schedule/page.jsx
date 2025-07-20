"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Clock, Brain, Mail, User, Briefcase, Send, CheckCircle, Plus, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const INITIAL_CANDIDATES = [
  {
    id: "1",
    name: "Hari Shrestha",
    email: "",
    position: "Senior Frontend Developer",
    jobDescription: "We are looking for a skilled Frontend Developer with React experience.",
    appliedDate: "2024-01-15T10:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "TypeScript", "Next.js"],
    experience: "5 years",
    status: "ready",
    resumeFilename: "resume_1752915794473.pdf",
  },
  {
    id: "2",
    name: "Ram Shrestha",
    email: "siddharthashresthasir@gmail.com",
    position: "Full Stack Engineer",
    jobDescription: "We are looking for a skilled Full Stack Engineer with Node.js experience.",
    appliedDate: "2024-01-14T14:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Python", "MongoDB"],
    experience: "3 years",
    status: "ready",
    resumeFilename: "resume_1752915794473.pdf",
  },
  {
    id: "3",
    name: "Siddhartha Shrestha",
    email: "siddharthashresthasir@gmail.com",
    position: "React Developer",
    jobDescription: "We are looking for a skilled React Developer with Node.js experience.",
    appliedDate: "2024-01-13T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "Node.js", "MongoDB"],
    experience: "3 years",
    status: "ready",
    resumeFilename: "resume_1752915794473.pdf",
  }
];

export default function ScheduleInterviewPage() {
  const [candidatesForInterview, setCandidatesForInterview] = useState([]);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [isScheduling, setIsScheduling] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [interviewForm, setInterviewForm] = useState({
    jobDescription: "",
    date: null,
    time: "",
    duration: "3",
    categories: []
  })
  const [userId, setUserId] = useState("")
  const [generatedQuestions, setGeneratedQuestions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generateError, setGenerateError] = useState("")
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editedAllQuestions, setEditedAllQuestions] = useState('');

  const router = useRouter();

  const handleSaveAll = () => {
    const newQuestions = editedAllQuestions.split('\n');
    setGeneratedQuestions(newQuestions);
    setIsEditingAll(false);
  };

  // get userid from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  useEffect(() => {
    const storedInterviews = localStorage.getItem('scheduledInterviews');
    if (storedInterviews) {
      setScheduledInterviews(JSON.parse(storedInterviews));
    }
  }, []);

  useEffect(() => {
    if (scheduledInterviews.length > 0) {
      localStorage.setItem('scheduledInterviews', JSON.stringify(scheduledInterviews));
    }
  }, [scheduledInterviews]);

  useEffect(() => {
    const filteredCandidates = INITIAL_CANDIDATES.filter(candidate => 
      !scheduledInterviews.some(interview => interview.candidateId === candidate.id)
    );
    setCandidatesForInterview(filteredCandidates);
  }, [scheduledInterviews]);

  const handleScheduleInterview = async (candidate) => {
    setIsScheduling(true);
    
    try {
      // Send the interview data to the server
      const response = await fetch('http://localhost:4000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: candidate.id,
          userEmail: "siddharthashresthasir@gmail.com",
          jobDescription: interviewForm.jobDescription,
          date: interviewForm.date,
          time: interviewForm.time,
          duration: interviewForm.duration,
          categories: interviewForm.categories,
          questions: generatedQuestions,
          link:"http://localhost:3000/interviewagent/" + candidate.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save questions');
      }

      const result = await response.json();
      console.log('Questions saved:', result);

      // Show success message
      toast.success(`AI Interview scheduled for ${candidate.name}! The candidate has been notified.`)

      // Check that date and time are set
      if (!interviewForm.date || !interviewForm.time) {
        toast.error("Please select both date and time");
        return;
      }

      // Create new scheduled interview object
      const newScheduledInterview = {
        id: `int-${Date.now()}`,
        candidateId: candidate.id,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        position: candidate.position,
        scheduledDate: interviewForm.date,
        status: "scheduled",
        interviewLink: `/interview/${candidate.id}-${Date.now()}`,
        avatar: candidate.avatar,
      };

      // Update state: remove candidate from candidatesForInterview and add to scheduledInterviews
      setCandidatesForInterview(prev => prev.filter(c => c.id !== candidate.id));
      setScheduledInterviews(prev => [...prev, newScheduledInterview]);

    } catch (error) {
      console.error('Error saving questions:', error);
      toast.error('Failed to save questions. Please try again.');
    } finally {
      setIsScheduling(false);
    }
  }

  const generateQuestions = async (candidate) => {
    if (!interviewForm.jobDescription) {
      toast.error("Please enter a job description first")
      return
    }

    if (!candidate.resumeFilename) {
      setGenerateError("No resume found for this candidate")
      return
    }

    setIsGenerating(true)
    setGenerateError("")

    try {
      const questionCount = Math.min(20, Math.max(5, Math.floor(interviewForm.duration / 5)));
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeFilename: candidate.resumeFilename,
          jobDescription: interviewForm.jobDescription,
          categories: interviewForm.categories,
          questionCount,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to generate questions")
      }

      const data = await res.json()
      setGeneratedQuestions(data.questions || [])
    } catch (err) {
      setGenerateError(err.message)
      console.error("Error generating questions:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEditQuestion = (id, text) => {
    setEditingQuestionId(id);
    setEditedQuestion(text);
  };

  const handleSaveQuestion = (id) => {
    const updatedQuestions = generatedQuestions.map(q => 
      q.id === id ? { ...q, question: editedQuestion } : q
    );
    setGeneratedQuestions(updatedQuestions);
    setEditingQuestionId(null);
  };

  const filteredCandidates = candidatesForInterview.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule AI Interviews</h1>
          <p className="text-gray-600 mt-1">Set up automated AI interviews for qualified candidates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Bulk Schedule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready for Interview</p>
                <p className="text-3xl font-bold text-gray-900">{candidatesForInterview.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled Today</p>
                <p className="text-3xl font-bold text-gray-900">{scheduledInterviews.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Setup Time</p>
                <p className="text-3xl font-bold text-gray-900">2m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidates Ready for Interview */}
        <ScrollArea className="h-[calc(100vh-20rem)]">
        <Card>
          <CardHeader>
            <CardTitle>Candidates Ready for Interview</CardTitle>
            <CardDescription>Select candidates to schedule AI interviews</CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.position}</div>
                      <div className="flex space-x-1 mt-1">
                        {candidate.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => {
                        setInterviewForm(prev => ({
                          ...prev,
                          jobDescription: candidate.jobDescription || ''
                        }));
                      }}>
                        <Brain className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Schedule AI Interview</DialogTitle>
                        <DialogDescription>Schedule an interview for {candidate.name}</DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="jobDescription" className="text-right">
                            Job Description
                          </Label>
                          <Textarea
                            id="jobDescription"
                            className="col-span-3 min-h-[150px]"
                            value={interviewForm.jobDescription}
                            onChange={(e) => setInterviewForm({ ...interviewForm, jobDescription: e.target.value })}
                            placeholder="Enter job description..."
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date & Time
                          </Label>
                          <div className="col-span-3 flex gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {interviewForm.date ? format(interviewForm.date, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={interviewForm.date}
                                  onSelect={(date) => setInterviewForm({...interviewForm, date})}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <Input
                              type="time"
                              value={interviewForm.time}
                              onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                              className="w-auto"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="duration" className="text-right">
                            Duration
                          </Label>
                          <Input
                            id="duration"
                            type="text"
                            className="col-span-3"
                            value={interviewForm.duration}
                            onChange={(e) => setInterviewForm({...interviewForm, duration: e.target.value})}
                            placeholder="Duration in minutes"
                          />
                        </div>
                        
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Categories</Label>
                          <div className="col-span-3">
                            <Select
                              onValueChange={(value) =>
                                setInterviewForm({ ...interviewForm, categories: [value] })
                              }
                              value={interviewForm.categories[0] || ""}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="behavioral">Behavioral</SelectItem>
                                <SelectItem value="other">Coding</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* candidate resume */}
                        <div className="mt-4">
                          <h1 className="font-semibold text-sm">View Applicant Resume</h1>
                          <Button variant="outline" className="mt-2" onClick={() => window.open('/Siddhartha_Shrestha-Resume.pdf', '_blank')}>View Resume</Button>
                        </div>
                        
                        
                        <div className="mt-4">
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              onClick={() => generateQuestions(candidate)}
                              disabled={isGenerating}
                            >
                              {isGenerating ? "Generating..." : "Generate Questions"}
                            </Button>
                            
                            {generateError && (
                              <div className="text-red-500">{generateError}</div>
                            )}
                          </div>
                          
                          {generatedQuestions.length > 0 && (
                            <div className="mt-4">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium">Generated Questions:</h3>
                                {!isEditingAll && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setEditedAllQuestions(generatedQuestions.join('\n'));
                                      setIsEditingAll(true);
                                    }}
                                  >
                                    Edit All
                                  </Button>
                                )}
                              </div>
                              {isEditingAll ? (
                                <div className="mt-2">
                                  <Textarea
                                    value={editedAllQuestions}
                                    onChange={(e) => setEditedAllQuestions(e.target.value)}
                                    className="min-h-[150px]"
                                  />
                                  <div className="flex justify-end mt-2">
                                    <Button variant="outline" onClick={() => setIsEditingAll(false)} className="mr-2">
                                      Cancel
                                    </Button>
                                    <Button onClick={handleSaveAll}>
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-2 bg-gray-100 p-4 rounded whitespace-pre-line">
                                  {generatedQuestions.join('\n')}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          type="submit"
                          onClick={() => handleScheduleInterview(candidate)}
                        >
                          Schedule Interview
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </ScrollArea>

        {/* Scheduled Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-fit">
              {scheduledInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
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
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Scheduled
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{formatDate(interview.scheduledDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Email sent to candidate</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/recruiter/schedule/summary/${interview.candidateId}`)}>
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}

              {scheduledInterviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No interviews scheduled yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
    </div>
  )
}
