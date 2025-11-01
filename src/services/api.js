import axios from 'axios'
import { STORAGE_KEYS, API_BASE_URL } from '@/constants'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    
    // Handle 401 Unauthorized - Clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      window.location.href = '/login'
    }
    
    return Promise.reject({ message, status: error.response?.status })
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  updateSettings: (data) => api.put('/auth/settings', data),
  changePassword: (data) => api.put('/auth/change-password', data),
}

// Subject API
export const subjectAPI = {
  getAll: () => api.get('/subjects'),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
}

// Question API
export const questionAPI = {
  getAll: (params) => api.get('/questions', { params }),
  getById: (id) => api.get(`/questions/${id}`),
  getRandom: (subjectId, count, difficulty) => 
    api.get('/questions/random', { params: { subjectId, count, difficulty } }),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`),
}

// Exam API
export const examAPI = {
  start: (data) => api.post('/exams/start', data),
  startExam: (data) => api.post('/exams/start', data), // Alias for consistency
  submitAnswer: (examId, questionIndex, data) => 
    api.put(`/exams/${examId}/answer/${questionIndex}`, data),
  submitExam: (examId) => api.post(`/exams/${examId}/submit`),
  getExam: (examId) => api.get(`/exams/${examId}`),
  getAll: () => api.get('/exams'),
  getUserExams: (params) => api.get('/exams', { params }),
  getResults: (params) => api.get('/exams/results', { params }),
}

export default api
