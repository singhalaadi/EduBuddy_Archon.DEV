const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const aiTutorService = require('../services/aiTutor');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const courses = await Course.find(filter).populate('lessons');
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create course (AI-generated)
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { topic, difficulty, lessonCount, category } = req.body;

    // Generate course structure using AI
    const lessonStructures = await aiTutorService.generateCourse(
      topic,
      difficulty || 'intermediate',
      lessonCount || 10
    );

    // Create course
    const course = new Course({
      title: topic,
      description: `AI-generated course on ${topic}`,
      category: category || 'other',
      difficulty: difficulty || 'intermediate',
      estimatedDuration: lessonStructures.length * 0.5 // rough estimate
    });

    await course.save();

    // Create lessons
    const lessons = [];
    for (let i = 0; i < lessonStructures.length; i++) {
      const lessonData = lessonStructures[i];
      const lesson = new Lesson({
        courseId: course._id,
        title: lessonData.title,
        content: lessonData.description || '',
        order: i + 1,
        estimatedTime: lessonData.estimatedTime || 30
      });
      await lesson.save();
      lessons.push(lesson._id);
    }

    course.lessons = lessons;
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating course' });
  }
});

// Enroll in course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const courseId = req.params.id;

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: 'Successfully enrolled', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get enrolled courses
router.get('/user/enrolled', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: 'enrolledCourses',
      populate: { path: 'lessons' }
    });

    res.json(user.enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
