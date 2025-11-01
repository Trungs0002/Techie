const Question = require('../models/Question');
const Subject = require('../models/Subject');

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
const getAllQuestions = async (req, res) => {
  try {
    const { subjectId, type, difficulty, isActive, limit = 50, page = 1 } = req.query;

    const query = {};
    if (subjectId) query.subjectId = subjectId;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const questions = await Question.find(query)
      .populate('subjectId', 'name code')
      .populate('createdBy', 'username fullName')
      .sort({ dateCreated: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Question.countDocuments(query);

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: { questions }
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching questions'
    });
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('subjectId', 'name code')
      .populate('createdBy', 'username fullName');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { question }
    });
  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching question'
    });
  }
};

// @desc    Get random questions
// @route   GET /api/questions/random/:subjectId
// @access  Public
const getRandomQuestions = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { count = 5, difficulty } = req.query;

    const questions = await Question.getRandomQuestions(
      subjectId,
      parseInt(count),
      difficulty
    );

    res.status(200).json({
      success: true,
      count: questions.length,
      data: { questions }
    });
  } catch (error) {
    console.error('Get random questions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching random questions'
    });
  }
};

// @desc    Create new question
// @route   POST /api/questions
// @access  Private
const createQuestion = async (req, res) => {
  try {
    const { subjectId, type, content, options, explanation, difficulty, tags } = req.body;

    // Validation
    if (!subjectId || !type || !content || !options) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Verify subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Validate options count based on type
    if (type === 'true_false' && options.length !== 2) {
      return res.status(400).json({
        success: false,
        message: 'True/False questions must have exactly 2 options'
      });
    }

    if (type === 'multiple_choice' && options.length !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Multiple choice questions must have exactly 4 options'
      });
    }

    // Validate at least one correct answer
    const hasCorrectAnswer = options.some(opt => opt.isCorrect);
    if (!hasCorrectAnswer) {
      return res.status(400).json({
        success: false,
        message: 'Question must have at least one correct answer'
      });
    }

    // Create question
    const question = await Question.create({
      subjectId,
      type,
      content,
      options,
      explanation,
      difficulty: difficulty || 'medium',
      tags: tags || [],
      createdBy: req.user._id
    });

    // Update subject question count
    subject.questionCount += 1;
    await subject.save();

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: { question }
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating question'
    });
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private
const updateQuestion = async (req, res) => {
  try {
    const { content, options, explanation, difficulty, tags, isActive } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Update fields
    if (content) question.content = content;
    if (options) {
      // Validate options
      if (question.type === 'true_false' && options.length !== 2) {
        return res.status(400).json({
          success: false,
          message: 'True/False questions must have exactly 2 options'
        });
      }
      if (question.type === 'multiple_choice' && options.length !== 4) {
        return res.status(400).json({
          success: false,
          message: 'Multiple choice questions must have exactly 4 options'
        });
      }
      question.options = options;
    }
    if (explanation !== undefined) question.explanation = explanation;
    if (difficulty) question.difficulty = difficulty;
    if (tags) question.tags = tags;
    if (isActive !== undefined) question.isActive = isActive;

    await question.save();

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: { question }
    });
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating question'
    });
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Update subject question count
    const subject = await Subject.findById(question.subjectId);
    if (subject && subject.questionCount > 0) {
      subject.questionCount -= 1;
      await subject.save();
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting question'
    });
  }
};

module.exports = {
  getAllQuestions,
  getQuestion,
  getRandomQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
};
