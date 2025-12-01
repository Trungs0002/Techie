const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const { authenticate } = require("../middleware/auth");

// Private Routes

// GET /api/subjects - Lấy danh sách tất cả các môn học
router.get("/", authenticate, subjectController.getAllSubjects);

module.exports = router;
