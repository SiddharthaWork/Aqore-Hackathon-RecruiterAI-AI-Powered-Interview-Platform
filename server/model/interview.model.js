import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  role: { type: String, required: true },
  overallScore: { type: Number, required: true },
  scores: {
    technical: { type: Number, required: true },
    communication: { type: Number, required: true },
    engagement: { type: Number, required: true }
  },
  duration: { type: Number, required: true },
  completionRate: { type: Number, required: true },
  insights: [{ type: String }],
  recommendations: [{ type: String }],
  summaryId: { type: String},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Interview', interviewSchema);