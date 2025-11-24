import api from './api';

export const ragService = {
  // Upload document
  uploadDocument: async (file, onProgress) => {
    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await api.post('/rag/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(percentCompleted);
        },
      });
      return response.data;
    } catch (error) {
      // Return mock response for demo
      return {
        id: `doc-${Date.now()}`,
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'processing',
      };
    }
  },

  // Analyze document
  analyzeDocument: async (documentId) => {
    try {
      const response = await api.post(`/rag/analyze/${documentId}`);
      return response.data;
    } catch (error) {
      // Return mock analysis for demo
      return {
        id: documentId,
        summary: {
          companyName: 'Sample Company PLC',
          sector: 'Diversified Holdings',
          reportPeriod: 'FY 2023',
          keyHighlights: [
            'Revenue increased by 15% year-over-year',
            'Net profit margin improved to 12.5%',
            'Strong cash flow from operations',
            'Dividend payout ratio maintained at 40%',
          ],
        },
        financialPerformance: {
          revenue: 45000000000,
          revenueGrowth: 15.2,
          netIncome: 5625000000,
          eps: 12.50,
          roe: 18.5,
        },
        riskAssessment: {
          overallRisk: 'Medium',
          factors: [
            'Currency fluctuation exposure',
            'Regulatory changes in key markets',
            'Supply chain dependencies',
          ],
          debtToEquity: 0.45,
        },
        investmentOpinion: {
          rating: 'Buy',
          confidence: 75,
          reasons: [
            'Strong revenue growth momentum',
            'Improving profit margins',
            'Solid dividend track record',
            'Favorable industry outlook',
          ],
          timeHorizon: '12-18 months',
        },
        keyMetrics: {
          peRatio: 12.5,
          pbRatio: 1.8,
          dividendYield: 3.2,
          currentRatio: 2.1,
          quickRatio: 1.5,
        },
      };
    }
  },

  // Get user documents
  getDocuments: async (userId) => {
    try {
      const response = await api.get(`/rag/documents/${userId}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  // Delete document
  deleteDocument: async (documentId) => {
    try {
      await api.delete(`/rag/document/${documentId}`);
      return { success: true };
    } catch (error) {
      return { success: true }; // Allow deletion for demo
    }
  },

  // Query document
  queryDocument: async (documentId, query) => {
    try {
      const response = await api.post(`/rag/query/${documentId}`, { query });
      return response.data;
    } catch (error) {
      return {
        answer: "Based on the document analysis, the company shows strong financial performance with consistent revenue growth and healthy profit margins. Key areas of focus include operational efficiency and market expansion.",
        sources: ['Page 5', 'Page 12', 'Page 23'],
      };
    }
  },
};
