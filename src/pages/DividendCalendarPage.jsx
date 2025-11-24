import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { cseService } from '../services/cseService';
import { Calendar, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

const DividendCalendarPage = () => {
  const { isDark } = useTheme();
  const [dividends, setDividends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchDividends = async () => {
      setLoading(true);
      try {
        const data = await cseService.getDividends();
        setDividends(data);
      } catch (error) {
        console.error('Failed to fetch dividends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDividends();
  }, []);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Dividend Calendar
              </h1>
              <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                Track upcoming dividend payments and ex-dates
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    viewMode === 'list'
                      ? 'bg-accent-cyan text-gray-900'
                      : isDark
                      ? 'text-purple-200 hover:bg-purple-800/50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-accent-cyan text-gray-900'
                      : isDark
                      ? 'text-purple-200 hover:bg-purple-800/50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Navigation */}
          {viewMode === 'calendar' && (
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'text-purple-200 hover:bg-purple-800/50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {monthName}
              </h2>
              <button
                onClick={nextMonth}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'text-purple-200 hover:bg-purple-800/50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : viewMode === 'list' ? (
            <div
              className={`rounded-2xl overflow-hidden ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDark ? 'bg-purple-900/30' : 'bg-gray-50'}>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Symbol
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Company
                      </th>
                      <th
                        className={`px-6 py-4 text-center text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Type
                      </th>
                      <th
                        className={`px-6 py-4 text-right text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Amount
                      </th>
                      <th
                        className={`px-6 py-4 text-center text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Ex-Date
                      </th>
                      <th
                        className={`px-6 py-4 text-center text-sm font-semibold ${
                          isDark ? 'text-purple-200' : 'text-gray-600'
                        }`}
                      >
                        Payment Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dividends.map((dividend, index) => (
                      <tr
                        key={index}
                        className={`border-t ${
                          isDark
                            ? 'border-purple-800/30 hover:bg-purple-800/20'
                            : 'border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <td
                          className={`px-6 py-4 font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {dividend.symbol}
                        </td>
                        <td
                          className={`px-6 py-4 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}
                        >
                          {dividend.company}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              dividend.type === 'Final'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {dividend.type}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 text-right font-medium ${
                            isDark ? 'text-accent-cyan' : 'text-emerald-600'
                          }`}
                        >
                          {formatCurrency(dividend.amount)}
                        </td>
                        <td
                          className={`px-6 py-4 text-center ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          {formatDate(dividend.exDate)}
                        </td>
                        <td
                          className={`px-6 py-4 text-center ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          {formatDate(dividend.paymentDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl p-6 ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-medium py-2 ${
                      isDark ? 'text-purple-200' : 'text-gray-600'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1;
                  const isCurrentMonth = day > 0 && day <= new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

                  return (
                    <div
                      key={i}
                      className={`min-h-[80px] p-2 rounded-lg ${
                        isCurrentMonth
                          ? isDark
                            ? 'bg-purple-800/30'
                            : 'bg-gray-50'
                          : 'opacity-30'
                      }`}
                    >
                      {isCurrentMonth && (
                        <>
                          <span
                            className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}
                          >
                            {day}
                          </span>
                          {/* Show dividends for this day */}
                          {dividends
                            .filter((d) => new Date(d.exDate).getDate() === day)
                            .slice(0, 2)
                            .map((d, idx) => (
                              <div
                                key={idx}
                                className="mt-1 px-1 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan text-xs truncate"
                              >
                                {d.symbol}
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DividendCalendarPage;
