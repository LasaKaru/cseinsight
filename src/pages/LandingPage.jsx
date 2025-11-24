import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  BookOpen,
  LayoutGrid,
  BrainCircuit,
  Calendar,
  TrendingUp,
  FileText,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
} from 'lucide-react';

const LandingPage = () => {
  const { isDark } = useTheme();

  const features = [
    {
      title: 'Wiki Navigator',
      icon: <BookOpen size={24} />,
      desc: 'Comprehensive learning platform covering CSE fundamentals, trading strategies, and market analysis.',
      gradient: 'from-emerald-500 to-teal-500',
      link: '/wiki',
    },
    {
      title: 'Market Dashboard',
      icon: <TrendingUp size={24} />,
      desc: 'Real-time market data, trending stocks, and comprehensive market movement analysis.',
      gradient: 'from-violet-500 to-purple-500',
      link: '/dashboard',
    },
    {
      title: 'Company Profiles',
      icon: <LayoutGrid size={24} />,
      desc: 'AI-powered company analysis with automated report summaries and performance analytics.',
      gradient: 'from-blue-500 to-cyan-500',
      link: '/companies',
    },
    {
      title: 'AI Predictions',
      icon: <BrainCircuit size={24} />,
      desc: 'Machine learning models to forecast market trends and identify opportunities.',
      gradient: 'from-pink-500 to-rose-500',
      link: '/predictions',
    },
    {
      title: 'Dividend Calendar',
      icon: <Calendar size={24} />,
      desc: 'Track ex-dates, payment schedules, and optimize your passive income strategy.',
      gradient: 'from-amber-500 to-orange-500',
      link: '/dividend-calendar',
    },
    {
      title: 'Document Analyzer',
      icon: <FileText size={24} />,
      desc: 'AI analysis of financial reports with automated summaries and recommendations.',
      gradient: 'from-cyan-500 to-blue-500',
      link: '/document-analyzer',
    },
  ];

  const stats = [
    { value: '290+', label: 'Listed Companies', icon: <BarChart3 size={20} /> },
    { value: '24/7', label: 'AI Assistant', icon: <Sparkles size={20} /> },
    { value: '100+', label: 'Wiki Articles', icon: <BookOpen size={20} /> },
    { value: 'Live', label: 'Market Data', icon: <Zap size={20} /> },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`} />

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 mb-8">
              <Sparkles size={16} className="text-cyan-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                AI-Powered Investment Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Unlock Your
              <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Investment Potential
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`max-w-2xl mx-auto text-lg sm:text-xl mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Master the Colombo Stock Exchange with AI-driven insights, real-time data,
              and comprehensive educational resources.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group relative px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/dashboard"
                className={`px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                View Dashboard
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: <Shield size={18} />, text: 'Secure & Private' },
                { icon: <Zap size={18} />, text: 'Real-time Data' },
                { icon: <Sparkles size={18} />, text: 'AI-Powered' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${isDark ? 'bg-[#0a0e27]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Everything You Need to Invest Smarter
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Powerful tools and insights designed to help you make informed investment decisions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={`group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1]'
                    : 'bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50'
                }`}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <div className="text-white">{feature.icon}</div>
                </div>

                {/* Content */}
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>

                {/* Link */}
                <div className="flex items-center gap-1.5 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Explore
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDark ? 'bg-[#0d1229]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl text-center overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05]'
                    : 'bg-white border border-gray-100 shadow-sm'
                }`}
              >
                <div className={`inline-flex p-2 rounded-lg mb-3 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-50'}`}>
                  <div className="text-cyan-500">{stat.icon}</div>
                </div>
                <div className={`text-3xl sm:text-4xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-24 ${isDark ? 'bg-[#0a0e27]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Democratizing Investment
                <span className="block text-cyan-400">in Sri Lanka</span>
              </h2>
              <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                CSE Insight is an AI-powered investment platform designed to make stock market
                investing accessible to every Sri Lankan. We combine cutting-edge technology
                with comprehensive education.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Our mission is to bridge the knowledge gap and provide tools that help you
                make informed decisions in the Colombo Stock Exchange.
              </p>
              <Link
                to="/wiki"
                className={`inline-flex items-center gap-2 mt-8 text-cyan-400 font-medium hover:text-cyan-300 transition-colors`}
              >
                Learn more about investing
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Visual Element */}
            <div className={`relative p-8 rounded-3xl ${isDark ? 'bg-white/[0.02] border border-white/[0.05]' : 'bg-gray-50 border border-gray-100'}`}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Active Users', value: '5,000+' },
                  { label: 'Daily Trades', value: '15K+' },
                  { label: 'Success Rate', value: '94%' },
                  { label: 'Avg. Returns', value: '+18%' },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`}>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.value}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${isDark ? 'bg-gradient-to-b from-[#0a0e27] to-[#0d1229]' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Start Your Journey?
          </h2>
          <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of Sri Lankan investors making smarter decisions with CSE Insight.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-900 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
