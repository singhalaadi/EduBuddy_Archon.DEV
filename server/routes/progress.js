const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

// Get user progress for a course
router.get('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    let progress = await Progress.findOne({
      userId: req.user.userId,
      courseId: req.params.courseId
    }).populate('completedLessons.lessonId');

    if (!progress) {
      // Create new progress record
      progress = new Progress({
        userId: req.user.userId,
        courseId: req.params.courseId
      });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark lesson as complete
router.post('/lesson/:lessonId/complete', authMiddleware, async (req, res) => {
  try {
    const { courseId, quizScore } = req.body;
    const lessonId = req.params.lessonId;

    let progress = await Progress.findOne({
      userId: req.user.userId,
      courseId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.userId,
        courseId
      });
    }

    // Check if already completed
    const alreadyCompleted = progress.completedLessons.some(
      l => l.lessonId.toString() === lessonId
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({
        lessonId,
        quizScore
      });

      // Update overall progress
      const totalLessons = await Lesson.countDocuments({ courseId });
      progress.overallProgress = (progress.completedLessons.length / totalLessons) * 100;
      
      // Update study streak
      const today = new Date().toDateString();
      const lastAccess = new Date(progress.lastAccessed).toDateString();
      if (today !== lastAccess) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastAccess === yesterday) {
          progress.studyStreak += 1;
        } else {
          progress.studyStreak = 1;
        }
      }
      progress.lastAccessed = Date.now();
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all user progress
router.get('/user/all', authMiddleware, async (req, res) => {
  try {
    const allProgress = await Progress.find({ userId: req.user.userId })
      .populate('courseId')
      .populate('completedLessons.lessonId');

    res.json(allProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
