import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Globe,
  Volume2,
  Download,
  ChevronRight,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";
import apiClient from "../api/apiClient";

const AdaptiveAssessment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [language, setLanguage] = useState("english");
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete apiClient.defaults.headers.common["x-auth-token"];
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      apiClient.defaults.headers.common["x-auth-token"] = token;
      const response = await apiClient.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/login");
    }
  };

  const startAssessment = async (selectedGrade, selectedSubject) => {
    setGrade(selectedGrade);
    setSubject(selectedSubject);
    setShowWelcome(false);
    setLoading(true);

    try {
      const response = await apiClient.post("/adaptive/adaptive-questions", {
        grade: selectedGrade,
        subject: selectedSubject,
      });

      setQuestions(response.data.questions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions. Please try again.");
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment();
    }
  };

  const submitAssessment = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/adaptive/evaluate-adaptive", {
        questions,
        userAnswers: answers,
        grade,
        subject,
      });

      setEvaluation(response.data.evaluation);
      setShowResults(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to evaluate. Please try again.");
      setLoading(false);
    }
  };

  const generateLearningPlan = async () => {
    navigate("/learning-plan", { state: { evaluation, grade, subject } });
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navbar onLogout={handleLogout} />
        <div className="max-w-4xl mx-auto p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-full">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bubble font-bold text-blue-900 mb-4">
              {language === "english"
                ? "Hi! I'm your AI Learning Buddy! 🎓"
                : "नमस्ते! मैं आपका AI सीखने का साथी हूँ! 🎓"}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {language === "english"
                ? "Let's start with some fun questions to see what you already know!"
                : "आइए कुछ मज़ेदार सवालों से शुरू करें!"}
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setLanguage("english")}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  language === "english"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 border-2 border-gray-200"
                }`}
              >
                <Globe className="inline mr-2" size={20} />
                English
              </button>
              <button
                onClick={() => setLanguage("hindi")}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  language === "hindi"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 border-2 border-gray-200"
                }`}
              >
                <Globe className="inline mr-2" size={20} />
                हिंदी
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100"
            >
              <h3 className="text-2xl font-bubble font-bold text-blue-900 mb-4">
                {language === "english"
                  ? "Choose Your Grade"
                  : "अपनी कक्षा चुनें"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`p-4 rounded-xl font-bold transition-all ${
                      grade === g
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100"
            >
              <h3 className="text-2xl font-bubble font-bold text-purple-900 mb-4">
                {language === "english" ? "Choose Subject" : "विषय चुनें"}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    value: "Math",
                    label: "Mathematics",
                    labelHindi: "गणित",
                    icon: "🔢",
                  },
                  {
                    value: "English",
                    label: "English",
                    labelHindi: "अंग्रेज़ी",
                    icon: "📚",
                  },
                  {
                    value: "Both",
                    label: "Both (Mixed)",
                    labelHindi: "दोनों",
                    icon: "🎯",
                  },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSubject(s.value)}
                    className={`w-full p-4 rounded-xl font-bold transition-all text-left flex items-center gap-3 ${
                      subject === s.value
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <span>
                      {language === "english" ? s.label : s.labelHindi}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {grade && subject && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <button
                onClick={() => startAssessment(grade, subject)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              >
                {language === "english"
                  ? "🚀 Start Learning Journey!"
                  : "🚀 सीखना शुरू करें!"}
                <ChevronRight className="inline ml-2" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">
            {language === "english"
              ? "Preparing your questions..."
              : "आपके प्रश्न तैयार हो रहे हैं..."}
          </p>
        </div>
      </div>
    );
  }

  if (showResults && evaluation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navbar onLogout={handleLogout} />
        <div className="max-w-4xl mx-auto p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full mb-4">
                <Award className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl font-bubble font-bold text-gray-800 mb-2">
                {language === "english" ? "Great Job!" : "बहुत बढ़िया!"}
              </h2>
              <p className="text-2xl text-gray-600">
                {language === "english"
                  ? evaluation.encouragement
                  : evaluation.encouragementHindi}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <Star className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {evaluation.score}%
                </div>
                <div className="text-gray-600 font-medium">
                  {language === "english" ? "Your Score" : "आपका स्कोर"}
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-green-600 mb-1">
                  {evaluation.correctAnswers}
                </div>
                <div className="text-gray-600 font-medium">
                  {language === "english" ? "Correct Answers" : "सही उत्तर"}
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600 mb-1 capitalize">
                  {evaluation.currentLevel}
                </div>
                <div className="text-gray-600 font-medium">
                  {language === "english" ? "Your Level" : "आपका स्तर"}
                </div>
              </div>
            </div>

            {evaluation.strengths.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                  <Star className="fill-green-500" />
                  {language === "english"
                    ? "You're Great At:"
                    : "आप इसमें महान हैं:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {evaluation.strengths.map((strength, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                    >
                      ✓ {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {evaluation.weaknesses.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
                  <Target />
                  {language === "english"
                    ? "Let's Practice:"
                    : "आइए अभ्यास करें:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {evaluation.weaknesses.map((weakness, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium"
                    >
                      📚 {weakness}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={generateLearningPlan}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
            >
              {language === "english"
                ? "📅 Get My Personalized Learning Plan"
                : "📅 मेरी व्यक्तिगत योजना प्राप्त करें"}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Safety check - if no questions loaded, show loading
  if (!question || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-bold text-gray-700">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar onLogout={handleLogout} />
      <div className="max-w-3xl mx-auto p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-gray-600">
              {language === "english" ? "Question" : "प्रश्न"}{" "}
              {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
          >
            <div className="mb-6">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                {question?.topic}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === "english"
                  ? question?.question
                  : question?.questionHindi}
              </h2>
            </div>

            <div className="space-y-3">
              {question?.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    answers[question.id] === option
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
                  }`}
                >
                  <span className="font-bold mr-3">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {language === "english"
                    ? option
                    : question?.optionsHindi?.[idx]}
                </button>
              ))}
            </div>

            {answers[question.id] && (
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={handleNext}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {currentQuestion < questions.length - 1
                  ? language === "english"
                    ? "Next Question →"
                    : "अगला प्रश्न →"
                  : language === "english"
                  ? "✓ Finish Assessment"
                  : "✓ मूल्यांकन समाप्त करें"}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Language Toggle */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() =>
              setLanguage(language === "english" ? "hindi" : "english")
            }
            className="bg-white px-6 py-3 rounded-xl font-bold text-gray-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Volume2 size={20} />
            {language === "english" ? "Switch to Hindi" : "अंग्रेज़ी में बदलें"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveAssessment;