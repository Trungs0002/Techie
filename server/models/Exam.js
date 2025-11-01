const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  title: {
    type: String,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  type: {
    type: String,
    enum: {
      values: ['practice', 'test', 'random'],
      message: 'Type must be practice, test, or random'
    },
    default: 'practice'
  },
  settings: {
    questionCount: {
      type: Number,
      required: true,
      min: [1, 'Must have at least 1 question'],
      max: [50, 'Cannot exceed 50 questions']
    },
    timeLimit: {
      type: Number, // in minutes
      min: [1, 'Time limit must be at least 1 minute'],
      max: [180, 'Time limit cannot exceed 180 minutes']
    },
    shuffleQuestions: {
      type: Boolean,
      default: true
    },
    shuffleOptions: {
      type: Boolean,
      default: true
    },
    showResult: {
      type: Boolean,
      default: true
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true
    }
  },
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    userAnswer: [{
      type: String
    }],
    isCorrect: {
      type: Boolean,
      default: null
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0,
      min: [0, 'Time spent cannot be negative']
    }
  }],
  status: {
    type: String,
    enum: {
      values: ['in_progress', 'completed', 'abandoned'],
      message: 'Status must be in_progress, completed, or abandoned'
    },
    default: 'in_progress'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  timeSpent: {
    type: Number, // total time in seconds
    default: 0,
    min: [0, 'Time spent cannot be negative']
  },
  score: {
    type: Number,
    default: 0,
    min: [0, 'Score cannot be negative']
  },
  percentage: {
    type: Number,
    default: 0,
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'exams'
});

// Indexes
examSchema.index({ userId: 1, status: 1, dateCreated: -1 });
examSchema.index({ subjectId: 1 });

// Calculate score before saving
examSchema.pre('save', function(next) {
  if (this.status === 'completed') {
    const totalQuestions = this.questions.length;
    const correctAnswers = this.questions.filter(q => q.isCorrect === true).length;
    
    this.score = correctAnswers;
    this.percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    
    if (!this.endTime) {
      this.endTime = new Date();
    }
  }
  next();
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
