const ExamResult = require("../models/ExamResult");
const User = require("../models/User");

/**
 * Controller cho Exam/Result
 * Xử lý lưu kết quả bài thi và thống kê
 */

/**
 * @route   POST /api/exams
 * @desc    Lưu kết quả bài thi và cập nhật thống kê user
 * @access  Private
 */
const saveResult = async (req, res) => {
  try {
    const { score, totalQuestions, correctCount, timeSpent, subject, questions } =
      req.body;
    const userId = req.userId;

    // 1. Lưu kết quả bài thi vào collection ExamResult
    const examResult = await ExamResult.create({
      user: userId,
      score,
      totalQuestions,
      correctCount,
      timeSpent,
      subject,
      questions,
    });

    // 2. Cập nhật thống kê cho User
    const user = await User.findById(userId);

    if (user) {
      // Khởi tạo stats nếu chưa có
      if (!user.stats) {
        user.stats = {
          totalExams: 0,
          totalCorrect: 0,
          totalQuestions: 0,
          averageScore: 0,
          bestScore: 0,
        };
      }

      // Cập nhật số liệu tổng
      user.stats.totalExams += 1;
      user.stats.totalCorrect += correctCount;
      user.stats.totalQuestions += totalQuestions;

      // Tính phần trăm điểm của bài thi này
      const percentage =
        totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

      // Cập nhật điểm cao nhất (nếu cao hơn hiện tại)
      if (percentage > user.stats.bestScore) {
        user.stats.bestScore = parseFloat(percentage.toFixed(1));
      }

      // Tính lại điểm trung bình (Tỷ lệ đúng trên tổng số câu đã làm)
      if (user.stats.totalQuestions > 0) {
        user.stats.averageScore = parseFloat(
          ((user.stats.totalCorrect / user.stats.totalQuestions) * 100).toFixed(
            1
          )
        );
      }

      // Lưu user đã cập nhật
      await user.save();
    }

    // Trả về kết quả thành công
    res.status(201).json({
      success: true,
      message: "Lưu kết quả bài thi thành công",
      data: {
        examResult,
        stats: user.stats,
      },
    });
  } catch (error) {
    console.error("Save exam result error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lưu kết quả bài thi",
    });
  }
};

/**
 * @route   GET /api/exams/history
 * @desc    Lấy lịch sử bài thi của user (giới hạn 20 bài gần nhất)
 * @access  Private
 */
const getHistory = async (req, res) => {
  try {
    const userId = req.userId;

    // Tìm các bài thi của user, sắp xếp mới nhất trước
    const history = await ExamResult.find({ user: userId })
      .sort({ completedAt: -1 })
      .limit(20);

    // Trả về danh sách lịch sử
    res.status(200).json({
      success: true,
      data: { history },
    });
  } catch (error) {
    console.error("Get exam history error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy lịch sử bài thi",
    });
  }
};

module.exports = {
  saveResult,
  getHistory,
};
