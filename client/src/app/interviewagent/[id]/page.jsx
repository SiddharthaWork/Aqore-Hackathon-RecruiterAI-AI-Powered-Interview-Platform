'use client'

import InterviewAgent from '../InterviewAgent';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  return <InterviewAgent interviewId={id} />;
}