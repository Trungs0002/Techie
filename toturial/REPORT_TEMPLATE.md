# 📄 TEMPLATE BÁO CÁO ĐỒ ÁN

> Template chuẩn cho Báo cáo Đồ án Lập trình Ứng dụng 2  
> Đề tài: Xây dựng ứng dụng luyện thi trắc nghiệm CNTT

---

## 📋 CẤU TRÚC BÁO CÁO

```
├── 1. TRANG BÌA
├── 2. NHẬN XÉT CỦA GIẢNG VIÊN
├── 3. LỜI CAM ĐOAN
├── 4. LỜI CẢM ƠN
├── 5. TÓM TẮT ĐỒ ÁN
├── 6. MỤC LỤC
├── 7. DANH MỤC HÌNH ẢNH
├── 8. DANH MỤC BẢNG BIỂU
├── 9. NỘI DUNG CHÍNH
│   ├── CHƯƠNG 1: GIỚI THIỆU
│   ├── CHƯƠNG 2: CƠ SỞ LÝ THUYẾT
│   ├── CHƯƠNG 3: PHÂN TÍCH & THIẾT KẾ HỆ THỐNG
│   ├── CHƯƠNG 4: TRIỂN KHAI HỆ THỐNG
│   ├── CHƯƠNG 5: TESTING & ĐÁNH GIÁ
│   └── CHƯƠNG 6: KẾT LUẬN & HƯỚNG PHÁT TRIỂN
├── 10. TÀI LIỆU THAM KHẢO
└── 11. PHỤ LỤC
```

---

## 1. TRANG BÌA

```
=====================================
  ĐẠI HỌC QUỐC GIA TP.HCM
  TRƯỜNG ĐẠI HỌC BÁCH KHOA
  KHOA KHOA HỌC & KỸ THUẬT MÁY TÍNH
=====================================

Logo trường




            BÁO CÁO ĐỒ ÁN
      LẬP TRÌNH ỨNG DỤNG 2
            (CO3103)


        XÂY DỰNG ỨNG DỤNG
    LUYỆN THI TRẮC NGHIỆM KIẾN THỨC
      CHUYÊN NGÀNH CÔNG NGHỆ THÔNG TIN




GVHD: [Tên giảng viên]

Sinh viên thực hiện:
- Họ tên 1 - MSSV 1
- Họ tên 2 - MSSV 2

Lớp: [Mã lớp]
Học kỳ: 251 (2024-2025)


        TP. Hồ Chí Minh, tháng XX/2024
```

---

## 2. NHẬN XÉT CỦA GIẢNG VIÊN

```
NHẬN XÉT CỦA GIẢNG VIÊN HƯỚNG DẪN




Ngày ... tháng ... năm 2024
               GIẢNG VIÊN HƯỚNG DẪN
               (Ký và ghi rõ họ tên)
```

---

## 3. LỜI CAM ĐOAN

```
LỜI CAM ĐOAN

Chúng em xin cam đoan đây là đồ án do chính chúng em thực hiện. 
Các số liệu, kết quả nêu trong đồ án là trung thực. 
Những kết luận khoa học của đồ án chưa từng được ai công bố 
trong bất kỳ công trình nào khác.


                    Tp. Hồ Chí Minh, ngày ... tháng ... năm 2024


        Sinh viên 1                    Sinh viên 2
        [Ký tên]                       [Ký tên]
        Họ tên                         Họ tên
```

---

## 4. LỜI CẢM ƠN

```
LỜI CẢM ƠN

Đầu tiên, chúng em xin gửi lời cảm ơn chân thành nhất đến 
Thầy/Cô [Tên GVHD], người đã tận tình hướng dẫn, chỉ bảo 
chúng em trong suốt quá trình thực hiện đồ án.

Chúng em xin cảm ơn Khoa Khoa học và Kỹ thuật Máy tính, 
Trường Đại học Bách Khoa - ĐHQG TP.HCM đã tạo điều kiện 
thuận lợi để chúng em hoàn thành đồ án này.

Mặc dù đã có nhiều cố gắng, nhưng do thời gian và kinh nghiệm 
còn hạn chế nên đồ án không tránh khỏi những thiếu sót. 
Chúng em rất mong nhận được sự góp ý của Thầy Cô để hoàn thiện hơn.

Chúng em xin chân thành cảm ơn!


                    Tp. Hồ Chí Minh, ngày ... tháng ... năm 2024
                            NHÓM SINH VIÊN THỰC HIỆN
```

---

## 5. TÓM TẮT ĐỒ ÁN

### Tiếng Việt

