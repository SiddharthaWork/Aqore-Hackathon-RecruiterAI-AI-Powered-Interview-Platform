"use client";

import React, { useState, useEffect } from 'react';

const JobPage = () => {
  const [userName, setUserName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Get user name from local storage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resume) {
      setSubmitError('Please upload your resume');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('userName', userName);
      formData.append('jobTitle', jobTitle);
      formData.append('jobDescription', jobDescription);
      
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      setSubmitSuccess(true);
      // Reset form
      setJobTitle('');
      setJobDescription('');
      setResume(null);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Apply for Job</h1>
      
      {submitSuccess ? (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          Application submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter job title"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter job description"
              rows="4"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          {submitError && (
            <div className="text-red-500">{submitError}</div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  );
};

export default JobPage;