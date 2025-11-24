import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { TrendingUp, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`py-12 px-6 md:px-20 ${
        isDark
          ? 'bg-[#0f0518] border-t border-purple-900/50'
          : 'bg-gray-100 border-t border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-accent-cyan" />
              <span className="text-2xl font-bold tracking-wide text-accent-cyan">
                CSE INSIGHT
              </span>
            </div>
            <p
              className={`max-w-md text-sm leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-600'
              }`}
            >
              AI-powered market intelligence platform for smart investors and
              traders in the Colombo Stock Exchange.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-4">
            <h4
              className={`font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Quick Links
            </h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                to="/wiki"
                className={`transition-colors ${
                  isDark
                    ? 'text-purple-200 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Wiki
              </Link>
              <Link
                to="/brokers"
                className={`transition-colors ${
                  isDark
                    ? 'text-purple-200 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Brokers
              </Link>
              <a
                href="https://www.cse.lk"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark
                    ? 'text-purple-200 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CSE Website
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {[
              { Icon: Linkedin, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Facebook, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? 'text-gray-500 hover:text-accent-cyan hover:bg-purple-800/50'
                    : 'text-gray-400 hover:text-accent-cyan hover:bg-gray-200'
                }`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-8 pt-8 border-t text-center text-sm ${
            isDark
              ? 'border-purple-900/50 text-purple-300'
              : 'border-gray-200 text-gray-500'
          }`}
        >
          <p>&copy; {new Date().getFullYear()} CSE Insight. All rights reserved.</p>
          <p className="mt-2">
            Made with care for Sri Lankan investors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
