const app = require("./server/app");

// Lấy port từ environment variable hoặc mặc định 3000
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - POST   /api/auth/register`);
  console.log(`   - POST   /api/auth/login`);
  console.log(`   - POST   /api/auth/logout`);
  console.log(`   - GET    /api/auth/me`);
  console.log(`   - GET    /api/health`);
});
