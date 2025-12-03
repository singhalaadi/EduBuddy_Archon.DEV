const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../services/openaiService');
const { generatePersonalizedPlanPrompt } = require('../utils/prompts/generatePersonalizedPlanPrompt');
const auth = require('../middleware/auth');

// Generate personalized learning plan
router.post('/generate', auth, async (req, res) => {
    try {
        const { evaluation, grade, subject } = req.body;
        const userName = req.user?.name || 'Student';

        const analysis = {
            correctAnswers: evaluation.correctAnswers,
            totalQuestions: evaluation.totalQuestions,
            strengths: evaluation.strengths || [],
            weaknesses: evaluation.weaknesses || [],
            currentLevel: evaluation.currentLevel || 'beginner'
        };

        const prompt = generatePersonalizedPlanPrompt(analysis, grade, subject, userName);
        const aiResponse = await generateAIResponse(prompt);

        let plan;
        try {
            plan = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            // Return a basic plan structure if parsing fails
            plan = {
                greeting: `Great job, ${userName}!`,
                weekTitle: "Your Learning Week",
                days: []
            };
        }

        res.json({ plan });
    } catch (error) {
        console.error('Error generating learning plan:', error);
        res.status(500).json({ message: 'Failed to generate plan', error: error.message });
    }
});

module.exports = router;
