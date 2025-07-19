"use client";

import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import LandingPage from './LandingPage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if we are on the client side
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      const loginStatus = localStorage.getItem('loginStatus');
      setIsLoggedIn(!!userId);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/recruiter/schedule');
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
        <Brain className="h-6 w-6 text-blue-600" />
      </div>
        <span>Loading...</span>
    </div>
  )   
}

  if (isLoggedIn) {
    return null; 
  }

  return (
    <>
    <LandingPage /> 
    </>
  );
}
