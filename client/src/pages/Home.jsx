import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import apiClient from '../api/apiClient';
import { 
  Home as HomeIcon, Book, Trophy, User, Settings, 
  Flame, Star, Play, Lock, HelpCircle, Video, CheckCircle,
  Menu, X, LogOut
} from 'lucide-react';

const Home = () => {
  const { setUserGrade, setUserSubject, setQuestions, setLoading } = useAppContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Student",
    stats: { streak: 0, points: 0, level: 1, progress: 0, tasksCompleted: 0 }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          // No token, redirect to login
          navigate('/login');
          return;
        }

        // Set token in headers
        apiClient.defaults.headers.common['x-auth-token'] = token;

        // Fetch user data
        const userRes = await apiClient.get('/auth/me');
        setUser(userRes.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        // If token is invalid, clear it and redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleStartLearning = () => {
    // Navigate to the new adaptive assessment
    navigate('/adaptive-assessment');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['x-auth-token'];
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] font-sans flex text-gray-800 relative overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 p-6 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Book className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bubble font-bold text-blue-900">EduBuddy</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<HomeIcon />} label="Home" active onClick={() => navigate('/')} />
          <NavItem icon={<Book />} label="Subjects" onClick={() => navigate('/subjects')} />
          <NavItem icon={<Trophy />} label="Rewards" onClick={() => navigate('/rewards')} />
          <NavItem icon={<User />} label="Profile" onClick={() => navigate('/profile')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
          <NavItem icon={<Settings />} label="Settings" onClick={() => navigate('/settings')} />
          <NavItem icon={<LogOut />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 flex items-center justify-between bg-white border-b border-gray-100">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-bubble font-bold text-blue-900">EduBuddy</span>
          <div className="w-8 h-8 bg-pink-200 rounded-full overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
          
          {/* Center Dashboard */}
          <div className="flex-1 space-y-8">
            {/* Header Section */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bubble font-bold text-blue-900">Hello, {user.name}!</h1>
                <p className="text-gray-500 font-reading">Ready to learn today?</p>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100 self-start">
                <div className="w-10 h-10 bg-pink-100 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" />
                </div>
                <div className="flex items-center gap-2 px-2 border-r border-gray-200">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                  <span className="font-bold text-gray-700">{user.stats?.streak || 0} Days</span>
                </div>
                <div className="flex items-center gap-2 px-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-700">{user.stats?.points || 0}</span>
                </div>
              </div>
            </header>

            {/* Hero Banner */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-blue-50 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl font-bubble font-bold text-blue-900 mb-2">Today's Mission</h2>
                <p className="text-blue-600 font-medium mb-6">Mathematics: Counting</p>
                <button 
                  onClick={handleStartLearning}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all transform hover:scale-105"
                >
                  Start Learning
                </button>
              </div>
              
              {/* Decorative Image Placeholder */}
              <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
                 <img 
                   src="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop" 
                   alt="Learning Math" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </motion.div>

            {/* Subject Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Math Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase">Math</span>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">🔢</div>
                </div>
                <h3 className="text-xl font-bubble font-bold text-gray-800 mb-1">Fun Numbers</h3>
                <p className="text-gray-400 text-sm mb-6">Master counting and basic math</p>
                <button 
                  onClick={handleStartLearning}
                  className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-colors"
                >
                  Continue
                </button>
              </motion.div>

              {/* English Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col opacity-80"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase">English</span>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">📚</div>
                </div>
                <h3 className="text-xl font-bubble font-bold text-gray-800 mb-1">Story Time</h3>
                <p className="text-gray-400 text-sm mb-6">Read amazing stories</p>
                <button disabled className="mt-auto w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock className="w-4 h-4" /> Locked
                </button>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-6">
              <button className="bg-pink-50 hover:bg-pink-100 p-4 rounded-2xl flex items-center gap-4 transition-colors group">
                <div className="bg-pink-200 p-3 rounded-full text-pink-600 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-700">Practice Quiz</span>
              </button>
              <button className="bg-red-50 hover:bg-red-100 p-4 rounded-2xl flex items-center gap-4 transition-colors group">
                <div className="bg-red-200 p-3 rounded-full text-red-600 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-700">Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Progress Panel */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bubble font-bold text-gray-800 text-lg">Your Progress</h3>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Level {user.stats?.level || 1}</span>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="w-48 h-48 relative mb-4">
                  {/* Tree Illustration Placeholder */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                    <path d="M100 180 C 60 180, 40 150, 40 150 L 160 150 C 160 150, 140 180, 100 180 Z" fill="#5D4037" />
                    <rect x="85" y="100" width="30" height="60" fill="#795548" />
                    <circle cx="100" cy="80" r="50" fill="#8BC34A" />
                    <circle cx="70" cy="90" r="30" fill="#8BC34A" />
                    <circle cx="130" cy="90" r="30" fill="#8BC34A" />
                    <circle cx="100" cy="50" r="30" fill="#8BC34A" />
                    {/* Face */}
                    <circle cx="90" cy="100" r="2" fill="#333" />
                    <circle cx="110" cy="100" r="2" fill="#333" />
                    <path d="M95 105 Q 100 110, 105 105" stroke="#333" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm text-center">Keep learning to grow your tree! 🌿</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-600">Tasks</span>
                  </div>
                  <span className="font-bold text-gray-800">{user.stats?.tasksCompleted || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-600">Streak</span>
                  </div>
                  <span className="font-bold text-blue-600">Math</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{user.stats?.progress || 0}% to Level {(user.stats?.level || 1) + 1}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${user.stats?.progress || 0}%` }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`
    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-medium
    ${active 
      ? 'bg-blue-50 text-blue-600' 
      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
    }
  `}>
    {React.cloneElement(icon, { size: 20 })}
    <span>{label}</span>
  </button>
);

export default Home;
