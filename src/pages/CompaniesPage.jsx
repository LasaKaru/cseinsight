import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useMarketData } from '../context/MarketDataContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Search, Filter, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { SECTORS } from '../utils/constants';

const CompaniesPage = () => {
  const { isDark } = useTheme();
  const { stocks, loading } = useMarketData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filter and sort stocks
  let filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  // Sort
  filteredStocks = [...filteredStocks].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  // Paginate
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Listed Companies
            </h1>
            <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
              Browse all companies listed on the Colombo Stock Exchange
            </p>
          </div>

          {/* Filters */}
          <div
            className={`rounded-2xl p-6 mb-6 ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
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
                  placeholder="Search by symbol or name..."
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    isDark
                      ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Sector Filter */}
              <div className="relative">
                <Filter
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-purple-400' : 'text-gray-400'
                  }`}
                />
                <select
                  value={selectedSector}
                  onChange={(e) => {
                    setSelectedSector(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    isDark
                      ? 'bg-[#0a0e27] border-purple-800 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Sectors</option>
                  {SECTORS.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-end">
                <span className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                  {filteredStocks.length} companies found
                </span>
              </div>
            </div>
          </div>

          {/* Companies Table */}
          <div
            className={`rounded-2xl overflow-hidden ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={isDark ? 'bg-purple-900/30' : 'bg-gray-50'}>
                        <th
                          onClick={() => handleSort('symbol')}
                          className={`px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-purple-800/20 ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          Symbol {sortBy === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                          onClick={() => handleSort('name')}
                          className={`px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-purple-800/20 ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          Company {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                          className={`px-6 py-4 text-left text-sm font-semibold ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          Sector
                        </th>
                        <th
                          onClick={() => handleSort('price')}
                          className={`px-6 py-4 text-right text-sm font-semibold cursor-pointer hover:bg-purple-800/20 ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                          onClick={() => handleSort('changePercent')}
                          className={`px-6 py-4 text-right text-sm font-semibold cursor-pointer hover:bg-purple-800/20 ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          Change {sortBy === 'changePercent' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                          className={`px-6 py-4 text-center text-sm font-semibold ${
                            isDark ? 'text-purple-200' : 'text-gray-600'
                          }`}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedStocks.map((stock) => (
                        <tr
                          key={stock.symbol}
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
                            {stock.symbol}
                          </td>
                          <td
                            className={`px-6 py-4 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}
                          >
                            {stock.name}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                isDark
                                  ? 'bg-purple-800/50 text-purple-200'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {stock.sector}
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 text-right font-medium ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {formatCurrency(stock.price)}
                          </td>
                          <td
                            className={`px-6 py-4 text-right ${
                              stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            <div className="flex items-center justify-end gap-1">
                              {stock.changePercent >= 0 ? (
                                <ArrowUpRight size={14} />
                              ) : (
                                <ArrowDownRight size={14} />
                              )}
                              {formatPercentage(stock.changePercent)}
                            </div>
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
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-purple-800/30 flex items-center justify-between">
                    <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                      {Math.min(currentPage * itemsPerPage, filteredStocks.length)} of{' '}
                      {filteredStocks.length}
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
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompaniesPage;
