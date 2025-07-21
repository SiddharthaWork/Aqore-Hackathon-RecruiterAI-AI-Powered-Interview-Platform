# 🎙️ AI-Powered Interview Platform

**Recruiter AI** is a 3-minute AI-driven technical interview platform built using **NextJs**, **NodeJS**, **ExpressJs**, **Mongo DB**, **Vapi**, **OpenAI**, **ElevenLabs**, and **Deepgram**. It simulates real-time voice-based technical interviews, captures transcripts, analyzes performance, and provides a post-interview analysis dashboard.

## 🚀 Features

- 🎤 AI-led voice interviews
- 🧠 Smart, resume-based system prompts for realistic questions
- 📄 Real-time transcript and speaker differentiation (AI/User)
- 🔊 Animated audio levels for voice activity visualization
- ⏱️ Interview duration tracking and graceful ending logic
- 📷 Camera toggle with live video preview
- 📊 Post-interview performance analysis 
- 🔁 Start/Stop controls and error handling
- 🧪 Modular UI using Tailwind CSS and Lucide React icons

## 🛠️ Tech Stack

- **Frontend**: Next JS, Tailwind CSS
- **Backend**: Node JS, Express JS, Mongo DB
- **Voice AI**: [Vapi] + [OpenAI GPT-4o-mini]
- **Speech-to-Text**: [Deepgram](https://deepgram.com/)
- **Voice Output**: [ElevenLabs](https://www.elevenlabs.io/)
- **Icons**: Lucide React

## 🔧 Setup Instructions

Make sure you have the following installed:

Node.js (v18 or higher)

npm or yarn

MongoDB (local or cloud via MongoDB Atlas)

⚙️ Backend Setup (server/)
1. Navigate to server folder:
bash
Copy
Edit
cd server
2. Install dependencies:
bash
Copy
Edit
npm install
3. Create .env file:
bash
Copy
Edit
touch .env
Paste this inside .env (example):
env
Copy
Edit
PORT=4000
MONGO_URI=mongodb://localhost:27017/interview_db
Replace the MONGO_URI with your MongoDB Atlas URI if using cloud DB.

4. Start the backend server:
bash
Copy
Edit
npm run dev

Frontend Setup (client/)
1. Navigate to client folder:
bash
Copy
Edit
cd ../client
2. Install dependencies:
bash
Copy
Edit
npm install
3. Create .env.local file:
bash
Copy
Edit
touch .env.local
Paste this inside .env.local:

env
Copy
Edit
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your-azure-openai-api-key
AZURE_OPENAI_ENDPOINT=https://your-azure-endpoint.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2025-01-01-preview

# Vapi.ai API Key
NEXT_PUBLIC_VAPI_API_KEY=your-vapi-api-key

# ElevenLabs Voice ID
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=your-elevenlabs-voice-id


4. Start the frontend dev server:
bash
Copy
Edit
npm run dev
The frontend will be available at: http://localhost:3000


