# Hướng dẫn Setup MongoDB Atlas cho Ứng dụng Luyện thi Trắc nghiệm

## 1. Tạo MongoDB Atlas Account

### Bước 1: Đăng ký tài khoản
1. Truy cập https://www.mongodb.com/cloud/atlas
2. Nhấn "Try Free" để tạo tài khoản miễn phí
3. Điền thông tin đăng ký và xác nhận email

### Bước 2: Tạo Cluster
1. Chọn "Build a Database"
2. Chọn "M0 Sandbox" (miễn phí)
3. Chọn Cloud Provider và Region (gần Việt Nam nhất)
4. Đặt tên cluster: `quiz-app-cluster`
5. Nhấn "Create"

## 2. Cấu hình Security

### Bước 1: Database Access
1. Vào "Database Access" trong sidebar
2. Nhấn "Add New Database User"
3. Chọn "Password" authentication
4. Username: `quizapp_user`
5. Password: tự tạo password mạnh (lưu lại)
6. Database User Privileges: chọn "Read and write to any database"
7. Nhấn "Add User"

### Bước 2: Network Access
1. Vào "Network Access" trong sidebar
2. Nhấn "Add IP Address"
3. Chọn "Allow Access from Anywhere" (0.0.0.0/0) cho development
4. Hoặc thêm IP cụ thể nếu cần bảo mật hơn
5. Nhấn "Confirm"

## 3. Setup Database

### Bước 1: Lấy Connection String
1. Vào "Database" và nhấn "Connect" trên cluster
2. Chọn "Connect your application"
3. Chọn "Node.js" và version mới nhất
4. Copy connection string, sẽ có dạng:
```
mongodb+srv://trungnho0512_db_user:pfiiEUJ7rzIVJXhg@quizapp.znhlkva.mongodb.net/?retryWrites=true&w=majority&appName=quizapp
```

### Bước 2: Chạy Setup Script
1. Mở MongoDB Compass hoặc MongoDB Shell
2. Connect với connection string vừa lấy
3. Paste và chạy nội dung file `mongodb_setup.js`

Hoặc sử dụng MongoDB Shell:
```bash
 mongosh "mongodb+srv://trungnho0512_db_user:pfiiEUJ7rzIVJXhg@quizapp.znhlkva.mongodb.net/?retryWrites=true&w=majority&appName=quizapp"
```

Sau đó load và chạy script:
```javascript
load('mongodb_setup.js')
```

## 4. Cấu hình Environment Variables

Tạo file `.env` trong project:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://quizapp_user:<password>@quiz-app-cluster.xxxxx.mongodb.net/quiz_app_db?retryWrites=true&w=majority
DB_NAME=quiz_app_db

# JWT Configuration  
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# App Configuration
PORT=3000
NODE_ENV=development

# Email Configuration (nếu cần)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 5. Test Database Connection

### Node.js Test Script:
```javascript
const { MongoClient } = require('mongodb');

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('quiz_app_db');
    const collections = await db.listCollections().toArray();
    
    console.log('📋 Available collections:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // Test query
    const userCount = await db.collection('users').countDocuments();
    console.log(`👥 Users in database: ${userCount}`);
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await client.close();
  }
}

testConnection();
```

## 6. Database Collections Overview

Sau khi setup thành công, bạn sẽ có các collections:

### Core Collections:
- **users** - Thông tin người dùng và cài đặt
- **subjects** - Các môn học/chủ đề
- **questions** - Câu hỏi trắc nghiệm
- **exams** - Các bài thi/luyện tập
- **exam_results** - Kết quả chi tiết bài thi

### Analytics Collections:
- **user_progress** - Tiến độ học tập theo môn
- **study_sessions** - Các phiên học tập

## 7. Sample Data

Setup script sẽ tạo:
- 2 users: admin và student1
- 3 subjects: CTDL, MMT, CSDL  
- Một số câu hỏi mẫu
- Progress data mẫu

### Test Accounts:
```
Admin:
- Email: admin@example.com
- Password: admin123

Student:  
- Email: student1@example.com
- Password: student123
```

## 8. Monitoring và Maintenance

### MongoDB Atlas Dashboard:
1. **Metrics** - Theo dõi performance
2. **Real Time** - Monitor real-time operations
3. **Profiler** - Phân tích slow queries
4. **Alerts** - Cấu hình cảnh báo

### Best Practices:
1. **Backup**: Atlas tự động backup
2. **Indexes**: Monitor index usage
3. **Security**: Thường xuyên đổi password
4. **Scaling**: Upgrade cluster khi cần

## 9. Troubleshooting

### Lỗi thường gặp:

#### Connection Timeout:
```
Error: MongoTimeoutError: Server selection timed out
```
**Giải pháp**: Kiểm tra Network Access whitelist

#### Authentication Failed:
```
Error: Authentication failed
```
**Giải pháp**: Kiểm tra username/password trong connection string

#### Database Not Found:
```
Error: Database does not exist
```
**Giải pháp**: Database sẽ được tạo tự động khi insert data đầu tiên

## 10. Next Steps

Sau khi setup database:
1. ✅ Database schema design hoàn thành
2. ⏳ Thiết kế API endpoints
3. ⏳ Xây dựng authentication system
4. ⏳ Phát triển frontend components
5. ⏳ Implement business logic

## Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [Mongoose ODM](https://mongoosejs.com/) (nếu sử dụng)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)