import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import LearningPlan from './pages/LearningPlan';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Subjects from './pages/Subjects';
import Rewards from './pages/Rewards';
import AdaptiveAssessment from './pages/AdaptiveAssessment';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/adaptive-assessment" element={<AdaptiveAssessment />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/learning-plan" element={<LearningPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