```
TÓM TẮT

Đồ án "Xây dựng ứng dụng luyện thi trắc nghiệm kiến thức 
chuyên ngành Công nghệ thông tin" được phát triển nhằm tạo ra 
một công cụ hỗ trợ sinh viên CNTT ôn tập và nâng cao kiến thức 
chuyên môn thông qua hệ thống câu hỏi trắc nghiệm tương tác.

Ứng dụng được xây dựng dưới dạng web application với công nghệ:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas

Các chức năng chính bao gồm:
1. Hệ thống đăng nhập và quản lý tài khoản người dùng
2. Tùy chỉnh cài đặt cá nhân (âm thanh, timer, avatar)
3. Làm bài thi trắc nghiệm với nhiều độ khó
4. Xây dựng và quản lý câu hỏi
5. Thống kê và theo dõi tiến độ học tập

Kết quả: Ứng dụng hoạt động ổn định, đáp ứng đầy đủ yêu cầu 
đề ra, có giao diện thân thiện và trải nghiệm người dùng tốt.

Từ khóa: Quiz App, Trắc nghiệm, E-learning, React, Node.js, MongoDB
```

### Tiếng Anh (Abstract)

```
ABSTRACT

The project "Building a Quiz Application for IT Knowledge" 
aims to create a tool to help IT students review and improve 
their professional knowledge through an interactive quiz system.

The application is built as a web application with technologies:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas

Main features include:
1. User authentication and account management
2. Personal settings customization (sound, timer, avatar)
3. Taking quizzes with multiple difficulty levels
4. Building and managing questions
5. Statistics and progress tracking

Result: The application works stably, fully meets the requirements,
has a friendly interface and good user experience.

Keywords: Quiz App, Multiple Choice, E-learning, React, Node.js, MongoDB
```

---

## 6. MỤC LỤC

```
MỤC LỤC

CHƯƠNG 1: GIỚI THIỆU................................................1
  1.1. Lý do chọn đề tài...........................................1
  1.2. Mục tiêu đồ án..............................................2
  1.3. Phạm vi nghiên cứu..........................................3
  1.4. Phương pháp nghiên cứu......................................4
  1.5. Cấu trúc báo cáo............................................5

CHƯƠNG 2: CƠ SỞ LÝ THUYẾT.........................................6
  2.1. Tổng quan về E-learning.....................................6
  2.2. Công nghệ web hiện đại......................................8
  2.3. Kiến trúc Client-Server....................................10
  2.4. RESTful API................................................12
  2.5. Database NoSQL.............................................14

CHƯƠNG 3: PHÂN TÍCH & THIẾT KẾ HỆ THỐNG..........................16
  3.1. Phân tích yêu cầu..........................................16
  3.2. Thiết kế Use Case..........................................18
  3.3. Thiết kế Database Schema...................................20
  3.4. Thiết kế kiến trúc hệ thống................................25
  3.5. Thiết kế giao diện.........................................30

CHƯƠNG 4: TRIỂN KHAI HỆ THỐNG....................................35
  4.1. Môi trường phát triển......................................35
  4.2. Triển khai Backend.........................................37
  4.3. Triển khai Frontend........................................42
  4.4. Tích hợp hệ thống..........................................47
  4.5. Deployment.................................................50

CHƯƠNG 5: TESTING & ĐÁNH GIÁ....................................52
  5.1. Kế hoạch testing...........................................52
  5.2. Test cases.................................................54
  5.3. Kết quả testing............................................58
  5.4. Đánh giá hệ thống..........................................60

CHƯƠNG 6: KẾT LUẬN & HƯỚNG PHÁT TRIỂN............................62
  6.1. Kết quả đạt được...........................................62
  6.2. Hạn chế....................................................63
  6.3. Hướng phát triển...........................................64

TÀI LIỆU THAM KHẢO................................................65

PHỤ LỤC..........................................................66
```

---

## 7. DANH MỤC HÌNH ẢNH

```
DANH MỤC HÌNH ẢNH

Hình 2.1: Mô hình E-learning......................................7
Hình 2.2: Kiến trúc Client-Server................................11
Hình 3.1: Use Case Diagram.......................................19
Hình 3.2: ER Diagram.............................................22
Hình 3.3: Database Schema........................................24
Hình 3.4: Kiến trúc hệ thống.....................................27
Hình 3.5: Wireframe - Trang đăng nhập............................31
Hình 3.6: Wireframe - Giao diện Quiz.............................32
Hình 3.7: Mockup - Dashboard.....................................33
Hình 4.1: Cấu trúc thư mục Backend...............................38
Hình 4.2: Cấu trúc thư mục Frontend..............................43
Hình 4.3: API Documentation......................................48
Hình 5.1: Giao diện Login - Actual...............................56
Hình 5.2: Giao diện Quiz - Actual................................57
Hình 5.3: Test Results Dashboard.................................59
```

