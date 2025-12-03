const express = require('express');
const router = express.Router();
const { getQuestions, evaluateAssessment } = require('../controllers/assessmentController');

router.post('/questions', getQuestions);
router.post('/evaluate', evaluateAssessment);

module.exports = router;
