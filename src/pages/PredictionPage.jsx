import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useMarketData } from '../context/MarketDataContext';
import { TrendingUp, TrendingDown, AlertTriangle, BarChart2, Info } from 'lucide-react';

const PredictionPage = () => {
  const { isDark } = useTheme();
  const { stocks } = useMarketData();
  const [selectedStock, setSelectedStock] = useState('');
  const [timeframe, setTimeframe] = useState('1d');
  const [prediction, setPrediction] = useState(null);

  const generatePrediction = () => {
    if (!selectedStock) return;

    // Mock prediction - in production, this would call an ML model
    const directions = ['UP', 'DOWN'];
    const direction = directions[Math.floor(Math.random() * 2)];
    const confidence = Math.floor(Math.random() * 30) + 55;
    const stock = stocks.find((s) => s.symbol === selectedStock);
    const currentPrice = stock?.price || 100;
    const changePercent = direction === 'UP'
      ? Math.random() * 5 + 1
      : -(Math.random() * 5 + 1);

    setPrediction({
      symbol: selectedStock,
      direction,
      confidence,
      currentPrice,
      predictedPrice: currentPrice * (1 + changePercent / 100),
      changePercent,
      timeframe,
      risk: confidence < 65 ? 'High' : confidence < 75 ? 'Medium' : 'Low',
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              AI Market Predictions
            </h1>
            <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
              Machine learning powered stock trend predictions
            </p>
          </div>

          {/* Selection Form */}
          <div
            className={`rounded-2xl p-6 mb-6 ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Stock Select */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-purple-200' : 'text-gray-700'
                  }`}
                >
                  Select Stock
                </label>
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    isDark
                      ? 'bg-[#0a0e27] border-purple-800 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Choose a stock</option>
                  {stocks.map((stock) => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} - {stock.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeframe Select */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-purple-200' : 'text-gray-700'
                  }`}
                >
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                    isDark
                      ? 'bg-[#0a0e27] border-purple-800 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="1d">1 Day</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>

              {/* Generate Button */}
              <div className="flex items-end">
                <button
                  onClick={generatePrediction}
                  disabled={!selectedStock}
                  className="w-full py-3 rounded-lg font-semibold text-gray-900 bg-accent-cyan hover:bg-accent-cyan/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Prediction
                </button>
              </div>
            </div>

            {/* Info */}
            <div
              className={`flex items-start gap-3 p-4 rounded-lg text-sm ${
                isDark
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                  : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}
            >
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                This model uses historical price data to predict whether a stock price will go up or
                down. The confidence level indicates how certain the model is about its prediction.
              </p>
            </div>
          </div>

          {/* Prediction Result */}
          {prediction && (
            <div
              className={`rounded-2xl p-6 ${
                isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Prediction Result
              </h2>

              {/* Direction */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="text-center">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      prediction.direction === 'UP'
                        ? 'bg-green-500/20'
                        : 'bg-red-500/20'
                    }`}
                  >
                    {prediction.direction === 'UP' ? (
                      <TrendingUp size={48} className="text-green-400" />
                    ) : (
                      <TrendingDown size={48} className="text-red-400" />
                    )}
                  </div>
                  <p
                    className={`text-2xl font-bold ${
                      prediction.direction === 'UP' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {prediction.direction}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Predicted Direction
                  </p>
                </div>

                <div className="flex-1 max-w-sm">
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
                      Confidence Level
                    </span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {prediction.confidence}%
                    </span>
                  </div>
                  <div className={`h-4 rounded-full ${isDark ? 'bg-purple-800' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all ${
                        prediction.confidence >= 75
                          ? 'bg-green-400'
                          : prediction.confidence >= 65
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Stock
                  </p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {prediction.symbol}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Current Price
                  </p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    LKR {prediction.currentPrice.toFixed(2)}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Predicted Range
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      prediction.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {prediction.changePercent >= 0 ? '+' : ''}
                    {prediction.changePercent.toFixed(2)}%
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Risk Level
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      prediction.risk === 'Low'
                        ? 'text-green-400'
                        : prediction.risk === 'Medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {prediction.risk}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div
                className={`p-4 rounded-lg text-sm ${
                  isDark
                    ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
                    : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                }`}
              >
                <p className="flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <strong>Disclaimer:</strong> This is an AI-generated prediction for educational
                  purposes only. Past performance does not guarantee future results. Always conduct
                  your own research before making investment decisions.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PredictionPage;
