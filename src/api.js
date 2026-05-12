import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api'; // адрес бэкенда

const api = axios.create({
  baseURL: API_BASE,
});

// Автоматически добавляем токен в заголовки, если он есть
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;