import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, BookOpen, Target, Download, 
  CheckCircle, Clock, Star, Trophy, Home as HomeIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';
import apiClient from '../api/apiClient';

const LearningPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { evaluation, grade, subject } = location.state || {};
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('english');

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  useEffect(() => {
    if (!evaluation) {
      navigate('/adaptive-assessment');
      return;
    }
    generatePlan();
  }, []);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/plan/generate', {
        evaluation,
        grade,
        subject
      });
      
      setPlan(response.data.plan);
      setLoading(false);
    } catch (error) {
      console.error('Error generating plan:', error);
      // Use mock plan if API fails
      setPlan(getMockPlan());
      setLoading(false);
    }
  };

  const getMockPlan = () => ({
    greeting: `Great job! I can see you're doing well in ${subject}!`,
    greetingHindi: `बहुत बढ़िया! मैं देख सकता हूँ कि आप ${subject} में अच्छा कर रहे हैं!`,
    weekTitle: "Your Personalized Learning Week",
    weekTitleHindi: "आपका व्यक्तिगत सीखने का सप्ताह",
    motivationalMessage: "Let's work together to make you even better! Here's your plan:",
    motivationalMessageHindi: "आइए मिलकर आपको और बेहतर बनाएं! यह रहा आपका प्लान:",
    days: [
      {
        day: "Monday",
        dayHindi: "सोमवार",
        topic: "Fraction Fun",
        topicHindi: "भिन्न का मज़ा",
        activities: [
          "Pizza slice fractions game",
          "Compare 1/2 and 1/4 using pictures",
          "Practice 5 fraction comparison problems"
        ],
        activitiesHindi: [
          "पिज्जा स्लाइस भिन्न खेल",
          "चित्रों का उपयोग करके 1/2 और 1/4 की तुलना करें",
          "5 भिन्न तुलना समस्याओं का अभ्यास करें"
        ],
        resources: ["Fraction worksheets", "Visual aids"],
        estimatedTime: "30 minutes",
        difficultyLevel: "beginner"
      },
      {
        day: "Tuesday",
        dayHindi: "मंगलवार",
        topic: "Fraction Practice",
        topicHindi: "भिन्न अभ्यास",
        activities: [
          "Draw and color fractions",
          "Real-life fraction examples (रोटी, पानी)",
          "Fraction addition basics"
        ],
        activitiesHindi: [
          "भिन्न बनाएं और रंग भरें",
          "वास्तविक जीवन के भिन्न उदाहरण",
          "भिन्न जोड़ की मूल बातें"
        ],
        resources: ["Drawing materials", "Everyday objects"],
        estimatedTime: "30 minutes",
        difficultyLevel: "beginner"
      },
      {
        day: "Wednesday",
        dayHindi: "बुधवार",
        topic: "Fraction Challenge",
        topicHindi: "भिन्न चुनौती",
        activities: [
          "Solve 10 fraction problems",
          "Create your own fraction story",
          "Teach fractions to a family member"
        ],
        activitiesHindi: [
          "10 भिन्न समस्याओं को हल करें",
          "अपनी भिन्न कहानी बनाएं",
          "परिवार के सदस्य को भिन्न सिखाएं"
        ],
        resources: ["Practice sheets", "Story notebook"],
        estimatedTime: "40 minutes",
        difficultyLevel: "intermediate"
      },
      {
        day: "Thursday",
        dayHindi: "गुरुवार",
        topic: "English Reading",
        topicHindi: "अंग्रेज़ी पढ़ना",
        activities: [
          "Read 'The Brave Little Mouse' story",
          "Find 10 new words and their meanings",
          "Draw the story characters"
        ],
        activitiesHindi: [
          "'बहादुर छोटा चूहा' कहानी पढ़ें",
          "10 नए शब्द और उनके अर्थ खोजें",
          "कहानी के पात्र बनाएं"
        ],
        resources: ["Story book", "Dictionary", "Drawing book"],
        estimatedTime: "35 minutes",
        difficultyLevel: "beginner"
      },
      {
        day: "Friday",
        dayHindi: "शुक्रवार",
        topic: "Creative Writing",
        topicHindi: "रचनात्मक लेखन",
        activities: [
          "Write 3 sentences about your favorite animal",
          "Use new words from Thursday's story",
          "Share your writing with family"
        ],
        activitiesHindi: [
          "अपने पसंदीदा जानवर के बारे में 3 वाक्य लिखें",
          "गुरुवार की कहानी के नए शब्दों का उपयोग करें",
          "अपना लेखन परिवार के साथ साझा करें"
        ],
        resources: ["Writing notebook", "Pencil"],
        estimatedTime: "30 minutes",
        difficultyLevel: "beginner"
      }
    ],
    weekendChallenge: {
      title: "Math + English Mix Challenge",
      titleHindi: "गणित + अंग्रेज़ी मिश्रित चुनौती",
      description: "Create a story problem using fractions. Example: 'Ram ate 1/4 of a pizza. How much pizza is left?'",
      descriptionHindi: "भिन्न का उपयोग करके एक कहानी समस्या बनाएं। उदाहरण: 'राम ने पिज्जा का 1/4 भाग खाया। कितना पिज्जा बचा है?'",
      example: "Write 3 story problems and solve them!"
    },
    parentGuidance: {
      english: "Help your child practice daily. Encourage them and celebrate small wins!",
      hindi: "अपने बच्चे को रोज़ अभ्यास करने में मदद करें। उन्हें प्रोत्साहित करें और छोटी जीत का जश्न मनाएं!"
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">
            Creating your personalized plan...
          </p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-xl text-gray-600">No plan data available</p>
          <button
            onClick={() => navigate('/adaptive-assessment')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar onLogout={handleLogout} />
      
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full mb-4">
            <Calendar className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bubble font-bold text-blue-900 mb-2">
            {language === 'english' ? plan.weekTitle : plan.weekTitleHindi}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {language === 'english' ? plan.greeting : plan.greetingHindi}
          </p>
          <p className="text-lg text-gray-700 font-medium">
            {language === 'english' ? plan.motivationalMessage : plan.motivationalMessageHindi}
          </p>
        </motion.div>

        {/* Daily Plan Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {plan.days.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bubble font-bold text-blue-900">
                  {language === 'english' ? day.day : day.dayHindi}
                </h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl mb-4">
                <p className="font-bold text-center">
                  {language === 'english' ? day.topic : day.topicHindi}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                {(language === 'english' ? day.activities : day.activitiesHindi).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                <span>⏱️ {day.estimatedTime}</span>
                <span className="capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  {day.difficultyLevel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekend Challenge */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl p-8 text-white mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-10 h-10" />
            <h2 className="text-3xl font-bubble font-bold">
              {language === 'english' ? plan.weekendChallenge.title : plan.weekendChallenge.titleHindi}
            </h2>
          </div>
          <p className="text-lg mb-4">
            {language === 'english' ? plan.weekendChallenge.description : plan.weekendChallenge.descriptionHindi}
          </p>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="font-bold">💡 {plan.weekendChallenge.example}</p>
          </div>
        </motion.div>

        {/* Parent Guidance */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 shadow-xl mb-8"
        >
          <h3 className="text-xl font-bubble font-bold text-purple-900 mb-3 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            {language === 'english' ? 'For Parents' : 'माता-पिता के लिए'}
          </h3>
          <p className="text-gray-700">
            {language === 'english' ? plan.parentGuidance.english : plan.parentGuidance.hindi}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <HomeIcon size={24} />
            {language === 'english' ? 'Back to Home' : 'होम पर वापस जाएं'}
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Download size={24} />
            {language === 'english' ? 'Download Plan' : 'प्लान डाउनलोड करें'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPlan;
