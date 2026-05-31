import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://localhost:5000', //https://community-resource-management-system.onrender.com
// });

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL // 'https://community-resource-management-system.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

