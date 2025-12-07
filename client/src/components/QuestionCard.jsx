import React from "react";
import { motion } from "framer-motion";

const QuestionCard = ({ question, selectedOption, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {question.question}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${
              selectedOption === option
                ? "bg-blue-50 border-blue-500 text-blue-700 shadow-md"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <span className="font-medium mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;