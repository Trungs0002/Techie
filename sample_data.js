// Sample Data cho MongoDB Atlas
// File này chứa dữ liệu mẫu để test các chức năng

// ===== SAMPLE SUBJECTS =====
const sampleSubjects = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    name: "Cấu trúc dữ liệu và giải thuật",
    code: "CTDL",
    description: "Kiến thức về cấu trúc dữ liệu cơ bản, giải thuật sắp xếp, tìm kiếm",
    isActive: true,
    dateCreated: new Date("2024-01-15"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    questionCount: 25
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    name: "Mạng máy tính",
    code: "MMT",
    description: "Kiến thức về giao thức mạng, mô hình OSI, TCP/IP",
    isActive: true,
    dateCreated: new Date("2024-01-20"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    questionCount: 20
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef3"),
    name: "Cơ sở dữ liệu",
    code: "CSDL",
    description: "Thiết kế CSDL, SQL, NoSQL, normalization",
    isActive: true,
    dateCreated: new Date("2024-01-25"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    questionCount: 18
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef4"),
    name: "Lập trình hướng đối tượng",
    code: "OOP",
    description: "Các khái niệm OOP: encapsulation, inheritance, polymorphism",
    isActive: true,
    dateCreated: new Date("2024-02-01"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    questionCount: 22
  }
];

// ===== SAMPLE USERS =====
const sampleUsers = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    username: "admin",
    email: "admin@example.com",
    password: "$2b$10$rQZ8J8J8J8J8J8J8J8J8JO", // hashed "admin123"
    fullName: "Quản trị viên",
    avatar: "/avatars/admin.png",
    dateCreated: new Date("2024-01-01"),
    lastLogin: new Date(),
    settings: {
      backgroundMusic: false,
      soundEffects: true,
      timer: true,
      questionsPerExam: 10,
      examTimer: 45,
      selectedAvatar: "avatar1"
    },
    stats: {
      totalExams: 50,
      totalCorrect: 420,
      totalQuestions: 500,
      averageScore: 84.0,
      bestScore: 98.5
    }
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    username: "student1",
    email: "student1@example.com",
    password: "$2b$10$rQZ8J8J8J8J8J8J8J8J8JO", // hashed "student123"
    fullName: "Nguyễn Văn A",
    avatar: "/avatars/student1.png",
    dateCreated: new Date("2024-02-01"),
    lastLogin: new Date(),
    settings: {
      backgroundMusic: true,
      soundEffects: true,
      timer: false,
      questionsPerExam: 5,
      examTimer: 30,
      selectedAvatar: "avatar2"
    },
    stats: {
      totalExams: 15,
      totalCorrect: 105,
      totalQuestions: 150,
      averageScore: 70.0,
      bestScore: 85.0
    }
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef6"),
    username: "student2",
    email: "student2@example.com",
    password: "$2b$10$rQZ8J8J8J8J8J8J8J8J8JO", // hashed "student123"
    fullName: "Trần Thị B",
    avatar: "/avatars/student2.png",
    dateCreated: new Date("2024-02-15"),
    lastLogin: new Date(),
    settings: {
      backgroundMusic: false,
      soundEffects: false,
      timer: true,
      questionsPerExam: 8,
      examTimer: 40,
      selectedAvatar: "avatar3"
    },
    stats: {
      totalExams: 8,
      totalCorrect: 56,
      totalQuestions: 80,
      averageScore: 70.0,
      bestScore: 90.0
    }
  }
];

