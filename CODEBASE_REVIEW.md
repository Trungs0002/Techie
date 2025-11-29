# 📋 REVIEW CHI TIẾT CODEBASE - DỰ ÁN TECHIE

## 🎯 TỔNG QUAN DỰ ÁN

**Techie** là một hệ thống **Luyện thi Trắc nghiệm CNTT** được xây dựng với kiến trúc **Full-stack**:
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB với Mongoose ODM
- **Authentication**: JWT (JSON Web Token)

---

## 🏗️ QUY TRÌNH XÂY DỰNG & KIẾN TRÚC

### 1. **Kiến trúc tổng thể**

```
Techie/
├── client/              # Frontend (Static HTML/CSS/JS)
│   ├── assets/         # Tài nguyên (audio, avatars, images)
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript logic
│   └── *.html          # Các trang web
├── server/              # Backend (Node.js/Express)
│   ├── config/         # Cấu hình (database)
│   ├── controllers/    # Business logic
│   ├── middleware/     # Middleware (auth)
│   ├── models/         # Database models (Mongoose)
│   ├── routes/         # API routes
│   └── utils/          # Utilities (JWT)
├── server.js           # Entry point
└── database_schema.js  # Schema design document
```

### 2. **Quy trình xây dựng**

#### **Backend (Server-side)**
1. **Database Schema Design** (`database_schema.js`)
   - Thiết kế schema cho các collections: users, questions, exams, exam_results, user_progress, study_sessions
   - Định nghĩa indexes để tối ưu truy vấn

2. **Models** (`server/models/`)
   - `User.js`: User schema với bcrypt password hashing
   - `Question.js`: Question schema hỗ trợ true/false và multiple choice

3. **Controllers** (`server/controllers/`)
   - `authController.js`: Xử lý register, login, logout, getMe
   - `questionController.js`: Tạo, list, lấy random questions
   - `userController.js`: Quản lý profile, settings, avatar, stats

4. **Routes** (`server/routes/`)
   - `authRoutes.js`: `/api/auth/*`
   - `questionRoutes.js`: `/api/questions/*`
   - `userRoutes.js`: `/api/users/*`

5. **Middleware** (`server/middleware/auth.js`)
   - JWT authentication middleware để bảo vệ routes

6. **App Setup** (`server/app.js`)
   - Express app configuration
   - CORS, body parser, error handling
   - Route mounting

#### **Frontend (Client-side)**
1. **API Client** (`client/js/api.js`)
   - Centralized API calling với error handling
   - Auto-attach JWT token từ localStorage

2. **Page-specific Logic**
   - `auth.js`: Authentication logic (login/register)
   - `dashboard.js`: Dashboard với user info và stats
   - `quiz.js`: Quiz gameplay logic
   - `create-question.js`: Form tạo câu hỏi
   - `settings.js`: Settings management với audio controller

3. **Utilities** (`client/js/utils.js`)
   - Helper functions: token management, validation, messages

### 3. **Cách khởi động dự án**

```bash
# 1. Cài đặt dependencies
npm install

# 2. Tạo file .env với:
MONGODB_URI=mongodb://localhost:27017/techie
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=3000

# 3. Khởi động server
npm start

# 4. Mở client/ trong browser hoặc dùng Live Server
```

---

## 🎨 CÁC CHỨC NĂNG CHÍNH

### 1. **Authentication (Xác thực)**
- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập (bằng username hoặc email)
- ✅ Đăng xuất
- ✅ JWT token-based authentication
- ✅ Auto-redirect nếu đã đăng nhập
- ✅ Token validation và refresh

### 2. **Dashboard (Trang chủ người dùng)**
- ✅ Hiển thị thông tin user (avatar, tên, email)
- ✅ Thống kê:
  - Tổng số bài thi
  - Tổng câu trả lời đúng
  - Tổng câu hỏi đã làm
  - Điểm trung bình (%)
  - Điểm cao nhất (%)

