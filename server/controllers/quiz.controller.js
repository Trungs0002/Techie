const Exam = require('../models/Exam');
const Question = require('../models/Question');
const ExamResult = require('../models/ExamResult');

// @desc    Start a quiz (get exam with questions)
// @route   POST /api/quiz/start
// @access  Private
const startQuiz = async (req, res) => {
  try {
    const { examId } = req.body;
    
    if (!examId) {
      return res.status(400).json({
        success: false,
        message: 'Exam ID is required'
      });
    }

    // Get exam details
    const exam = await Exam.findById(examId).populate('subjectId', 'name code');
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Get question IDs from exam.questions (which is array of {questionId, userAnswer, ...})
    const questionIds = exam.questions.map(q => q.questionId || q._id);
    
    if (questionIds.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions found for this exam'
      });
    }

    // Get questions for this exam
    const questions = await Question.find({ 
      _id: { $in: questionIds } 
    });

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Questions not found in database'
      });
    }

    // Shuffle questions and options (remove correct answer info)
    const shuffledQuestions = questions
      .map(q => ({
        _id: q._id,
        content: q.content,
        type: q.type,
        // Map options to simple format without isCorrect flag
        // FIXED: Don't shuffle options to maintain consistency when comparing answers
        options: q.options.map(opt => opt.text),
        difficulty: q.difficulty
      }))
      .sort(() => Math.random() - 0.5); // Shuffle questions

    res.json({
      success: true,
      data: {
        exam: {
          _id: exam._id,
          title: exam.title,
          description: exam.description,
          settings: exam.settings, // Include full settings object
          totalQuestions: questions.length,
          totalPoints: questions.reduce((sum, q) => sum + (q.points || 1), 0),
          subject: exam.subjectId
        },
        questions: shuffledQuestions,
        startTime: new Date()
      }
    });
  } catch (error) {
    console.error('Start quiz error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error starting quiz'
    });
  }
};

// @desc    Check single answer immediately
// @route   POST /api/quiz/check-answer
// @access  Private
const checkAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;
    
    if (!questionId || selectedAnswer === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Question ID and selected answer are required'
      });
    }

    // Get question with full details including correct answer
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Check if answer is correct
    const correctOption = question.options.find(opt => opt.isCorrect === true);
    const isCorrect = correctOption && correctOption.text === selectedAnswer;

    res.json({
      success: true,
      data: {
        isCorrect,
        correctAnswer: correctOption ? correctOption.text : null,
        // Return full options with isCorrect flags for feedback
        options: question.options
      }
    });
  } catch (error) {
    console.error('Check answer error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error checking answer'
    });
  }
};

// @desc    Submit quiz and get results
// @route   POST /api/quiz/submit
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { examId, answers, timeSpent } = req.body;
    
    if (!examId || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Exam ID and answers are required'
      });
    }

    // Get exam and questions
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Get question IDs from exam
    const questionIds = exam.questions.map(q => q.questionId || q._id);
    
    const questions = await Question.find({ 
      _id: { $in: questionIds } 
    });

    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    
    const breakdown = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    };

    const detailedResults = questions.map(question => {
      const userAnswer = answers[question._id.toString()];
      
      // Find correct answer from options (the one with isCorrect: true)
      const correctOption = question.options.find(opt => opt.isCorrect);
      const correctAnswer = correctOption ? correctOption.text : null;
      const isCorrect = userAnswer === correctAnswer;
      
      // DEBUG: Log comparison
      console.log('Question ID:', question._id);
      console.log('User Answer:', userAnswer);
      console.log('Correct Answer:', correctAnswer);
      console.log('Is Correct:', isCorrect);
      console.log('---');
      
      // Update breakdown by difficulty
      const difficulty = question.difficulty || 'medium';
      breakdown[difficulty].total += 1;
      
      if (isCorrect) {
        correctAnswers++;
        breakdown[difficulty].correct += 1;
      } else {
        incorrectAnswers++;
      }

      return {
        questionId: question._id,
        content: question.content,
        userAnswer,
        correctAnswer,
        isCorrect,
        difficulty: question.difficulty,
        explanation: question.explanation
      };
    });

    const percentage = questions.length > 0 ? (correctAnswers / questions.length) * 100 : 0;
    const roundedPercentage = Math.round(percentage * 100) / 100;

    // Save result to database with detailed results
    const examResult = await ExamResult.create({
      userId: req.user._id,
      examId: exam._id,
      subjectId: exam.subjectId,
      score: roundedPercentage, // Use percentage as score
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
      percentage: roundedPercentage,
      timeSpent: timeSpent || 0,
      breakdown,
      detailedResults // Save detailed results for review
    });

    res.json({
      success: true,
      data: {
        result: {
          _id: examResult._id,
          score: roundedPercentage,
          totalQuestions: questions.length,
          correctAnswers,
          incorrectAnswers,
          totalQuestions: questions.length,
          percentage: roundedPercentage,
          timeSpent: timeSpent || 0,
          breakdown,
          passed: percentage >= 50 // Pass threshold
        },
        details: detailedResults
      }
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting quiz'
    });
  }
};

