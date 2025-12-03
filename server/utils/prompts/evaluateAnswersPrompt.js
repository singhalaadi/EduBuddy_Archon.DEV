const evaluateAnswersPrompt = (questions, userAnswers) => {
    return `Evaluate the following student answers against the questions.
  
  Questions: ${JSON.stringify(questions)}
  User Answers: ${JSON.stringify(userAnswers)}
  
  Provide a detailed analysis of the student's performance.
  Format the output strictly as a JSON object with this structure:
  {
    "score": 80,
    "totalQuestions": 5,
    "correctAnswers": 4,
    "analysis": "Overall summary of performance...",
    "strengths": ["Topic A", "Topic B"],
    "weaknesses": ["Topic C"],
    "recommendations": ["Focus on Topic C..."]
  }`;
};

module.exports = { evaluateAnswersPrompt };
