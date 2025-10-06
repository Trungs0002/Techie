# Database Schema Documentation
## Ứng dụng Luyện thi Trắc nghiệm Kiến thức CNTT

### Tổng quan
Database được thiết kế để hỗ trợ ứng dụng luyện thi trắc nghiệm với các chức năng chính:
- Quản lý người dùng và cài đặt cá nhân
- Quản lý câu hỏi theo môn học
- Tổ chức bài thi và theo dõi kết quả
- Thống kê tiến độ học tập

### Mô hình quan hệ

```
users (1) -----> (n) exams
users (1) -----> (n) exam_results  
users (1) -----> (n) user_progress
users (1) -----> (n) study_sessions
users (1) -----> (n) questions (created_by)
users (1) -----> (n) subjects (created_by)

subjects (1) -----> (n) questions
subjects (1) -----> (n) exams
subjects (1) -----> (n) exam_results
subjects (1) -----> (n) user_progress

questions (n) -----> (n) exams (through questions array)
exams (1) -----> (1) exam_results
```

## Chi tiết các Collections

### 1. Collection: `users`
**Mục đích**: Lưu trữ thông tin người dùng và cài đặt cá nhân

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  username: String,        // Tên đăng nhập (unique)
  email: String,           // Email (unique)
  password: String,        // Mật khẩu đã hash
  fullName: String,        // Họ tên đầy đủ
  avatar: String,          // URL/path đến avatar
  dateCreated: Date,       // Ngày tạo tài khoản
  lastLogin: Date,         // Lần đăng nhập cuối
  
  settings: {              // Cài đặt cá nhân
    backgroundMusic: Boolean,     // Nhạc nền (default: false)
    soundEffects: Boolean,        // Hiệu ứng âm thanh (default: false)
    timer: Boolean,               // Bật timer cho câu hỏi (default: false)
    questionsPerExam: Number,     // Số câu hỏi/bài thi (default: 5)
    examTimer: Number,            // Timer cho toàn bộ bài (phút)
    selectedAvatar: String        // Avatar đã chọn
  },
  
  stats: {                 // Thống kê tổng quan
    totalExams: Number,           // Tổng số bài thi đã làm
    totalCorrect: Number,         // Tổng số câu trả lời đúng
    totalQuestions: Number,       // Tổng số câu đã làm
    averageScore: Number,         // Điểm trung bình
    bestScore: Number             // Điểm cao nhất
  }
}
```

#### Validation Rules:
- `username`: Required, unique, 3-50 ký tự
- `email`: Required, unique, format email hợp lệ
- `password`: Required, tối thiểu 6 ký tự
- `settings.questionsPerExam`: 1-50 câu
- `settings.examTimer`: 1-180 phút

### 2. Collection: `subjects`
**Mục đích**: Quản lý các môn học/chủ đề

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  name: String,            // Tên môn học
  code: String,            // Mã môn (unique)
  description: String,     // Mô tả môn học
  isActive: Boolean,       // Trạng thái hoạt động
  dateCreated: Date,       // Ngày tạo
  createdBy: ObjectId,     // ID người tạo
  questionCount: Number    // Số lượng câu hỏi
}
```

#### Ví dụ dữ liệu:
```javascript
{
  name: "Cấu trúc dữ liệu và giải thuật",
  code: "CTDL",
  description: "Kiến thức về cấu trúc dữ liệu cơ bản và giải thuật",
  isActive: true
}
```

### 3. Collection: `questions`
**Mục đích**: Lưu trữ câu hỏi trắc nghiệm

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  subjectId: ObjectId,     // ID môn học
  type: String,            // "true_false" hoặc "multiple_choice"
  content: String,         // Nội dung câu hỏi
  
  options: [               // Các lựa chọn
    {
      text: String,        // Nội dung lựa chọn
      isCorrect: Boolean   // Đúng/sai
    }
  ],
  
  explanation: String,     // Giải thích đáp án
  difficulty: String,      // "easy", "medium", "hard"
  tags: [String],         // Tags phân loại
  dateCreated: Date,      // Ngày tạo
  createdBy: ObjectId,    // ID người tạo
  isActive: Boolean,      // Trạng thái
  usageCount: Number,     // Số lần sử dụng
  correctRate: Number     // Tỷ lệ trả lời đúng
}
```

#### Ví dụ câu hỏi 4 lựa chọn:
```javascript
{
  type: "multiple_choice",
  content: "Cấu trúc dữ liệu nào sau đây hoạt động theo nguyên tắc LIFO?",
  options: [
    { text: "Queue", isCorrect: false },
    { text: "Stack", isCorrect: true },
    { text: "Array", isCorrect: false },
    { text: "Linked List", isCorrect: false }
  ],
  explanation: "Stack hoạt động theo nguyên tắc Last In First Out (LIFO)",
  difficulty: "easy",
  tags: ["stack", "cấu trúc dữ liệu cơ bản"]
}
```

#### Ví dụ câu hỏi đúng/sai:
```javascript
{
  type: "true_false",
  content: "Thuật toán sắp xếp Quick Sort có độ phức tạp trung bình O(n log n)",
  options: [
    { text: "Đúng", isCorrect: true },
    { text: "Sai", isCorrect: false }
  ],
  explanation: "Quick Sort có độ phức tạp trung bình O(n log n) và worst case O(n²)",
  difficulty: "medium",
  tags: ["sorting", "complexity analysis"]
}
```

### 4. Collection: `exams`
**Mục đích**: Lưu trữ thông tin các bài thi/luyện tập

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // ID người làm bài
  subjectId: ObjectId,     // ID môn học (có thể null)
  title: String,           // Tên bài thi
  type: String,            // "practice", "test", "random"
  
  settings: {              // Cài đặt bài thi
    questionCount: Number,      // Số câu hỏi
    timeLimit: Number,          // Giới hạn thời gian (phút)
    shuffleQuestions: Boolean,  // Trộn câu hỏi
    shuffleOptions: Boolean,    // Trộn lựa chọn
    showResult: Boolean,        // Hiện kết quả ngay
    showCorrectAnswers: Boolean // Hiện đáp án đúng
  },
  
  questions: [             // Danh sách câu hỏi trong bài
    {
      questionId: ObjectId,     // ID câu hỏi
      userAnswer: [String],     // Đáp án người dùng chọn
      isCorrect: Boolean,       // Kết quả đúng/sai
      timeSpent: Number         // Thời gian làm (giây)
    }
  ],
  
  status: String,          // "in_progress", "completed", "abandoned"
  startTime: Date,         // Thời gian bắt đầu
  endTime: Date,           // Thời gian kết thúc
  timeSpent: Number,       // Tổng thời gian (giây)
  score: Number,           // Điểm số
  percentage: Number,      // Phần trăm đúng
  dateCreated: Date        // Ngày tạo
}
```