### 3. **Quiz (Làm bài trắc nghiệm)**
- ✅ Lấy câu hỏi ngẫu nhiên từ database
- ✅ Hỗ trợ 2 loại câu hỏi:
  - **True/False** (Đúng/Sai)
  - **Multiple Choice** (4 lựa chọn)
- ✅ Hiển thị progress (câu hiện tại / tổng số)
- ✅ Đếm điểm và số câu đúng
- ✅ Timer:
  - Timer tổng cho toàn bộ bài thi
  - Timer cho từng câu hỏi (tùy chọn)
- ✅ Hiệu ứng âm thanh:
  - Sound khi trả lời đúng/sai
  - Background music (tùy chọn)
- ✅ Hiển thị kết quả sau khi hoàn thành

### 4. **Create Question (Tạo câu hỏi)**
- ✅ Form tạo câu hỏi mới
- ✅ Chọn loại: True/False hoặc Multiple Choice
- ✅ Nhập nội dung, đáp án, giải thích
- ✅ Validation và lưu vào database

### 5. **Settings (Cài đặt)**
- ✅ **Profile Settings**:
  - Cập nhật họ tên
  - Cập nhật email
- ✅ **Quiz Settings**:
  - Bật/tắt nhạc nền
  - Bật/tắt hiệu ứng âm thanh
  - Bật/tắt timer cho từng câu
  - Số câu hỏi mỗi bài thi (1-100)
  - Thời gian làm bài (1-300 phút)
- ✅ **Avatar Selection**:
  - Chọn avatar từ 6 options có sẵn
  - Preview avatar hiện tại

---

## 🖥️ UI/UX MÔ TẢ TƯƠNG TÁC

### 1. **Trang chủ (index.html)**
- **Layout**: Centered container với background gradient
- **Elements**:
  - Logo "🎓 Techie"
  - Mô tả ngắn
  - 2 buttons: "Đăng nhập" và "Đăng ký"
- **Tương tác**:
  - Click button → Navigate đến trang tương ứng
  - Auto-check nếu đã đăng nhập → Redirect đến dashboard

### 2. **Trang Đăng nhập (login.html)**
- **Layout**: Auth container với form
- **Elements**:
  - Input: Username/Email
  - Input: Password (có toggle show/hide)
  - Button: "Đăng nhập"
  - Link: "Đăng ký ngay"
- **Tương tác**:
  - Submit form → Validate → Call API → Lưu token → Redirect dashboard
  - Toggle password visibility
  - Hiển thị error/success messages
  - Auto-redirect nếu đã có token hợp lệ

### 3. **Trang Đăng ký (register.html)**
- **Layout**: Tương tự login
- **Elements**:
  - Input: Username (validation: 3-30 ký tự, chỉ chữ/số/_)
  - Input: Email
  - Input: Họ tên (optional)
  - Input: Password (min 6 ký tự)
  - Input: Confirm Password
  - Button: "Đăng ký"
- **Tương tác**:
  - Real-time validation
  - Submit → Create account → Redirect login

### 4. **Dashboard (dashboard.html)**
- **Layout**: Card-based layout
- **Elements**:
  - User info card: Avatar, tên, email
  - Stats cards: 5 cards hiển thị thống kê
  - Navigation: Settings, Quiz, Create Question, Logout
- **Tương tác**:
  - Load user info từ API khi page load
  - Click navigation → Navigate
  - Logout → Clear token → Redirect login

### 5. **Quiz (quiz.html)**
- **Layout**: Quiz card với question và options
- **Elements**:
  - Header: Progress, Score, Correct count, Timers
  - Question type badge
  - Question text
  - Options buttons (2 hoặc 4)
  - Buttons: "Next", "Skip"
