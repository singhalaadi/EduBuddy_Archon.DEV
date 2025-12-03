const generatePersonalizedPlanPrompt = (analysis, grade, subject, userName) => {
    return `You are a friendly AI tutor creating a personalized weekly learning plan for ${userName}, a grade ${grade} student in rural India.

Assessment Results:
- Subject: ${subject}
- Score: ${analysis.correctAnswers}/${analysis.totalQuestions}
- Strengths: ${analysis.strengths?.join(', ') || 'To be identified'}
- Weaknesses: ${analysis.weaknesses?.join(', ') || 'To be identified'}
- Current Level: ${analysis.currentLevel || 'Beginner'}

Create a culturally relevant, engaging weekly learning plan that:
1. Focuses on improving weak areas while reinforcing strengths
2. Uses examples from rural Indian context (village life, local festivals, farming, etc.)
3. Includes offline-friendly activities
4. Mixes Math and English where possible
5. Provides daily challenges that build progressively

Format as JSON:
{
  "greeting": "Friendly greeting in English",
  "greetingHindi": "Friendly greeting in Hindi",
  "weekTitle": "Engaging week theme",
  "weekTitleHindi": "सप्ताह का विषय",
  "motivationalMessage": "Encouraging message based on performance",
  "motivationalMessageHindi": "प्रेरक संदेश",
  "days": [
    {
      "day": "Monday",
      "dayHindi": "सोमवार",
      "topic": "Main topic for the day",
      "topicHindi": "दिन का मुख्य विषय",
      "activities": [
        "Activity 1 - Specific, actionable task",
        "Activity 2 - Practice exercise",
        "Activity 3 - Fun challenge"
      ],
      "activitiesHindi": ["गतिविधि 1", "गतिविधि 2", "गतिविधि 3"],
      "resources": ["Offline resource 1", "Offline resource 2"],
      "estimatedTime": "30 minutes",
      "difficultyLevel": "beginner/intermediate/advanced"
    }
  ],
  "weekendChallenge": {
    "title": "Fun weekend project",
    "titleHindi": "मज़ेदार सप्ताहांत परियोजना",
    "description": "Detailed description of the challenge",
    "descriptionHindi": "चुनौती का विवरण",
    "example": "Example to guide the student"
  },
  "parentGuidance": {
    "english": "Tips for parents to support learning",
    "hindi": "माता-पिता के लिए मार्गदर्शन"
  }
}

Make it encouraging, fun, and achievable for a rural student with limited internet access.`;
};

module.exports = { generatePersonalizedPlanPrompt };
