import api from './api';

// Mock user for demo purposes
const MOCK_USER = {
  id: '1',
  name: 'Demo User',
  email: 'demo@cseinsight.lk',
};

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      // For demo: allow any login with demo credentials
      if (email === 'demo@cseinsight.lk' && password === 'demo123') {
        return {
          user: MOCK_USER,
          token: 'demo-jwt-token-' + Date.now(),
        };
      }
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      // For demo: create mock user
      return {
        user: {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
        },
        token: 'demo-jwt-token-' + Date.now(),
      };
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      // For demo: return mock user if token exists
      if (token.startsWith('demo-jwt-token')) {
        return MOCK_USER;
      }
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API fails
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};
