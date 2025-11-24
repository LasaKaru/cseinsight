// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// CSE Configuration
export const CSE_WEBSITE_URL = 'https://www.cse.lk';

// Feature Flags
export const FEATURES = {
  CHAT_ENABLED: import.meta.env.VITE_ENABLE_CHAT !== 'false',
  RAG_ENABLED: import.meta.env.VITE_ENABLE_RAG !== 'false',
  PREDICTIONS_ENABLED: import.meta.env.VITE_ENABLE_PREDICTIONS !== 'false',
};

// Market Sectors
export const SECTORS = [
  'Banking & Finance',
  'Beverage, Food & Tobacco',
  'Chemicals & Pharmaceuticals',
  'Construction & Engineering',
  'Diversified Holdings',
  'Footwear & Textiles',
  'Healthcare',
  'Hotels & Travel',
  'Information Technology',
  'Insurance',
  'Investment Trusts',
  'Land & Property',
  'Manufacturing',
  'Motors',
  'Oil Palms',
  'Plantations',
  'Power & Energy',
  'Services',
  'Stores & Supplies',
  'Telecommunications',
  'Trading',
];

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard', protected: true },
  { label: 'Wiki', path: '/wiki' },
  {
    label: 'Tools',
    children: [
      { label: 'AI Chatbot', path: '/chatbot', protected: true },
      { label: 'Document Analyzer', path: '/document-analyzer', protected: true },
      { label: 'Predictions', path: '/predictions', protected: true },
      { label: 'Dividend Calendar', path: '/dividend-calendar', protected: true },
      { label: 'Brokers', path: '/brokers' },
      { label: 'Technical Analysis', path: '/technical-analysis', protected: true },
    ]
  },
  { label: 'Companies', path: '/companies', protected: true },
];

// Stock Status Colors
export const STATUS_COLORS = {
  UP: '#4ade80',
  DOWN: '#ef4444',
  NEUTRAL: '#6b7280',
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#00f5d4',
  SECONDARY: '#9333ea',
  POSITIVE: '#4ade80',
  NEGATIVE: '#ef4444',
  NEUTRAL: '#6b7280',
  GRID: 'rgba(255, 255, 255, 0.1)',
};

// Date Format Options
export const DATE_FORMAT_OPTIONS = {
  short: { month: 'short', day: 'numeric' },
  medium: { month: 'short', day: 'numeric', year: 'numeric' },
  long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  time: { hour: '2-digit', minute: '2-digit' },
  full: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
};

// Pagination
export const DEFAULT_PAGE_SIZE = 20;

// Market Hours (Sri Lanka Time)
export const MARKET_HOURS = {
  OPEN: '09:30',
  CLOSE: '14:30',
  TIMEZONE: 'Asia/Colombo',
};
