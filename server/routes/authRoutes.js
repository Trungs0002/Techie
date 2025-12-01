const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

// Public Routes

// POST /api/auth/register - Đăng ký
router.post("/register", authController.register);
// POST /api/auth/login - Đăng nhập
router.post("/login", authController.login);

// Private Routes 

// POST /api/auth/logout - Đăng xuất
router.post("/logout", authenticate, authController.logout);
// GET /api/auth/me - Lấy thông tin user hiện tại
router.get("/me", authenticate, authController.getMe);

module.exports = router;
