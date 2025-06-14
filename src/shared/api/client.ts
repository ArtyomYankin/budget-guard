import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://localhost:7300/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});