// ===== SAMPLE QUESTIONS - CTDL =====
const sampleQuestionsStructure = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd001"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    type: "multiple_choice",
    content: "Cấu trúc dữ liệu nào sau đây hoạt động theo nguyên tắc LIFO (Last In First Out)?",
    options: [
      { text: "Queue", isCorrect: false },
      { text: "Stack", isCorrect: true },
      { text: "Array", isCorrect: false },
      { text: "Linked List", isCorrect: false }
    ],
    explanation: "Stack hoạt động theo nguyên tắc Last In First Out (LIFO), phần tử được thêm vào cuối cùng sẽ được lấy ra đầu tiên.",
    difficulty: "easy",
    tags: ["stack", "cấu trúc dữ liệu cơ bản"],
    dateCreated: new Date("2024-01-15"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    isActive: true,
    usageCount: 45,
    correctRate: 0.78
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd002"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    type: "true_false",
    content: "Thuật toán sắp xếp Quick Sort có độ phức tạp trung bình O(n log n).",
    options: [
      { text: "Đúng", isCorrect: true },
      { text: "Sai", isCorrect: false }
    ],
    explanation: "Quick Sort có độ phức tạp trung bình O(n log n) và worst case O(n²). Đây là một trong những thuật toán sắp xếp hiệu quả nhất.",
    difficulty: "medium",
    tags: ["sorting", "complexity analysis", "quicksort"],
    dateCreated: new Date("2024-01-16"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    isActive: true,
    usageCount: 32,
    correctRate: 0.65
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd003"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    type: "multiple_choice",
    content: "Trong Binary Search Tree, để tìm phần tử nhỏ nhất, ta cần:",
    options: [
      { text: "Đi về phía trái cho đến khi gặp node lá", isCorrect: true },
      { text: "Đi về phía phải cho đến khi gặp node lá", isCorrect: false },
      { text: "Duyệt toàn bộ cây", isCorrect: false },
      { text: "Kiểm tra node gốc", isCorrect: false }
    ],
    explanation: "Trong BST, các giá trị nhỏ hơn được lưu ở bên trái, nên phần tử nhỏ nhất sẽ là node lá bên trái nhất.",
    difficulty: "medium",
    tags: ["binary search tree", "tree traversal"],
    dateCreated: new Date("2024-01-17"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    isActive: true,
    usageCount: 28,
    correctRate: 0.71
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd004"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    type: "true_false",
    content: "Hash Table có thể xảy ra collision khi hai key khác nhau có cùng hash value.",
    options: [
      { text: "Đúng", isCorrect: true },
      { text: "Sai", isCorrect: false }
    ],
    explanation: "Collision xảy ra khi hash function tạo ra cùng một hash value cho các key khác nhau. Đây là vấn đề phổ biến trong Hash Table.",
    difficulty: "easy",
    tags: ["hash table", "collision"],
    dateCreated: new Date("2024-01-18"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    isActive: true,
    usageCount: 38,
    correctRate: 0.82
  }
];

// ===== SAMPLE QUESTIONS - NETWORKING =====
const sampleQuestionsNetwork = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd005"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    type: "multiple_choice",
    content: "Trong mô hình OSI, layer nào chịu trách nhiệm routing?",
    options: [
      { text: "Physical Layer", isCorrect: false },
      { text: "Data Link Layer", isCorrect: false },
      { text: "Network Layer", isCorrect: true },
      { text: "Transport Layer", isCorrect: false }
    ],
    explanation: "Network Layer (Layer 3) chịu trách nhiệm routing, xác định đường đi tốt nhất cho dữ liệu.",
    difficulty: "medium",
    tags: ["OSI model", "routing", "network layer"],
    dateCreated: new Date("2024-01-20"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    isActive: true,
    usageCount: 42,
    correctRate: 0.73
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd006"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    type: "true_false",
    content: "TCP là giao thức connectionless, không đảm bảo độ tin cậy.",
    options: [
      { text: "Đúng", isCorrect: false },
      { text: "Sai", isCorrect: true }
    ],
    explanation: "TCP là giao thức connection-oriented và đảm bảo độ tin cậy. UDP mới là giao thức connectionless.",
    difficulty: "easy",
    tags: ["TCP", "UDP", "transport protocol"],
    dateCreated: new Date("2024-01-21"),
    createdBy: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    isActive: true,
    usageCount: 51,
    correctRate: 0.86
  }
];

// ===== SAMPLE EXAMS =====
const sampleExams = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abce001"),
    userId: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    title: "Ôn tập Cấu trúc dữ liệu - Lần 1",
    type: "practice",
    settings: {
      questionCount: 5,
      timeLimit: 30,
      shuffleQuestions: true,
      shuffleOptions: false,
      showResult: true,
      showCorrectAnswers: true
    },
    questions: [
      {
        questionId: ObjectId("64a1b2c3d4e5f6789abcd001"),
        userAnswer: ["Stack"],
        isCorrect: true,
        timeSpent: 15
      },
      {
        questionId: ObjectId("64a1b2c3d4e5f6789abcd002"),
        userAnswer: ["Đúng"],
        isCorrect: true,
        timeSpent: 25
      },
      {
        questionId: ObjectId("64a1b2c3d4e5f6789abcd003"),
        userAnswer: ["Duyệt toàn bộ cây"],
        isCorrect: false,
        timeSpent: 30
      },
      {
        questionId: ObjectId("64a1b2c3d4e5f6789abcd004"),
        userAnswer: ["Đúng"],
        isCorrect: true,
        timeSpent: 20
      }
    ],
    status: "completed",
    startTime: new Date("2024-03-01T09:00:00Z"),
    endTime: new Date("2024-03-01T09:20:00Z"),
    timeSpent: 1200, // 20 phút
    score: 75,
    percentage: 75.0,
    dateCreated: new Date("2024-03-01")
  }
];

