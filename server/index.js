import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import Question from "./model/questions.model.js";
import { sendEmail } from "./utils/sendmail.js";
import Interview from "./model/interview.model.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Creating Cors Option
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
}); 

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Add routes for questions
app.post('/api/questions', async (req, res) => {
  try {
    const { userId, userEmail, jobDescription, date, time, duration, categories, questions, link } = req.body;
    if (!userEmail) {
      throw new Error('Recipient email is required');
    }
    const newQuestion = new Question({
        userId,
        userEmail,
      jobDescription,
      date,
      time,
      duration,
      categories,
      questions,
      link
    });
    await newQuestion.save();

    // Send email to candidate
    const emailSubject = `AI Interview Scheduled`;
    const emailHtml = `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; background-color: #ffffff;">
    <h2 style="color: #2b2b2b;">📅 Your AI Interview is Scheduled</h2>

    <p style="font-size: 16px; color: #555555;">
      Thank you for your application. Your AI-powered interview has been successfully scheduled.
    </p>

    <table style="width: 100%; font-size: 16px; color: #333333; margin-top: 20px;">
      <tr>
        <td style="padding: 8px 0;"><strong>🗓️ Date:</strong></td>
        <td style="padding: 8px 0;">${date}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>⏰ Time:</strong></td>
        <td style="padding: 8px 0;">${time}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>⏱️ Duration:</strong></td>
        <td style="padding: 8px 0;">${duration} minutes</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>🧾 Job Description:</strong></td>
        <td style="padding: 8px 0;">${jobDescription}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>🔗 Interview Link:</strong></td>
        <td style="padding: 8px 0;"><a href="${link}" target="_blank" style="color: #1a73e8;">Click here to join</a></td>
      </tr>
    </table>

    <p style="font-size: 14px; color: #888888; margin-top: 30px;">
      Please make sure to join the interview on time and ensure your microphone is working.
    </p>

    <p style="font-size: 14px; color: #888888;">
      Best regards,<br/>
      <strong>The AI Recruiter Team</strong>
    </p>
  </div>
    `;
    await sendEmail(userEmail, emailSubject, emailHtml);

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get by id
app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

// delete by id
app.delete('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MongoDB Connection


// API Endpoints
app.post('/api/summary', async (req, res) => {
  try {
    const interviewData = new Interview(req.body);
    const savedInterview = await interviewData.save();
    res.status(201).json(savedInterview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/summary', async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/summary/:id', async (req, res) => {
  try {
    let interview;
    // Try by _id if it's a valid ObjectId
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      interview = await Interview.findById(req.params.id);
    }
    // If not found by _id, try by summaryId
    if (!interview) {
      interview = await Interview.findOne({ summaryId: req.params.id });
    }
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get summary by summaryId
// app.get('/api/summary/:summaryId', async (req, res) => {
//   try {
//     const interview = await Interview.findById(req.params.summaryId);
//     if (!interview) return res.status(404).json({ message: 'Interview not found' });
//     res.json(interview);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }); 