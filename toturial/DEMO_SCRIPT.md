# 🎭 DEMO SCRIPT & PRESENTATION GUIDE

> Kịch bản Demo và Hướng dẫn Thuyết trình  
> Đồ án Lập trình Ứng dụng 2 - Nhóm 05

---

## 📋 Table of Contents

1. [Presentation Overview](#presentation-overview)
2. [Pre-Presentation Checklist](#pre-presentation-checklist)
3. [Slide Structure](#slide-structure)
4. [Demo Script (15-20 mins)](#demo-script)
5. [Q&A Preparation](#qa-preparation)
6. [Backup Plans](#backup-plans)
7. [Tips & Best Practices](#tips--best-practices)

---

## Presentation Overview

### Thời gian & Format

```
Total Duration: 20 minutes
├─ Introduction: 2 mins
├─ System Overview: 3 mins
├─ Live Demo: 10 mins
├─ Results & Conclusion: 3 mins
└─ Q&A: 5-10 mins (flexible)
```

### Phân công thuyết trình

```
Member 1 (Đào Đức Trung):
├─ Introduction & Problem Statement
├─ System Architecture
├─ Frontend Demo (UI/UX)
└─ Results & Achievements

Member 2 (Vũ Nguyễn Anh Tuấn):
├─ Tech Stack & Database Design
├─ Backend Demo (API, Database)
├─ Deployment & DevOps
└─ Conclusion & Future Work
```

---

## Pre-Presentation Checklist

### 1 Week Before

- [ ] Finalize slides (PowerPoint/Google Slides)
- [ ] Practice demo 3+ times
- [ ] Prepare test data in database
- [ ] Record backup demo video (in case of technical issues)
- [ ] Test on presentation computer/projector
- [ ] Print handouts (optional)

### 1 Day Before

- [ ] Verify production app is working
- [ ] Clear browser cache and cookies
- [ ] Prepare demo accounts (don't use admin password live!)
- [ ] Test internet connection
- [ ] Charge laptop fully
- [ ] Backup slides on USB drive
- [ ] Print backup slides (just in case)

### 30 Minutes Before

- [ ] Open all necessary tabs/windows
- [ ] Login to production app
- [ ] Test microphone (if using)
- [ ] Check projector connection
- [ ] Close unnecessary applications
- [ ] Put phone on silent
- [ ] Have water ready

### Ready to Present Checklist

```
Tabs to Open:
☑ Slides (fullscreen mode ready)
☑ Production App (logged out state)
☑ GitHub Repository (code examples)
☑ MongoDB Atlas Dashboard (optional)
☑ Backup demo video (just in case)

Files Ready:
☑ PowerPoint/Google Slides
☑ Backup PDF of slides
☑ Demo accounts credentials
☑ Notes (if needed)
```

---

## Slide Structure

### Slide 1: Title Slide

```
=====================================
     ỨNG DỤNG LUYỆN THI TRẮC NGHIỆM
         KIẾN THỨC CNTT

         Quiz App for IT Knowledge
=====================================

           Đồ án Lập trình Ứng dụng 2
                    HK251

Nhóm 05:
• Đào Đức Trung - MSSV
• Vũ Nguyễn Anh Tuấn - MSSV

GVHD: [Tên giảng viên]

            [Logo trường]
```

### Slide 2: Problem Statement

```
🎯 VẤN ĐỀ

Challenges in IT Learning:
━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Thiếu công cụ ôn tập tương tác
❌ Không có feedback tức thì  
❌ Khó theo dõi tiến độ học tập
❌ Nội dung không cá nhân hóa

💡 Solution: Quiz App
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Tương tác và engaging
✅ Instant feedback & explanations
✅ Progress tracking & statistics
✅ Personalized settings
```

### Slide 3: Project Objectives

```
📋 MỤC TIÊU DỰ ÁN

1️⃣ Xây dựng web app hiện đại
   • React + Node.js + MongoDB
   • Responsive & accessible

2️⃣ Implement core features
   • Authentication & Security
   • Quiz system với nhiều độ khó
   • Settings & personalization
   • Question management

3️⃣ Deploy to production
   • Cloud hosting (Vercel, Railway)
   • CI/CD ready
   • Production-grade security
```

### Slide 4: System Architecture

```
🏗️ KIẾN TRÚC HỆ THỐNG

[Diagram showing 3-tier architecture]

┌────────────────────────┐
│   Frontend (Vercel)    │
│   React + Tailwind CSS │
└───────────┬────────────┘
            │ HTTPS/REST API
            ▼
┌────────────────────────┐
│   Backend (Railway)    │
│ Node.js + Express + JWT│
└───────────┬────────────┘
            │ MongoDB Protocol
            ▼
┌────────────────────────┐
│  Database (Atlas)      │
│   MongoDB (7 tables)   │
└────────────────────────┘
```

### Slide 5: Tech Stack

```
💻 TECH STACK

Frontend                Backend
────────────────────   ────────────────────
✓ React 18             ✓ Node.js 18
✓ Vite                 ✓ Express.js
✓ Tailwind CSS         ✓ Mongoose
✓ Zustand              ✓ JWT + bcrypt
✓ Axios                ✓ REST API

Database               DevOps
────────────────────   ────────────────────
✓ MongoDB Atlas        ✓ Git/GitHub
✓ 7 Collections        ✓ Vercel
✓ Indexes              ✓ Railway
✓ Cloud-hosted         ✓ CI/CD Ready
```

### Slide 6: Database Design

```
🗄️ DATABASE SCHEMA

7 Collections:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 users           - Account data
📁 subjects        - Topics (CTDL, MMT...)
📁 questions       - Quiz questions
📁 exams           - Quiz sessions
📁 exam_results    - Scores & analytics
📁 user_progress   - Learning tracking
📁 study_sessions  - Study time logs

[Show ER diagram if time permits]
```

### Slide 7: Key Features

```
✨ TÍNH NĂNG CHÍNH

🔐 Authentication
   • Secure login/registration
   • JWT-based sessions
   • Password hashing (bcrypt)

⚙️ Personalization
   • Background music on/off
   • Sound effects (correct/wrong)
   • Timer per question
   • Custom avatars

📝 Quiz System
   • True/False questions
   • Multiple choice (4 options)
   • Random question selection
   • Instant feedback with explanations

📊 Analytics
   • Score tracking
   • Progress visualization
   • Strong/weak areas
```

### Slide 8: Demo Time!

```
🎬 LIVE DEMO

Sẽ demo các chức năng:
━━━━━━━━━━━━━━━━━━━━━━━━━
1. Đăng ký & Đăng nhập
2. Tùy chỉnh Settings
3. Làm bài Quiz
4. Xem kết quả & giải thích
5. Tạo câu hỏi mới

[Ready to switch to live app]
```

### Slide 9: Results & Achievements

```
🏆 KẾT QUẢ ĐẠT ĐƯỢC

Requirements Coverage:
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Login/Authentication        100%
✅ Settings (6 options)        100%
✅ Quiz System                 100%
✅ Question Builder            100%

Bonus Features:
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Progress tracking
✅ Statistics dashboard
✅ Responsive design
✅ Production deployment

Performance:
━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Lighthouse Score: 94/100
⚡ API Response: <250ms
⚡ Page Load: <2s
```

### Slide 10: Technical Highlights

```
💡 TECHNICAL HIGHLIGHTS

Security:
━━━━━━━━━━━━━━━━━━━━━
• Password hashing (bcrypt, 12 rounds)
• JWT authentication (7-day expiry)
• Input validation & sanitization
• CORS protection
• XSS prevention

Code Quality:
━━━━━━━━━━━━━━━━━━━━━
• Clean architecture
• Reusable components
• Proper error handling
• RESTful API design
• Comprehensive documentation
```

### Slide 11: Deployment

```
🚀 DEPLOYMENT

Production Environment:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Frontend: Vercel
   • Global CDN
   • Auto HTTPS
   • Auto deployments

🖥️ Backend: Railway  
   • Managed hosting
   • Auto scaling
   • Environment secrets

💾 Database: MongoDB Atlas
   • Cloud-hosted
   • Auto backups
   • 99.9% uptime

Live URL: [Show QR code or URL]
```

### Slide 12: Challenges & Solutions

```
⚠️ CHALLENGES & SOLUTIONS

Challenge 1: State Management
━━━━━━━━━━━━━━━━━━━━━━━━━
Problem: Complex state across components
Solution: Zustand for lightweight state mgmt

Challenge 2: Real-time Updates
━━━━━━━━━━━━━━━━━━━━━━━━━
Problem: Keep score/stats synchronized
Solution: Efficient API calls & local caching

Challenge 3: Responsive Design
━━━━━━━━━━━━━━━━━━━━━━━━━
Problem: Works on all devices
Solution: Tailwind CSS + mobile-first approach

Challenge 4: Performance
━━━━━━━━━━━━━━━━━━━━━━━━━
Problem: Fast loading on slow connections
Solution: Code splitting, lazy loading, CDN
```

### Slide 13: Future Enhancements

```
🔮 HƯỚNG PHÁT TRIỂN

Phase 1 (Short-term):
━━━━━━━━━━━━━━━━━━━━━━━━━
□ Advanced analytics dashboard
□ Study streak tracking
□ Level system & badges
□ Expand question database

Phase 2 (Medium-term):
━━━━━━━━━━━━━━━━━━━━━━━━━
□ Real-time multiplayer quiz
□ Leaderboard & rankings
□ Social features
□ Mobile app (React Native)

Phase 3 (Long-term):
━━━━━━━━━━━━━━━━━━━━━━━━━
□ AI-powered question generation
□ Adaptive learning algorithms
□ Video explanations
□ Integration with LMS platforms
```

### Slide 14: Lessons Learned

```
📚 BÀI HỌC KINH NGHIỆM

Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Full-stack development với MERN
✓ RESTful API design
✓ Database modeling (MongoDB)
✓ Cloud deployment
✓ Git workflow & collaboration

Soft Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Project planning & time management
✓ Teamwork & communication
✓ Problem-solving
✓ Documentation skills
✓ Presentation skills
```

### Slide 15: Conclusion

```
🎯 KẾT LUẬN

Achievements:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Completed all required features
✅ Modern, production-ready app
✅ Comprehensive documentation
✅ Successfully deployed to cloud
✅ Good performance & UX

Thank You:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🙏 Cảm ơn Thầy/Cô đã hướng dẫn
🙏 Cảm ơn Khoa KHMT đã tạo điều kiện
🙏 Cảm ơn các bạn đã lắng nghe


      Questions & Feedback Welcome! 🙋
```

### Slide 16: Contact & Resources

```
📧 LIÊN HỆ & TÀI NGUYÊN

GitHub Repository:
https://github.com/username/quiz-app

Live Demo:
https://quiz-app.vercel.app

Documentation:
https://github.com/username/quiz-app/docs

Contact:
• Email: student1@hcmut.edu.vn
• Email: student2@hcmut.edu.vn

[QR codes for easy access]
```

---

## Demo Script

### Introduction (2 minutes) - Member 1

```
📢 Script:

"Xin chào Thầy/Cô và các bạn.

Hôm nay nhóm em xin giới thiệu đồ án: 
'Xây dựng ứng dụng luyện thi trắc nghiệm kiến thức CNTT'.

[CLICK - Slide 2]

Hiện nay, sinh viên CNTT gặp nhiều khó khăn trong việc ôn tập:
- Thiếu công cụ ôn tập tương tác
- Không có feedback ngay lập tức
- Khó theo dõi tiến độ

[Pause]

Vì vậy, nhóm em đã xây dựng Quiz App - một ứng dụng 
web giúp sinh viên ôn tập hiệu quả hơn thông qua hệ thống 
trắc nghiệm tương tác với feedback tức thì.

[CLICK - Slide 3]

Mục tiêu của đồ án:
1. Xây dựng web app hiện đại với React và Node.js
2. Implement đầy đủ các chức năng theo yêu cầu
3. Deploy lên môi trường production

Bây giờ, em xin mời [Member 2] trình bày về kiến trúc hệ thống."
```

### System Architecture (3 minutes) - Member 2

```
📢 Script:

"Cảm ơn [Member 1].

[CLICK - Slide 4]

Về kiến trúc, ứng dụng sử dụng mô hình 3-tier:

[Point to diagram]

1. Frontend: React với Tailwind CSS, deploy trên Vercel
2. Backend: Node.js + Express, REST API, deploy trên Railway  
3. Database: MongoDB Atlas với 7 collections

Tất cả giao tiếp qua HTTPS và được bảo mật bằng JWT.

[CLICK - Slide 5]

Tech stack cụ thể:
- Frontend: React 18, Vite, Tailwind CSS, Zustand
- Backend: Node.js, Express, Mongoose, JWT
- Database: MongoDB Atlas với cloud hosting
- DevOps: Git, GitHub, Vercel, Railway

[CLICK - Slide 6]

Về database, chúng em thiết kế 7 collections:
[Point to each]
- users: Lưu thông tin tài khoản
- subjects: Các môn học (CTDL, Mạng, CSDL...)
- questions: Câu hỏi trắc nghiệm
- exams: Các bài thi
- exam_results: Kết quả và điểm số
- user_progress: Theo dõi tiến độ
- study_sessions: Lịch sử học tập

Database được tối ưu với indexes để đảm bảo performance.

[CLICK - Slide 7]

Các tính năng chính:
1. Authentication an toàn với JWT và bcrypt
2. Personalization: music, sound, timer, avatar
3. Quiz system với True/False và Multiple Choice
4. Analytics và progress tracking

Bây giờ, em xin chuyển lại cho [Member 1] để demo live."
```

### Live Demo (10 minutes) - Member 1

```
📢 Script:

"Cảm ơn [Member 2].

[CLICK - Slide 8]

Bây giờ chúng em sẽ demo trực tiếp các chức năng của ứng dụng.

[SWITCH TO BROWSER - Production App]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 1: Đăng ký & Đăng nhập (1 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'Đây là trang chủ của ứng dụng. 

[Click 'Đăng ký']

Đầu tiên, người dùng có thể tạo tài khoản mới. 
Tôi sẽ điền thông tin...'

[Type slowly and clearly]
- Email: demo@quizapp.com
- Password: Demo123!
- Full Name: Demo User

[Click 'Đăng ký']

'Hệ thống sẽ:
1. Validate dữ liệu đầu vào
2. Hash password bằng bcrypt
3. Lưu vào MongoDB
4. Tạo JWT token
5. Redirect về dashboard

[Wait for redirect]

Và đây là dashboard của người dùng.'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 2: Settings (2 mins)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'Bây giờ tôi sẽ demo phần Settings.

[Click Settings icon/menu]

Người dùng có thể tùy chỉnh:

[Show each setting]

1. Background Music: [Toggle ON]
   'Có thể bật/tắt nhạc nền. Mặc định là OFF.'

2. Sound Effects: [Toggle ON]
   'Âm thanh khi trả lời đúng/sai. Mặc định là OFF.'

3. Timer per Question: [Toggle ON]
   'Hiển thị đếm ngược cho mỗi câu. Mặc định là OFF.'

4. Questions per Exam: [Change to 3]
   'Số câu hỏi cho 1 bài, từ 1-50. Mặc định 5.'

5. Exam Timer: [Change to 15]
   'Thời gian cho toàn bộ bài, 1-180 phút. Mặc định 30.'

6. Avatar Selection: [Show avatar options]
   'Chọn avatar cá nhân.'

[Click Save]

'Settings sẽ được lưu vào MongoDB và áp dụng ngay lập tức.'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 3: Take Quiz (5 mins)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Go back to Dashboard]

'Bây giờ tôi sẽ làm một bài quiz.

[Click 'Start Quiz' or select a subject]

Chọn môn: Cấu trúc dữ liệu và giải thuật

[Click Start]

Hệ thống sẽ random 3 câu hỏi (như settings vừa đặt).

[Wait for quiz to load]

Đây là giao diện làm bài:

[Point to screen]
- Ở trên: Progress bar và Timer (đếm ngược 15 phút)
- Giữa: Câu hỏi và các lựa chọn
- Dưới: Nút Previous/Next/Submit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Câu 1: [Read question aloud]
'Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO?'

Đây là câu Multiple Choice với 4 lựa chọn.

[Select answer]
'Tôi chọn: Stack'

[Click Next]

[SOUND PLAYS - if enabled]
'Âm thanh phát ra khi trả lời đúng!'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Câu 2: [Read question]
'Quick Sort có độ phức tạp trung bình O(n log n)?'

Đây là câu True/False với 2 lựa chọn.

[Select answer]
'Tôi chọn: Đúng'

[Click Next]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Câu 3: [Read question and answer quickly]

[Click Submit]

Sau khi submit, hệ thống sẽ:
1. Tính điểm
2. Lưu kết quả vào database
3. Cập nhật user statistics
4. Hiển thị kết quả

[Wait for results page]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 4: View Results (1.5 mins)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

'Đây là trang kết quả:

[Point to each element]

- Score: 3/3 (100%)
- Time taken: 2 phút 15 giây
- Breakdown theo từng câu

[Scroll to question review]

Người dùng có thể xem lại từng câu:
- Câu hỏi
- Đáp án đã chọn
- Đáp án đúng
- Giải thích chi tiết

[Click on a question to show explanation]

'Đây là giải thích cho câu hỏi về Stack:
Stack hoạt động theo nguyên tắc LIFO...'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 5: Create Question (1.5 mins)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Navigate to Create Question]

'Cuối cùng, người dùng có thể tạo câu hỏi mới.

[Click 'Create Question' button]

Form tạo câu hỏi bao gồm:

[Fill out form]

1. Subject: [Select] Mạng máy tính
2. Type: [Select] Multiple Choice
3. Question: 'Layer nào xử lý routing?'
4. Options:
   [A] Physical Layer ❌
   [B] Data Link Layer ❌
   [C] Network Layer ✅
   [D] Transport Layer ❌
5. Explanation: 'Network Layer (Layer 3)...'
6. Difficulty: Medium
7. Tags: OSI, routing, network

[Click Submit]

'Hệ thống sẽ validate:
- Ít nhất 1 đáp án đúng
- 4 options cho Multiple Choice
- All required fields filled

[Wait for success message]

Câu hỏi đã được lưu vào database và sẵn sàng sử dụng!'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[SWITCH BACK TO SLIDES]

'Vậy là chúng em đã demo xong các chức năng chính.

Bây giờ em xin mời [Member 2] trình bày về kết quả 
và deployment.'"
```

### Results & Conclusion (3 minutes) - Member 2

```
📢 Script:

"Cảm ơn [Member 1].

[CLICK - Slide 9]

Về kết quả đạt được:

Requirements Coverage:
- Login/Authentication: 100% ✅
- Settings (6 options): 100% ✅
- Quiz System: 100% ✅
- Question Builder: 100% ✅

Ngoài ra, chúng em còn implement thêm:
- Progress tracking
- Statistics dashboard
- Responsive design cho mobile
- Production deployment

[Pause]

Về performance:
- Lighthouse Score: 94/100
- API Response time: dưới 250ms
- Page Load time: dưới 2 giây

[CLICK - Slide 10]

Highlights về technical:

Security được đảm bảo với:
- Password hashing (bcrypt, 12 rounds)
- JWT authentication với 7-day expiry
- Input validation đầy đủ
- CORS protection và XSS prevention

Code quality:
- Clean architecture với separation of concerns
- Reusable components
- Proper error handling ở mọi layer
- RESTful API design chuẩn
- Documentation toàn diện

[CLICK - Slide 11]

Deployment:

Ứng dụng đã được deploy lên production:
- Frontend trên Vercel với global CDN
- Backend trên Railway với auto-scaling
- Database trên MongoDB Atlas với 99.9% uptime

[Show QR code]

Mọi người có thể truy cập và test thử tại URL này.

[CLICK - Slide 12]

Trong quá trình develop, chúng em đã gặp một số thách thức:

1. State management: Giải quyết bằng Zustand
2. Real-time updates: Efficient API calls
3. Responsive design: Tailwind + mobile-first
4. Performance: Code splitting, lazy loading

Tất cả đã được giải quyết successfully.

[CLICK - Slide 13]

Về hướng phát triển:

Short-term:
- Dashboard nâng cao với charts
- Study streak tracking
- Level system và badges

Medium-term:
- Real-time multiplayer
- Leaderboard
- Mobile app với React Native

Long-term:
- AI-powered question generation
- Adaptive learning
- Integration với LMS

[CLICK - Slide 14]

Qua đồ án này, chúng em đã học được:

Technical skills:
- Full-stack development với MERN
- RESTful API và database design
- Cloud deployment
- Git workflow

Soft skills:
- Project management
- Teamwork
- Problem-solving
- Documentation

[CLICK - Slide 15]

Kết luận:

Chúng em đã hoàn thành đầy đủ requirements của đề tài,
xây dựng được một ứng dụng production-ready với 
performance tốt và user experience tốt.

[Pause]

Cuối cùng, chúng em xin cảm ơn:
- Thầy/Cô đã tận tình hướng dẫn
- Khoa KHMT đã tạo điều kiện
- Các bạn đã lắng nghe

Chúng em sẵn sàng trả lời các câu hỏi.

Xin cảm ơn!"

[Bow slightly]
```

---

## Q&A Preparation

### Expected Questions & Answers

#### Technical Questions

**Q1: "Tại sao chọn MongoDB thay vì SQL database?"**

```
A: "Dạ, em chọn MongoDB vì:

1. Flexible schema phù hợp với requirements có thể thay đổi
2. JSON-like documents dễ làm việc với JavaScript/Node.js
3. Scalability tốt cho future growth
4. MongoDB Atlas cung cấp free tier phù hợp học tập

Tuy nhiên, em cũng nhận thức được với data có relationships 
phức tạp, SQL database như PostgreSQL cũng là lựa chọn tốt.

Trong đồ án này, data structure khá đơn giản nên MongoDB 
là choice hợp lý."
```

**Q2: "Làm sao đảm bảo security cho ứng dụng?"**

```
A: "Dạ, về security, em implement các biện pháp:

1. Authentication:
   - Password hashing với bcrypt (12 salt rounds)
   - JWT với expiration (7 days)
   - Refresh token mechanism (planned)

2. API Security:
   - Input validation cho tất cả endpoints
   - Rate limiting (planned)
   - CORS configuration đúng

3. Data Protection:
   - Sensitive data như password never returned in API
   - MongoDB connection string stored in env variables
   - HTTPS enforced trong production

4. Frontend:
   - XSS protection
   - CSRF protection (với JWT)
   - Proper error handling không leak sensitive info

Em biết security là ongoing process và sẽ tiếp tục improve."
```

**Q3: "Performance như thế nào khi có nhiều users?"**

```
A: "Dạ, về performance:

Current metrics với single user:
- API response: <250ms
- Page load: <2s
- Lighthouse: 94/100

Để handle nhiều concurrent users, em đã:

1. Backend:
   - Indexes trên MongoDB (username, email, subjectId...)
   - Efficient queries với lean() và select()
   - Stateless design với JWT (easy to scale horizontally)

2. Frontend:
   - Code splitting và lazy loading
   - Asset optimization
   - CDN caching với Vercel

3. Database:
   - MongoDB Atlas có auto-scaling
   - Indexes đã được optimize

Tested với up to 50 concurrent users trong development.
Với infrastructure hiện tại (Railway free tier), có thể 
support around 100 concurrent users.

Để scale hơn nữa, có thể:
- Upgrade Railway plan
- Add load balancing
- Implement caching với Redis
- Use MongoDB sharding"
```

**Q4: "Code của bạn có testing không?"**

```
A: "Dạ, về testing:

Hiện tại em đã có:
1. Manual testing đầy đủ cho tất cả features
2. API testing bằng Postman
3. Cross-browser testing (Chrome, Firefox, Safari)
4. Responsive testing trên nhiều devices

Limitations:
- Chưa có automated unit tests
- Chưa có integration test suite
- Chưa có E2E tests

Đây là một limitation và future improvement.
Em nhận thức được automated testing rất quan trọng 
cho maintainability.

Nếu có thêm thời gian, em sẽ implement:
- Unit tests với Jest
- Integration tests với Supertest
- E2E tests với Cypress/Playwright"
```

#### Project Management Questions

**Q5: "Làm sao chia công việc giữa 2 members?"**

```
A: "Dạ, nhóm em có plan rõ ràng:

Member 1 (Đào Đức Trung):
- Frontend development (React components, UI/UX)
- Figma design
- Client-side logic
- Testing và bug fixes

Member 2 (Vũ Nguyễn Anh Tuấn):
- Backend development (API, Database)
- Database schema design
- Authentication & Security
- Deployment và DevOps

Shared responsibilities:
- Requirements analysis (cùng nhau)
- Code review lẫn nhau
- Documentation (chia theo phần)
- Testing (cross-check)

Communication:
- Daily standups (online)
- GitHub issues để track tasks
- Slack/Discord cho quick chat
- Weekly meetings với GVHD

Tools:
- Git/GitHub cho version control
- Figma cho design collaboration
- Google Sheets cho planning"
```

**Q6: "Gặp khó khăn gì và giải quyết như thế nào?"**

```
A: "Dạ, nhóm em gặp một số challenges:

Challenge 1: Time Management
- Problem: Cân bằng đồ án với các môn khác
- Solution: Lập timeline chi tiết 15 tuần, weekly reviews

Challenge 2: Learning Curve
- Problem: First time với React hooks và MongoDB
- Solution: Online tutorials, documentation, practice projects

Challenge 3: State Management
- Problem: Props drilling, state sync issues
- Solution: Research và adopt Zustand (lightweight state mgmt)

Challenge 4: Deployment
- Problem: First time deploy full-stack app
- Solution: Step-by-step tutorials, Railway/Vercel docs

Challenge 5: Bug Fixing
- Problem: Random bugs, hard to reproduce
- Solution: Better logging, systematic debugging approach

Key learning: Break down problems, research solutions, 
ask for help when stuck (GVHD, friends, StackOverflow).

Overall, challenges helped us learn and grow."
```

#### Feature Questions

**Q7: "Tại sao không có feature X (admin panel, real-time...)?"**

```
A: "Dạ, đúng là feature X rất hữu ích.

Lý do chưa implement:

1. Scope Management:
   - Focus vào core requirements trước
   - Đảm bảo quality của essential features
   - Time constraint của đồ án

2. Priority:
   - Requirements bắt buộc: Highest priority
   - Nice-to-have features: Lower priority
   - Phải có working product trước

3. Learning Curve:
   - Mỗi feature mới cần time để research và implement
   - Quality over quantity

Future Plans:
- Feature X đã được list trong hướng phát triển
- Có technical plan để implement
- Sẽ add trong future iterations

Approach:
- MVP first (Minimum Viable Product)
- Iterate và improve
- Add features based on user feedback"
```

#### General Questions

**Q8: "So sánh với các ứng dụng tương tự?"**

```
A: "Dạ, so với các quiz apps khác:

Similar apps: Kahoot, Quizizz, Duolingo

Giống:
- Quiz format (multiple choice, true/false)
- Instant feedback
- Score tracking

Khác biệt của em:
- Focus specifically vào CNTT knowledge
- Fully customizable settings
- Open-source và self-hosted
- Built as learning project (understand every line of code)

Advantages:
- Lightweight và fast
- No ads, no premium tiers
- Full control over data
- Can customize for specific needs

Limitations:
- Fewer features than commercial products
- Smaller question database
- No AI-powered features (yet)

Em không aim to replace commercial products, mà 
tạo một tool useful cho sinh viên CNTT và là 
learning experience tốt cho bản thân."
```

---

## Backup Plans

### Plan A: Live Demo Fails

```
IF internet connection drops or app crashes:

1. Immediately switch to backup demo video
   
   Say: "Dạ, có vẻ connection đang có issue. 
         Em sẽ dùng pre-recorded demo để tiết kiệm thời gian."

2. Play video và narrate along
   
   - Pause at key moments
   - Explain what's happening
   - Point out important features

3. After video, offer to show code

   "Em có thể show source code thay vì live demo,
    hoặc quay lại live demo sau nếu connection recovered."
```

### Plan B: Projector Issues

```
IF projector doesn't work:

1. Use laptop screen
   - Invite committee to come closer
   - Or share screen link if remote presentation

2. Have printed screenshots as backup
   - Pass around screenshots
   - Narrate through each screen

3. Focus more on technical explanation
   - Architecture diagrams
   - Code snippets
   - Database schema
```

### Plan C: Forgot Demo Credentials

```
IF you forgot demo account credentials:

1. Register new account on the spot
   - Shows registration flow
   - Quick demo of validation

2. Or use backup account (always have 2-3 accounts ready)

3. Or skip login and use screenshots
   - "Em đã prepare screenshots để save time"
```

### Plan D: Ran Out of Time

```
IF running out of time (5 mins left, still in demo):

1. Speed up demo
   - Show only most important features
   - "Em sẽ skip phần X để có time cho Y"

2. Summarize remaining features
   - "Các features còn lại bao gồm..."
   - Show screenshots quickly

3. Jump to conclusion
   - Wrap up key points
   - Open for Q&A
```

---

## Tips & Best Practices

### Before Presentation

```
✓ Practice 3-5 times minimum
✓ Time yourself (should be ~15 mins for demo + talk)
✓ Know your demo flow by heart
✓ Prepare for technical questions
✓ Sleep well the night before
✓ Eat breakfast (don't present hungry!)
```

### During Presentation

```
DO:
✓ Smile and maintain eye contact
✓ Speak clearly and not too fast
✓ Pause for emphasis
✓ Point to important elements
✓ Engage with audience
✓ Show enthusiasm
✓ Have water nearby

DON'T:
✗ Read from slides word-by-word
✗ Turn your back to audience
✗ Speak too fast when nervous
✗ Apologize excessively for bugs
✗ Criticize your own work
✗ Go over time limit
```

### Demo Tips

```
✓ Use a clean browser window (no random tabs)
✓ Close notifications
✓ Zoom in so everyone can see (Ctrl/Cmd++)
✓ Narrate what you're doing
✓ Don't rush clicks
✓ If something breaks, stay calm
✓ Have fun! Show pride in your work
```

### Q&A Tips

```
✓ Listen carefully to the full question
✓ Pause before answering (think!)
✓ If don't know, be honest:
  "Dạ, đây là điều em chưa research kỹ,
   nhưng em nghĩ approach có thể là..."
✓ Keep answers concise (1-2 mins max)
✓ Thank the person for good questions
✓ Stay professional even with hard questions
```

### Body Language

```
✓ Stand up straight
✓ Use hand gestures naturally
✓ Move around a bit (not too much)
✓ Face the audience, not the screen
✓ Smile!
✓ Show confidence (even if nervous inside)
```

### Voice Tips

```
✓ Speak at moderate pace
✓ Vary your tone (not monotone)
✓ Emphasize key points
✓ Pause for effect
✓ Project your voice (speak up!)
✓ Articulate clearly
```

---

## Presentation Day Checklist

### Morning Of

```
□ Review slides one last time
□ Test production app is working
□ Charge laptop fully
□ Backup slides on USB
□ Print demo credentials
□ Dress professionally
□ Arrive 15 mins early
```

### At Venue

```
□ Test projector connection
□ Check internet connection
□ Open all necessary tabs
□ Test microphone (if using)
□ Put phone on silent
□ Have water ready
□ Take a deep breath
□ You got this! 💪
```

### After Presentation

```
□ Thank the committee
□ Gather feedback
□ Note questions you couldn't answer well
□ Reflect on what went well
□ Celebrate! 🎉
```

---

<div align="center">

## 🎯 FINAL CHECKLIST

- [ ] Slides finalized
- [ ] Demo script practiced 3+ times
- [ ] Production app tested
- [ ] Backup video recorded
- [ ] Demo accounts ready
- [ ] Q&A answers prepared
- [ ] Laptop charged
- [ ] Backups ready
- [ ] Confidence level: HIGH 💪
- [ ] Ready to present! 🎤

---

## 🌟 YOU'VE GOT THIS!

Remember:
- You know your project best
- You worked hard on this
- It's okay to be nervous
- The committee wants you to succeed
- Be proud of what you built!

**GOOD LUCK! 🍀🚀**

</div>
