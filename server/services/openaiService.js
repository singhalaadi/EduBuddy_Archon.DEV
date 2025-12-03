const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateAIResponse = async (prompt) => {
    // 1. Check if API Key exists
    if (!process.env.GOOGLE_API_KEY) {
        console.warn("GOOGLE_API_KEY is not set. Returning mock data.");
        return getMockData(prompt);
    }

    // 2. Try calling Google Gemini API
    try {
        // Use the correct model name for Gemini API v1
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Append instruction to ensure JSON format if needed, though prompt usually handles it.
        // Gemini can be chatty, so we emphasize JSON.
        const enhancedPrompt = `${prompt} \n\n IMPORTANT: Output ONLY valid JSON. Do not include markdown formatting like \`\`\`json.`;

        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        let text = response.text();

        // Clean up potential markdown formatting from Gemini
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return text;
    } catch (error) {
        // 3. Fallback to mock data if API fails
        console.error("Error calling Google Gemini API:", error.message);
        console.warn("Falling back to mock data so the app remains functional.");
        return getMockData(prompt);
    }
};

// Helper function for mock data
const getMockData = (prompt) => {
    if (prompt.includes("Generate 5 multiple-choice questions")) {
        if (prompt.includes("Mathematics and English")) {
            return JSON.stringify([
                { id: 1, question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
                { id: 2, question: "Which word is a noun?", options: ["Run", "Blue", "Cat", "Quickly"], correctAnswer: "Cat" },
                { id: 3, question: "What is 10 - 4?", options: ["5", "6", "7", "8"], correctAnswer: "6" },
                { id: 4, question: "Choose the correct spelling:", options: ["Happyness", "Happiness", "Hapiness", "Happines"], correctAnswer: "Happiness" },
                { id: 5, question: "How many sides does a square have?", options: ["2", "3", "4", "5"], correctAnswer: "4" }
            ]);
        }
        return JSON.stringify([
            { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
            { id: 2, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: "Paris" },
            { id: 3, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
            { id: 4, question: "What is the past tense of 'run'?", options: ["Runned", "Ran", "Running", "Runs"], correctAnswer: "Ran" },
            { id: 5, question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: "3" }
        ]);
    }
    if (prompt.includes("Evaluate the following student answers")) {
        return JSON.stringify({
            score: 80,
            totalQuestions: 5,
            correctAnswers: 4,
            analysis: "Good understanding of basic concepts (Mock Evaluation).",
            strengths: ["Arithmetic", "Geography"],
            weaknesses: ["Grammar"],
            recommendations: ["Review past tense verbs."]
        });
    }
    if (prompt.includes("Create a weekly learning plan")) {
        return JSON.stringify({
            weekTitle: "Foundations Week (Mock Plan)",
            days: [
                { day: "Monday", topic: "Basic Math", activities: ["Practice addition", "Watch video on subtraction"], resources: ["MathIsFun.com"] },
                { day: "Tuesday", topic: "Geography", activities: ["Map reading", "Capital cities quiz"], resources: ["NatGeo Kids"] },
                { day: "Wednesday", topic: "Grammar", activities: ["Verb tenses worksheet", "Reading practice"], resources: ["GrammarMonster"] }
            ]
        });
    }
    return "{}";
};

module.exports = { generateAIResponse };
