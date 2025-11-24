import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  TrendingUp,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard', protected: true },
    { label: 'Wiki', path: '/wiki' },
    {
      label: 'Tools',
      children: [
        { label: 'AI Chatbot', path: '/chatbot', protected: true },
        { label: 'Document Analyzer', path: '/document-analyzer', protected: true },
        { label: 'Predictions', path: '/predictions', protected: true },
        { label: 'Dividend Calendar', path: '/dividend-calendar', protected: true },
        { label: 'Brokers', path: '/brokers' },
      ],
    },
    { label: 'Companies', path: '/companies', protected: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDark
          ? 'bg-[#0a0e27]/95 backdrop-blur-xl border-b border-violet-500/10'
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <TrendingUp className="w-8 h-8 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              CSE INSIGHT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 rounded-xl overflow-hidden transition-all duration-200 ${
                        activeDropdown === item.label
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      } ${
                        isDark
                          ? 'bg-[#1a1f3e] border border-violet-500/20 shadow-xl shadow-black/20'
                          : 'bg-white border border-gray-200 shadow-xl shadow-gray-200/50'
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActivePath(child.path)
                                ? 'bg-cyan-500/10 text-cyan-400'
                                : isDark
                                ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : isDark
                        ? 'text-gray-300 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDark
                  ? 'bg-violet-500/10 text-yellow-400 hover:bg-violet-500/20 border border-violet-500/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
                }`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-violet-500/20' : 'bg-gray-200'
                  }`}>
                    <User size={14} className={isDark ? 'text-violet-400' : 'text-gray-600'} />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    isDark
                      ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                      : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white/5 border border-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark ? 'bg-violet-500/10 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                isDark ? 'text-white hover:bg-white/5' : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 top-16 z-40 overflow-y-auto ${
            isDark ? 'bg-[#0a0e27]' : 'bg-white'
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div className="space-y-1">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                        isDark ? 'text-white hover:bg-white/5' : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                              isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                      isActivePath(item.path)
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : isDark
                        ? 'text-white hover:bg-white/5'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-6 space-y-3">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl font-semibold ${
                    isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-600 border border-red-200'
                  }`}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block w-full px-4 py-3 rounded-xl font-semibold text-center ${
                      isDark ? 'bg-white/5 text-white border border-white/10' : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 rounded-xl font-semibold text-center bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
