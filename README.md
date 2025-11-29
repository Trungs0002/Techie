# 🎓 Techie - Hệ thống Luyện thi Trắc nghiệm CNTT

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**Techie** là một hệ thống web application cho phép người dùng luyện thi trắc nghiệm các môn học CNTT. Ứng dụng hỗ trợ tạo câu hỏi, làm bài thi với timer, thống kê kết quả và nhiều tính năng khác.

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Cấu hình](#-cấu-hình)
- [Cách chạy](#-cách-chạy)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [API Documentation](#-api-documentation)
- [Sử dụng](#-sử-dụng)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

## ✨ Tính năng

### 🔐 Authentication (Xác thực)

- ✅ Đăng ký tài khoản mới với validation
- ✅ Đăng nhập bằng username hoặc email
- ✅ Đăng xuất
- ✅ JWT token-based authentication
- ✅ Auto-redirect nếu đã đăng nhập
- ✅ Token validation và auto-refresh

### 📊 Dashboard

- ✅ Hiển thị thông tin user (avatar, tên, email)
- ✅ Thống kê chi tiết:
  - Tổng số bài thi đã làm
  - Tổng câu trả lời đúng
  - Tổng câu hỏi đã làm
  - Điểm trung bình (%)
  - Điểm cao nhất (%)

### 📚 Quiz (Làm bài trắc nghiệm)

- ✅ Lấy câu hỏi ngẫu nhiên từ database
- ✅ Hỗ trợ 2 loại câu hỏi:
  - **True/False** (Đúng/Sai)
  - **Multiple Choice** (4 lựa chọn)
- ✅ Hiển thị progress (câu hiện tại / tổng số)
- ✅ Đếm điểm và số câu đúng real-time
- ✅ Timer:
  - Timer tổng cho toàn bộ bài thi
  - Timer cho từng câu hỏi (tùy chọn)
- ✅ Hiệu ứng âm thanh:
  - Sound khi trả lời đúng/sai
  - Background music (tùy chọn)
- ✅ Hiển thị kết quả chi tiết sau khi hoàn thành

### ➕ Create Question (Tạo câu hỏi)

- ✅ Form tạo câu hỏi mới
- ✅ Chọn loại: True/False hoặc Multiple Choice
- ✅ Nhập nội dung, đáp án, giải thích
- ✅ Validation và lưu vào database

### ⚙️ Settings (Cài đặt)

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

## 🛠️ Công nghệ sử dụng

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

### Frontend

- **HTML5** - Markup
- **CSS3** - Styling (Custom CSS, no framework)
- **Vanilla JavaScript** - Logic (No framework)
- **Fetch API** - HTTP requests

## 📦 Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MongoDB**: >= 6.0 (hoặc MongoDB Atlas)
- **Browser**: Modern browser (Chrome, Firefox, Edge, Safari)

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/Trungs0002/Techie.git
cd Techie
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình MongoDB

Đảm bảo MongoDB đang chạy trên máy local hoặc có MongoDB Atlas connection string.

### 4. Tạo file `.env`

Tạo file `.env` ở thư mục root với nội dung:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/techie
# Hoặc MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techie

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS (Optional - for production)
# CLIENT_URL=http://localhost:5500,https://yourdomain.com
```

**Lưu ý**: Thay đổi `JWT_SECRET` thành một chuỗi ngẫu nhiên mạnh trong production!

### 5. Khởi động server

```bash
npm start
```

Server sẽ chạy trên `http://localhost:3000`

### 6. Mở Frontend

Có 2 cách:

**Cách 1: Dùng Live Server (Khuyến nghị)**

- Mở VS Code
- Cài extension "Live Server"
- Right-click vào `client/index.html` → "Open with Live Server"

**Cách 2: Dùng HTTP Server**

```bash
# Cài đặt http-server global
npm install -g http-server

# Chạy từ thư mục client
cd client
http-server -p 5500
```

Frontend sẽ chạy trên `http://localhost:5500`

## 📁 Cấu trúc dự án

```
Techie/
├── client/                 # Frontend
│   ├── assets/            # Tài nguyên
│   │   ├── audio/         # Audio files (background music, sound effects)
│   │   ├── avatars/       # Avatar images
│   │   └── images/        # Other images
│   ├── css/               # Stylesheets
│   │   ├── auth.css       # Authentication pages styles
│   │   ├── dashboard.css  # Dashboard styles
│   │   ├── quiz.css       # Quiz page styles
│   │   ├── settings.css   # Settings page styles
│   │   └── style.css      # Base styles
│   ├── js/                # JavaScript files
│   │   ├── api.js         # API client
│   │   ├── auth.js        # Authentication logic
│   │   ├── dashboard.js   # Dashboard logic
│   │   ├── quiz.js        # Quiz gameplay logic
│   │   ├── create-question.js  # Question creation logic
│   │   ├── settings.js    # Settings management
│   │   └── utils.js       # Utility functions
│   ├── index.html         # Home page
│   ├── login.html         # Login page
│   ├── register.html      # Register page
│   ├── dashboard.html     # Dashboard page
│   ├── quiz.html          # Quiz page
│   ├── create-question.html  # Create question page
│   └── settings.html      # Settings page
├── server/                 # Backend
│   ├── config/            # Configuration
│   │   └── database.js    # MongoDB connection
│   ├── controllers/       # Controllers (Business logic)
│   │   ├── authController.js      # Authentication controller
│   │   ├── questionController.js  # Question controller
│   │   └── userController.js      # User controller
│   ├── middleware/        # Middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/            # Database models
│   │   ├── User.js        # User model
│   │   └── Question.js    # Question model
│   ├── routes/            # API routes
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── questionRoutes.js  # Question routes
│   │   └── userRoutes.js      # User routes
│   ├── utils/             # Utilities
│   │   └── jwt.js         # JWT helper functions
│   └── app.js             # Express app setup
├── database_schema.js      # Database schema design document
├── server.js               # Server entry point
├── package.json           # Dependencies
└── README.md              # This file
```

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### `POST /api/auth/register`

Đăng ký user mới

**Request Body:**

```json
{
  "username": "string (3-30 chars, alphanumeric + _)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)",
  "fullName": "string (optional)"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "token": "jwt-token",
    "user": { ... }
  }
}
```

#### `POST /api/auth/login`

Đăng nhập

**Request Body:**

```json
{
  "username": "string" // hoặc "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "jwt-token",
    "user": { ... }
  }
}
```

#### `POST /api/auth/logout`

Đăng xuất (cần authentication)

**Headers:**

```
Authorization: Bearer <token>
```

#### `GET /api/auth/me`

Lấy thông tin user hiện tại (cần authentication)

**Headers:**

```
Authorization: Bearer <token>
```

### Question Endpoints

#### `GET /api/questions`

Lấy danh sách câu hỏi (recent, cần authentication)

**Query Parameters:**

- `limit`: số lượng câu hỏi (default: 20, max: 100)

#### `GET /api/questions/random`

Lấy câu hỏi ngẫu nhiên cho quiz (cần authentication)

**Query Parameters:**

- `limit`: số lượng câu hỏi (default: 5, max: 50)

#### `POST /api/questions`

Tạo câu hỏi mới (cần authentication)

**Request Body:**

```json
{
  "content": "string",
  "type": "true_false" | "multiple_choice",
  "options": [
    { "text": "string", "isCorrect": boolean }
  ],
  "explanation": "string (optional)",
  "subject": "string (optional)"
}
```

### User Endpoints

#### `GET /api/users/profile`

Lấy profile (cần authentication)

#### `PUT /api/users/profile`

Cập nhật profile (cần authentication)

**Request Body:**

```json
{
  "fullName": "string (optional)",
  "email": "string (optional)"
}
```

#### `GET /api/users/settings`

Lấy settings (cần authentication)

#### `PUT /api/users/settings`

Cập nhật settings (cần authentication)

**Request Body:**

```json
{
  "backgroundMusic": boolean,
  "soundEffects": boolean,
  "timer": boolean,
  "questionsPerExam": number (1-100),
  "examTimer": number (1-300)
}
```

#### `PUT /api/users/avatar`

Cập nhật avatar (cần authentication)

**Request Body:**

```json
{
  "selectedAvatar": "avt1.png" | "avt2.png" | ...
}
```

#### `GET /api/users/stats`

Lấy thống kê (cần authentication)

### Health Check

#### `GET /api/health`

Kiểm tra server status

**Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 💻 Sử dụng

### 1. Đăng ký tài khoản

- Truy cập `http://localhost:5500/register.html`
- Điền thông tin: username, email, password
- Click "Đăng ký"
- Sau khi đăng ký thành công, bạn sẽ được chuyển đến trang đăng nhập

### 2. Đăng nhập

- Truy cập `http://localhost:5500/login.html`
- Nhập username/email và password
- Click "Đăng nhập"
- Sau khi đăng nhập thành công, bạn sẽ được chuyển đến dashboard

### 3. Làm bài trắc nghiệm

- Từ dashboard, click "Trả lời trắc nghiệm"
- Hệ thống sẽ load câu hỏi ngẫu nhiên
- Chọn đáp án và click "Next" hoặc "Skip"
- Sau khi hoàn thành, xem kết quả

### 4. Tạo câu hỏi

- Từ dashboard, click "Xây dựng câu hỏi"
- Chọn loại câu hỏi (True/False hoặc Multiple Choice)
- Điền nội dung, đáp án, giải thích
- Click "Lưu câu hỏi"

### 5. Cài đặt

- Từ dashboard, click "Cài đặt"
- Cập nhật profile, quiz settings, hoặc chọn avatar
- Settings sẽ được lưu tự động

## 🔒 Security Features

- ✅ Password hashing với bcrypt (salt rounds: 10)
- ✅ JWT token-based authentication
- ✅ Password validation (min 6 characters)
- ✅ Input validation (client + server side)
- ✅ CORS configuration
- ✅ Error handling (không expose sensitive info)

## 🎵 Audio System

Ứng dụng hỗ trợ:

- **Background Music**: Nhạc nền khi làm bài (tùy chọn)
- **Sound Effects**: Hiệu ứng âm thanh khi trả lời đúng/sai (tùy chọn)

Audio files nằm trong `client/assets/audio/`:

- `background-music-434612.mp3`
- `correct.mp3`
- `wrong.mp3`
- `tick.mp3`

## 🐛 Troubleshooting

### Server không khởi động

- Kiểm tra MongoDB đang chạy
- Kiểm tra file `.env` có đúng format không
- Kiểm tra port 3000 có bị chiếm không

### Không kết nối được MongoDB

- Kiểm tra `MONGODB_URI` trong `.env`
- Kiểm tra MongoDB service đang chạy
- Kiểm tra firewall/network

### Frontend không gọi được API

- Kiểm tra server đang chạy trên port 3000
- Kiểm tra CORS configuration
- Mở Console (F12) để xem lỗi chi tiết

### Avatar không hiển thị

- Kiểm tra file avatar có trong `client/assets/avatars/`
- Kiểm tra console có lỗi 404 không
- Avatar sẽ tự động fallback sang placeholder nếu không load được

## 🚧 Tính năng sắp tới

- [ ] Lịch sử làm bài
- [ ] Xem chi tiết từng bài thi
- [ ] Quản lý câu hỏi (edit/delete)
- [ ] Phân loại theo môn học
- [ ] Leaderboard
- [ ] Achievements/Badges
- [ ] Export kết quả PDF
- [ ] Dark mode

## 🤝 Đóng góp

Contributions are welcome! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Tác giả

- **Trungs0002** - [GitHub](https://github.com/Trungs0002)

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- Tất cả các contributors

---

**Made with ❤️ for CNTT students**
