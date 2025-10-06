// Database Schema cho Ứng dụng Luyện thi Trắc nghiệm CNTT
// MongoDB Collections Design

// ===== COLLECTION: users =====
const userSchema = {
  _id: ObjectId,
  username: String, // required, unique
  email: String, // required, unique
  password: String, // hashed password
  fullName: String,
  avatar: String, // URL hoặc path đến avatar
  dateCreated: Date,
  lastLogin: Date,
  settings: {
    backgroundMusic: Boolean, // default: false
    soundEffects: Boolean, // default: false
    timer: Boolean, // default: false
    questionsPerExam: Number, // default: 5
    examTimer: Number, // thời gian cho toàn bộ bài test (phút)
    selectedAvatar: String
  },
  stats: {
    totalExams: Number,
    totalCorrect: Number,
    totalQuestions: Number,
    averageScore: Number,
    bestScore: Number
  }
};

// ===== COLLECTION: subjects =====
const subjectSchema = {
  _id: ObjectId,
  name: String, // Tên môn học (VD: "Cấu trúc dữ liệu", "Mạng máy tính")
  code: String, // Mã môn học (VD: "CTDL", "MMT")
  description: String,
  isActive: Boolean, // default: true
  dateCreated: Date,
  createdBy: ObjectId, // reference to users collection
  questionCount: Number // số lượng câu hỏi trong môn này
};

// ===== COLLECTION: questions =====
const questionSchema = {
  _id: ObjectId,
  subjectId: ObjectId, // reference to subjects collection
  type: String, // "true_false" hoặc "multiple_choice"
  content: String, // nội dung câu hỏi
  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ], // For multiple choice: 4 options, For true/false: 2 options
  explanation: String, // giải thích đáp án
  difficulty: String, // "easy", "medium", "hard"
  tags: [String], // các tag liên quan
  dateCreated: Date,
  createdBy: ObjectId, // reference to users collection
  isActive: Boolean, // default: true
  usageCount: Number, // số lần câu hỏi được sử dụng
  correctRate: Number // tỷ lệ trả lời đúng
};

// ===== COLLECTION: exams =====
const examSchema = {
  _id: ObjectId,
  userId: ObjectId, // reference to users collection
  subjectId: ObjectId, // reference to subjects collection (có thể null nếu mix nhiều môn)
  title: String, // tên bài thi
  type: String, // "practice", "test", "random"
  settings: {
    questionCount: Number,
    timeLimit: Number, // thời gian giới hạn (phút)
    shuffleQuestions: Boolean,
    shuffleOptions: Boolean,
    showResult: Boolean, // hiển thị kết quả ngay sau khi làm
    showCorrectAnswers: Boolean
  },
  questions: [
    {
      questionId: ObjectId, // reference to questions collection
      userAnswer: [String], // đáp án user chọn
      isCorrect: Boolean,
      timeSpent: Number // thời gian làm câu này (giây)
    }
  ],
  status: String, // "in_progress", "completed", "abandoned"
  startTime: Date,
  endTime: Date,
  timeSpent: Number, // tổng thời gian làm bài (giây)
  score: Number, // điểm số
  percentage: Number, // phần trăm đúng
  dateCreated: Date
};

// ===== COLLECTION: exam_results =====
const examResultSchema = {
  _id: ObjectId,
  userId: ObjectId, // reference to users collection
  examId: ObjectId, // reference to exams collection
  subjectId: ObjectId, // reference to subjects collection
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  percentage: Number,
  timeSpent: Number, // thời gian hoàn thành (giây)
  difficulty: String, // độ khó trung bình của bài thi
  dateCompleted: Date,
  // Thống kê chi tiết
  categoryStats: [
    {
      category: String, // tag hoặc chủ đề
      correct: Number,
      total: Number,
      percentage: Number
    }
  ]
};

// ===== COLLECTION: user_progress =====
const userProgressSchema = {
  _id: ObjectId,
  userId: ObjectId, // reference to users collection
  subjectId: ObjectId, // reference to subjects collection
  totalQuestions: Number, // tổng số câu đã làm
  correctAnswers: Number, // số câu trả lời đúng
  currentStreak: Number, // chuỗi câu trả lời đúng liên tiếp
  bestStreak: Number, // chuỗi câu trả lời đúng tốt nhất
  lastStudied: Date,
  weakAreas: [String], // các lĩnh vực yếu (tags)
  strongAreas: [String], // các lĩnh vực mạnh (tags)
  studyTime: Number, // tổng thời gian học (phút)
  level: Number, // level hiện tại (1-10)
  experience: Number, // điểm kinh nghiệm
  badges: [String] // các huy hiệu đã đạt được
};

// ===== COLLECTION: study_sessions =====
const studySessionSchema = {
  _id: ObjectId,
  userId: ObjectId, // reference to users collection
  subjectId: ObjectId, // reference to subjects collection
  startTime: Date,
  endTime: Date,
  duration: Number, // thời gian học (phút)
  questionsAnswered: Number,
  correctAnswers: Number,
  sessionType: String, // "practice", "review", "exam"
  performance: Number // điểm performance của session
};

// ===== INDEXES ĐỊNH NGHĨA =====
const indexes = {
  users: [
    { username: 1 }, // unique
    { email: 1 }, // unique
    { "stats.averageScore": -1 }
  ],
  subjects: [
    { code: 1 }, // unique
    { isActive: 1 },
    { questionCount: -1 }
  ],
  questions: [
    { subjectId: 1 },
    { type: 1 },
    { difficulty: 1 },
    { tags: 1 },
    { isActive: 1 },
    { correctRate: -1 },
    { usageCount: -1 },
    { subjectId: 1, type: 1, difficulty: 1 } // compound index
  ],
  exams: [
    { userId: 1 },
    { subjectId: 1 },
    { status: 1 },
    { dateCreated: -1 },
    { userId: 1, status: 1 } // compound index
  ],
  exam_results: [
    { userId: 1 },
    { subjectId: 1 },
    { dateCompleted: -1 },
    { percentage: -1 },
    { userId: 1, subjectId: 1 } // compound index
  ],
  user_progress: [
    { userId: 1 }, // unique
    { subjectId: 1 },
    { userId: 1, subjectId: 1 } // compound unique index
  ],
  study_sessions: [
    { userId: 1 },
    { subjectId: 1 },
    { startTime: -1 },
    { userId: 1, subjectId: 1 } // compound index
  ]
};

module.exports = {
  userSchema,
  subjectSchema,
  questionSchema,
  examSchema,
  examResultSchema,
  userProgressSchema,
  studySessionSchema,
  indexes
};