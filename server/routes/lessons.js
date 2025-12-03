const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Lesson = require('../models/Lesson');
const aiTutorService = require('../services/aiTutor');

// Get lesson by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get lessons by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId })
      .sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate lesson content with AI
router.post('/:id/generate-content', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const content = await aiTutorService.generatePersonalizedContent(
      lesson.title,
      req.user.learningProfile
    );

    lesson.content = content;
    await lesson.save();

    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating content' });
  }
});

module.exports = router;