- **Tương tác**:
  - Click option → Check đúng/sai → Highlight → Play sound
  - Next → Chuyển câu tiếp theo
  - Skip → Bỏ qua câu hiện tại
  - Timer hết → Auto-next hoặc finish
  - Finish → Hiển thị result card

### 6. **Create Question (create-question.html)**
- **Layout**: Form với dynamic sections
- **Elements**:
  - Select: Question type (True/False / Multiple Choice)
  - Input: Question content
  - Dynamic options:
    - True/False: Radio buttons (Đúng/Sai)
    - Multiple Choice: 4 text inputs + radio để chọn đáp án đúng
  - Input: Explanation
  - Input: Subject
  - Button: "Lưu câu hỏi"
- **Tương tác**:
  - Change type → Toggle hiển thị options block
  - Submit → Validate → Save → Reset form

### 7. **Settings (settings.html)**
- **Layout**: Tabs/Sections
- **Elements**:
  - **Profile Section**:
    - Input: Full name
    - Input: Email
    - Button: "Cập nhật"
  - **Quiz Settings Section**:
    - Checkboxes: Background music, Sound effects, Timer
    - Number inputs: Questions per exam, Exam timer
    - Buttons: "Cập nhật" (auto-save khi change)
  - **Avatar Section**:
    - Current avatar preview
    - Grid 6 avatars
    - Click avatar → Update ngay lập tức
- **Tương tác**:
  - Toggle checkbox → Auto-save
  - Change number → Auto-save với validation
  - Click avatar → Update và reload grid
  - Test audio → Preview sounds

---

## 💻 XỬ LÝ LOGIC PHÍA UI

### 1. **API Communication Pattern**

```javascript
// Pattern chung trong api.js
async function apiCall(endpoint, options = {}) {
  // 1. Lấy token từ localStorage
  // 2. Attach Authorization header
  // 3. Fetch với error handling
  // 4. Parse JSON response
  // 5. Check response.ok
  // 6. Throw error nếu fail
}
```

### 2. **State Management**

#### **LocalStorage Usage**:
- `token`: JWT token
- `user`: User object (cached)
- `userSettings`: Settings object (cached)

#### **In-Memory State**:
- `QUIZ_STATE` (quiz.js): Current quiz state
- `currentSettings` (settings.js): Current settings
- `currentUser` (dashboard.js): Current user

### 3. **Event Handling Flow**

#### **Authentication Flow**:
```
User submits form
  ↓
Validate inputs (client-side)
  ↓
Call API (apiCall)
  ↓
Success → Save token + user → Redirect
Error → Show error message → Re-enable form
```

#### **Quiz Flow**:
```
Page load
  ↓
Load settings (localStorage + server)
  ↓
Load questions (API)
  ↓
Initialize timers
  ↓
Render first question
  ↓
User selects answer
  ↓
Check correct/wrong → Update score → Play sound → Highlight
  ↓
Next → Render next question
  ↓
Finish → Show results
```

#### **Settings Flow**:
```
Page load
  ↓
Load settings (localStorage cache first)
  ↓
Load from server (update cache)
  ↓
Display settings
  ↓
User changes setting
  ↓
Update local state + cache
  ↓
Call API to save
  ↓
Success → Show success message
Error → Revert + Show error
```

### 4. **Error Handling Strategy**

- **Network Errors**: Catch và hiển thị message thân thiện
- **API Errors**: Parse error message từ response
- **Validation Errors**: Client-side validation trước khi gọi API
- **Token Expiry**: Auto-redirect về login nếu 401

### 5. **Loading States**

- **Loading Overlay**: Hiển thị khi đang fetch data
- **Button States**: Disable + change text khi submitting
- **Progressive Loading**: Cache → Server → Update

---

## 🔧 CÁC HÀM/FUNCTION CHÍNH

### **Backend Functions**

#### **authController.js**
```javascript
register(req, res)      // Đăng ký user mới
login(req, res)         // Đăng nhập
logout(req, res)        // Đăng xuất
getMe(req, res)         // Lấy thông tin user hiện tại
```

