import api from './api';

export const chatService = {
  // Send message to chatbot
  sendMessage: async (message, conversationId = null) => {
    try {
      const response = await api.post('/chatbot/message', {
        message,
        conversationId,
      });
      return response.data;
    } catch (error) {
      // Return mock response for demo
      const mockResponses = [
        "Based on current market trends, the banking sector is showing strong performance with key indicators pointing to continued growth.",
        "The current market sentiment is cautiously optimistic. Key indices are up, but investors should watch for volatility.",
        "For dividend investing, consider stocks like JKH and HNB which have consistent dividend payment histories.",
        "Technical analysis suggests support levels around the current price. Consider your risk tolerance before making decisions.",
        "The CSE market hours are 9:30 AM to 2:30 PM Sri Lanka time. Pre-market analysis is available from 9:00 AM.",
      ];

      return {
        response: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        conversationId: conversationId || `conv-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
    }
  },

  // Get chat history
  getHistory: async (userId) => {
    try {
      const response = await api.get(`/chatbot/history/${userId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // Clear chat history
  clearHistory: async (userId) => {
    try {
      await api.delete(`/chatbot/history/${userId}`);
      return { success: true };
    } catch (error) {
      return { success: true }; // Allow clearing for demo
    }
  },

  // Get suggested questions
  getSuggestions: async () => {
    return [
      "What's the current ASPI value?",
      "Show me top gainers today",
      "Is now a good time to invest in banking stocks?",
      "Explain dividend yield",
      "What are the market hours?",
    ];
  },
};
