require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/ai-tutor', require('./routes/aiTutor'));
app.use('/api/assessment', require('./routes/assessmentRoutes'));
app.use('/api/plan', require('./routes/planRoutes'));
app.use('/api/adaptive', require('./routes/adaptiveRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Tutor Server Running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Tutor Server running on port ${PORT}`);
});