#### **questionController.js**
```javascript
createQuestion(req, res)      // Tạo câu hỏi mới
listQuestions(req, res)       // List câu hỏi (recent)
getRandomQuestions(req, res)   // Lấy random questions cho quiz
```

#### **userController.js**
```javascript
getProfile(req, res)          // Lấy profile
updateProfile(req, res)        // Cập nhật profile
getSettings(req, res)          // Lấy settings
updateSettings(req, res)       // Cập nhật settings
updateAvatar(req, res)         // Cập nhật avatar
getStats(req, res)             // Lấy thống kê
```

#### **User Model Methods**
```javascript
comparePassword(candidatePassword)  // So sánh password
updateLastLogin()                   // Update lastLogin timestamp
```

### **Frontend Functions**

#### **api.js**
```javascript
apiCall(endpoint, options)     // Generic API caller
authAPI.register(userData)      // Register API
authAPI.login(credentials)     // Login API
authAPI.logout()               // Logout API
authAPI.getMe()                // Get current user API
```

#### **auth.js**
```javascript
handleRegister(event)          // Xử lý form đăng ký
handleLogin(event)             // Xử lý form đăng nhập
handleLogout()                 // Xử lý đăng xuất
checkAuth(requireAuth, redirectTo)  // Kiểm tra authentication
```

#### **dashboard.js**
```javascript
loadUserInfo()                 // Load user info và stats
displayUserInfo(user)          // Hiển thị user info
displayStats(stats)            // Hiển thị thống kê
showLoading(show)              // Toggle loading overlay
showError(message)             // Hiển thị error message
```

#### **quiz.js**
```javascript
loadQuizSettings()             // Load settings từ server/localStorage
loadQuestions()                // Load questions từ API
renderQuestion()               // Render câu hỏi hiện tại
selectAnswer(optionIndex)      // Xử lý khi user chọn đáp án
paintOptionResult(...)         // Highlight đáp án đúng/sai
goNext()                       // Chuyển câu tiếp theo
startTotalTimer()              // Bắt đầu timer tổng
resetQuestionTimer()           // Reset timer cho câu hỏi
finishQuiz()                   // Kết thúc quiz và hiển thị kết quả
formatSeconds(sec)             // Format seconds thành MM:SS
```

#### **create-question.js**
```javascript
bindTypeSwitcher()             // Bind event cho type selector
toggleOptionBlocks(type)       // Toggle hiển thị options block
bindFormSubmit()               // Bind form submit handler
showCreateMessage(msg, isError) // Hiển thị message
setSubmitState(form, isSubmitting) // Set submit button state
```

#### **settings.js**
```javascript
loadSettings()                 // Load settings và profile
loadProfile()                  // Load profile từ API
loadUserSettings()             // Load settings từ API
displaySettings(settings)      // Hiển thị settings lên UI
displayProfile(profile)        // Hiển thị profile lên UI
updateSetting(settingName, value) // Cập nhật một setting
updateProfile()                // Cập nhật profile
loadAvatars()                  // Load avatar grid
selectAvatar(avatarName)       // Chọn avatar
toggleBackgroundMusic(enabled) // Toggle background music
toggleSoundEffects(enabled)    // Toggle sound effects
initAudioController()          // Khởi tạo audio controller
```

#### **SettingsAudioController Class**
```javascript
constructor()                  // Khởi tạo audio elements
createAudio(src, options)      // Tạo Audio object
testAudioFiles()               // Test load audio files
setBackgroundEnabled(enabled)  // Bật/tắt background music
setEffectsEnabled(enabled)     // Bật/tắt sound effects
playEffect(effectName)         // Phát sound effect
```

