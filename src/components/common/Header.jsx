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
      className={`fixed top-0 w-full z-50 px-6 py-4 transition-colors duration-300 ${
        isDark
          ? 'bg-[#0a0e27]/90 backdrop-blur-md border-b border-purple-900/50'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-accent-cyan" />
          <span className="text-xl font-bold tracking-wide text-accent-cyan">
            CSE INSIGHT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.children ? (
                <>
                  <button
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      isDark
                        ? 'text-purple-200 hover:text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden transition-all duration-200 ${
                      activeDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-2'
                    } ${
                      isDark
                        ? 'bg-[#16213e]/95 backdrop-blur-md border border-purple-800'
                        : 'bg-white border border-gray-200 shadow-lg'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          isDark
                            ? 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        } ${isActivePath(child.path) ? 'bg-accent-cyan/10 text-accent-cyan' : ''}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'text-accent-cyan'
                      : isDark
                      ? 'text-purple-200 hover:text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? 'bg-purple-800/50 text-yellow-300 hover:bg-purple-700/50'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User size={18} className={isDark ? 'text-purple-200' : 'text-gray-600'} />
                <span className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-700'}`}>
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? 'text-purple-200 hover:text-white hover:bg-purple-800/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-purple-600 text-white hover:bg-purple-500'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full text-sm font-semibold bg-accent-cyan text-gray-900 transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent-cyan/30"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDark ? 'bg-purple-800/50 text-yellow-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={isDark ? 'text-white' : 'text-gray-900'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden fixed inset-0 top-[72px] z-40 px-6 py-8 overflow-y-auto ${
            isDark ? 'bg-[#0a0e27]' : 'bg-white'
          }`}
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      className={`text-xl font-bold flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="flex flex-col gap-4 mt-4 items-center">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            className={`text-lg ${
                              isDark ? 'text-purple-200' : 'text-gray-600'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-4 mt-8 px-8">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`px-6 py-3 rounded-full font-bold ${
                    isDark ? 'bg-purple-600 text-white' : 'bg-gray-800 text-white'
                  }`}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-6 py-3 rounded-full font-bold text-center ${
                      isDark ? 'bg-purple-600 text-white' : 'bg-gray-800 text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-3 rounded-full font-bold text-center bg-accent-cyan text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
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
