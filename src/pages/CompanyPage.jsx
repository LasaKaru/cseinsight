import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { cseService } from '../services/cseService';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Bell,
} from 'lucide-react';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatLargeNumber,
  formatDate,
} from '../utils/formatters';

const CompanyPage = () => {
  const { symbol } = useParams();
  const { isDark } = useTheme();
  const [company, setCompany] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [companyData, financialsData, newsData] = await Promise.all([
          cseService.getStock(symbol),
          cseService.getCompanyFinancials(symbol),
          cseService.getCompanyNews(symbol),
        ]);
        setCompany(companyData);
        setFinancials(financialsData);
        setNews(newsData);
      } catch (error) {
        console.error('Failed to fetch company data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
        <Header />
        <div className="pt-24 text-center py-12">
          <p className={isDark ? 'text-purple-200' : 'text-gray-600'}>Company not found</p>
        </div>
      </div>
    );
  }

  const isPositive = company.changePercent >= 0;

  const StatCard = ({ label, value, format = 'text' }) => (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}>
      <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {format === 'currency'
          ? formatCurrency(value)
          : format === 'number'
          ? formatNumber(value, 2)
          : format === 'percentage'
          ? formatPercentage(value)
          : format === 'large'
          ? formatLargeNumber(value)
          : value}
      </p>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className={`inline-flex items-center gap-2 mb-6 ${
              isDark
                ? 'text-purple-200 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>

          {/* Company Header */}
          <div
            className={`rounded-2xl p-6 md:p-8 mb-6 ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {company.symbol}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark ? 'bg-purple-800/50 text-purple-200' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {company.sector}
                  </span>
                </div>
                <p className={isDark ? 'text-purple-200' : 'text-gray-600'}>{company.name}</p>
              </div>

              <div className="text-right">
                <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(company.price)}
                </p>
                <div
                  className={`flex items-center justify-end gap-2 text-lg ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  <span>{formatCurrency(Math.abs(company.change), 2)}</span>
                  <span>({formatPercentage(company.changePercent)})</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                <Bell size={16} />
                Set Alert
              </button>
              <a
                href={`https://www.cse.lk/pages/company-profile/company-profile.component.html?symbol=${company.symbol}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-purple-600 text-purple-200 hover:bg-purple-800/50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ExternalLink size={16} />
                CSE Profile
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-purple-800/30">
            {['overview', 'financials', 'news'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-accent-cyan border-b-2 border-accent-cyan'
                    : isDark
                    ? 'text-purple-200 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Statistics */}
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                <h2
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Key Statistics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Market Cap" value={company.marketCap} format="large" />
                  <StatCard label="P/E Ratio" value={company.pe} format="number" />
                  <StatCard label="EPS" value={company.eps} format="currency" />
                  <StatCard label="Dividend Yield" value={company.dividendYield} format="percentage" />
                  <StatCard label="52W High" value={company.high52w} format="currency" />
                  <StatCard label="52W Low" value={company.low52w} format="currency" />
                  <StatCard label="Volume" value={company.volume} format="large" />
                  <StatCard label="Beta" value={company.beta} format="number" />
                </div>
              </div>

              {/* Price Performance */}
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                <h2
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Price Performance
                </h2>
                <div className="space-y-4">
                  {[
                    { label: '1 Day', value: company.changePercent },
                    { label: '1 Week', value: 2.5 },
                    { label: '1 Month', value: -1.2 },
                    { label: '3 Months', value: 8.7 },
                    { label: 'YTD', value: 15.3 },
                    { label: '1 Year', value: 22.1 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className={isDark ? 'text-purple-200' : 'text-gray-600'}>
                        {item.label}
                      </span>
                      <span
                        className={`font-medium ${
                          item.value >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {formatPercentage(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && financials && (
            <div
              className={`rounded-2xl p-6 ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Quarterly Results
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDark ? 'bg-purple-900/30' : 'bg-gray-50'}>
                      <th
                        className={`px-4 py-3 text-left text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Quarter
                      </th>
                      <th
                        className={`px-4 py-3 text-right text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Revenue
                      </th>
                      <th
                        className={`px-4 py-3 text-right text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {financials.quarterlyResults.map((result, index) => (
                      <tr
                        key={index}
                        className={`border-t ${
                          isDark ? 'border-purple-800/30' : 'border-gray-100'
                        }`}
                      >
                        <td
                          className={`px-4 py-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                          {result.quarter}
                        </td>
                        <td
                          className={`px-4 py-3 text-right ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          {formatLargeNumber(result.revenue)}
                        </td>
                        <td
                          className={`px-4 py-3 text-right ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          {formatLargeNumber(result.profit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div
              className={`rounded-2xl p-6 ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Latest News
              </h2>
              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}
                  >
                    <p className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded ${
                          isDark ? 'bg-purple-700 text-purple-200' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className={isDark ? 'text-purple-300' : 'text-gray-500'}>
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyPage;