---

## 8. DANH MỤC BẢNG BIỂU

```
DANH MỤC BẢNG BIỂU

Bảng 2.1: So sánh SQL vs NoSQL...................................15
Bảng 3.1: Mô tả Use Cases........................................20
Bảng 3.2: Database Collections...................................23
Bảng 3.3: API Endpoints..........................................28
Bảng 4.1: Tech Stack.............................................36
Bảng 4.2: Backend Dependencies...................................40
Bảng 4.3: Frontend Dependencies..................................45
Bảng 5.1: Test Cases Summary.....................................55
Bảng 5.2: Bug Reports............................................58
Bảng 5.3: Performance Metrics....................................61
```

---

## NỘI DUNG CHI TIẾT

### CHƯƠNG 1: GIỚI THIỆU

#### 1.1. Lý do chọn đề tài

```
Trong bối cảnh giáo dục hiện đại, việc ứng dụng công nghệ 
vào học tập ngày càng trở nên quan trọng. Đặc biệt trong 
lĩnh vực Công nghệ thông tin, sinh viên cần liên tục cập nhật 
và củng cố kiến thức thông qua việc thực hành và ôn tập.

Hiện nay, các phương thức ôn tập truyền thống như đọc sách, 
ghi chép có nhiều hạn chế:
- Thiếu tính tương tác
- Không có feedback tức thì
- Khó theo dõi tiến độ
- Không thể tùy chỉnh theo nhu cầu

Từ những lý do trên, nhóm chúng em quyết định phát triển ứng dụng 
"Luyện thi trắc nghiệm kiến thức CNTT" - một giải pháp học tập 
hiện đại, tương tác và hiệu quả.
```

#### 1.2. Mục tiêu đồ án

```
Mục tiêu tổng quát:
Xây dựng ứng dụng web hỗ trợ sinh viên CNTT ôn tập và kiểm tra 
kiến thức thông qua hệ thống trắc nghiệm tương tác.

Mục tiêu cụ thể:
1. Phát triển giao diện thân thiện, dễ sử dụng
2. Xây dựng hệ thống câu hỏi đa dạng về các chủ đề CNTT
3. Tích hợp các tính năng cá nhân hóa (settings, avatar, timer)
4. Implement hệ thống theo dõi và đánh giá kết quả học tập
5. Đảm bảo hiệu năng và bảo mật cho hệ thống
```

#### 1.3. Phạm vi nghiên cứu

```
Phạm vi nghiên cứu bao gồm:

Về chức năng:
- Authentication và authorization
- Quản lý câu hỏi trắc nghiệm
- Làm bài thi và chấm điểm tự động
- Settings và personalization
- Statistics và progress tracking

Về công nghệ:
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: Vercel, Railway, MongoDB Atlas

Giới hạn:
- Chỉ hỗ trợ câu hỏi trắc nghiệm (không có tự luận)
- Không có tính năng giáo viên/admin phức tạp
- Không có real-time collaboration
```

#### 1.4. Phương pháp nghiên cứu

```
1. Nghiên cứu lý thuyết:
   - Tìm hiểu các ứng dụng E-learning tương tự
   - Nghiên cứu công nghệ web hiện đại
   - Học về UX/UI design principles

2. Phân tích và thiết kế:
   - Phân tích yêu cầu từ đề tài
   - Thiết kế database schema
   - Thiết kế wireframe và mockup
   - Thiết kế API architecture

3. Triển khai:
   - Setup development environment
   - Develop theo phương pháp Agile
   - Testing liên tục trong quá trình develop
   - Code review và refactoring

4. Testing và đánh giá:
   - Unit testing
   - Integration testing
   - User acceptance testing
   - Performance testing
```

#### 1.5. Cấu trúc báo cáo

```
Báo cáo được chia thành 6 chương:

Chương 1: Giới thiệu tổng quan về đồ án
Chương 2: Trình bày cơ sở lý thuyết
Chương 3: Phân tích và thiết kế hệ thống
Chương 4: Chi tiết triển khai
Chương 5: Testing và đánh giá
Chương 6: Kết luận và hướng phát triển
```

---

### CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

#### 2.1. Tổng quan về E-learning

```
2.1.1. Định nghĩa E-learning
E-learning (Electronic Learning) là hình thức học tập sử dụng 
công nghệ điện tử, đặc biệt là Internet, để truy cập các tài liệu 
học tập bên ngoài lớp học truyền thống.

[Hình 2.1: Mô hình E-learning - Insert image]

2.1.2. Ưu điểm của E-learning
- Học mọi lúc, mọi nơi
- Tiết kiệm chi phí
- Tùy chỉnh theo nhu cầu cá nhân
- Feedback tức thì
- Dễ dàng cập nhật nội dung

2.1.3. Các loại E-learning
- Synchronous (học đồng bộ)
- Asynchronous (học không đồng bộ)
- Blended learning (kết hợp)

Ứng dụng của chúng em thuộc loại Asynchronous E-learning.
```

