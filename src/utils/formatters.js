// Format currency (LKR)
export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Format number with commas
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Format percentage
export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

// Format large numbers (millions, billions)
export const formatLargeNumber = (value) => {
  if (value === null || value === undefined) return '-';

  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toString();
};

// Format date
export const formatDate = (date, format = 'medium') => {
  if (!date) return '-';

  const options = {
    short: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    full: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
  };

  return new Date(date).toLocaleDateString('en-US', options[format] || options.medium);
};

// Format time ago
export const formatTimeAgo = (date) => {
  if (!date) return '-';

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(date, 'short');
};

// Format stock symbol
export const formatSymbol = (symbol) => {
  if (!symbol) return '-';
  return symbol.toUpperCase().trim();
};

// Format volume
export const formatVolume = (volume) => {
  if (volume === null || volume === undefined) return '-';
  return formatLargeNumber(volume);
};

// Get change class (for styling)
export const getChangeClass = (value) => {
  if (value > 0) return 'stock-up';
  if (value < 0) return 'stock-down';
  return 'text-gray-500';
};

// Get change arrow
export const getChangeArrow = (value) => {
  if (value > 0) return '↑';
  if (value < 0) return '↓';
  return '-';
};
