const Progress = require('../models/Progress');
const { generateAIResponse } = require('../services/openaiService');
const { generateAdaptiveQuestionsPrompt } = require('../utils/prompts/generateAdaptiveQuestionsPrompt');

exports.getAdaptiveQuestions = async (req, res) => {
    try {
        const { grade, subject } = req.body;
        const userId = req.user?.userId; // Get from authenticated user

        // Get user's previous performance to adapt questions
        let previousPerformance = null;
        if (userId) {
            const progress = await Progress.findOne({ userId, subject }).sort({ 'assessmentScores.date': -1 });
            if (progress && progress.assessmentScores.length > 0) {
                const lastAssessment = progress.assessmentScores[progress.assessmentScores.length - 1];
                previousPerformance = {
                    score: lastAssessment.score,
                    total: lastAssessment.totalQuestions,
                    weakAreas: progress.weaknessAreas,
                    strongAreas: progress.strengthAreas,
                    currentLevel: progress.currentDifficultyLevel
                };
            }
        }

        const difficultyLevel = previousPerformance?.currentLevel || 'beginner';
        const prompt = generateAdaptiveQuestionsPrompt(grade, subject, difficultyLevel, previousPerformance);

        const aiResponse = await generateAIResponse(prompt);
        const questions = JSON.parse(aiResponse);

        res.json({
            questions,
            difficultyLevel,
            adaptedFrom: previousPerformance ? 'previous performance' : 'initial assessment'
        });
    } catch (error) {
        console.error('Error generating adaptive questions:', error);
        res.status(500).json({ message: 'Failed to generate questions', error: error.message });
    }
};

exports.evaluateAndAdapt = async (req, res) => {
    try {
        const { questions, userAnswers, grade, subject } = req.body;
        const userId = req.user?.userId; // Get from authenticated user

        let correctCount = 0;
        let topicPerformance = {};

        questions.forEach(q => {
            const isCorrect = userAnswers[q.id] === q.correctAnswer;
            if (isCorrect) correctCount++;

            if (!topicPerformance[q.topic]) {
                topicPerformance[q.topic] = { correct: 0, total: 0 };
            }
            topicPerformance[q.topic].total++;
            if (isCorrect) topicPerformance[q.topic].correct++;
        });

        // Identify strengths and weaknesses
        const strengths = [];
        const weaknesses = [];

        Object.entries(topicPerformance).forEach(([topic, perf]) => {
            const percentage = (perf.correct / perf.total) * 100;
            if (percentage >= 70) {
                strengths.push(topic);
            } else if (percentage < 50) {
                weaknesses.push(topic);
            }
        });

        // Determine next difficulty level
        const scorePercentage = (correctCount / questions.length) * 100;
        let nextDifficulty = 'beginner';
        if (scorePercentage >= 80) nextDifficulty = 'advanced';
        else if (scorePercentage >= 60) nextDifficulty = 'intermediate';

        // Save progress
        if (userId) {
            let progress = await Progress.findOne({ userId, subject });
            if (!progress) {
                progress = new Progress({ userId, subject, topic: subject });
            }

            progress.assessmentScores.push({
                score: correctCount,
                totalQuestions: questions.length,
                difficulty: questions[0]?.difficulty || 'beginner'
            });

            progress.strengthAreas = [...new Set([...progress.strengthAreas, ...strengths])];
            progress.weaknessAreas = weaknesses;
            progress.currentDifficultyLevel = nextDifficulty;
            progress.lastActive = new Date();

            await progress.save();
        }

        const evaluation = {
            score: Math.round(scorePercentage),
            correctAnswers: correctCount,
            totalQuestions: questions.length,
            strengths,
            weaknesses,
            currentLevel: nextDifficulty,
            topicBreakdown: topicPerformance,
            encouragement: scorePercentage >= 70
                ? "Excellent work! You're doing great! 🌟"
                : scorePercentage >= 50
                    ? "Good effort! Let's practice more together! 💪"
                    : "Don't worry! We'll learn together step by step! 🎯",
            encouragementHindi: scorePercentage >= 70
                ? "बहुत बढ़िया! आप बहुत अच्छा कर रहे हैं! 🌟"
                : scorePercentage >= 50
                    ? "अच्छा प्रयास! आइए और अभ्यास करें! 💪"
                    : "चिंता मत करो! हम एक साथ सीखेंगे! 🎯"
        };

        res.json({ evaluation });
    } catch (error) {
        console.error('Error evaluating answers:', error);
        res.status(500).json({ message: 'Failed to evaluate', error: error.message });
    }
};

module.exports = exports;
