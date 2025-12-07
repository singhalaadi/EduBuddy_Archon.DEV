import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Book, Trophy, User, Settings, LogOut } from "lucide-react";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/subjects", icon: Book, label: "Subjects" },
    { path: "/rewards", icon: Trophy, label: "Rewards" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Book className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bubble font-bold text-blue-900">
              EduBuddy
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors ml-2"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;