import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    userId: String,
    userEmail: String,
  jobDescription: String,
  date: Date,
  time: String,
  duration: Number,
  categories: [String],
  questions: [String],
  link: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;