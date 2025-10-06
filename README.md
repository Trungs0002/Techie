# 🎯 Ứng dụng Luyện thi Trắc nghiệm CNTT

> **Đồ án Lập trình Ứng dụng 2 - HK251 - Nhóm 05**  
> Ứng dụng luyện thi trắc nghiệm kiến thức chuyên ngành Công nghệ thông tin

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Mục lục

- [🎯 Tổng quan](#-tổng-quan)
- [✨ Tính năng](#-tính-năng)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [📊 Database Schema](#-database-schema)
- [🚀 Cài đặt và Chạy](#-cài-đặt-và-chạy)
- [📝 API Documentation](#-api-documentation)
- [🎮 Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [📱 Screenshots](#-screenshots)
- [📅 Timeline Dự án](#-timeline-dự-án-15-tuần)
- [🤝 Đóng góp](#-đóng-góp)
- [📄 License](#-license)

## 🎯 Tổng quan

Ứng dụng luyện thi trắc nghiệm CNTT là một hệ thống học tập tương tác, được thiết kế để giúp sinh viên và người học ôn tập kiến thức chuyên ngành Công nghệ thông tin thông qua các câu hỏi trắc nghiệm đa dạng.

### 📊 Thống kê dự án
- 🎯 **4+ Môn học** CNTT chính
- 📝 **50+ Câu hỏi** mẫu
- ⚡ **20+ Indexes** tối ưu performance
- 🏆 **Gamification** với level và badges

## ✨ Tính năng

### 🔐 Authentication & User Management
- [x] **Đăng nhập/Đăng ký** với email và password
- [x] **Profile management** với avatar tùy chỉnh
- [x] **User statistics** và progress tracking

### ⚙️ Settings System
- [x] **Background Music** (on/off) - Mặc định: off
- [x] **Sound Effects** (đúng/sai) - Mặc định: off  
- [x] **Timer per Question** (on/off) - Mặc định: off
- [x] **Questions per Exam** (1-50) - Mặc định: 5
- [x] **Total Exam Timer** (1-180 phút)
- [x] **Avatar Selection** từ bộ sưu tập có sẵn hoặc upload ảnh

### 📝 Quiz System
- [x] **Multiple Choice Questions** (4 lựa chọn, 1 đúng)
- [x] **True/False Questions** 
- [x] **Random Question Selection** theo môn học
- [x] **Instant Feedback** với giải thích đáp án
- [x] **Progress Saving** - tiếp tục bài thi đang làm dở

### 📊 Analytics & Progress
- [x] **Detailed Results** với breakdown theo category
- [x] **Progress Tracking** theo từng môn học
- [x] **Level System** với experience points
- [x] **Badges & Achievements** 
- [x] **Weak/Strong Areas** identification điểm mạnh, điểm yếu dựa trên quiz đã làm đúng và sai
- [x] **Study Sessions** tracking 

### 🎓 Content Management
- [x] **Question Builder** - Tạo câu hỏi mới
- [x] **Subject Management** - Quản lý môn học
- [x] **Difficulty Levels** (Easy/Medium/Hard)
- [x] **Tagging System** cho identification

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│                 │    │                 │    │                 │
│ • React/Vue/JS  │◄──►│ • Node.js/Flask │◄──►│ • MongoDB Atlas │
│ • UI Components │    │ • REST API      │    │ • 7 Collections │
│ • State Mgmt    │    │ • Authentication│    │ • Indexes       │
│ • Routing       │    │ • Business Logic│    │ • Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

🎉 **Ứng dụng chạy tại**: http://localhost:3000

## 📝 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/logout` | Đăng xuất |
| GET | `/api/auth/me` | Thông tin user hiện tại |

### 👤 User Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/users/profile` | Lấy profile |
| PUT | `/api/users/profile` | Cập nhật profile |
| PUT | `/api/users/settings` | Cập nhật settings |
| GET | `/api/users/stats` | Thống kê user |

### 📚 Subject Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/subjects` | Danh sách môn học |
| POST | `/api/subjects` | Tạo môn học mới |
| GET | `/api/subjects/:id` | Chi tiết môn học |
| PUT | `/api/subjects/:id` | Cập nhật môn học |

### ❓ Question Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/questions` | Danh sách câu hỏi |
| POST | `/api/questions` | Tạo câu hỏi mới |
| GET | `/api/questions/random` | Lấy câu hỏi ngẫu nhiên |
| PUT | `/api/questions/:id` | Cập nhật câu hỏi |

### 📝 Exam Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/exams/start` | Bắt đầu bài thi |
| PUT | `/api/exams/:id/answer` | Trả lời câu hỏi |
| POST | `/api/exams/:id/submit` | Nộp bài thi |
| GET | `/api/exams/:id/result` | Kết quả bài thi |

## 🎮 Hướng dẫn sử dụng

### 👤 Cho Học viên

1. **📝 Đăng ký tài khoản**
   - Vào trang đăng ký
   - Điền email, password, họ tên
   - Xác nhận email (nếu có)

2. **⚙️ Cài đặt cá nhân**
   - Vào Settings
   - Tùy chỉnh timer, âm thanh, số câu hỏi
   - Chọn avatar yêu thích

3. **🎯 Làm bài thi**
   - Chọn môn học
   - Chọn số câu hỏi và độ khó
   - Bắt đầu làm bài
   - Xem kết quả và giải thích

4. **📊 Theo dõi tiến độ**
   - Xem thống kê trong Dashboard
   - Theo dõi weak/strong areas
   - Kiểm tra badges đã đạt được

### 👨‍🏫 Cho Giảng viên/Admin

1. **📚 Quản lý môn học**
   - Thêm môn học mới
   - Chỉnh sửa mô tả môn học

2. **❓ Tạo câu hỏi**
   - Vào Question Builder
   - Chọn loại câu hỏi (True/False hoặc Multiple Choice)
   - Nhập nội dung và đáp án
   - Thêm giải thích và tags

3. **📈 Xem báo cáo**
   - Thống kê user activity
   - Phân tích câu hỏi khó
   - Export dữ liệu

## 📅 Timeline Dự án (15 tuần)

### 🗓️ Giai đoạn 1: Lên kế hoạch & Thiết kế (Tuần 1-2)
- **Tuần 1**: ✅ Chọn đề tài, phân tích yêu cầu, thiết kế Database schema
- **Tuần 2**: 🚧 Thiết kế UI/UX với Figma, thiết kế Database hoàn chỉnh

### 🏗️ Giai đoạn 2: Foundation & Backend (Tuần 3-4)
- **Tuần 3**: 📋 Tạo mẫu HTML responsive, setup Backend với Express.js
- **Tuần 4**: 📋 Code Frontend/Backend cho Login và Authentication

### ⚙️ Giai đoạn 3: Settings & Quiz Builder (Tuần 5-6)
- **Tuần 5**: 📋 Thiết kế UI/Backend cho Settings (music, sound, timer, avatar)
- **Tuần 6**: 📋 Thiết kế UI cho tạo Quiz và Storage với JSON

### 🎯 Giai đoạn 4: Quiz System (Tuần 7-8)
- **Tuần 7**: 📋 Quiz Interface, hiển thị câu hỏi, logic random và tính điểm
- **Tuần 8**: 📋 Quiz Timer, Sound Effects, Session management

### � Giai đoạn 5: Integration & Testing (Tuần 9-11)
- **Tuần 9**: 📋 Tích hợp Frontend-Backend, API integration
- **Tuần 10**: 📋 Unit testing và Integration testing
- **Tuần 11**: 📋 Fix bugs và optimization

### 🎨 Giai đoạn 6: Polish & Documentation (Tuần 12-13)
- **Tuần 12**: 📋 Hoàn thiện UI, mobile responsive, viết documentation
- **Tuần 13**: 📋 Final testing, cross-browser testing, deployment

### 📊 Giai đoạn 7: Báo cáo & Demo (Tuần 14-15)
- **Tuần 14**: 📋 Viết báo cáo đồ án, làm slide thuyết trình, chuẩn bị demo
- **Tuần 15**: 📋 Báo cáo cuối kỳ theo lịch GVHD

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Đồ án Lập trình Ứng dụng 2 - HK251

**Made with ❤️ by Nhóm 05**

[![GitHub stars](https://img.shields.io/github/stars/your-username/tracnghiemluyenthi.svg?style=social&label=Star)](https://github.com/your-username/tracnghiemluyenthi)
[![GitHub forks](https://img.shields.io/github/forks/your-username/tracnghiemluyenthi.svg?style=social&label=Fork)](https://github.com/your-username/tracnghiemluyenthi/fork)

</div>