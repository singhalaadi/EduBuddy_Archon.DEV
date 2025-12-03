const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const aiTutorService = require('../services/aiTutor');
const ChatHistory = require('../models/ChatHistory');
const User = require('../models/User');
const Progress = require('../models/Progress');

// Chat with AI tutor
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, courseId, sessionType } = req.body;
    const userId = req.user.userId;

    // Get or create chat session
    let chatSession = await ChatHistory.findOne({ userId, courseId })
      .sort({ createdAt: -1 });

    if (!chatSession || chatSession.messages.length > 20) {
      // Create new session
      chatSession = new ChatHistory({
        userId,
        courseId,
        sessionType: sessionType || 'general',
        messages: []
      });
    }

    // Add user message
    chatSession.messages.push({
      role: 'user',
      content: message
    });

    // Get user profile for context
    const user = await User.findById(userId);
    
    // Prepare context
    const context = {
      userLevel: user.learningProfile.difficultyLevel,
      courseInfo: courseId ? 'Course-specific tutoring' : 'General learning'
    };

    // Get AI response
    const messages = chatSession.messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    const aiResponse = await aiTutorService.chat(messages, context);

    // Add AI response to session
    chatSession.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chatSession.save();

    res.json({
      response: aiResponse,
      sessionId: chatSession._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing chat message' });
  }
});

// Generate personalized content
router.post('/generate-content', authMiddleware, async (req, res) => {
  try {
    const { topic } = req.body;
    const user = await User.findById(req.user.userId);

    const content = await aiTutorService.generatePersonalizedContent(
      topic,
      user.learningProfile
    );

    res.json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating content' });
  }
});

// Generate quiz
router.post('/generate-quiz', authMiddleware, async (req, res) => {
  try {
    const { topic, difficulty, questionCount } = req.body;

    const quiz = await aiTutorService.generateQuiz(
      topic,
      difficulty || 'intermediate',
      questionCount || 5
    );

    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating quiz' });
  }
});

// Get feedback on answer
router.post('/feedback', authMiddleware, async (req, res) => {
  try {
    const { question, studentAnswer, correctAnswer } = req.body;

    const feedback = await aiTutorService.provideFeedback(
      studentAnswer,
      correctAnswer,
      question
    );

    res.json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating feedback' });
  }
});

// Analyze progress and get recommendations
router.get('/progress-analysis/:courseId', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.userId,
      courseId: req.params.courseId
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const analysis = await aiTutorService.analyzeProgress(progress);

    res.json({ analysis, progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error analyzing progress' });
  }
});

// Explain concept
router.post('/explain', authMiddleware, async (req, res) => {
  try {
    const { concept, context } = req.body;

    const explanation = await aiTutorService.explainConcept(concept, context);

    res.json({ explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error explaining concept' });
  }
});

// Get chat history
router.get('/chat-history', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.query;
    const query = { userId: req.user.userId };
    if (courseId) query.courseId = courseId;

    const history = await ChatHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching chat history' });
  }
});

module.exports = router;
