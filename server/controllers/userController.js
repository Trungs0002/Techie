const User = require("../models/User");

const DEFAULT_SETTINGS = {
  backgroundMusic: false,
  soundEffects: false,
  timer: false,
  questionsPerExam: 5,
  examTimer: 60,
  selectedAvatar: "",
};

function mergeSettings(userSettings = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...userSettings,
  };
}

/**
 * Controller cho User Management
 */

/**
 * @route   GET /api/users/profile
 * @desc    Lấy thông tin profile của user hiện tại
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    // req.user đã được set bởi authenticate middleware
    const user = req.user;

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          dateCreated: user.dateCreated,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thông tin profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @route   PUT /api/users/profile
 * @desc    Cập nhật thông tin profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const userId = req.userId;

    // Tìm user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User không tồn tại",
      });
    }

    // Cập nhật các trường được phép thay đổi
    if (fullName !== undefined) {
      user.fullName = fullName.trim();
    }

    if (email !== undefined && email !== user.email) {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          message: "Email đã được sử dụng",
        });
      }
      user.email = email.toLowerCase();
    }

    await user.save();

    res.json({
      success: true,
      message: "Cập nhật profile thành công",
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          dateCreated: user.dateCreated,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} đã được sử dụng`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @route   GET /api/users/settings
 * @desc    Lấy settings của user
 * @access  Private
 */
const getSettings = async (req, res) => {
  try {
    const user = req.user;
    const merged = mergeSettings(user.settings);

    // Persist defaulted settings if missing
    if (!user.settings || Object.keys(user.settings).length !== Object.keys(merged).length) {
      user.settings = merged;
      await user.save();
    }

    res.json({
      success: true,
      data: {
        settings: merged,
      },
    });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy settings",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @route   PUT /api/users/settings
 * @desc    Cập nhật settings
 * @access  Private
 */
const updateSettings = async (req, res) => {
  try {
    const { backgroundMusic, soundEffects, timer, questionsPerExam, examTimer } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User không tồn tại",
      });
    }

    // Cập nhật settings
    user.settings = mergeSettings(user.settings);
    if (backgroundMusic !== undefined) {
      user.settings.backgroundMusic = !!backgroundMusic;
    }
    if (soundEffects !== undefined) {
      user.settings.soundEffects = !!soundEffects;
    }
    if (timer !== undefined) {
      user.settings.timer = !!timer;
    }
    if (questionsPerExam !== undefined) {
      // Validate số câu hỏi (ít nhất 1, tối đa 100)
      if (questionsPerExam < 1 || questionsPerExam > 100) {
        return res.status(400).json({
          success: false,
          message: "Số câu hỏi phải từ 1 đến 100",
        });
      }
      user.settings.questionsPerExam = Number(questionsPerExam);
    }
    if (examTimer !== undefined) {
      // Validate timer (ít nhất 1 phút, tối đa 300 phút)
      if (examTimer < 1 || examTimer > 300) {
        return res.status(400).json({
          success: false,
          message: "Timer phải từ 1 đến 300 phút",
        });
      }
      user.settings.examTimer = Number(examTimer);
    }

    await user.save();

    res.json({
      success: true,
      message: "Cập nhật settings thành công",
      data: {
        settings: user.settings,
      },
    });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật settings",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @route   PUT /api/users/avatar
 * @desc    Cập nhật avatar
 * @access  Private
 */
const updateAvatar = async (req, res) => {
  try {
    const { selectedAvatar } = req.body;
    const userId = req.userId;

    if (!selectedAvatar) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn avatar",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User không tồn tại",
      });
    }

    // Cập nhật selectedAvatar trong settings
    user.settings = mergeSettings(user.settings);
    user.settings.selectedAvatar = selectedAvatar;
    // Cũng cập nhật avatar field
    user.avatar = `assets/avatars/${selectedAvatar}`;

    await user.save();

    res.json({
      success: true,
      message: "Cập nhật avatar thành công",
      data: {
        avatar: user.avatar,
        selectedAvatar: user.settings.selectedAvatar,
      },
    });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật avatar",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * @route   GET /api/users/stats
 * @desc    Lấy thống kê của user
 * @access  Private
 */
const getStats = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      data: {
        stats: user.stats || {
          totalExams: 0,
          totalCorrect: 0,
          totalQuestions: 0,
          averageScore: 0,
          bestScore: 0,
        },
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thống kê",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getSettings,
  updateSettings,
  updateAvatar,
  getStats,
};
