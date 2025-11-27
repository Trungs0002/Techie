const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * User Schema - Dựa trên database_schema.js
 * Model cho collection users trong MongoDB
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username là bắt buộc"],
      unique: true,
      trim: true,
      minlength: [3, "Username phải có ít nhất 3 ký tự"],
      maxlength: [30, "Username không được vượt quá 30 ký tự"],
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Password là bắt buộc"],
      minlength: [6, "Password phải có ít nhất 6 ký tự"],
      select: false, // Không trả về password mặc định khi query
    },
    fullName: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
    },
    settings: {
      backgroundMusic: {
        type: Boolean,
        default: false,
      },
      soundEffects: {
        type: Boolean,
        default: false,
      },
      timer: {
        type: Boolean,
        default: false,
      },
      questionsPerExam: {
        type: Number,
        default: 5,
      },
      examTimer: {
        type: Number,
        default: 60, // 60 phút mặc định
      },
      selectedAvatar: {
        type: String,
        default: "",
      },
    },
    stats: {
      totalExams: {
        type: Number,
        default: 0,
      },
      totalCorrect: {
        type: Number,
        default: 0,
      },
      totalQuestions: {
        type: Number,
        default: 0,
      },
      averageScore: {
        type: Number,
        default: 0,
      },
      bestScore: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: false, // Sử dụng dateCreated thay vì timestamps
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password; // Đảm bảo không bao giờ trả về password
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

/**
 * Index cho username và email để tối ưu truy vấn
 */
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ "stats.averageScore": -1 });

/**
 * Hash password trước khi lưu vào database
 */
userSchema.pre("save", async function () {
  // Chỉ hash password nếu password mới hoặc được thay đổi
  if (!this.isModified("password")) {
    return;
  }

  // Hash password với salt rounds = 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Method để so sánh password
 * @param {String} candidatePassword - Password cần kiểm tra
 * @returns {Boolean}
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Method để update lastLogin
 */
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
