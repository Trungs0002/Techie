const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");

// Khởi tạo Express app
const app = express();

// Kết nối MongoDB
connectDB();

// Middleware
// CORS configuration - Cho phép tất cả origin trong development
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

// Body parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint không tồn tại",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi server",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