#### 2.2. Công nghệ web hiện đại

```
2.2.1. Single Page Application (SPA)
SPA là ứng dụng web chỉ tải một trang HTML duy nhất và 
cập nhật nội dung động mà không reload toàn bộ trang.

Ưu điểm:
- Trải nghiệm mượt mà như native app
- Giảm tải cho server
- Tái sử dụng code hiệu quả

Công nghệ: React.js được sử dụng trong đồ án này.

2.2.2. Progressive Web Apps (PWA)
PWA kết hợp ưu điểm của web và mobile app:
- Hoạt động offline
- Installable
- Fast và reliable

2.2.3. Responsive Web Design
Thiết kế web responsive đảm bảo giao diện hoạt động tốt 
trên mọi kích thước màn hình.

Công nghệ: Tailwind CSS với mobile-first approach.
```

#### 2.3. Kiến trúc Client-Server

```
2.3.1. Mô hình Client-Server

[Hình 2.2: Kiến trúc Client-Server - Insert diagram]

Client (Frontend):
- Xử lý giao diện người dùng
- Gửi requests đến server
- Nhận và hiển thị dữ liệu

Server (Backend):
- Xử lý business logic
- Quản lý database
- Authentication & Authorization
- API endpoints

2.3.2. Ưu điểm của kiến trúc này
- Separation of concerns
- Dễ scale và maintain
- Security tốt hơn
- Có thể develop song song

2.3.3. Ứng dụng trong đồ án
Frontend (React) ←→ Backend (Node.js) ←→ Database (MongoDB)
```

#### 2.4. RESTful API

```
2.4.1. Khái niệm REST
REST (Representational State Transfer) là một kiểu kiến trúc 
phần mềm cho các hệ thống phân tán.

2.4.2. Nguyên tắc REST
1. Client-Server architecture
2. Stateless
3. Cacheable
4. Uniform interface
5. Layered system

2.4.3. HTTP Methods
- GET: Lấy dữ liệu
- POST: Tạo mới
- PUT: Cập nhật toàn bộ
- PATCH: Cập nhật một phần
- DELETE: Xóa

2.4.4. Status Codes
- 2xx: Success
- 3xx: Redirection
- 4xx: Client errors
- 5xx: Server errors

2.4.5. Ví dụ API trong đồ án
GET    /api/questions        - Lấy danh sách câu hỏi
POST   /api/questions        - Tạo câu hỏi mới
GET    /api/questions/:id    - Lấy chi tiết câu hỏi
PUT    /api/questions/:id    - Cập nhật câu hỏi
DELETE /api/questions/:id    - Xóa câu hỏi
```

#### 2.5. Database NoSQL

```
2.5.1. SQL vs NoSQL

[Bảng 2.1: So sánh SQL vs NoSQL]
┌────────────┬─────────────────┬─────────────────┐
│ Tiêu chí   │ SQL             │ NoSQL           │
├────────────┼─────────────────┼─────────────────┤
│ Schema     │ Fixed           │ Flexible        │
│ Scaling    │ Vertical        │ Horizontal      │
│ Data Model │ Relational      │ Document/KV/... │
│ Query      │ SQL             │ API calls       │
│ Use case   │ Complex queries │ Large scale     │
└────────────┴─────────────────┴─────────────────┘

2.5.2. MongoDB
MongoDB là document-oriented database, lưu trữ dữ liệu 
dưới dạng JSON-like documents (BSON).

Ưu điểm:
- Schema flexible
- Dễ scale horizontally
- Query performance tốt
- Rich query language

2.5.3. Mongoose
Mongoose là ODM (Object Data Modeling) library cho MongoDB:
- Define schemas
- Validation
- Query builder
- Middleware support

2.5.4. Ứng dụng trong đồ án
7 collections chính:
- users
- subjects
- questions
- exams
- exam_results
- user_progress
- study_sessions
```

---

### CHƯƠNG 3: PHÂN TÍCH & THIẾT KẾ

#### 3.1. Phân tích yêu cầu

