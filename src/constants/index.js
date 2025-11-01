// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'quiz_app_token',
  USER: 'quiz_app_user',
  SETTINGS: 'quiz_app_settings',
}

// Exam Types
export const EXAM_TYPES = {
  PRACTICE: 'practice',
  REAL: 'real',
  CUSTOM: 'custom',
}

// Question Types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
}

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
}

// Exam Status
export const EXAM_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
}

// Default Settings
export const DEFAULT_SETTINGS = {
  backgroundMusic: false,
  soundEffects: false,
  timer: false,
  questionsPerExam: 5,
  examTimer: 30, // minutes
  selectedAvatar: 'default',
}

// Avatar Options
export const AVATARS = [
  { id: 'default', name: 'Default', emoji: '👤' },
  { id: 'student', name: 'Student', emoji: '🎓' },
  { id: 'teacher', name: 'Teacher', emoji: '👨‍🏫' },
  { id: 'developer', name: 'Developer', emoji: '👨‍💻' },
  { id: 'scientist', name: 'Scientist', emoji: '🧑‍🔬' },
  { id: 'astronaut', name: 'Astronaut', emoji: '🧑‍🚀' },
  { id: 'artist', name: 'Artist', emoji: '🎨' },
  { id: 'musician', name: 'Musician', emoji: '🎵' },
]

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SUBJECTS: '/subjects',
  QUIZ: '/quiz',
  EXAM: '/exam/:examId',
  RESULTS: '/results',
  RESULT_DETAIL: '/results/:resultId',
  SETTINGS: '/settings',
  PROFILE: '/profile',
}