// ===== SAMPLE EXAM RESULTS =====
const sampleExamResults = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcer01"),
    userId: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    examId: ObjectId("64a1b2c3d4e5f6789abce001"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    score: 75,
    totalQuestions: 4,
    correctAnswers: 3,
    percentage: 75.0,
    timeSpent: 1200,
    difficulty: "medium",
    dateCompleted: new Date("2024-03-01T09:20:00Z"),
    categoryStats: [
      {
        category: "stack",
        correct: 1,
        total: 1,
        percentage: 100.0
      },
      {
        category: "sorting",
        correct: 1,
        total: 1,
        percentage: 100.0
      },
      {
        category: "binary search tree",
        correct: 0,
        total: 1,
        percentage: 0.0
      },
      {
        category: "hash table",
        correct: 1,
        total: 1,
        percentage: 100.0
      }
    ]
  }
];

// ===== SAMPLE USER PROGRESS =====
const sampleUserProgress = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcpr01"),
    userId: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    totalQuestions: 50,
    correctAnswers: 35,
    currentStreak: 3,
    bestStreak: 8,
    lastStudied: new Date("2024-03-01"),
    weakAreas: ["binary search tree", "graph algorithms"],
    strongAreas: ["stack", "hash table", "sorting"],
    studyTime: 180, // 3 giờ
    level: 3,
    experience: 750,
    badges: ["First Quiz", "Study Streak", "Quick Learner"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcpr02"),
    userId: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    totalQuestions: 20,
    correctAnswers: 16,
    currentStreak: 2,
    bestStreak: 5,
    lastStudied: new Date("2024-02-28"),
    weakAreas: ["routing protocols"],
    strongAreas: ["OSI model", "TCP/IP"],
    studyTime: 90, // 1.5 giờ
    level: 2,
    experience: 320,
    badges: ["Network Novice"]
  }
];

// ===== SAMPLE STUDY SESSIONS =====
const sampleStudySessions = [
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcss01"),
    userId: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    startTime: new Date("2024-03-01T09:00:00Z"),
    endTime: new Date("2024-03-01T09:30:00Z"),
    duration: 30,
    questionsAnswered: 5,
    correctAnswers: 4,
    sessionType: "practice",
    performance: 80.0
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcss02"),
    userId: ObjectId("64a1b2c3d4e5f6789abcdef5"),
    subjectId: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    startTime: new Date("2024-02-28T14:00:00Z"),
    endTime: new Date("2024-02-28T14:25:00Z"),
    duration: 25,
    questionsAnswered: 3,
    correctAnswers: 3,
    sessionType: "review",
    performance: 100.0
  }
];

// Export all sample data
module.exports = {
  sampleSubjects,
  sampleUsers,
  sampleQuestionsStructure,
  sampleQuestionsNetwork,
  sampleExams,
  sampleExamResults,
  sampleUserProgress,
  sampleStudySessions
};