import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/profile', data);

// Admin Auth
export const adminLogin = (data) => api.post('/admin/login', data);
export const adminGetStats = () => api.get('/admin/stats');

// Admin Users
export const adminGetUsers = (params) => api.get('/admin/users', { params });
export const adminApproveUser = (id) => api.put(`/admin/users/${id}/approve`);
export const adminRejectUser = (id) => api.put(`/admin/users/${id}/reject`);
export const adminDeactivateUser = (id) => api.put(`/admin/users/${id}/deactivate`);
export const adminActivateUser = (id) => api.put(`/admin/users/${id}/activate`);

// Admin Stories
export const adminGetPendingStories = () => api.get('/admin/stories/pending');
export const adminGetAllStories = () => api.get('/admin/stories/all');
export const adminApproveStory = (userId) => api.put(`/admin/stories/${userId}/approve`);
export const adminRejectStory = (userId) => api.put(`/admin/stories/${userId}/reject`);

// Submissions
export const getSubmissionsPending = (params) => api.get('/submissions/pending', { params });
export const getSubmissionsAll = (params) => api.get('/submissions/all', { params });
export const approveSubmission = (id) => api.put(`/submissions/${id}/approve`);
export const rejectSubmission = (id) => api.put(`/submissions/${id}/reject`);
export const getSubmissionStats = () => api.get('/submissions/stats');

// Posts
export const getPosts = (params) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Stories
export const getStories = (params) => api.get('/stories', { params });
export const getStory = (id) => api.get(`/stories/${id}`);
export const createStory = (data) => api.post('/stories', data);

// Skills
export const getSkills = (params) => api.get('/skills', { params });
export const getCategories = () => api.get('/skills/categories');
export const getSkillMatches = () => api.get('/skills/match');

// Contact
export const submitContact = (data) => api.post('/contact', data);

// Analytics
export const trackAnalytics = (data) => api.post('/analytics/track', data);

export default api;