```
3.1.1. Yêu cầu chức năng

RF1: Authentication
- User registration
- User login
- Session management
- Password security

RF2: Settings Management
- Background music on/off (default: off)
- Sound effects on/off (default: off)
- Timer per question on/off (default: off)
- Questions per exam (default: 5, range: 1-50)
- Total exam timer (default: 30 mins, range: 1-180)
- Avatar selection

RF3: Quiz Taking
- Display questions (True/False or Multiple Choice)
- Submit answers
- Instant feedback
- Score calculation
- Timer integration

RF4: Question Management
- Create questions
- Edit questions
- Delete questions
- Question types: True/False (2 options), Multiple Choice (4 options)
- One correct answer only

3.1.2. Yêu cầu phi chức năng

NFR1: Performance
- Page load time < 3 seconds
- API response time < 500ms
- Support 100 concurrent users

NFR2: Security
- Password hashing (bcrypt)
- JWT authentication
- Input validation
- XSS protection
- CORS configuration

NFR3: Usability
- Intuitive interface
- Mobile responsive
- Accessible (WCAG 2.1 Level AA)

NFR4: Reliability
- 99% uptime
- Error handling
- Data backup
```

#### 3.2. Thiết kế Use Case

```
3.2.1. Use Case Diagram

[Hình 3.1: Use Case Diagram - Insert diagram]

Actors:
- Student: Người học
- Admin: Quản trị viên (optional)

3.2.2. Mô tả Use Cases

[Bảng 3.1: Mô tả Use Cases]

UC1: Login
- Actor: Student
- Precondition: User has account
- Main Flow:
  1. User enters email/password
  2. System validates credentials
  3. System generates JWT token
  4. User redirected to dashboard
- Postcondition: User authenticated

UC2: Take Quiz
- Actor: Student
- Precondition: User logged in
- Main Flow:
  1. User selects subject
  2. User configures settings (# questions, timer)
  3. System randomizes questions
  4. User answers questions
  5. System calculates score
  6. System displays results
- Postcondition: Results saved

UC3: Create Question
- Actor: Student/Admin
- Precondition: User logged in
- Main Flow:
  1. User clicks "Create Question"
  2. User fills form (content, options, answer, explanation)
  3. System validates data
  4. System saves question
- Postcondition: Question added to database

[... More use cases ...]
```

#### 3.3. Thiết kế Database Schema

```
3.3.1. ER Diagram

[Hình 3.2: ER Diagram - Insert diagram showing relationships]

3.3.2. Collections

[Bảng 3.2: Database Collections]

┌──────────────────┬──────────────────┬───────────────────┐
│ Collection       │ Purpose          │ Key Fields        │
├──────────────────┼──────────────────┼───────────────────┤
│ users            │ User accounts    │ email, password   │
│ subjects         │ Topics/Subjects  │ name, code        │
│ questions        │ Quiz questions   │ content, options  │
│ exams            │ Quiz sessions    │ userId, questions │
│ exam_results     │ Quiz results     │ score, percentage │
│ user_progress    │ Learning track   │ totalCorrect      │
│ study_sessions   │ Study time       │ duration          │
└──────────────────┴──────────────────┴───────────────────┘

3.3.3. Chi tiết Schema

[Hình 3.3: Database Schema - Insert detailed schema]

User Schema:
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  fullName: String,
  avatar: String,
  dateCreated: Date,
  lastLogin: Date,
  settings: {
    backgroundMusic: Boolean (default: false),
    soundEffects: Boolean (default: false),
    timer: Boolean (default: false),
    questionsPerExam: Number (default: 5),
    examTimer: Number (default: 30),
    selectedAvatar: String
  },
  stats: {
    totalExams: Number,
    totalCorrect: Number,
    totalQuestions: Number,
    averageScore: Number,
    bestScore: Number
  }
}

Question Schema:
{
  _id: ObjectId,
  subjectId: ObjectId (ref: Subject),
  type: String (enum: ['true_false', 'multiple_choice']),
  content: String (required),
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  explanation: String,
  difficulty: String (enum: ['easy', 'medium', 'hard']),
  tags: [String],
  dateCreated: Date,
  createdBy: ObjectId (ref: User),
  isActive: Boolean,
  usageCount: Number,
  correctRate: Number
}

[... Other schemas ...]

3.3.4. Indexes

Critical indexes for performance:
- users: username, email
- questions: subjectId + type + difficulty
- exams: userId + status + dateCreated
- exam_results: userId + subjectId + dateCompleted
```

#### 3.4. Thiết kế kiến trúc hệ thống

