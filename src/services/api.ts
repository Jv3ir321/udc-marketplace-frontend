import axios from 'axios';
import { getApiBaseUrl } from '@/lib/utils';

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
});

// Interceptor to inject Authorization Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('udc_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 unauth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear local auth
      const token = localStorage.getItem('udc_auth_token');
      if (token && !window.location.pathname.includes('/login')) {
        // optionally notify or redirect
      }
    }
    return Promise.reject(error);
  }
);

export default api;
