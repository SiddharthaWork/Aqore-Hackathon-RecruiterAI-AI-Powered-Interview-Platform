"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function SummaryPage() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/summary/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch summary');
        }
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Interview Summary</h1>
        <div className="bg-red-500 text-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-xl font-semibold">Candidate have not taken the interview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Shortlist button */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interview Summary</h1>
        <Button 
          variant="outline" 
          className="mt-2 bg-blue-500 text-white"
          onClick={() => {
            setIsShortlisted(true);
            toast.success('Shortlisted');
          }}
          disabled={isShortlisted}
        >
          {isShortlisted ? 'Shortlisted' : 'Shortlist Applicant'}
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Role</p>
            <p className="font-medium">{summary.role}</p>
          </div>
        <div>
          <p className="text-gray-600">Overall Score</p>
          <p className="font-bold text-2xl">{summary.overallScore}</p>
        </div>
          <div>
            <p className="text-gray-600">Duration</p>
            <p className="font-medium">3 minutes</p>
          </div>
          <div>
            <p className="text-gray-600">Completion Rate</p>
            <p className="font-medium">{summary.completionRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Scores</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Technical</p>
            <p className="font-medium">{summary.scores.technical}</p>
          </div>
          <div>
            <p className="text-gray-600">Communication</p>
            <p className="font-medium">{summary.scores.communication}</p>
          </div>
          <div>
            <p className="text-gray-600">Engagement</p>
            <p className="font-medium">{summary.scores.engagement}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Insights</h2>
        <ul className="list-disc pl-5 space-y-2">
          {summary.insights.map((insight, index) => (
            <li key={index} className="text-gray-700">{insight}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <ul className="list-disc pl-5 space-y-2">
          {summary.recommendations.map((rec, index) => (
            <li key={index} className="text-gray-700">{rec}</li>
          ))}
        </ul>
      </div>
   
    </div>
  );
}