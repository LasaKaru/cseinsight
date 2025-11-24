import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { TrendingUp, Linkedin, Instagram, Facebook, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { isDark } = useTheme();

  const footerLinks = {
    platform: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Companies', path: '/companies' },
      { label: 'Predictions', path: '/predictions' },
      { label: 'AI Chatbot', path: '/chatbot' },
    ],
    resources: [
      { label: 'Wiki', path: '/wiki' },
      { label: 'Brokers', path: '/brokers' },
      { label: 'Dividend Calendar', path: '/dividend-calendar' },
      { label: 'Document Analyzer', path: '/document-analyzer' },
    ],
    external: [
      { label: 'CSE Website', href: 'https://www.cse.lk' },
      { label: 'SEC Sri Lanka', href: 'https://www.sec.gov.lk' },
    ],
  };

  const socialLinks = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className={`${isDark ? 'bg-[#060912]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="w-7 h-7 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                CSE INSIGHT
              </span>
            </Link>
            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              AI-powered market intelligence platform helping Sri Lankan investors make
              smarter decisions in the Colombo Stock Exchange.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    isDark
                      ? 'text-gray-500 hover:text-cyan-400 hover:bg-white/5'
                      : 'text-gray-400 hover:text-cyan-500 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              External
            </h4>
            <ul className="space-y-3">
              {footerLinks.external.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`py-6 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              &copy; {new Date().getFullYear()} CSE Insight. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
