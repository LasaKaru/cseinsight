import api from './api';

// Mock data for demo
const MOCK_STOCKS = [
  { symbol: 'JKH', name: 'John Keells Holdings PLC', price: 185.50, change: 3.25, changePercent: 1.78, volume: 245000, turnover: 45427500, sector: 'Diversified Holdings' },
  { symbol: 'COMB', name: 'Commercial Bank of Ceylon PLC', price: 98.75, change: -1.50, changePercent: -1.50, volume: 180000, turnover: 17775000, sector: 'Banking & Finance' },
  { symbol: 'HNB', name: 'Hatton National Bank PLC', price: 156.25, change: 2.75, changePercent: 1.79, volume: 125000, turnover: 19531250, sector: 'Banking & Finance' },
  { symbol: 'DIAL', name: 'Dialog Axiata PLC', price: 12.30, change: 0.20, changePercent: 1.65, volume: 890000, turnover: 10947000, sector: 'Telecommunications' },
  { symbol: 'SAMP', name: 'Sampath Bank PLC', price: 78.50, change: -0.75, changePercent: -0.95, volume: 210000, turnover: 16485000, sector: 'Banking & Finance' },
  { symbol: 'EXPO', name: 'Expolanka Holdings PLC', price: 145.00, change: 5.50, changePercent: 3.94, volume: 320000, turnover: 46400000, sector: 'Trading' },
  { symbol: 'CARG', name: 'Cargills (Ceylon) PLC', price: 225.75, change: -2.25, changePercent: -0.99, volume: 95000, turnover: 21446250, sector: 'Beverage, Food & Tobacco' },
  { symbol: 'DIST', name: 'Distilleries Company of Sri Lanka PLC', price: 28.50, change: 0.50, changePercent: 1.79, volume: 450000, turnover: 12825000, sector: 'Beverage, Food & Tobacco' },
  { symbol: 'LIOC', name: 'Lanka IOC PLC', price: 95.00, change: 1.75, changePercent: 1.88, volume: 165000, turnover: 15675000, sector: 'Oil Palms' },
  { symbol: 'TILE', name: 'Lanka Tiles PLC', price: 52.25, change: -0.50, changePercent: -0.95, volume: 185000, turnover: 9666250, sector: 'Manufacturing' },
];

