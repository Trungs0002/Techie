const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  fullName: {
    type: String,
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  avatar: {
    type: String,
    default: '/assets/images/avatars/default.png'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  settings: {
    backgroundMusic: {
      type: Boolean,
      default: false
    },
    soundEffects: {
      type: Boolean,
      default: false
    },
    timer: {
      type: Boolean,
      default: false
    },
    questionsPerExam: {
      type: Number,
      default: 5,
      min: [1, 'Must have at least 1 question'],
      max: [50, 'Cannot exceed 50 questions']
    },
    examTimer: {
      type: Number,
      default: 30, // minutes
      min: [1, 'Timer must be at least 1 minute'],
      max: [180, 'Timer cannot exceed 180 minutes']
    },
    selectedAvatar: {
      type: String,
      default: 'avatar1'
    }
  },
  stats: {
    totalExams: {
      type: Number,
      default: 0
    },
    totalCorrect: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    bestScore: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true, // Auto add createdAt, updatedAt
  collection: 'users'
});

// Indexes for performance (only using schema-level unique)
// userSchema.index({ email: 1 }); // Removed - already unique
// userSchema.index({ username: 1 }); // Removed - already unique

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get safe user object (without password)
userSchema.methods.toSafeObject = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
