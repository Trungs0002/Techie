const Question = require("../models/Question");

/**
 * Create a new question
 * Supports:
 * - type: "true_false" with 2 options (one correct)
 * - type: "multiple_choice" with 4 options (one correct)
 */
const createQuestion = async (req, res) => {
  try {
    const { content, type, options, explanation, subject } = req.body;

    if (!content || !type || !Array.isArray(options)) {
      return res.status(400).json({
        success: false,
        message: "Thiếu nội dung, loại câu hỏi hoặc đáp án",
      });
    }

    // Normalize options: trim text
    const normalizedOptions = options.map((opt) => ({
      text: (opt.text || "").trim(),
      isCorrect: !!opt.isCorrect,
    }));

    const question = new Question({
      content: content.trim(),
      type,
      options: normalizedOptions,
      explanation: explanation ? explanation.trim() : "",
      subject: subject ? subject.trim() : "",
      createdBy: req.userId,
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Tạo câu hỏi thành công",
      data: { question },
    });
  } catch (error) {
    console.error("Create question error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi server khi tạo câu hỏi",
    });
  }
};

/**
 * Get recent questions (for listing/management)
 */
const listQuestions = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const questions = await Question.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: { questions },
    });
  } catch (error) {
    console.error("List questions error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách câu hỏi",
    });
  }
};

/**
 * Get random questions for quiz play
 */
const getRandomQuestions = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 50);

    const questions = await Question.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: limit } },
      {
        $project: {
          content: 1,
          type: 1,
          options: 1,
          explanation: 1,
          subject: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: { questions },
    });
  } catch (error) {
    console.error("Random questions error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy câu hỏi",
    });
  }
};

module.exports = {
  createQuestion,
  listQuestions,
  getRandomQuestions,
};