// @desc    Get quiz results
// @route   GET /api/quiz/results/:resultId
// @access  Private
const getResult = async (req, res) => {
  try {
    const result = await ExamResult.findOne({
      _id: req.params.resultId,
      userId: req.user._id
    })
      .populate('examId', 'title description type settings timeLimit duration')
      .populate('subjectId', 'name code');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found'
      });
    }

    // Get exam details
    const exam = await Exam.findById(result.examId)
      .populate('subjectId', 'name code');

    // Get details from stored detailedResults
    // Need to populate options from original questions
    let details = []; // Changed to 'let' to allow reassignment
    if (result.detailedResults && result.detailedResults.length > 0) {
      // Get all question IDs
      const questionIds = result.detailedResults.map(dr => dr.questionId);
      const questions = await Question.find({ _id: { $in: questionIds } });
      
      // Create map for quick lookup
      const questionMap = {};
      questions.forEach(q => {
        questionMap[q._id.toString()] = q;
      });

      // Build details with options
      details = result.detailedResults.map(dr => {
        const question = questionMap[dr.questionId.toString()];
        return {
          content: dr.content,
          options: question ? question.options.map(opt => opt.text || opt) : [],
          userAnswer: dr.userAnswer,
          correctAnswer: dr.correctAnswer,
          isCorrect: dr.isCorrect,
          explanation: dr.explanation,
          difficulty: dr.difficulty
        };
      });
    }

    res.json({
      success: true,
      data: { 
        result: {
          ...result.toObject(),
          exam: exam ? {
            _id: exam._id,
            title: exam.title,
            description: exam.description,
            type: exam.type,
            timeLimit: exam.settings?.timeLimit || exam.duration,
            duration: exam.settings?.timeLimit || exam.duration
          } : result.examId,
          subject: result.subjectId
        },
        details 
      }
    });
  } catch (error) {
    console.error('Get result error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting result'
    });
  }
};

// @desc    Get user's exam history
// @route   GET /api/quiz/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const { subjectId, limit = 10, page = 1 } = req.query;
    
    const query = { userId: req.user._id };
    if (subjectId) {
      query.subjectId = subjectId;
    }

    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      ExamResult.find(query)
        .populate('examId', 'title')
        .populate('subjectId', 'name code')
        .sort({ dateCompleted: -1 })
        .limit(parseInt(limit))
        .skip(skip),
      ExamResult.countDocuments(query)
    ]);

    // Get statistics
    const stats = await ExamResult.getAverageScore(req.user._id, subjectId);
    
    // Get highest score (score is now percentage)
    const highestResult = await ExamResult.findOne(query)
      .sort({ score: -1 })
      .limit(1);

    res.json({
      success: true,
      data: {
        results,
        stats: {
          totalExams: stats.totalExams,
          averageScore: Math.round(stats.avgScore),
          highestScore: highestResult ? Math.round(highestResult.score) : 0
        },
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting history'
    });
  }
};

module.exports = {
  startQuiz,
  checkAnswer,
  submitQuiz,
  getResult,
  getHistory
};
