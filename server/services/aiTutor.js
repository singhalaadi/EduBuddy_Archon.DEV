const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AITutorService {
  /**
   * Generate personalized learning content based on user profile
   */
  async generatePersonalizedContent(topic, userProfile) {
    try {
      const prompt = `You are an expert AI tutor. Create personalized learning content about "${topic}".
      
User Learning Profile:
- Learning Style: ${userProfile.preferredStyle}
- Difficulty Level: ${userProfile.difficultyLevel}
- Interests: ${userProfile.interests.join(', ')}
- Goals: ${userProfile.learningGoals.join(', ')}

Please provide:
1. A clear explanation tailored to their learning style
2. Real-world examples relevant to their interests
3. Practice exercises appropriate for their level
4. Next learning steps

Keep the tone encouraging and adaptive.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Content Generation Error:', error);
      throw new Error('Failed to generate personalized content');
    }
  }

  /**
   * Interactive tutoring chat
   */
  async chat(messages, context = {}) {
    try {
      const systemPrompt = `You are an intelligent, patient, and encouraging AI tutor. Your goals are to:
1. Help students understand concepts deeply, not just give answers
2. Use the Socratic method to guide learning through questions
3. Adapt explanations to the student's level
4. Provide relevant examples and analogies
5. Encourage critical thinking and problem-solving

${context.courseInfo ? `Current Course: ${context.courseInfo}` : ''}
${context.userLevel ? `Student Level: ${context.userLevel}` : ''}`;

      const chatMessages = [
        { role: "system", content: systemPrompt },
        ...messages
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: chatMessages,
        temperature: 0.8,
        max_tokens: 800
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Chat Error:', error);
      throw new Error('Failed to process chat message');
    }
  }

  /**
   * Generate adaptive quiz questions
   */
  async generateQuiz(topic, difficulty, questionCount = 5) {
    try {
      const prompt = `Generate ${questionCount} multiple-choice quiz questions about "${topic}" at ${difficulty} level.

Format each question as JSON:
{
  "question": "question text",
  "options": ["option1", "option2", "option3", "option4"],
  "correctAnswer": 0-3,
  "explanation": "why this answer is correct"
}

Return an array of questions.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content;
      // Extract JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse quiz questions');
    } catch (error) {
      console.error('Quiz Generation Error:', error);
      throw new Error('Failed to generate quiz');
    }
  }

  /**
   * Provide personalized feedback on student work
   */
  async provideFeedback(studentAnswer, correctAnswer, question) {
    try {
      const prompt = `Provide constructive feedback on this student answer:

Question: ${question}
Correct Answer: ${correctAnswer}
Student Answer: ${studentAnswer}

Give:
1. Assessment (correct/partially correct/incorrect)
2. Explanation of what's right/wrong
3. Hints to guide them to the right understanding
4. Encouragement

Be supportive and educational.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Feedback Generation Error:', error);
      throw new Error('Failed to generate feedback');
    }
  }

  /**
   * Analyze learning progress and provide recommendations
   */
  async analyzeProgress(progressData) {
    try {
      const prompt = `Analyze this student's learning progress and provide personalized recommendations:

Completed Lessons: ${progressData.completedLessons.length}
Overall Progress: ${progressData.overallProgress}%
Strengths: ${progressData.strengths.join(', ') || 'Not yet identified'}
Weaknesses: ${progressData.weaknesses.join(', ') || 'Not yet identified'}
Study Streak: ${progressData.studyStreak} days

Provide:
1. Progress assessment
2. Identified patterns
3. Areas to focus on
4. Specific next steps
5. Motivational message`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 600
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Progress Analysis Error:', error);
      throw new Error('Failed to analyze progress');
    }
  }

  /**
   * Generate a complete course structure
   */
  async generateCourse(topic, difficulty, lessonCount = 10) {
    try {
      const prompt = `Create a comprehensive ${difficulty}-level course structure about "${topic}" with ${lessonCount} lessons.

For each lesson, provide:
- Title
- Description
- Key concepts
- Estimated time (in minutes)

Return as JSON array of lessons.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2500
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse course structure');
    } catch (error) {
      console.error('Course Generation Error:', error);
      throw new Error('Failed to generate course');
    }
  }

  /**
   * Explain a concept in simple terms
   */
  async explainConcept(concept, context = '') {
    try {
      const prompt = `Explain "${concept}" in a clear, simple way${context ? ` in the context of ${context}` : ''}.

Use:
- Simple language
- Relevant analogies
- Real-world examples
- Step-by-step breakdown if complex

Make it easy to understand and engaging.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 800
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Concept Explanation Error:', error);
      throw new Error('Failed to explain concept');
    }
  }
}

module.exports = new AITutorService();
