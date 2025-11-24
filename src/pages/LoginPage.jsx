import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <TrendingUp className="w-10 h-10 text-accent-cyan" />
            <span className="text-2xl font-bold text-accent-cyan">CSE INSIGHT</span>
          </Link>
          <h2
            className={`mt-6 text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Welcome Back
          </h2>
          <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl shadow-xl ${
            isDark
              ? 'bg-[#16213e]/80 border border-purple-800/50'
              : 'bg-white border border-gray-200'
          }`}
        >
          {/* Demo credentials notice */}
          <div
            className={`mb-6 p-4 rounded-lg text-sm ${
              isDark
                ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            <p className="font-medium">Demo Credentials:</p>
            <p>Email: demo@cseinsight.lk</p>
            <p>Password: demo123</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-purple-400' : 'text-gray-400'
                }`}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  isDark
                    ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-purple-400' : 'text-gray-400'
                }`}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  isDark
                    ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-purple-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-purple-800 text-accent-cyan focus:ring-accent-cyan"
              />
              <span
                className={`ml-2 text-sm ${
                  isDark ? 'text-purple-200' : 'text-gray-600'
                }`}
              >
                Remember me
              </span>
            </label>
            <a
              href="#"
              className={`text-sm font-medium ${
                isDark
                  ? 'text-accent-cyan hover:text-accent-cyan/80'
                  : 'text-emerald-600 hover:text-emerald-500'
              }`}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-gray-900 bg-accent-cyan hover:bg-accent-cyan/90 transition-all hover:shadow-lg hover:shadow-accent-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p
          className={`mt-6 text-center text-sm ${
            isDark ? 'text-purple-200' : 'text-gray-600'
          }`}
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            className={`font-medium ${
              isDark
                ? 'text-accent-cyan hover:text-accent-cyan/80'
                : 'text-emerald-600 hover:text-emerald-500'
            }`}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
