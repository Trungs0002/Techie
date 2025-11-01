const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required']
  },
  type: {
    type: String,
    enum: {
      values: ['true_false', 'multiple_choice'],
      message: 'Type must be either true_false or multiple_choice'
    },
    required: [true, 'Question type is required']
  },
  content: {
    type: String,
    required: [true, 'Question content is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters'],
    maxlength: [1000, 'Question cannot exceed 1000 characters']
  },
  options: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  explanation: {
    type: String,
    trim: true,
    maxlength: [1000, 'Explanation cannot exceed 1000 characters']
  },
  difficulty: {
    type: String,
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'Difficulty must be easy, medium, or hard'
    },
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageCount: {
    type: Number,
    default: 0,
    min: [0, 'Usage count cannot be negative']
  },
  correctRate: {
    type: Number,
    default: 0,
    min: [0, 'Correct rate cannot be negative'],
    max: [100, 'Correct rate cannot exceed 100']
  }
}, {
  timestamps: true,
  collection: 'questions'
});

// Indexes for performance
questionSchema.index({ subjectId: 1, type: 1, difficulty: 1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ tags: 1 });

// Validation: Ensure correct number of options based on type
questionSchema.pre('save', function(next) {
  if (this.type === 'true_false' && this.options.length !== 2) {
    return next(new Error('True/False questions must have exactly 2 options'));
  }
  if (this.type === 'multiple_choice' && this.options.length !== 4) {
    return next(new Error('Multiple choice questions must have exactly 4 options'));
  }
  
  // Ensure at least one correct answer
  const correctAnswers = this.options.filter(opt => opt.isCorrect);
  if (correctAnswers.length === 0) {
    return next(new Error('Question must have at least one correct answer'));
  }
  
  next();
});

// Method to get random questions
questionSchema.statics.getRandomQuestions = async function(subjectId, count = 5, difficulty = null) {
  const query = { subjectId, isActive: true };
  if (difficulty) {
    query.difficulty = difficulty;
  }
  
  return this.aggregate([
    { $match: query },
    { $sample: { size: count } }
  ]);
};

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
