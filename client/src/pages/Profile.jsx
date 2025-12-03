import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Award, BookOpen, Star, Flame } from 'lucide-react';
import apiClient from '../api/apiClient';
import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // In a real app, we'd get the ID from context/auth
        // For now, we'll fetch the 'me' endpoint assuming token is set
        const response = await apiClient.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Profile...</div>;
  if (!user) return <div className="p-8 text-center">Please log in to view profile.</div>;

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bubble text-blue-900 mb-8">My Profile</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-1">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-orange-50 p-4 rounded-2xl text-center">
                <div className="flex justify-center mb-2 text-orange-500"><Flame /></div>
                <div className="font-bold text-xl text-gray-800">{user.stats?.streak || 0}</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Day Streak</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-2xl text-center">
                <div className="flex justify-center mb-2 text-yellow-500"><Star /></div>
                <div className="font-bold text-xl text-gray-800">{user.stats?.points || 0}</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Total Points</div>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl text-center">
                <div className="flex justify-center mb-2 text-green-500"><Award /></div>
                <div className="font-bold text-xl text-gray-800">{user.stats?.level || 1}</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Current Level</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-500" /> Learning Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Level Progress</span>
                  <span className="font-bold text-blue-600">{user.stats?.progress || 0}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/2 rounded-full" style={{ width: `${user.stats?.progress || 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-bold text-green-600">{user.stats?.tasksCompleted || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="text-purple-500" /> Recent Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-bold">Early Bird</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">Math Whiz</span>
              <span className="bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-sm font-bold border border-dashed border-gray-300">???</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
