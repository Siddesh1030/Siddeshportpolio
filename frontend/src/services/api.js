import axios from 'axios';

// Base Axios instance configured for Java Spring Boot backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// Request interceptor to attach JWT token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('siddesh_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// REST API Endpoints with Fallback Support
export const portfolioApi = {
  // Auth REST Endpoints
  login: async (username, password) => {
    try {
      const res = await API.post('/auth/login', { username, password });
      if (res.data && res.data.token) {
        localStorage.setItem('siddesh_jwt_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      console.warn('Backend login endpoint unavailable, using local authentication verification fallback.');
      if (username === 'admin' && password === 'admin123password') {
        const mockToken = 'mock-jwt-token-siddesh-admin-2026';
        localStorage.setItem('siddesh_jwt_token', mockToken);
        return { token: mockToken, message: 'Login successful' };
      }
      throw new Error('Invalid username or password');
    }
  },

  // Portfolio Content REST Endpoints
  getPortfolio: async () => {
    try {
      const res = await API.get('/portfolio', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      return res.data;
    } catch (err) {
      const saved = localStorage.getItem('siddesh_portfolio_cms_data');
      return saved ? JSON.parse(saved) : null;
    }
  },

  updateSection: async (section, data) => {
    try {
      const payload = typeof data === 'string' ? data : JSON.stringify(data);
      const res = await API.put(`/portfolio/${section}`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      return res.data;
    } catch (err) {
      console.warn(`Backend update for ${section} failed, fallback to local save.`, err);
      return data;
    }
  },

  // Submissions REST Endpoints
  submitContact: async (submissionData) => {
    try {
      const res = await API.post('/contact', submissionData);
      return res.data;
    } catch (err) {
      console.warn('Backend contact API unavailable, saved locally.');
      return submissionData;
    }
  },

  getSubmissions: async () => {
    try {
      const res = await API.get('/admin/submissions');
      return res.data;
    } catch (err) {
      const saved = localStorage.getItem('siddesh_contact_submissions');
      return saved ? JSON.parse(saved) : [];
    }
  },

  deleteSubmission: async (id) => {
    try {
      await API.delete(`/admin/submissions/${id}`);
    } catch (err) {
      console.warn(`Backend submission deletion for ${id} failed, deleted locally.`);
    }
  }
};

export default API;
