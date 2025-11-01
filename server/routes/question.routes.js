const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestion,
  getRandomQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/question.controller');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getAllQuestions);
router.get('/random/:subjectId', getRandomQuestions);
router.get('/:id', getQuestion);

// Protected routes
router.post('/', protect, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);

module.exports = router;
