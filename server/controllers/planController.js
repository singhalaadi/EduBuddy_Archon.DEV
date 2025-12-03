const { generateAIResponse } = require('../services/openaiService');
const { learningPlanPrompt } = require('../utils/prompts/learningPlanPrompt');

exports.generatePlan = async (req, res) => {
    try {
        const { analysis, grade, subject } = req.body;

        const prompt = learningPlanPrompt(analysis, grade, subject);
        const aiResponse = await generateAIResponse(prompt);
        const plan = JSON.parse(aiResponse);

        res.json({ plan });
    } catch (error) {
        console.error('Error generating learning plan:', error);
        res.status(500).json({ message: 'Failed to generate learning plan' });
    }
};
