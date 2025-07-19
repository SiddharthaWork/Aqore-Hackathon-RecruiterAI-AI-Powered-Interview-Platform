import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const resumesDir = path.join(process.cwd(), 'resumes');
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

const applicationsDir = path.join(process.cwd(), 'applications');
if (!fs.existsSync(applicationsDir)) {
  fs.mkdirSync(applicationsDir, { recursive: true });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const file = formData.get('resume');
    const userName = formData.get('userName');
    const jobTitle = formData.get('jobTitle');
    const jobDescription = formData.get('jobDescription');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `resume_${timestamp}.${extension}`;
    const filePath = path.join(resumesDir, filename);
    
    // Save resume file
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    
    // Save application details
    const applicationData = {
      userName,
      jobTitle,
      jobDescription,
      resumeFilename: filename,
      submittedAt: new Date().toISOString()
    };
    
    const applicationPath = path.join(applicationsDir, `application_${timestamp}.json`);
    fs.writeFileSync(applicationPath, JSON.stringify(applicationData, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully'
    });
    
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
