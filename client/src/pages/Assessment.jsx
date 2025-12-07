import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import apiClient from "../api/apiClient";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Trophy } from "lucide-react";

const Assessment = () => {
  const { questions, setAssessmentResults, loading, setLoading } =
    useAppContext();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/assessment/evaluate", {
        questions,
        userAnswers: answers,
      });
      setAssessmentResults(response.data.evaluation);
      setLoading(false);
      navigate("/learning-plan");
    } catch (error) {
      console.error("Error evaluating answers:", error);
      setLoading(false);
      alert("Failed to submit assessment.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-candy-mint flex flex-col items-center justify-center">
        <Loader text="Checking your super powers..." />
      </div>
    );

  if (!questions || questions.length === 0)
    return (
      <div className="p-10 text-center font-bubble">No questions loaded!</div>
    );

  return (
    <div className="min-h-screen bg-candy-mint p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8 bg-white/50 rounded-full h-6 p-1 relative">
          <motion.div
            className="bg-gradient-to-r from-kid-green to-kid-blue h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-0 right-0 -mt-8 bg-white px-3 py-1 rounded-lg font-bubble text-kid-blue shadow-sm">
            Question {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 border-b-8 border-gray-200"
          >
            <h2 className="text-2xl font-reading font-bold text-gray-700 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option)}
                    className={`p-4 rounded-2xl text-left font-reading text-lg transition-all border-2 ${
                      isSelected
                        ? "bg-kid-blue text-white border-kid-blue shadow-lg"
                        : "bg-gray-50 text-gray-600 border-gray-100 hover:border-kid-blue/50 hover:bg-blue-50"
                    }`}
                  >
                    <span className="inline-block w-8 h-8 bg-white/20 rounded-full text-center leading-8 mr-3 font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className={`px-8 py-3 rounded-full font-bubble text-xl text-white shadow-lg flex items-center ${
              answers[currentQuestion.id]
                ? "bg-kid-orange hover:bg-orange-500 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish!" : "Next"}
            {currentQuestionIndex === questions.length - 1 ? (
              <Trophy className="ml-2" />
            ) : (
              <ArrowRight className="ml-2" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;