```
3.4.1. System Architecture

[Hình 3.4: Kiến trúc hệ thống - Insert architecture diagram]

┌─────────────────────────────────────────────────┐
│                   Client Layer                   │
│  ┌──────────────────────────────────────────┐   │
│  │  React Components                         │   │
│  │  - Pages                                  │   │
│  │  - Components                             │   │
│  │  - State Management (Zustand)            │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────┘
                      │ HTTP/HTTPS
                      ▼
┌─────────────────────────────────────────────────┐
│                   API Layer                      │
│  ┌──────────────────────────────────────────┐   │
│  │  Express.js Routes                        │   │
│  │  - /api/auth                              │   │
│  │  - /api/users                             │   │
│  │  - /api/questions                         │   │
│  │  - /api/exams                             │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                Business Logic Layer              │
│  ┌──────────────────────────────────────────┐   │
│  │  Controllers                              │   │
│  │  - Authentication                         │   │
│  │  - Quiz Logic                             │   │
│  │  - Score Calculation                      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                  Data Access Layer               │
│  ┌──────────────────────────────────────────┐   │
│  │  Mongoose Models                          │   │
│  │  - User Model                             │   │
│  │  - Question Model                         │   │
│  │  - Exam Model                             │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                   Database Layer                 │
│  ┌──────────────────────────────────────────┐   │
│  │  MongoDB Atlas                            │   │
│  │  - Collections                            │   │
│  │  - Indexes                                │   │
│  │  - Replication                            │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

3.4.2. API Architecture

[Bảng 3.3: API Endpoints]

Authentication APIs:
POST   /api/auth/register    - Đăng ký
POST   /api/auth/login       - Đăng nhập
GET    /api/auth/me          - Thông tin user

User APIs:
GET    /api/users/profile    - Xem profile
PUT    /api/users/profile    - Cập nhật profile
PUT    /api/users/settings   - Cập nhật settings

Subject APIs:
GET    /api/subjects         - Danh sách môn học
POST   /api/subjects         - Tạo môn học
GET    /api/subjects/:id     - Chi tiết môn học

Question APIs:
GET    /api/questions        - Danh sách câu hỏi
POST   /api/questions        - Tạo câu hỏi
GET    /api/questions/random - Random câu hỏi
PUT    /api/questions/:id    - Cập nhật câu hỏi
DELETE /api/questions/:id    - Xóa câu hỏi

Exam APIs:
POST   /api/exams/start      - Bắt đầu bài thi
PUT    /api/exams/:id/answer - Trả lời câu hỏi
POST   /api/exams/:id/submit - Nộp bài
GET    /api/exams/:id/result - Xem kết quả

3.4.3. Security Architecture

Authentication Flow:
1. User login với email/password
2. Server verify credentials
3. Server generate JWT token
4. Client store token in localStorage
5. Client include token in API requests
6. Server verify token for protected routes

Security Measures:
- Password hashing with bcrypt (salt rounds: 12)
- JWT with expiration (7 days)
- CORS configuration
- Input validation
- XSS protection
- Rate limiting (optional)
```

#### 3.5. Thiết kế giao diện

```
3.5.1. Design System

Colors:
- Primary: #0ea5e9 (Sky Blue)
- Secondary: #a855f7 (Purple)
- Success: #22c55e (Green)
- Error: #ef4444 (Red)
- Warning: #f59e0b (Orange)

Typography:
- Font Family: Inter
- Heading: 30px, 24px, 20px (Bold/SemiBold)
- Body: 16px (Regular)
- Small: 14px, 12px (Regular)

Spacing:
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px

Components:
- Buttons (Primary, Secondary, Outline)
- Cards (Standard, Elevated, Outlined)
- Inputs (Text, Email, Password)
- Modals
- Toast Notifications

3.5.2. Wireframes

[Hình 3.5: Wireframe - Trang đăng nhập]
- Logo/Title centered
- Email input field
- Password input field
- "Remember me" checkbox
- Login button
- "Đăng ký" link

[Hình 3.6: Wireframe - Giao diện Quiz]
- Header with timer and progress
- Question card
  - Question number
  - Question text
  - 4 answer options (radio buttons)
- Navigation buttons (Previous, Next, Submit)

3.5.3. High-Fidelity Mockups

[Hình 3.7: Mockup - Dashboard]
(Insert actual mockup image from Figma)

Features:
- Header with user info and logout
- Stats cards (Total Exams, Average Score, Best Score)
- Subject list with icons
- Recent exams list
- Quick actions (Start Quiz, Create Question)

3.5.4. Responsive Design

Breakpoints:
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

Mobile-first approach với Tailwind CSS.
```

---

### CHƯƠNG 4: TRIỂN KHAI HỆ THỐNG

*(Chi tiết code implementation, có thể tham khảo từ GETTING_STARTED.md)*

#### 4.1. Môi trường phát triển

