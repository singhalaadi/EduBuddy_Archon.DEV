const generateQuestionsPrompt = (grade, subject) => {
  let subjectText = subject;
  if (subject === 'Both') {
    subjectText = 'Mathematics and English Language Arts (mix of both)';
  }

  return `Generate 5 multiple-choice questions for a ${grade} grade student in ${subjectText}.
  
  Format the output strictly as a JSON array of objects with this structure:
  [
    {
      "id": 1,
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A"
    }
  ]
  
  Ensure the questions are appropriate for the grade level.`;
};

module.exports = { generateQuestionsPrompt };
