import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Eye, EyeOff, Mail, Lock, User, Check, X } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  // Password validation
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PasswordCheck = ({ valid, label }) => (
    <div className="flex items-center gap-2 text-sm">
      {valid ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <X size={16} className="text-red-400" />
      )}
      <span className={valid ? 'text-green-400' : isDark ? 'text-purple-300' : 'text-gray-500'}>
        {label}
      </span>
    </div>
  );

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
            Create Account
          </h2>
          <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
            Start your investment journey today
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
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-purple-400' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={3}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  isDark
                    ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="Enter your full name"
              />
            </div>
          </div>

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
                placeholder="Create a password"
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

            {/* Password Requirements */}
            {formData.password && (
              <div className="mt-3 space-y-1">
                <PasswordCheck valid={passwordChecks.length} label="At least 8 characters" />
                <PasswordCheck valid={passwordChecks.uppercase} label="One uppercase letter" />
                <PasswordCheck valid={passwordChecks.number} label="One number" />
                <PasswordCheck valid={passwordChecks.special} label="One special character" />
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-purple-400' : 'text-gray-400'
                }`}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  isDark
                    ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } ${
                  formData.confirmPassword &&
                  (passwordsMatch ? 'border-green-500' : 'border-red-500')
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-purple-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-sm text-red-400">Passwords do not match</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded border-purple-800 text-accent-cyan focus:ring-accent-cyan"
              />
              <span
                className={`ml-2 text-sm ${
                  isDark ? 'text-purple-200' : 'text-gray-600'
                }`}
              >
                I agree to the{' '}
                <a href="#" className="text-accent-cyan hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-accent-cyan hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isPasswordValid || !passwordsMatch || !formData.agreeTerms}
            className="w-full py-3 rounded-lg font-semibold text-gray-900 bg-accent-cyan hover:bg-accent-cyan/90 transition-all hover:shadow-lg hover:shadow-accent-cyan/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p
          className={`mt-6 text-center text-sm ${
            isDark ? 'text-purple-200' : 'text-gray-600'
          }`}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className={`font-medium ${
              isDark
                ? 'text-accent-cyan hover:text-accent-cyan/80'
                : 'text-emerald-600 hover:text-emerald-500'
            }`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
