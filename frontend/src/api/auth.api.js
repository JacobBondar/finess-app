import apiClient from './client';

export const authApi = {
  // Register new user
  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // Login
  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  // Get current user
  getMe: async () => {
    return apiClient.get('/auth/me');
  },
};

export default authApi;