```
[Bảng 4.1: Tech Stack]

┌──────────────┬──────────────────────────────────┐
│ Category     │ Technology                        │
├──────────────┼──────────────────────────────────┤
│ Frontend     │ React 18, Vite, Tailwind CSS     │
│ Backend      │ Node.js 18, Express.js           │
│ Database     │ MongoDB Atlas, Mongoose          │
│ Auth         │ JWT, bcrypt                      │
│ State Mgmt   │ Zustand                          │
│ HTTP Client  │ Axios                            │
│ Icons        │ Lucide React                     │
│ Animations   │ Framer Motion                    │
│ Deployment   │ Vercel, Railway                  │
│ Version Ctrl │ Git, GitHub                      │
│ IDE          │ VS Code                          │
└──────────────┴──────────────────────────────────┘
```

#### 4.2. Triển khai Backend

*(Paste relevant code từ server/models/, controllers/, routes/)*

#### 4.3. Triển khai Frontend  

*(Paste relevant code từ src/components/, pages/)*

#### 4.4. Tích hợp hệ thống

*(API integration examples)*

#### 4.5. Deployment

*(Tham khảo DEPLOYMENT.md)*

---

### CHƯƠNG 5: TESTING & ĐÁNH GIÁ

#### 5.1. Kế hoạch testing

```
Testing Strategy:
1. Unit Testing (Component level)
2. Integration Testing (API level)
3. System Testing (End-to-end)
4. User Acceptance Testing (UAT)

Testing Tools:
- Manual testing
- Postman (API testing)
- Browser DevTools
- Lighthouse (Performance)
```

#### 5.2. Test cases

```
[Bảng 5.1: Test Cases Summary]

TC1: User Registration
- Input: Valid email, password, name
- Expected: Account created, redirect to login
- Result: ✅ Pass

TC2: User Login
- Input: Correct credentials
- Expected: JWT token, redirect to dashboard
- Result: ✅ Pass

TC3: Take Quiz
- Input: Select subject, start quiz
- Expected: Random questions displayed
- Result: ✅ Pass

TC4: Submit Answer
- Input: Select option, click next
- Expected: Answer saved, next question
- Result: ✅ Pass

TC5: Calculate Score
- Input: Submit quiz
- Expected: Correct score calculation
- Result: ✅ Pass

[... More test cases ...]
```

#### 5.3. Kết quả testing

```
[Hình 5.1: Giao diện Login - Actual Screenshot]
[Hình 5.2: Giao diện Quiz - Actual Screenshot]

[Bảng 5.2: Bug Reports]

BUG-001: Timer not stopping after quiz submission
- Severity: Medium
- Status: Fixed
- Fix: Clear interval on component unmount

BUG-002: Score calculation error with unanswered questions
- Severity: High  
- Status: Fixed
- Fix: Filter out null answers before calculation

[... More bugs ...]

Test Results Summary:
- Total Test Cases: 50
- Passed: 48
- Failed: 2
- Pass Rate: 96%
```

#### 5.4. Đánh giá hệ thống

```
[Bảng 5.3: Performance Metrics]

┌─────────────────────────┬─────────────┬────────────┐
│ Metric                  │ Target      │ Actual     │
├─────────────────────────┼─────────────┼────────────┤
│ Page Load Time          │ < 3s        │ 1.8s       │
│ API Response Time       │ < 500ms     │ 250ms      │
│ Lighthouse Performance  │ > 90        │ 94         │
│ Lighthouse Accessibility│ > 90        │ 96         │
│ Mobile Responsive       │ Yes         │ Yes        │
│ Cross-browser Support   │ Chrome, FF  │ Tested OK  │
└─────────────────────────┴─────────────┴────────────┘

Đánh giá chung:
- Chức năng: Đầy đủ theo yêu cầu (100%)
- Performance: Excellent (94/100)
- UI/UX: Good (thân thiện, responsive)
- Security: Adequate (JWT, bcrypt)
- Code Quality: Good (clean, maintainable)
```

---

### CHƯƠNG 6: KẾT LUẬN

#### 6.1. Kết quả đạt được

```
Đồ án đã hoàn thành các mục tiêu đề ra:

1. Xây dựng thành công ứng dụng web quiz
   - ✅ Full-stack application
   - ✅ Modern tech stack
   - ✅ Professional UI/UX

2. Implement đầy đủ chức năng bắt buộc
   - ✅ Login/Authentication
   - ✅ Settings (music, sound, timer, avatar)
   - ✅ Quiz taking (True/False, Multiple Choice)
   - ✅ Question builder

3. Database và API
   - ✅ MongoDB với 7 collections
   - ✅ RESTful API với JWT auth
   - ✅ Proper validation và error handling

4. Deployment
   - ✅ Frontend trên Vercel
   - ✅ Backend trên Railway
   - ✅ Database trên MongoDB Atlas

5. Documentation
   - ✅ Comprehensive documentation
   - ✅ Setup guides
   - ✅ Deployment guides
```

