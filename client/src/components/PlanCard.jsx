import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, ExternalLink } from 'lucide-react';

const PlanCard = ({ dayPlan }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          {dayPlan.day}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
          {dayPlan.topic}
        </span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
          <BookOpen className="w-4 h-4 mr-1" /> Activities
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {dayPlan.activities.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>

      {dayPlan.resources && dayPlan.resources.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <ExternalLink className="w-4 h-4 mr-1" /> Resources
          </h4>
          <div className="flex flex-wrap gap-2">
            {dayPlan.resources.map((resource, idx) => (
              <span key={idx} className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                {resource}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PlanCard;
