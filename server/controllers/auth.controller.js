const User = require('../models/User');
const ExamResult = require('../models/ExamResult');
const { generateToken } = require('../utils/jwt');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: userExists.email === email 
          ? 'Email already registered' 
          : 'Username already taken'
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      fullName: fullName || username
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toSafeObject(),
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user (include password for comparison)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toSafeObject(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    // Get user stats from ExamResult
    const stats = await ExamResult.getAverageScore(req.user._id);
    
    // Get highest score
    const highestScoreResult = await ExamResult.findOne({ userId: req.user._id })
      .sort({ score: -1 })
      .limit(1);
    
    // Add stats to user object
    const userWithStats = {
      ...user.toObject(),
      stats: {
        totalExams: stats.totalExams || 0,
        avgScore: Math.round(stats.avgScore || 0),
        highestScore: highestScoreResult ? Math.round(highestScoreResult.score) : 0,
        rank: '-', // TODO: Calculate rank
        streak: 0  // TODO: Calculate streak
      }
    };

    res.status(200).json({
      success: true,
      data: { user: userWithStats }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting user'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { fullName, avatar, phone, birthday, gender, address, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (fullName !== undefined) user.fullName = fullName;
    if (avatar !== undefined) user.avatar = avatar;
    if (phone !== undefined) user.phone = phone;
    if (birthday !== undefined) user.birthday = birthday;
    if (gender !== undefined) user.gender = gender;
    if (address !== undefined) user.address = address;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: user.toSafeObject() }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile'
    });
  }
};

// @desc    Update user settings
// @route   PUT /api/auth/settings
// @access  Private
const updateSettings = async (req, res) => {
  try {
    const { 
      backgroundMusic, 
      soundEffects, 
      timer, 
      questionsPerExam, 
      examTimer,
      selectedAvatar 
    } = req.body;

    const user = await User.findById(req.user._id);

    // Update settings
    if (backgroundMusic !== undefined) user.settings.backgroundMusic = backgroundMusic;
    if (soundEffects !== undefined) user.settings.soundEffects = soundEffects;
    if (timer !== undefined) user.settings.timer = timer;
    if (questionsPerExam !== undefined) user.settings.questionsPerExam = questionsPerExam;
    if (examTimer !== undefined) user.settings.examTimer = examTimer;
    if (selectedAvatar !== undefined) user.settings.selectedAvatar = selectedAvatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: { 
        settings: user.settings,
        user: user.toSafeObject()
      }
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating settings'
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    const user = await User.findById(req.user._id).select('+password');

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error changing password'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  updateSettings,
  changePassword
};
