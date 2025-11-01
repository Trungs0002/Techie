const Exam = require('../models/Exam');
const ExamResult = require('../models/ExamResult');
const Question = require('../models/Question');
const User = require('../models/User');

// @desc    Start new exam
// @route   POST /api/exams/start
// @access  Private
const startExam = async (req, res) => {
  try {
    const { subjectId, questionCount, timeLimit, type = 'practice' } = req.body;

    // Validation
    if (!questionCount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide question count'
      });
    }

    // Get user settings
    const user = await User.findById(req.user._id);
    const settings = user.settings;

    // Convert subjectId to ObjectId if provided
    const mongoose = require('mongoose');
    const subjectObjectId = subjectId ? new mongoose.Types.ObjectId(subjectId) : null;

    // Get random questions
    const questions = await Question.getRandomQuestions(
      subjectObjectId,
      questionCount
    );

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions available for this subject'
      });
    }

    // Create exam
    const exam = await Exam.create({
      userId: req.user._id,
      subjectId: subjectId || null,
      title: `${type === 'practice' ? 'Practice' : 'Test'} Exam`,
      type,
      settings: {
        questionCount: questions.length,
        timeLimit: timeLimit || settings.examTimer,
        shuffleQuestions: true,
        shuffleOptions: true,
        showResult: true,
        showCorrectAnswers: true
      },
      questions: questions.map(q => ({
        questionId: q._id,
        userAnswer: [],
        isCorrect: null,
        timeSpent: 0
      })),
      status: 'in_progress',
      startTime: new Date()
    });

    // Populate question details
    const populatedExam = await Exam.findById(exam._id)
      .populate('questions.questionId', 'content options type difficulty');

    res.status(201).json({
      success: true,
      message: 'Exam started successfully',
      data: { exam: populatedExam }
    });
  } catch (error) {
    console.error('Start exam error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error starting exam'
    });
  }
};

// @desc    Submit answer to a question
// @route   PUT /api/exams/:examId/answer/:questionIndex
// @access  Private
const submitAnswer = async (req, res) => {
  try {
    const { examId, questionIndex } = req.params;
    const { userAnswer, timeSpent } = req.body;

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Check if exam belongs to user
    if (exam.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this exam'
      });
    }

    // Check if exam is still in progress
    if (exam.status !== 'in_progress') {
      return res.status(400).json({
        success: false,
        message: 'Exam is not in progress'
      });
    }

    const index = parseInt(questionIndex);
    if (index < 0 || index >= exam.questions.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question index'
      });
    }

    // Update answer
    exam.questions[index].userAnswer = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    exam.questions[index].timeSpent = timeSpent || 0;

    await exam.save();

    res.status(200).json({
      success: true,
      message: 'Answer submitted successfully',
      data: { exam }
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting answer'
    });
  }
};

// @desc    Submit exam
// @route   POST /api/exams/:examId/submit
// @access  Private
const submitExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate('questions.questionId');

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Check if exam belongs to user
    if (exam.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this exam'
      });
    }

    // Check if already submitted
    if (exam.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Exam already submitted'
      });
    }

    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    const breakdown = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };

    exam.questions.forEach(q => {
      const question = q.questionId;
      const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.text);
      const userAnswers = q.userAnswer || [];
      
      // Check if answer is correct
      const isCorrect = correctOptions.length === userAnswers.length &&
        correctOptions.every(opt => userAnswers.includes(opt));
      
      q.isCorrect = isCorrect;
      
      if (isCorrect) {
        correctAnswers++;
        breakdown[question.difficulty].correct++;
      } else {
        incorrectAnswers++;
      }
      
      breakdown[question.difficulty].total++;
    });

    exam.status = 'completed';
    exam.endTime = new Date();
    exam.timeSpent = Math.floor((exam.endTime - exam.startTime) / 1000); // in seconds
    
    await exam.save();

    // Create exam result
    const examResult = await ExamResult.create({
      userId: exam.userId,
      examId: exam._id,
      subjectId: exam.subjectId,
      score: correctAnswers,
      totalQuestions: exam.questions.length,
      correctAnswers,
      incorrectAnswers,
      percentage: (correctAnswers / exam.questions.length) * 100,
      timeSpent: exam.timeSpent,
      breakdown
    });

    // Update user stats
    const user = await User.findById(exam.userId);
    user.stats.totalExams += 1;
    user.stats.totalCorrect += correctAnswers;
    user.stats.totalQuestions += exam.questions.length;
    user.stats.averageScore = (user.stats.totalCorrect / user.stats.totalQuestions) * 100;
    
    if (examResult.percentage > user.stats.bestScore) {
      user.stats.bestScore = examResult.percentage;
    }
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Exam submitted successfully',
      data: { 
        exam,
        result: examResult
      }
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting exam'
    });
  }
};

// @desc    Get exam by ID
// @route   GET /api/exams/:id
// @access  Private
const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('questions.questionId')
      .populate('subjectId', 'name code');

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Check if exam belongs to user
    if (exam.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this exam'
      });
    }

    res.status(200).json({
      success: true,
      data: { exam }
    });
  } catch (error) {
    console.error('Get exam error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching exam'
    });
  }
};

// @desc    Get user's exams
// @route   GET /api/exams
// @access  Private
const getUserExams = async (req, res) => {
  try {
    const { status, subjectId, limit = 20, page = 1 } = req.query;

    const query = { userId: req.user._id };
    if (status) query.status = status;
    if (subjectId) query.subjectId = subjectId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const exams = await Exam.find(query)
      .populate('subjectId', 'name code')
      .sort({ dateCreated: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Exam.countDocuments(query);

    res.status(200).json({
      success: true,
      count: exams.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { exams }
    });
  } catch (error) {
    console.error('Get user exams error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching exams'
    });
  }
};

// @desc    Get exam results
// @route   GET /api/exams/results
// @access  Private
const getExamResults = async (req, res) => {
  try {
    const { subjectId, limit = 20, page = 1 } = req.query;

    const query = { userId: req.user._id };
    if (subjectId) query.subjectId = subjectId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const results = await ExamResult.find(query)
      .populate('subjectId', 'name code')
      .populate('examId', 'title type')
      .sort({ dateCompleted: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await ExamResult.countDocuments(query);

    res.status(200).json({
      success: true,
      count: results.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { results }
    });
  } catch (error) {
    console.error('Get exam results error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching exam results'
    });
  }
};

module.exports = {
  startExam,
  submitAnswer,
  submitExam,
  getExam,
  getUserExams,
  getExamResults
};
