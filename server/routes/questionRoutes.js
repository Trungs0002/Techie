const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { authenticate } = require("../middleware/auth");

// Private Routes

// GET /api/questions - Lấy danh sách câu hỏi
router.get("/", authenticate, questionController.listQuestions);
// GET /api/questions/random - Lấy câu hỏi ngẫu nhiên
router.get("/random", authenticate, questionController.getRandomQuestions);
// POST /api/questions - Tạo câu hỏi mới
router.post("/", authenticate, questionController.createQuestion);

module.exports = router;
