const express = require('express');
const router = express.Router();
const {
  startExam,
  submitAnswer,
  submitExam,
  getExam,
  getUserExams,
  getExamResults
} = require('../controllers/exam.controller');
const { protect } = require('../middleware/auth.middleware');

// All exam routes are protected
router.use(protect);

router.post('/start', startExam);
router.get('/results', getExamResults);
router.get('/', getUserExams);
router.get('/:id', getExam);
router.put('/:examId/answer/:questionIndex', submitAnswer);
router.post('/:examId/submit', submitExam);

module.exports = router;
