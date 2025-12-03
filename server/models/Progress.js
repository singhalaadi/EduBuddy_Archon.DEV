const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    enum: ['Math', 'English', 'Both'],
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  assessmentScores: [{
    date: { type: Date, default: Date.now },
    score: Number,
    totalQuestions: Number,
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
  }],
  strengthAreas: [String],
  weaknessAreas: [String],
  currentDifficultyLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  dailyChallenges: [{
    date: Date,
    topic: String,
    completed: { type: Boolean, default: false },
    score: Number
  }],
  weeklyPlan: {
    weekNumber: Number,
    startDate: Date,
    endDate: Date,
    topics: [{
      day: String,
      topic: String,
      activities: [String],
      completed: { type: Boolean, default: false }
    }]
  },
  totalTimeSpent: { type: Number, default: 0 }, // in minutes
  lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);
