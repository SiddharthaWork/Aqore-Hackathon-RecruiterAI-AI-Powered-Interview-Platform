'use client';

import { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, StopCircle, Upload, FileText, Briefcase, Clock, AlertCircle, RefreshCw, User, MessageCircle, TrendingUp, Award, BarChart3, PieChart, Star, ArrowLeft, Video } from 'lucide-react';

// Add custom CSS for animations
const customStyles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
      opacity: 0; 
    }
    50% { 
      transform: translateY(-20px) rotate(180deg); 
      opacity: 1; 
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 5px rgba(168, 85, 247, 0.4); 
    }
    50% { 
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); 
    }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .gradient-border {
    background: linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4);
    background-size: 400% 400%;
    animation: gradient-shift 3s ease infinite;
  }
  
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

export default function InterviewAgent({ interviewId }) {
  const [vapi, setVapi] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(true);
  const [selectedRole, setSelectedRole] = useState('React Developer');
  const [interviewDuration, setInterviewDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [interviewTranscript, setInterviewTranscript] = useState('');
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [audioLevels, setAudioLevels] = useState(Array(12).fill(0));
  const [gracefulEndingStarted, setGracefulEndingStarted] = useState(false);
  const [savedInterviews, setSavedInterviews] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const maxDuration = 180; // Exactly 3 minutes in seconds

  // Simulate audio levels for visualization
  useEffect(() => {
    let interval = null;
    
    if (isSpeaking) {
      interval = setInterval(() => {
        setAudioLevels(prev => prev.map(() => Math.random() * (currentSpeaker ? 80 : 20) + 10));
      }, 100);
    } else {
      setAudioLevels(Array(12).fill(0));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking, currentSpeaker]);

  useEffect(() => {
    const initializeVapi = () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
        if (!apiKey) {
          throw new Error('VAPI API key not found in environment variables');
        }

        const v = new Vapi(apiKey);
        setVapi(v);

        v.on('call-start', () => {
          console.log('Interview started successfully');
          setIsSpeaking(true);
          setInterviewDuration(0);
          setConnectionStatus('connected');
          setErrorMessage('');
          setGracefulEndingStarted(false);
        });

        v.on('call-end', onCallEnded);

        v.on('error', (error) => {
          console.error('Vapi error:', error);
          setIsSpeaking(false);
          setConnectionStatus('error');
          setCurrentSpeaker(null);
          
          if (error.errorMsg) {
            if (error.errorMsg.includes('Meeting has ended')) {
              setErrorMessage('Interview session ended. You can start a new interview.');
            } else if (error.errorMsg.includes('API key')) {
              setErrorMessage('API key issue. Please check your configuration.');
            } else if (error.errorMsg.includes('quota') || error.errorMsg.includes('limit')) {
              setErrorMessage('API quota exceeded. Please try again later.');
            } else {
              setErrorMessage(`Interview error: ${error.errorMsg}`);
            }
          } else {
            setErrorMessage('An unexpected error occurred during the interview.');
          }
        });

        v.on('speech-start', () => {
          console.log('AI started speaking');
          setCurrentSpeaker('ai');
        });

        v.on('speech-end', () => {
          console.log('AI finished speaking');
          setCurrentSpeaker(null);
        });

        v.on('message', (message) => {
          if (message.type === 'transcript') {
            setInterviewTranscript(prev => prev + message.transcript + '\n');
          }
        });

        return v;
      } catch (error) {
        console.error('Failed to initialize Vapi:', error);
        setConnectionStatus('error');
        setErrorMessage('Failed to initialize interview system. Please refresh the page.');
        return null;
      }
    };

    const vapiInstance = initializeVapi();
    
    return () => {
      if (vapiInstance) {
        vapiInstance.removeAllListeners();
        vapiInstance.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  // Enhanced timer with graceful ending
  useEffect(() => {
    let interval = null;
    
    if (isSpeaking) {
      interval = setInterval(() => {
        setInterviewDuration(prev => {
          const newDuration = prev + 1;
          
          // Start graceful ending at 2 minutes (120 seconds)
          if (newDuration === 120 && !gracefulEndingStarted && vapi) {
            setGracefulEndingStarted(true);
            // Send a message to start wrapping up
            console.log('Starting graceful ending sequence');
          }
          
          // Force end at exactly 2.5 minutes
          if (newDuration >= maxDuration) {
            console.log('Interview time limit reached, ending interview');
            stopAgent();
            return maxDuration;
          }
          return newDuration;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking, gracefulEndingStarted, vapi]);

  const generateSystemPrompt = () => {
    const role = selectedRole === 'Custom Role' ? 'React Developer' : selectedRole;
    
    return `You are an experienced technical interviewer conducting a focused 3-minute interview for the ${role} position. 

CRITICAL TIMING INSTRUCTIONS:
- You have EXACTLY 3 minutes (150 seconds) total
- At 2 minutes, you'll receive a signal to start wrapping up
- Always end gracefully with closing remarks
- Keep responses concise but thorough

INTERVIEW STRUCTURE:
1. Opening (15-20 seconds): 
   "Hi! I'm excited to learn about your background. Since we have a focused 3-minute session, let's dive right in."

2. Core Technical Discussion (1.5-2 minutes):
   Based on the resume below, ask about:

RESUME CONTENT:
Professional Background:
- Years of experience in React Development
- Technical skills and competencies
- Previous roles and responsibilities
- Educational background

Key Projects to Discuss:
- Software development projects
- System design and architecture work
- Team collaboration and leadership examples
- Problem-solving and innovation instances
- Performance improvements and optimizations

Interview Focus Areas:
- Technical depth in relevant technologies
- Project management and delivery experience
- Code quality and best practices
- Scalability and performance considerations
- Team dynamics and mentoring experience

BEHAVIORAL GUIDELINES:
- Reference specific items from their resume (projects, companies, technologies)
- Ask follow-up questions based on their responses
- Show engagement: "That's a great example...", "Interesting approach..."
- Keep the conversation flowing naturally
- Be conversational but professional
- When discussing projects, ask about impact, challenges, and lessons learned

IMPORTANT CONSTRAINTS:
- Keep your responses under 30 seconds each
- Don't ask generic questions - make them resume-specific
- Always acknowledge their experience respectfully
- End positively and professionally when time is up`;
  };

  const startInterview = async () => {
    if (!vapi) return;

    try {
      setConnectionStatus('connecting');
      setErrorMessage('');
      setInterviewTranscript('');

      const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
      if (!voiceId) {
        throw new Error('ElevenLabs Voice ID not configured');
      }

      console.log('Starting interview with configuration...');

      await vapi.start({
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: generateSystemPrompt()
            }
          ],
          temperature: 0.7,
          maxTokens: 400
        },
        voice: {
          provider: '11labs',
          voiceId: voiceId
        },
        firstMessage: `Hi! Siddhartha I'm excited to learn about your background and experience. Since we have a focused 3-minute session, let's dive right in. Could you start by telling me about one of the most interesting technical projects you've worked on recently?`,
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
          language: 'en-US'
        }
      });

    } catch (error) {
      console.error('Failed to start interview:', error);
      setConnectionStatus('error');
      setErrorMessage('Failed to start interview. Please try again.');
    }
  };

  const stopAgent = () => {
    if (vapi) {
      vapi.stop();
      setConnectionStatus('idle');
    }
  };

  const generateAnalysis = async () => {
    const analysis = {
      overallScore: 8.7,
      scores: {
        technical: 8.5,
        communication: 9.0,
        engagement: 8.5
      },
      duration: interviewDuration,
      completionRate: 100,
      insights: [
        'Strong technical depth in React and state management',
        'Excellent communication of complex concepts',
        'Demonstrated problem-solving skills with relevant examples'
      ],
      recommendations: [
        'Expand knowledge in backend technologies',
        'Practice explaining complex technical concepts simply'
      ]
    };
    
    setAnalysisData(analysis);
    
    try {
      await saveAnalysisData({
        summaryId: interviewId,
        role: selectedRole,
        overallScore: analysis.overallScore,
        scores: analysis.scores,
        duration: analysis.duration,
        completionRate: analysis.completionRate,
        insights: analysis.insights,
        recommendations: analysis.recommendations
      });
      setShowThankYou(true);
    } catch (error) {
      console.error('Failed to save analysis data', error);
      // Even if save fails, show thank you
      setShowThankYou(true);
    }
  };

  const saveAnalysisData = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log('Interview summary saved:', result);
    } catch (error) {
      console.error('Failed to save interview summary:', error);
    }
  };

  const onCallEnded = async () => {
    console.log('Call ended');
    setConnectionStatus('idle');
    setGracefulEndingStarted(false);
    await generateAnalysis();
  };

  const resetInterview = () => {
    setErrorMessage('');
    setConnectionStatus('idle');
    setInterviewDuration(0);
    setIsSpeaking(false);
    setShowAnalysis(false);
    setShowThankYou(false);
    setAnalysisData(null);
    setGracefulEndingStarted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const canStartInterview = connectionStatus !== 'connecting';

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      setIsCameraOn(false);
      setVideoStream(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setErrorMessage("Could not access camera. Please check permissions and try again.");
      }
    }
  };

  const ErrorDisplay = () => (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 text-red-400 mb-2">
        <AlertCircle size={16} />
        <span className="font-medium">Interview Error</span>
      </div>
      <p className="text-red-300 text-sm mb-3">{errorMessage}</p>
      <button
        onClick={resetInterview}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
      >
        <RefreshCw size={14} />
        Try Again
      </button>
    </div>
  );

  const AnalysisDashboard = () => {
    if (!analysisData) return null;

    const ScoreCard = ({ title, score, icon: Icon, color }) => (
      <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <Icon size={20} />
          <span className="text-2xl font-bold">{score}/10</span>
        </div>
        <p className="text-sm opacity-90">{title}</p>
        <div className="mt-2 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-1000 ease-out"
            style={{ width: `${(score/10) * 100}%` }}
          />
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-sky-600 to-white p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 mb-4">
              <Award className="text-yellow-400" size={24} />
              <h1 className="text-2xl font-bold text-white">Interview Analysis</h1>
            </div>
            <p className="text-gray-300">
              {selectedRole} Position
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-white to-blue-500 flex items-center justify-center mb-4 mx-auto">
                <div className="text-4xl font-bold text-white">
                  {analysisData.overallScore}
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-yellow-400 rounded-full p-2">
                  <Star size={16} className="text-yellow-900" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Overall Performance</h2>
            <p className="text-gray-300">
              {analysisData.overallScore >= 8.5 ? 'Excellent Performance!' :
               analysisData.overallScore >= 7.5 ? 'Strong Performance' :
               'Good Foundation to Build On'}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ScoreCard 
              title="Technical Skills" 
              score={analysisData.scores.technical} 
              icon={BarChart3}
              color="from-blue-500 to-cyan-500"
            />
            <ScoreCard 
              title="Communication" 
              score={analysisData.scores.communication} 
              icon={MessageCircle}
              color="from-green-500 to-emerald-500"
            />
            <ScoreCard 
              title="Engagement" 
              score={analysisData.scores.engagement} 
              icon={TrendingUp}
              color="from-white to-pink-500"
            />
          </div>

          {/* Interview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock size={18} />
                Interview Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration</span>
                  <span className="text-white font-mono">{formatTime(analysisData.duration)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completion Rate</span>
                  <span className="text-green-400 font-semibold">{analysisData.completionRate.toFixed(1)}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${analysisData.completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <PieChart size={18} />
                Performance Radar
              </h3>
              <div className="space-y-2">
                {Object.entries(analysisData.scores).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-gray-300 capitalize w-24 text-sm">{key}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-white to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(value/10) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold w-8 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">✨ Key Strengths</h3>
              <ul className="space-y-2">
                {analysisData.insights.map((insight, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">🚀 Growth Areas</h3>
              <ul className="space-y-2">
                {analysisData.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setShowAnalysis(false);
                setIsSetupComplete(false);
                resetInterview();
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <RefreshCw size={18} />
              New Interview
            </button>
            <button
              onClick={() => setShowAnalysis(false)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <ArrowLeft size={18} />
              Back to Interview
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-600/80 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-6">Thank You for the Interview!</h1>
          <p className="text-xl text-gray-200 mb-8">
            Your interview has been completed successfully. We will review your performance and get back to you soon.
          </p>
          {/* <button
            onClick={() => {
              setShowThankYou(false);
              resetInterview();
            }}
            className="bg-gradient-to-r from-blue-600 to-white text-black font-bold py-3 px-8 rounded-xl text-lg transition-all hover:from-blue-700 hover:to-gray-200"
          >
            Start New Interview
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-600/80 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Interview Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 text-black">
              <Briefcase className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">
                {selectedRole} Interview
              </h1>
              <p className="text-black text-sm">3-minute technical screening</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2">
            <Clock className="text-blue-400" size={18} />
            <span className="text-white font-mono">{formatTime(interviewDuration)}</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        {/* Audio Visualization */}
        <div className="flex justify-center items-center gap-1 h-16 mb-8">
          {audioLevels.map((level, index) => (
            <div
              key={index}
              className="w-2 bg-white rounded-t-sm transition-all duration-75"
              style={{
                height: `${level}%`,
                opacity: currentSpeaker === 'ai' ? 0.6 : currentSpeaker === 'user' ? 1 : 0.3,
                backgroundColor: currentSpeaker === 'ai' 
                  ? '#a855f7' 
                  : currentSpeaker === 'user' 
                    ? '#3b82f6' 
                    : '#8b5cf6'
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Interview Controls</h2>
              
              {errorMessage && <ErrorDisplay />}
              
              <div className="space-y-4">
                <button
                  onClick={isSpeaking ? stopAgent : startInterview}
                  disabled={connectionStatus === 'connecting'}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isSpeaking
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gradient-to-r from-black to-blue-600 hover:from-black hover:to-blue-700 text-white font-bold'
                  } ${connectionStatus === 'connecting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSpeaking ? (
                    <>
                      <StopCircle size={18} />
                      End Interview
                    </>
                  ) : (
                    <>
                      <Mic size={18} />
                      {connectionStatus === 'connecting' ? 'Starting...' : 'Start Interview'}
                    </>
                  )}
                </button>

                <button
                  onClick={toggleCamera}
                  className="w-full flex items-center justify-center gap-2 bg-black/50 hover:bg-black/40 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <Video size={18} />
                  {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                </button>

                {/* <button
                  onClick={() => {
                    setShowThankYou(false);
                    setIsSetupComplete(false);
                    resetInterview();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-black/50 hover:bg-black/40 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <RefreshCw size={18} />
                  Reset Interview
                </button> */}
              </div>
                      {/* Video Display */}
            </div>
        {isCameraOn && (
          <div className="mt-8 bg-black/20 p-4 rounded-xl">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-auto min-h-52 object-contain rounded-lg"
            />
          </div>
        )}

          </div>

          {/* Right Panel - Transcript */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 h-full">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageCircle size={18} />
                Interview Transcript
              </h2>
              <div className="bg-black/20 rounded-xl p-4 h-96 overflow-y-auto">
                {interviewTranscript ? (
                  <div className="space-y-4">
                    {interviewTranscript.split('\n').map((line, index) => (
                      line.trim() && (
                        <div 
                          key={index} 
                          className={`p-3 rounded-lg max-w-[90%] ${
                            line.startsWith('AI:') 
                              ? 'bg-white mr-auto border-l-4 border-white'
                              : 'bg-white text-black ml-auto border-r-4 border-blue-500 text-right'
                          }`}
                        >
                          <p className="text-black text-sm">
                            {line.replace('AI:', '').replace('User:', '').trim()}
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="mb-4 opacity-50">
                      <Mic size={40} className="text-gray-400" />
                    </div>
                    <p className="text-white">
                      {connectionStatus === 'connecting' 
                        ? 'Starting interview session...' 
                        : 'Transcript will appear here once the interview begins'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Analysis Button */}
        {interviewDuration > 0 && !isSpeaking && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => generateAnalysis()}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black px-6 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <BarChart3 size={18} />
              View Performance Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}