import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const resumesDir = path.join(process.cwd(), 'resumes');

export async function POST(request) {
  try {
    const { resumeFilename, jobDescription, categories = [], questionCount } = await request.json();
    
    if (!resumeFilename || !jobDescription || !questionCount) {
      return NextResponse.json(
        { error: 'Missing resumeFilename, jobDescription or questionCount' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(resumesDir, resumeFilename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Resume file not found' },
        { status: 404 }
      );
    }
    
    // Read resume file content
    const resumeContent = fs.readFileSync(filePath, 'utf-8');
    
    // Prepare prompt for Azure OpenAI
    const messages = [
      {
        role: "system",
        content: `You are an AI assistant that helps recruiters by generating relevant interview questions based on job descriptions and candidate resumes. Generate exactly ${questionCount} interview questions in a numbered list format. Return only the questions without any additional text.`
      },
      {
        role: "user",
        content: `Job Description: ${jobDescription}\n\nCandidate Resume:\n${resumeContent.substring(0, 2000)}\n\nInterview Categories: ${categories.join(', ')}`
      }
    ];
    
    // Call Azure OpenAI
    const url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.5,
        top_p: 0.9,
      }),
    });

    const data = await response.json();
    const questions = data.choices[0]?.message?.content || "";
    
    // Parse the numbered list into an array
    const questionList = questions
      .split('\n')
      .filter(q => q.trim().match(/^\d+\./))
      .map(q => q.replace(/^\d+\.\s*/, '').trim());
    
    return NextResponse.json({ questions: questionList });
    
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
