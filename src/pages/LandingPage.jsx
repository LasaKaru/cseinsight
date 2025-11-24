import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  BookOpen,
  BarChart2,
  LayoutGrid,
  BrainCircuit,
  Calendar,
  TrendingUp,
  FileText,
  ArrowRight,
} from 'lucide-react';

const LandingPage = () => {
  const { isDark } = useTheme();

  const features = [
    {
      title: 'Wiki Navigator',
      icon: <BookOpen size={32} />,
      desc: 'Comprehensive learning platform covering CSE fundamentals, advanced trading strategies, and market analysis techniques.',
      color: 'emerald',
      borderColor: 'border-emerald-400',
      link: '/wiki',
    },
    {
      title: 'Daily Market Summary',
      icon: <TrendingUp size={32} />,
      desc: 'Get real-time market data, trending stocks, daily news updates, and comprehensive market movement analysis.',
      color: 'fuchsia',
      borderColor: 'border-fuchsia-400',
      link: '/dashboard',
    },
    {
      title: 'Company Dashboard',
      icon: <LayoutGrid size={32} />,
      desc: 'AI-powered company analysis with automated report summaries, financial metrics, and performance analytics.',
      color: 'blue',
      borderColor: 'border-blue-500',
      link: '/companies',
    },
    {
      title: 'AI Model Lab',
      icon: <BrainCircuit size={32} />,
      desc: 'Advanced predictive models using machine learning to forecast market trends and identify investment opportunities.',
      color: 'purple',
      borderColor: 'border-purple-400',
      link: '/predictions',
    },
    {
      title: 'Dividend Calendar',
      icon: <Calendar size={32} />,
      desc: 'Never miss dividend payments. Track ex-dates, payment schedules, and optimize your passive income strategy.',
      color: 'amber',
      borderColor: 'border-amber-400',
      link: '/dividend-calendar',
    },
    {
      title: 'Document Analyzer',
      icon: <FileText size={32} />,
      desc: 'AI-powered analysis of financial reports with automated summaries, key insights, and investment recommendations.',
      color: 'cyan',
      borderColor: 'border-cyan-400',
      link: '/document-analyzer',
    },
  ];

  // Graph background component
  const GraphBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Lines */}
      <div
        className={`absolute inset-0 opacity-10 ${
          isDark
            ? 'bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)]'
        } bg-[size:4rem_4rem]`}
      />

      {/* Candlesticks */}
      <div className="absolute bottom-0 left-0 right-0 h-full opacity-20 flex items-end justify-around px-10">
        {[40, 60, 30, 80, 50, 70, 45, 90, 30, 60, 80, 40].map((height, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-8 gap-1 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className={`w-0.5 h-10 ${isDark ? 'bg-emerald-400' : 'bg-emerald-800'}`} />
            <div
              style={{ height: `${height * 3}px` }}
              className={`w-4 rounded-sm ${
                i % 2 === 0
                  ? isDark
                    ? 'bg-emerald-500'
                    : 'bg-emerald-700'
                  : 'bg-red-400'
              }`}
            />
            <div className={`w-0.5 h-10 ${isDark ? 'bg-emerald-400' : 'bg-emerald-800'}`} />
          </div>
        ))}
      </div>

      {/* Main Trend Line */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <path
          d="M0,500 C200,450 400,550 600,300 C800,100 1000,200 1400,50"
          fill="none"
          stroke={isDark ? '#34d399' : '#065f46'}
          strokeWidth="4"
        />
      </svg>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-[#0a0e27]' : 'bg-gradient-to-b from-cyan-50 to-emerald-50'
      }`}
    >
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className={`absolute inset-0 bg-cover bg-center z-0 transition-colors duration-500 ${
            isDark ? 'bg-[#130825]' : 'bg-emerald-900'
          }`}
        >
          <GraphBackground />
        </div>

        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-t ${
            isDark
              ? 'from-[#0a0e27] via-transparent to-transparent'
              : 'from-emerald-50 via-transparent to-transparent'
          }`}
        />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            UNLOCK YOUR POTENTIAL WITH CSE INSIGHT
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 ${
              isDark ? 'text-purple-200' : 'text-emerald-100'
            }`}
          >
            AI-powered market intelligence platform for smart investors and traders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/wiki"
              className="px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl bg-accent-cyan text-gray-900"
            >
              Start Learning
            </Link>
            <Link
              to="/dashboard"
              className={`px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105 border-2 ${
                isDark
                  ? 'border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10'
                  : 'border-white text-white hover:bg-white/10'
              }`}
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`relative z-20 py-20 px-6 md:px-12 lg:px-20 -mt-20 ${
          isDark
            ? 'bg-gradient-to-b from-transparent to-[#0a0e27]'
            : 'bg-gradient-to-b from-transparent to-emerald-50'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Powerful Features for Smart Investing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={`
                  relative p-8 rounded-[2rem] border-2 backdrop-blur-sm
                  flex flex-col items-center text-center gap-4
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                  ${feature.borderColor}
                  ${
                    isDark
                      ? 'bg-[#16213e]/50 hover:bg-[#16213e]/80'
                      : 'bg-white/50 hover:bg-white'
                  }
                `}
              >
                <div
                  className={`p-4 rounded-xl mb-2 ${
                    isDark ? `bg-${feature.color}-500/20` : `bg-${feature.color}-100`
                  }`}
                >
                  <div className={isDark ? `text-${feature.color}-400` : `text-${feature.color}-600`}>
                    {feature.icon}
                  </div>
                </div>

                <h3
                  className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-purple-200' : 'text-gray-600'
                  }`}
                >
                  {feature.desc}
                </p>

                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isDark ? 'text-accent-cyan' : 'text-emerald-600'
                  }`}
                >
                  Learn More <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className={`py-20 px-6 md:px-12 lg:px-20 ${
          isDark ? 'bg-[#0f0518]' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Who We Are
            </h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                isDark ? 'text-purple-200' : 'text-gray-600'
              }`}
            >
              CSE Insight is an AI-powered investment assistant platform designed to
              democratize stock market investing in Sri Lanka. We combine education,
              real-time market insights, and AI-driven analysis to empower both novice
              and experienced investors.
            </p>
            <p
              className={`text-lg leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-600'
              }`}
            >
              Our mission is to bridge the knowledge gap and provide accessible tools
              that help you make informed investment decisions in the Colombo Stock
              Exchange.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '290+', label: 'Listed Companies' },
              { value: '24/7', label: 'AI Assistant' },
              { value: '100+', label: 'Wiki Articles' },
              { value: 'Real-time', label: 'Market Data' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl text-center ${
                  isDark ? 'bg-[#16213e]/50' : 'bg-gray-50'
                }`}
              >
                <div className="text-3xl font-bold text-accent-cyan mb-2">
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? 'text-purple-200' : 'text-gray-600'
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 px-6 md:px-12 lg:px-20 ${
          isDark ? 'bg-[#0a0e27]' : 'bg-emerald-50'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Ready to Start Your Investment Journey?
          </h2>
          <p
            className={`text-lg mb-8 ${
              isDark ? 'text-purple-200' : 'text-gray-600'
            }`}
          >
            Join thousands of Sri Lankan investors who are making smarter decisions
            with CSE Insight.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl bg-accent-cyan text-gray-900"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