#### **utils.js**
```javascript
saveToken(token)               // Lưu token
getToken()                     // Lấy token
removeToken()                  // Xóa token
saveUser(user)                 // Lưu user
getUser()                      // Lấy user
removeUser()                   // Xóa user
isAuthenticated()              // Check đã đăng nhập chưa
redirect(url)                  // Redirect
showError(message, container)  // Hiển thị error
showSuccess(message, container) // Hiển thị success
hideMessage(container)         // Ẩn message
validateEmail(email)           // Validate email
validateUsername(username)     // Validate username
validatePassword(password)     // Validate password
formatDate(date)               // Format date
getApiUrl()                    // Lấy API base URL
```

---

## 📊 DATABASE SCHEMA

### **Collections**

1. **users**
   - username, email, password (hashed)
   - fullName, avatar
   - settings: { backgroundMusic, soundEffects, timer, questionsPerExam, examTimer, selectedAvatar }
   - stats: { totalExams, totalCorrect, totalQuestions, averageScore, bestScore }

2. **questions**
   - content, type (true_false/multiple_choice)
   - options: [{ text, isCorrect }]
   - explanation, subject
   - isActive, createdBy

3. **subjects** (defined in schema, chưa implement)
4. **exams** (defined in schema, chưa implement)
5. **exam_results** (defined in schema, chưa implement)
6. **user_progress** (defined in schema, chưa implement)
7. **study_sessions** (defined in schema, chưa implement)

---

## 🔐 SECURITY FEATURES

1. **Password Hashing**: bcrypt với salt rounds = 10
2. **JWT Authentication**: Token-based với expiry
3. **Password Validation**: Min 6 characters
4. **Input Validation**: Client + Server side
5. **CORS Configuration**: Configurable origins
6. **Error Handling**: Không expose sensitive info

---

## 🎵 AUDIO SYSTEM

### **Audio Files**
- `background-music-434612.mp3`: Nhạc nền
- `correct.mp3`: Sound khi trả lời đúng
- `wrong.mp3`: Sound khi trả lời sai
- `tick.mp3`: (chưa sử dụng)

### **Audio Controller Features**
- Auto-handle browser autoplay policy
- Volume control
- Loop background music
- Error handling và retry
- Test audio files on init

---

## 🚀 ĐIỂM MẠNH

1. ✅ **Clean Architecture**: Tách biệt rõ ràng frontend/backend
2. ✅ **Modular Code**: Functions được tổ chức tốt
3. ✅ **Error Handling**: Comprehensive error handling
4. ✅ **User Experience**: Loading states, messages, validation
5. ✅ **Security**: Password hashing, JWT authentication
6. ✅ **Responsive Design**: CSS với media queries
7. ✅ **Audio System**: Well-implemented audio controller

---

## 🔄 ĐIỂM CẦN CẢI THIỆN

1. ⚠️ **Chưa implement đầy đủ schema**: exams, exam_results, user_progress chưa được sử dụng
2. ⚠️ **Stats chưa được update**: Stats không tự động update sau khi làm quiz
3. ⚠️ **No exam history**: Chưa có trang xem lịch sử làm bài
4. ⚠️ **No question management**: Chưa có trang quản lý câu hỏi (edit/delete)
5. ⚠️ **No pagination**: List questions không có pagination
6. ⚠️ **No error boundaries**: Frontend có thể crash nếu API fail
7. ⚠️ **No unit tests**: Chưa có test coverage

---

## 📝 KẾT LUẬN

Dự án **Techie** là một ứng dụng **luyện thi trắc nghiệm** được xây dựng với kiến trúc rõ ràng, code sạch và dễ maintain. Frontend sử dụng Vanilla JavaScript, backend sử dụng Express.js với MongoDB. Hệ thống có đầy đủ các chức năng cơ bản: authentication, quiz, settings, và question creation.

**Tech Stack**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Vanilla JS, HTML/CSS

**Status**: MVP (Minimum Viable Product) - Có thể mở rộng thêm nhiều tính năng trong tương lai.

