import apiClient from './client.js';

// @desc    Register a new user
// @endpoint POST /api/auth/register
export const registerUser = async (userData) => {
  return apiClient.post('/auth/register', userData);
};

// @desc    Authenticate user & get token
// @endpoint POST /api/auth/login
export const loginUser = async (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

// @desc    Get authenticated user profile
// @endpoint GET /api/auth/me
export const getCurrentUser = async () => {
  return apiClient.get('/auth/me');
};
