// Configuration
const CONFIG = {
  API_BASE_URL: 'http://localhost:5000/api',
  
  STORAGE_KEYS: {
    TOKEN: 'auth_token',
    USER: 'user_data',
    REMEMBER_ME: 'remember_me',
    THEME: 'theme_preference'
  },
  
  ROUTES: {
    HOME: '/',
    LOGIN: '/pages/auth/login.html',
    REGISTER: '/pages/auth/register.html',
    DASHBOARD: '/pages/dashboard.html',
    SUBJECTS: '/pages/subjects.html',
    EXAMS: '/pages/exams.html',
    QUIZ: '/pages/quiz.html',
    RESULTS: '/pages/results.html',
    HISTORY: '/pages/history.html',
    PROFILE: '/pages/profile.html',
    SETTINGS: '/pages/settings.html'
  },
  
  QUIZ_SETTINGS: {
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    WARNING_TIME: 300, // 5 minutes in seconds
    QUESTIONS_PER_PAGE: 1
  },
  
  UI: {
    TOAST_DURATION: 3000,
    LOADING_MIN_TIME: 500,
    DEBOUNCE_DELAY: 300
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
