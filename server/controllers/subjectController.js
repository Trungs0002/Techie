const Subject = require("../models/Subject");

/**
 * @route   GET /api/subjects
 * @desc    Lấy danh sách tất cả các môn học
 * @access  Private
 */
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 }).lean();
    res.json({
      success: true,
      data: { subjects },
    });
  } catch (error) {
    console.error("Get all subjects error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách môn học",
    });
  }
};

module.exports = {
  getAllSubjects,
};
