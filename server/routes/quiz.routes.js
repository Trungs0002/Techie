const express = require('express');
const router = express.Router();
const {
  startQuiz,
  checkAnswer,
  submitQuiz,
  getResult,
  getHistory
} = require('../controllers/quiz.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes are protected (require authentication)
router.use(protect);

// Quiz routes
router.post('/start', startQuiz);
router.post('/check-answer', checkAnswer);
router.post('/submit', submitQuiz);
router.get('/results/:resultId', getResult);
router.get('/history', getHistory);

module.exports = router;
