const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Tải biến môi trường
dotenv.config();

// Import các routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");

// Khởi tạo Express app
const app = express();

// Kết nối MongoDB
connectDB();

// Middleware
// Cấu hình CORS - Cho phép tất cả origin trong development
const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép tất cả origin trong development
    if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
      callback(null, true);
    } else {
      // Trong production, chỉ cho phép origin được config
      const allowedOrigins = process.env.CLIENT_URL
        ? process.env.CLIENT_URL.split(",")
        : ["http://localhost:5500"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware xử lý body
app.use(express.json()); // Xử lý JSON
app.use(express.urlencoded({ extended: true })); // Xử lý URL-encoded

// Middleware ghi log request (chỉ trong development)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Định nghĩa các routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);

// Endpoint kiểm tra trạng thái server (Health check)
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Endpoint gốc
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Techie API Server",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      health: "/api/health",
    },
  });
});

// Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint không tồn tại",
  });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi server",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
