import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useMarketData } from '../context/MarketDataContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage, formatTimeAgo } from '../utils/formatters';

const DashboardPage = () => {
  const { isDark } = useTheme();
  const { indices, stocks, topGainers, topLosers, loading, refreshData, lastUpdated } = useMarketData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter stocks based on search
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Index Card Component
  const IndexCard = ({ title, value, change, changePercent }) => {
    const isPositive = change >= 0;
    return (
      <div
        className={`p-6 rounded-2xl ${
          isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
        }`}
      >
        <h3 className={`text-sm font-medium ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
          {title}
        </h3>
        <div className="flex items-end gap-3 mt-2">
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {formatNumber(value, 2)}
          </span>
          <span
            className={`flex items-center text-sm font-medium ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {formatPercentage(changePercent)}
          </span>
        </div>
        <p className={`text-xs mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{formatNumber(change, 2)} today
        </p>
      </div>
    );
  };

  // Mover Card Component
  const MoverCard = ({ title, stocks, isGainer }) => (
    <div
      className={`p-6 rounded-2xl ${
        isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {isGainer ? (
          <TrendingUp className="text-green-400" size={20} />
        ) : (
          <TrendingDown className="text-red-400" size={20} />
        )}
        {title}
      </h3>
      <div className="space-y-3">
        {stocks.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/company/${stock.symbol}`}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              isDark ? 'hover:bg-purple-800/30' : 'hover:bg-gray-50'
            }`}
          >
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stock.symbol}
              </p>
              <p className={`text-xs ${isDark ? 'text-purple-300' : 'text-gray-500'}`}>
                {formatCurrency(stock.price)}
              </p>
            </div>
            <span
              className={`text-sm font-medium ${
                stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {formatPercentage(stock.changePercent)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Market Dashboard
              </h1>
              <p className={`mt-1 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                Last updated: {formatTimeAgo(lastUpdated)}
              </p>
            </div>
            <button
              onClick={refreshData}
              disabled={loading}
              className={`mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              } disabled:opacity-50`}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {/* Index Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <IndexCard
              title="ASPI"
              value={indices.aspi.value}
              change={indices.aspi.change}
              changePercent={indices.aspi.changePercent}
            />
            <IndexCard
              title="S&P SL20"
              value={indices.sp20.value}
              change={indices.sp20.change}
              changePercent={indices.sp20.changePercent}
            />
            <div
              className={`p-6 rounded-2xl ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <h3 className={`text-sm font-medium ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                Market Turnover
              </h3>
              <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(2850000000, 0)}
              </p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <h3 className={`text-sm font-medium ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                Total Trades
              </h3>
              <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatNumber(15234)}
              </p>
            </div>
          </div>

          {/* Top Gainers & Losers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <MoverCard title="Top Gainers" stocks={topGainers} isGainer={true} />
            <MoverCard title="Top Losers" stocks={topLosers} isGainer={false} />
          </div>

          {/* Stock Table */}
          <div
            className={`rounded-2xl overflow-hidden ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            <div className="p-6 border-b border-purple-800/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  All Stocks
                </h2>
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-purple-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search stocks..."
                    className={`pl-10 pr-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                      isDark
                        ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? 'bg-purple-900/30' : 'bg-gray-50'}>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Symbol
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Company
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Price (LKR)
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Change
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Volume
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <LoadingSpinner size="md" />
                      </td>
                    </tr>
                  ) : paginatedStocks.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className={`px-6 py-12 text-center ${isDark ? 'text-purple-200' : 'text-gray-500'}`}
                      >
                        No stocks found
                      </td>
                    </tr>
                  ) : (
                    paginatedStocks.map((stock) => (
                      <tr
                        key={stock.symbol}
                        className={`border-t ${
                          isDark
                            ? 'border-purple-800/30 hover:bg-purple-800/20'
                            : 'border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <td className={`px-6 py-4 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {stock.symbol}
                        </td>
                        <td className={`px-6 py-4 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                          {stock.name}
                        </td>
                        <td className={`px-6 py-4 text-right font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatNumber(stock.price, 2)}
                        </td>
                        <td className={`px-6 py-4 text-right ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          <div className="flex items-center justify-end gap-1">
                            {stock.changePercent >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {formatPercentage(stock.changePercent)}
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-right ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                          {formatNumber(stock.volume)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            to={`/company/${stock.symbol}`}
                            className="text-accent-cyan hover:text-accent-cyan/80 text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-purple-800/30 flex items-center justify-between">
                <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredStocks.length)} of{' '}
                  {filteredStocks.length} stocks
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-purple-800/50 text-purple-200 disabled:text-purple-600'
                        : 'hover:bg-gray-100 text-gray-600 disabled:text-gray-300'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-purple-800/50 text-purple-200 disabled:text-purple-600'
                        : 'hover:bg-gray-100 text-gray-600 disabled:text-gray-300'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
