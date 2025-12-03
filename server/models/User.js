const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  learningProfile: {
    preferredStyle: {
      type: String,
      enum: ['visual', 'auditory', 'kinesthetic', 'reading-writing'],
      default: 'reading-writing'
    },
    difficultyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    interests: [String],
    learningGoals: [String]
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  stats: {
    streak: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    progress: { type: Number, default: 0 }, // Percentage to next level
    tasksCompleted: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('User', userSchema);
