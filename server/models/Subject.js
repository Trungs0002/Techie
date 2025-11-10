const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true,
    maxlength: [100, 'Subject name cannot exceed 100 characters']
  },
  code: {
    type: String,
    required: [true, 'Subject code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'Subject code cannot exceed 20 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionCount: {
    type: Number,
    default: 0,
    min: [0, 'Question count cannot be negative']
  }
}, {
  timestamps: true,
  collection: 'subjects'
});

// Indexes
// subjectSchema.index({ code: 1 }); // Removed: duplicate of unique: true on line 13
subjectSchema.index({ isActive: 1 });

// Virtual for getting active questions
subjectSchema.virtual('activeQuestions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'subjectId',
  match: { isActive: true }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
