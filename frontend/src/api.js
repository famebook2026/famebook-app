import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL + '/api',
  headers: { 'Content-Type': 'application/json' },
});

// attach token when present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  // auth
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),

  // posts
  getPosts: () => api.get('/posts'),
  createPost: (payload) => api.post('/posts', payload),
  likePost: (id) => api.post(`/posts/${id}/like`),
  commentPost: (id, payload) => api.post(`/posts/${id}/comment`, payload),

  // users
  getProfile: (id) => api.get(`/users/${id}`),
  toggleFollow: (id) => api.post(`/users/${id}/toggle-follow`),
};
