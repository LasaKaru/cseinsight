import { createContext, useContext, useState, useEffect } from 'react';
import { cseService } from '../services/cseService';

const MarketDataContext = createContext(null);

export const MarketDataProvider = ({ children }) => {
  const [indices, setIndices] = useState({
    aspi: { value: 12456.78, change: 45.23, changePercent: 0.36 },
    sp20: { value: 4123.45, change: -12.34, changePercent: -0.30 },
  });
  const [stocks, setStocks] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all market data in parallel
      const [indicesData, stocksData, gainersData, losersData] = await Promise.all([
        cseService.getIndices().catch(() => null),
        cseService.getStocks().catch(() => []),
        cseService.getTopGainers().catch(() => []),
        cseService.getTopLosers().catch(() => []),
      ]);

      if (indicesData) setIndices(indicesData);
      if (stocksData.length) setStocks(stocksData);
      if (gainersData.length) setTopGainers(gainersData);
      if (losersData.length) setTopLosers(losersData);

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch market data:', err);
      setError('Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMarketData();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    fetchMarketData();
  };

  const value = {
    indices,
    stocks,
    topGainers,
    topLosers,
    loading,
    error,
    lastUpdated,
    refreshData,
  };

  return (
    <MarketDataContext.Provider value={value}>
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error('useMarketData must be used within MarketDataProvider');
  }
  return context;
};

export default MarketDataContext;
