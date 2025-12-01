const Question = require("../models/Question");
const Subject = require("../models/Subject");

/**
 * Controller cho Question
 */

/**
 * @route   POST /api/questions
 * @desc    Tạo câu hỏi mới
 * @access  Private
 */
const createQuestion = async (req, res) => {
  try {
    const { content, type, options, explanation, subject } = req.body;

    // Validation dữ liệu đầu vào
    if (!content || !type || !Array.isArray(options)) {
      return res.status(400).json({
        success: false,
        message: "Thiếu nội dung, loại câu hỏi hoặc đáp án",
      });
    }

    // Xử lý Subject: Nếu subject là string, tìm hoặc tạo mới
    let subjectId = null;
    if (subject && typeof subject === "string" && subject.trim() !== "") {
      const subjectName = subject.trim();
      let subjectDoc = await Subject.findOne({ name: subjectName });
      if (!subjectDoc) {
        subjectDoc = await Subject.create({ name: subjectName });
      }
      subjectId = subjectDoc._id;
    }

    // Chuẩn hóa options: xóa khoảng trắng thừa
    const normalizedOptions = options.map((opt) => ({
      text: (opt.text || "").trim(),
      isCorrect: !!opt.isCorrect,
    }));

    // Tạo object question mới
    const question = new Question({
      content: content.trim(),
      type,
      options: normalizedOptions,
      explanation: explanation ? explanation.trim() : "",
      subjectId: subjectId,
      createdBy: req.userId,
    });

    // Lưu vào database
    await question.save();

    // Trả về kết quả
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
 * @route   GET /api/questions
 * @desc    Lấy danh sách câu hỏi (gần đây)
 * @access  Private
 */
const listQuestions = async (req, res) => {
  try {
    // Lấy tham số limit từ query string (mặc định 20, tối đa 100)
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const subjectId = req.query.subjectId;

    const query = { isActive: true };
    if (subjectId) {
      query.subjectId = subjectId;
    }

    // Tìm các câu hỏi đang active, sắp xếp mới nhất
    const questions = await Question.find(query)
      .populate("subjectId", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Trả về danh sách câu hỏi
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
 * @route   GET /api/questions/random
 * @desc    Lấy câu hỏi ngẫu nhiên cho bài thi
 * @access  Private
 */
const getRandomQuestions = async (req, res) => {
  try {
    // Lấy tham số limit (số lượng câu hỏi) từ query string
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 50);

    // Sử dụng aggregation để lấy ngẫu nhiên câu hỏi
    const questions = await Question.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: limit } },
    ]);

    // Populate subject cho kết quả từ aggregate
    await Question.populate(questions, { path: "subjectId", select: "name" });

    // Trả về danh sách câu hỏi
    res.json({
      success: true,
      data: { questions },
    });
  } catch (error) {
    console.error("Get random questions error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy câu hỏi ngẫu nhiên",
    });
  }
};

module.exports = {
  createQuestion,
  listQuestions,
  getRandomQuestions,
};
