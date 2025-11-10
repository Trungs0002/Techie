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
    HOME: '/tracnghiemluyenthi/public/index.html',
    LOGIN: '/tracnghiemluyenthi/public/pages/auth/login.html',
    REGISTER: '/tracnghiemluyenthi/public/pages/auth/register.html',
    DASHBOARD: '/tracnghiemluyenthi/public/pages/dashboard.html',
    SUBJECTS: '/tracnghiemluyenthi/public/pages/subjects.html',
    EXAMS: '/tracnghiemluyenthi/public/pages/exams.html',
    QUIZ: '/tracnghiemluyenthi/public/pages/quiz.html',
    RESULTS: '/tracnghiemluyenthi/public/pages/results.html',
    HISTORY: '/tracnghiemluyenthi/public/pages/history.html',
    PROFILE: '/tracnghiemluyenthi/public/pages/profile.html',
    SETTINGS: '/tracnghiemluyenthi/public/pages/settings.html'
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
