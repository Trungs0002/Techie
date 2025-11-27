const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

/**
 * User Routes
 * Tất cả routes đều cần authentication
 */

// GET /api/users/profile - Lấy profile
router.get("/profile", authenticate, userController.getProfile);

// PUT /api/users/profile - Cập nhật profile
router.put("/profile", authenticate, userController.updateProfile);

// GET /api/users/settings - Lấy settings
router.get("/settings", authenticate, userController.getSettings);

// PUT /api/users/settings - Cập nhật settings
router.put("/settings", authenticate, userController.updateSettings);

// PUT /api/users/avatar - Cập nhật avatar
router.put("/avatar", authenticate, userController.updateAvatar);

// GET /api/users/stats - Lấy thống kê
router.get("/stats", authenticate, userController.getStats);

module.exports = router;