#### 6.2. Hạn chế

```
1. Chức năng:
   - Chưa có dashboard analytics chi tiết
   - Chưa có real-time notifications
   - Chưa có social features (leaderboard, challenges)

2. Technical:
   - Chưa có automated testing (unit tests)
   - Chưa có CI/CD pipeline
   - Chưa optimize cho SEO

3. Content:
   - Số lượng câu hỏi còn hạn chế
   - Chưa cover nhiều chủ đề CNTT
```

#### 6.3. Hướng phát triển

```
Trong tương lai, ứng dụng có thể phát triển thêm:

1. Short-term (3-6 months):
   - Thêm dashboard với charts và analytics
   - Implement study streak tracking
   - Add level system và badges
   - Expand question database

2. Medium-term (6-12 months):
   - Real-time multiplayer quiz
   - Leaderboard và rankings
   - Social features (friends, challenges)
   - Mobile app (React Native)

3. Long-term (1-2 years):
   - AI-powered question generation
   - Adaptive learning (personalized recommendations)
   - Video explanations for complex topics
   - Integration với LMS (Moodle, Canvas)
   - Gamification features (achievements, rewards)
```

---

## 10. TÀI LIỆU THAM KHẢO

```
TÀI LIỆU THAM KHẢO

Tiếng Việt:
[1] Nguyễn Văn A, "Lập trình Web với Node.js và React", 
    NXB Trẻ, 2023.

Tiếng Anh:
[2] Mozilla Developer Network, "Web APIs", 
    https://developer.mozilla.org/, accessed Oct 2024.

[3] React Documentation, "React - A JavaScript library", 
    https://react.dev/, accessed Oct 2024.

[4] Express.js, "Express - Node.js web application framework",
    https://expressjs.com/, accessed Oct 2024.

[5] MongoDB, "MongoDB Documentation",
    https://docs.mongodb.com/, accessed Oct 2024.

[6] Tailwind CSS, "Tailwind CSS Documentation",
    https://tailwindcss.com/docs, accessed Oct 2024.

[7] Vercel, "Vercel Documentation",
    https://vercel.com/docs, accessed Oct 2024.

[8] Railway, "Railway Documentation",
    https://docs.railway.app/, accessed Oct 2024.
```

---

## 11. PHỤ LỤC

```
PHỤ LỤC

A. Source Code
   - Link GitHub repository
   - Cấu trúc thư mục
   - Key files listing

B. Database Schema (Chi tiết)
   - Toàn bộ collections
   - Indexes
   - Sample data

C. API Documentation (Đầy đủ)
   - All endpoints
   - Request/Response examples
   - Error codes

D. Test Cases (Chi tiết)
   - Test scenarios
   - Test data
   - Expected results

E. User Manual
   - Hướng dẫn sử dụng cho người dùng
   - Screenshots từng bước

F. Deployment Guide
   - Step-by-step deployment
   - Environment configuration
   - Troubleshooting

G. Screenshots
   - All pages
   - Different states
   - Mobile views

H. Figma Design Files
   - Link to Figma
   - All screens
   - Design system
```

---

## 📝 NOTES

### Formatting Guidelines

```
1. Font:
   - Tiêu đề: Times New Roman 14pt, Bold
   - Nội dung: Times New Roman 13pt
   - Code: Courier New 11pt

2. Spacing:
   - Line spacing: 1.5
   - Paragraph spacing: 6pt before, 6pt after
   - Margins: 2cm all sides

3. Numbering:
   - Chapters: 1, 2, 3...
   - Sections: 1.1, 1.2, 1.3...
   - Subsections: 1.1.1, 1.1.2...

4. Page Numbers:
   - Roman numerals (i, ii, iii...) for front matter
   - Arabic numerals (1, 2, 3...) for main content

5. Figures/Tables:
   - Centered
   - Caption below figures
   - Caption above tables
   - Numbered sequentially

6. References:
   - IEEE or APA style
   - Alphabetically sorted
   - Include access dates for URLs
```

---

<div align="center">

## ✅ CHECKLIST HOÀN THÀNH BÁO CÁO

- [ ] Trang bìa đã format đúng
- [ ] Lời cam đoan có chữ ký
- [ ] Mục lục tự động (Word)
- [ ] Đánh số trang đúng
- [ ] Tất cả hình ảnh có caption
- [ ] Tất cả bảng có caption
- [ ] References format đúng
- [ ] Không có lỗi chính tả
- [ ] PDF generation OK
- [ ] File size < 50MB
- [ ] Ready to submit! 🎉

</div>
