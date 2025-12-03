const learningPlanPrompt = (analysis, grade, subject) => {
    return `Create a weekly learning plan for a ${grade} grade student in ${subject} based on the following analysis:
  ${JSON.stringify(analysis)}
  
  Format the output strictly as a JSON object with this structure:
  {
    "weekTitle": "Focus Week: Topic Name",
    "days": [
      {
        "day": "Monday",
        "topic": "Sub-topic Name",
        "activities": ["Activity 1", "Activity 2"],
        "resources": ["Link or Book reference"]
      }
    ]
  }
  
  Ensure the plan addresses the student's weaknesses and reinforces their strengths.`;
};

module.exports = { learningPlanPrompt };
