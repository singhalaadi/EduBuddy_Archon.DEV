const express = require('express');
const router = express.Router();
const adaptiveController = require('../controllers/adaptiveAssessmentController');
const auth = require('../middleware/auth');

// Get adaptive questions based on student's level
router.post('/adaptive-questions', auth, adaptiveController.getAdaptiveQuestions);

// Evaluate answers and adapt difficulty
router.post('/evaluate-adaptive', auth, adaptiveController.evaluateAndAdapt);

module.exports = router;
