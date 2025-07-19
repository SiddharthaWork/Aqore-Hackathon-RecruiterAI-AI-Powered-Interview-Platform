import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import Question from "./model/questions.model.js";
import { sendEmail } from "./utils/sendmail.js";

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

// Body Parser Middleware
app.use(express.json());

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
      <p>Your AI interview has been scheduled.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Duration:</strong> ${duration} minutes</p>
      <p><strong>Job Description:</strong> ${jobDescription}</p>
      <p><strong>Link:</strong> ${link}</p>
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
