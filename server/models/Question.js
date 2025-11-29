const mongoose = require("mongoose");

/**
 * Question Schema
 * Supports true/false and single-correct multiple choice
 */
const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    isCorrect: { type: Boolean, default: false },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Nội dung câu hỏi là bắt buộc"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["true_false", "multiple_choice"],
      required: true,
    },
    options: {
      type: [optionSchema],
      validate: {
        validator: function (opts) {
          if (!Array.isArray(opts)) return false;
          if (this.type === "true_false") {
            return opts.length === 2 && opts.some((o) => o.isCorrect);
          }
          return opts.length === 4 && opts.filter((o) => o.isCorrect).length === 1;
        },
        message: "Tùy chọn không hợp lệ cho loại câu hỏi",
      },
    },
    explanation: {
      type: String,
      default: "",
      trim: true,
    },
    subject: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster random sampling and listing
questionSchema.index({ isActive: 1, subject: 1, createdAt: -1 });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
