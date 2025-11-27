const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

/**
 * Authentication Routes
 */

// POST /api/auth/register - Đăng ký (Public)
router.post("/register", authController.register);

// POST /api/auth/login - Đăng nhập (Public)
router.post("/login", authController.login);

// POST /api/auth/logout - Đăng xuất (Private)
router.post("/logout", authenticate, authController.logout);

// GET /api/auth/me - Lấy thông tin user hiện tại (Private)
router.get("/me", authenticate, authController.getMe);

module.exports = router;
