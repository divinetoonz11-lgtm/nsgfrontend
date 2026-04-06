
import railwayApiClient from './railwayApiClient.js';

export const apiClient = {
  async fetch(endpoint, options = {}) {
    try {
      const method = options.method?.toLowerCase() || 'get';
      
      const requestOptions = {
        url: endpoint,
        method,
        data: options.body ? JSON.parse(options.body) : undefined,
        headers: options.headers,
      };

      const response = await railwayApiClient(requestOptions);
      
      return {
        ok: true,
        status: response.status,
        json: async () => response.data,
      };
    } catch (error) {
      return {
        ok: false,
        status: error.response?.status || 500,
        json: async () => error.response?.data || { message: error.message },
      };
    }
  }
};

export default apiClient;
