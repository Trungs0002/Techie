const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { authenticate } = require('../middleware/auth');

// Private Routes

// POST /api/exams - Lưu kết quả bài thi
router.post('/', authenticate, examController.saveResult);
// GET /api/exams/history - Lấy lịch sử bài thi
router.get('/history', authenticate, examController.getHistory);

module.exports = router;