export const cseService = {
  // Get market indices
  getIndices: async () => {
    try {
      const response = await api.get('/market/indices');
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return {
        aspi: { value: 12456.78, change: 45.23, changePercent: 0.36 },
        sp20: { value: 4123.45, change: -12.34, changePercent: -0.30 },
        turnover: 2850000000,
        trades: 15234,
      };
    }
  },

  // Get all stocks
  getStocks: async (params = {}) => {
    try {
      const response = await api.get('/market/stocks', { params });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return MOCK_STOCKS;
    }
  },

  // Get single stock
  getStock: async (symbol) => {
    try {
      const response = await api.get(`/market/stock/${symbol}`);
      return response.data;
    } catch (error) {
      // Return mock data for demo
      const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
      if (stock) {
        return {
          ...stock,
          high52w: stock.price * 1.3,
          low52w: stock.price * 0.7,
          marketCap: stock.price * 1000000000,
          pe: 12.5,
          eps: stock.price / 12.5,
          dividendYield: 2.5,
          beta: 1.1,
        };
      }
      throw error;
    }
  },

  // Get top gainers
  getTopGainers: async (limit = 5) => {
    try {
      const response = await api.get('/market/top-gainers', { params: { limit } });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [...MOCK_STOCKS]
        .filter(s => s.changePercent > 0)
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, limit);
    }
  },

  // Get top losers
  getTopLosers: async (limit = 5) => {
    try {
      const response = await api.get('/market/top-losers', { params: { limit } });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [...MOCK_STOCKS]
        .filter(s => s.changePercent < 0)
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, limit);
    }
  },

  // Get most active
  getMostActive: async (limit = 5) => {
    try {
      const response = await api.get('/market/most-active', { params: { limit } });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [...MOCK_STOCKS]
        .sort((a, b) => b.volume - a.volume)
        .slice(0, limit);
    }
  },

  // Get sector performance
  getSectorPerformance: async () => {
    try {
      const response = await api.get('/market/sectors');
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [
        { sector: 'Banking & Finance', change: 1.25 },
        { sector: 'Diversified Holdings', change: 0.85 },
        { sector: 'Telecommunications', change: -0.35 },
        { sector: 'Beverage, Food & Tobacco', change: 0.45 },
        { sector: 'Manufacturing', change: -0.75 },
      ];
    }
  },

  // Get company details
  getCompany: async (symbol) => {
    try {
      const response = await api.get(`/companies/${symbol}`);
      return response.data;
    } catch (error) {
      // Return mock data for demo
      const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
      if (stock) {
        return {
          ...stock,
          description: `${stock.name} is a leading company in the ${stock.sector} sector of Sri Lanka.`,
          website: `https://www.${stock.symbol.toLowerCase()}.lk`,
          employees: 5000,
          founded: 1970,
          headquarters: 'Colombo, Sri Lanka',
        };
      }
      throw error;
    }
  },

  // Get company financials
  getCompanyFinancials: async (symbol) => {
    try {
      const response = await api.get(`/companies/${symbol}/financials`);
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return {
        revenue: 50000000000,
        netIncome: 5000000000,
        totalAssets: 100000000000,
        totalDebt: 20000000000,
        quarterlyResults: [
          { quarter: 'Q1 2024', revenue: 12000000000, profit: 1200000000 },
          { quarter: 'Q4 2023', revenue: 13000000000, profit: 1400000000 },
          { quarter: 'Q3 2023', revenue: 12500000000, profit: 1300000000 },
          { quarter: 'Q2 2023', revenue: 12500000000, profit: 1100000000 },
        ],
      };
    }
  },

  // Get company news
  getCompanyNews: async (symbol, limit = 10) => {
    try {
      const response = await api.get(`/companies/${symbol}/news`, { params: { limit } });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [
        { id: 1, title: `${symbol} Reports Strong Q1 Results`, date: new Date().toISOString(), category: 'Financial Results' },
        { id: 2, title: `${symbol} Announces Dividend Payment`, date: new Date(Date.now() - 86400000).toISOString(), category: 'Dividend' },
        { id: 3, title: `${symbol} Expands Operations`, date: new Date(Date.now() - 172800000).toISOString(), category: 'Corporate' },
      ];
    }
  },

  // Get dividends
  getDividends: async (params = {}) => {
    try {
      const response = await api.get('/dividends/calendar', { params });
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [
        { symbol: 'JKH', company: 'John Keells Holdings', exDate: '2024-03-15', paymentDate: '2024-04-01', amount: 3.50, type: 'Interim' },
        { symbol: 'COMB', company: 'Commercial Bank', exDate: '2024-03-20', paymentDate: '2024-04-05', amount: 2.25, type: 'Final' },
        { symbol: 'HNB', company: 'Hatton National Bank', exDate: '2024-03-25', paymentDate: '2024-04-10', amount: 4.00, type: 'Interim' },
      ];
    }
  },

  // Get brokers list
  getBrokers: async () => {
    try {
      const response = await api.get('/brokers');
      return response.data;
    } catch (error) {
      // Return mock data for demo
      return [
        { id: 1, name: 'NDB Securities', phone: '+94 11 2343883', email: 'info@ndbsecurities.lk', website: 'www.ndbsecurities.lk', online: true },
        { id: 2, name: 'JB Securities', phone: '+94 11 2490900', email: 'info@jbsecurities.lk', website: 'www.jbsecurities.lk', online: true },
        { id: 3, name: 'Asia Securities', phone: '+94 11 2445851', email: 'info@asiasecurities.lk', website: 'www.asiasecurities.lk', online: true },
      ];
    }
  },
};
