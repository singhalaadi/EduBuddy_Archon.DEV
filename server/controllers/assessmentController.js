const { generateAIResponse } = require('../services/openaiService');
const { generateQuestionsPrompt } = require('../utils/prompts/generateQuestionsPrompt');
const { evaluateAnswersPrompt } = require('../utils/prompts/evaluateAnswersPrompt');

exports.getQuestions = async (req, res) => {
    try {
        const { grade, subject } = req.body;
        if (!grade || !subject) {
            return res.status(400).json({ message: 'Grade and subject are required' });
        }

        const prompt = generateQuestionsPrompt(grade, subject);
        const aiResponse = await generateAIResponse(prompt);
        const questions = JSON.parse(aiResponse);

        res.json({ questions });
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ message: 'Failed to generate questions' });
    }
};

exports.evaluateAssessment = async (req, res) => {
    try {
        const { questions, userAnswers } = req.body;

        const prompt = evaluateAnswersPrompt(questions, userAnswers);
        const aiResponse = await generateAIResponse(prompt);
        const evaluation = JSON.parse(aiResponse);

        res.json({ evaluation });
    } catch (error) {
        console.error('Error evaluating assessment:', error);
        res.status(500).json({ message: 'Failed to evaluate assessment' });
    }
};
