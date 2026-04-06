import axios from 'axios';

// ✅ VPS Backend
const api = axios.create({
  baseURL: 'http://187.127.146.140:8080/api', // VPS IP + /api
});

// ✅ Authorization Header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;