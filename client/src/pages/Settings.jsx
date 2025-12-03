import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Moon, Bell, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import apiClient from '../api/apiClient';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar onLogout={handleLogout} />
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bubble text-blue-900 mb-8">Settings</h1>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Volume2 />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Sound Effects</h3>
                  <p className="text-sm text-gray-500">Play sounds during quizzes</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                  <Moon />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Easier on the eyes at night</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                  <Bell />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Notifications</h3>
                  <p className="text-sm text-gray-500">Reminders to practice</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-xl text-green-600">
                  <Shield />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Parental Controls</h3>
                  <p className="text-sm text-gray-500">Manage content difficulty</p>
                </div>
              </div>
              <button className="text-blue-600 font-bold text-sm hover:underline">Manage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