### 5. Collection: `exam_results`
**Mục đích**: Lưu trữ kết quả chi tiết của các bài thi

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // ID người làm bài
  examId: ObjectId,        // ID bài thi
  subjectId: ObjectId,     // ID môn học
  score: Number,           // Điểm số
  totalQuestions: Number,  // Tổng số câu
  correctAnswers: Number,  // Số câu đúng
  percentage: Number,      // Phần trăm đúng
  timeSpent: Number,       // Thời gian hoàn thành
  difficulty: String,      // Độ khó trung bình
  dateCompleted: Date,     // Ngày hoàn thành
  
  categoryStats: [         // Thống kê theo danh mục
    {
      category: String,    // Tag/chủ đề
      correct: Number,     // Số câu đúng
      total: Number,       // Tổng số câu
      percentage: Number   // Phần trăm đúng
    }
  ]
}
```

### 6. Collection: `user_progress`
**Mục đích**: Theo dõi tiến độ học tập của người dùng

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // ID người dùng
  subjectId: ObjectId,     // ID môn học
  totalQuestions: Number,  // Tổng câu đã làm
  correctAnswers: Number,  // Số câu đúng
  currentStreak: Number,   // Chuỗi đúng hiện tại
  bestStreak: Number,      // Chuỗi đúng tốt nhất
  lastStudied: Date,       // Lần học cuối
  weakAreas: [String],     // Lĩnh vực yếu
  strongAreas: [String],   // Lĩnh vực mạnh
  studyTime: Number,       // Tổng thời gian học (phút)
  level: Number,           // Level hiện tại (1-10)
  experience: Number,      // Điểm kinh nghiệm
  badges: [String]         // Huy hiệu đạt được
}
```

### 7. Collection: `study_sessions`
**Mục đích**: Theo dõi các phiên học tập

#### Cấu trúc:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // ID người dùng
  subjectId: ObjectId,     // ID môn học
  startTime: Date,         // Thời gian bắt đầu
  endTime: Date,           // Thời gian kết thúc
  duration: Number,        // Thời lượng (phút)
  questionsAnswered: Number, // Số câu đã trả lời
  correctAnswers: Number,    // Số câu đúng
  sessionType: String,       // "practice", "review", "exam"
  performance: Number        // Hiệu suất phiên học
}
```

## Indexes cho Performance

### Critical Indexes:
```javascript
// users collection
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })

// questions collection  
db.questions.createIndex({ "subjectId": 1, "type": 1, "difficulty": 1 })
db.questions.createIndex({ "tags": 1 })
db.questions.createIndex({ "isActive": 1 })

// exams collection
db.exams.createIndex({ "userId": 1, "status": 1 })
db.exams.createIndex({ "dateCreated": -1 })

// exam_results collection
db.exam_results.createIndex({ "userId": 1, "subjectId": 1 })
db.exam_results.createIndex({ "dateCompleted": -1 })

// user_progress collection
db.user_progress.createIndex({ "userId": 1, "subjectId": 1 }, { unique: true })
```

## Quy tắc Business Logic

### 1. User Settings Defaults:
- `backgroundMusic`: false
- `soundEffects`: false  
- `timer`: false
- `questionsPerExam`: 5
- `examTimer`: 30 phút

### 2. Question Types:
- **true_false**: 2 options (Đúng/Sai)
- **multiple_choice**: 4 options, chỉ 1 đúng

### 3. Exam Status Flow:
- `in_progress` → `completed` hoặc `abandoned`
- Không thể sửa bài đã `completed`

### 4. Scoring System:
- Điểm = (Số câu đúng / Tổng số câu) × 100
- Level tăng dựa trên experience points
- Badges dựa trên achievements (streak, accuracy, etc.)

## Security Considerations

### 1. Data Protection:
- Password phải được hash (bcrypt)
- Email validation trước khi lưu
- Rate limiting cho login attempts

### 2. Access Control:
- Users chỉ xem được data của mình
- Admin có thể quản lý subjects và questions
- Creators có thể edit questions của mình

### 3. Data Validation:
- Input sanitization cho tất cả user input
- Validate question options (ít nhất 1 đúng cho multiple choice)
- Validate exam settings (time limits hợp lý)

## Performance Optimization

### 1. Indexing Strategy:
- Compound indexes cho queries thường dùng
- Text indexes cho search functionality
- TTL indexes cho temporary data

### 2. Data Aggregation:
- Pre-calculate user stats
- Cache frequently accessed subjects
- Optimize question randomization queries

### 3. Monitoring:
- Track slow queries
- Monitor collection sizes
- Index usage statistics