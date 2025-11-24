import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { cseService } from '../services/cseService';
import { Phone, Mail, Globe, Check, Search } from 'lucide-react';

const BrokersPage = () => {
  const { isDark } = useTheme();
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBrokers = async () => {
      setLoading(true);
      try {
        const data = await cseService.getBrokers();
        setBrokers(data);
      } catch (error) {
        console.error('Failed to fetch brokers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  const filteredBrokers = brokers.filter((broker) =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              CSE Brokers Directory
            </h1>
            <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
              Find a licensed stockbroker to start your investment journey
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-purple-400' : 'text-gray-400'
                }`}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search brokers..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                  isDark
                    ? 'bg-[#16213e] border-purple-800 text-white placeholder-purple-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrokers.map((broker) => (
                <div
                  key={broker.id}
                  className={`rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#16213e]/80 border border-purple-800/50 hover:border-accent-cyan/50'
                      : 'bg-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {broker.name}
                    </h3>
                    {broker.online && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                        <Check size={12} />
                        Online Trading
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone
                        size={16}
                        className={isDark ? 'text-purple-400' : 'text-gray-400'}
                      />
                      <a
                        href={`tel:${broker.phone}`}
                        className={`text-sm ${
                          isDark
                            ? 'text-purple-200 hover:text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {broker.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail
                        size={16}
                        className={isDark ? 'text-purple-400' : 'text-gray-400'}
                      />
                      <a
                        href={`mailto:${broker.email}`}
                        className={`text-sm ${
                          isDark
                            ? 'text-purple-200 hover:text-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {broker.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe
                        size={16}
                        className={isDark ? 'text-purple-400' : 'text-gray-400'}
                      />
                      <a
                        href={`https://${broker.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent-cyan hover:underline"
                      >
                        {broker.website}
                      </a>
                    </div>
                  </div>

                  <button
                    className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* How to Register */}
          <div
            className={`mt-12 rounded-2xl p-6 ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              How to Open a Trading Account
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Choose a Broker', desc: 'Select a broker that suits your needs' },
                { step: 2, title: 'Submit Documents', desc: 'NIC, proof of address, bank statement' },
                { step: 3, title: 'Complete KYC', desc: 'Fill application and risk disclosure' },
                { step: 4, title: 'Start Trading', desc: 'Deposit funds and place your first order' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      isDark ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {item.step}
                  </div>
                  <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrokersPage;
