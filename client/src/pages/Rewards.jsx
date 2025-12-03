import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Medal, Crown, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import apiClient from '../api/apiClient';

const Rewards = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  const badges = [
    { name: 'Early Bird', icon: Star, earned: true, color: 'yellow' },
    { name: 'Math Whiz', icon: Trophy, earned: true, color: 'blue' },
    { name: 'Reading Master', icon: Award, earned: false, color: 'green' },
    { name: 'Perfect Score', icon: Medal, earned: false, color: 'purple' },
    { name: 'Week Warrior', icon: Crown, earned: false, color: 'orange' },
    { name: 'Speed Demon', icon: Zap, earned: false, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bubble font-bold text-blue-900 mb-2">My Rewards</h1>
        <p className="text-gray-600 mb-8">Collect badges as you learn and grow!</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-3xl p-6 shadow-lg border-2 ${
                  badge.earned ? 'border-yellow-400' : 'border-gray-200'
                } relative overflow-hidden`}
              >
                {badge.earned && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ✓ Earned
                    </div>
                  </div>
                )}
                
                <div className={`w-20 h-20 rounded-full ${
                  badge.earned ? `bg-${badge.color}-100` : 'bg-gray-100'
                } flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className={`w-10 h-10 ${
                    badge.earned ? `text-${badge.color}-600` : 'text-gray-400'
                  }`} />
                </div>
                
                <h3 className={`text-xl font-bubble font-bold text-center mb-2 ${
                  badge.earned ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {badge.name}
                </h3>
                
                {!badge.earned && (
                  <p className="text-gray-400 text-center text-sm">Keep learning to unlock!</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
