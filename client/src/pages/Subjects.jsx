import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Calculator, Globe, Palette, Music, Code } from 'lucide-react';
import Navbar from '../components/Navbar';
import apiClient from '../api/apiClient';

const Subjects = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  const subjects = [
    { name: 'Mathematics', icon: Calculator, color: 'blue', description: 'Numbers, algebra, geometry' },
    { name: 'English', icon: Book, color: 'green', description: 'Reading, writing, grammar' },
    { name: 'Science', icon: Globe, color: 'purple', description: 'Biology, chemistry, physics' },
    { name: 'Art', icon: Palette, color: 'pink', description: 'Drawing, painting, creativity' },
    { name: 'Music', icon: Music, color: 'yellow', description: 'Rhythm, melody, instruments' },
    { name: 'Coding', icon: Code, color: 'indigo', description: 'Programming, logic, algorithms' },
  ];

  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 to-pink-600',
    yellow: 'from-yellow-400 to-yellow-600',
    indigo: 'from-indigo-400 to-indigo-600',
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bubble font-bold text-blue-900 mb-2">Explore Subjects</h1>
        <p className="text-gray-600 mb-8">Choose a subject to start learning!</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[subject.color]} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bubble font-bold text-gray-800 mb-2">{subject.name}</h3>
                <p className="text-gray-500">{subject.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
