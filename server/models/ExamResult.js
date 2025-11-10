const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam ID is required']
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  score: {
    type: Number,
    required: true,
    min: [0, 'Score cannot be negative']
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: [1, 'Total questions must be at least 1']
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: [0, 'Correct answers cannot be negative']
  },
  incorrectAnswers: {
    type: Number,
    required: true,
    min: [0, 'Incorrect answers cannot be negative']
  },
  percentage: {
    type: Number,
    required: true,
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  timeSpent: {
    type: Number, // in seconds
    required: true,
    min: [0, 'Time spent cannot be negative']
  },
  dateCompleted: {
    type: Date,
    default: Date.now,
    required: true
  },
  breakdown: {
    easy: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    medium: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    hard: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    }
  },
  // Store detailed answers for review
  detailedResults: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    content: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    difficulty: String,
    explanation: String
  }]
}, {
  timestamps: true,
  collection: 'exam_results'
});

// Indexes
examResultSchema.index({ userId: 1, dateCompleted: -1 });
examResultSchema.index({ subjectId: 1 });
examResultSchema.index({ examId: 1 });

// Method to get user's best score for a subject
examResultSchema.statics.getBestScore = async function(userId, subjectId) {
  return this.findOne({ userId, subjectId })
    .sort({ percentage: -1 })
    .limit(1);
};

// Method to get user's average score
examResultSchema.statics.getAverageScore = async function(userId, subjectId = null) {
  const match = { userId: new mongoose.Types.ObjectId(userId.toString()) };
  if (subjectId) {
    match.subjectId = new mongoose.Types.ObjectId(subjectId.toString());
  }
  
  const result = await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        avgScore: { $avg: '$score' }, // Use score instead of percentage (score is now percentage)
        totalExams: { $sum: 1 }
      }
    }
  ]);
  
  return result.length > 0 ? result[0] : { avgScore: 0, totalExams: 0 };
};

const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
