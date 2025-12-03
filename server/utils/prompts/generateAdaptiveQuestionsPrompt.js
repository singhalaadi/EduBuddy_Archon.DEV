const generateAdaptiveQuestionsPrompt = (grade, subject, difficultyLevel = 'beginner', previousPerformance = null) => {
    let subjectText = subject;
    if (subject === 'Both') {
        subjectText = 'Mathematics and English Language Arts (mix of both)';
    }

    // Define topic areas based on requirements
    const mathTopics = {
        beginner: ['Basic Addition and Subtraction', 'Simple Multiplication', 'Basic Fractions'],
        intermediate: ['Large Numbers', 'Decimals', 'Simple Geometry', 'Time and Money'],
        advanced: ['Factors and Multiples', 'H.C.F and L.C.M', 'Percentages', 'Mensuration', 'Profit and Loss']
    };

    const englishTopics = {
        beginner: ['Basic Vocabulary', 'Simple Sentences', 'Common Words'],
        intermediate: ['Reading Comprehension', 'Grammar Basics', 'Story Writing'],
        advanced: ['Advanced Grammar', 'Essay Writing', 'Literature Analysis']
    };

    let contextualExamples = `
Use culturally relevant examples for rural Indian students:
- For math: Use examples with rupees, kilograms, meters, village markets, farms, cricket
- For English: Use simple stories about village life, animals, festivals, family
- Make questions relatable to daily life in rural India
`;

    let adaptiveInstructions = '';
    if (previousPerformance) {
        adaptiveInstructions = `
Previous Performance Analysis:
- Score: ${previousPerformance.score}/${previousPerformance.total}
- Weak Areas: ${previousPerformance.weakAreas?.join(', ') || 'None identified'}
- Strong Areas: ${previousPerformance.strongAreas?.join(', ') || 'None identified'}

IMPORTANT: Focus more questions on the weak areas to help the student improve.
`;
    }

    return `You are a friendly AI tutor for rural Indian students in grade ${grade}.

Generate 5 adaptive multiple-choice questions for ${subjectText} at ${difficultyLevel} level.

${contextualExamples}

${adaptiveInstructions}

For Math questions, cover these topic areas:
${subject === 'Math' || subject === 'Both' ? mathTopics[difficultyLevel].join(', ') : ''}

For English questions, cover these areas:
${subject === 'English' || subject === 'Both' ? englishTopics[difficultyLevel].join(', ') : ''}

Format the output STRICTLY as a JSON array with this structure:
[
  {
    "id": 1,
    "question": "Question text in simple English",
    "questionHindi": "Question in Hindi (Devanagari script)",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "optionsHindi": ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
    "correctAnswer": "Option A",
    "topic": "Specific topic name",
    "difficulty": "${difficultyLevel}",
    "explanation": "Simple explanation of the answer",
    "explanationHindi": "उत्तर की सरल व्याख्या"
  }
]

Make questions engaging and age-appropriate for grade ${grade} students.`;
};

module.exports = { generateAdaptiveQuestionsPrompt };
