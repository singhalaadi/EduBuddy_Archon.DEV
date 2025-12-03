import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userGrade, setUserGrade] = useState('');
  const [userSubject, setUserSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    userGrade,
    setUserGrade,
    userSubject,
    setUserSubject,
    questions,
    setQuestions,
    assessmentResults,
    setAssessmentResults,
    learningPlan,
    setLearningPlan,
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
