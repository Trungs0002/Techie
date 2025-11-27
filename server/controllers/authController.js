const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

/**
 * Controller cho Authentication
 */

/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký user mới
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin: username, email, password'
      });
    }

    // Kiểm tra username đã tồn tại chưa
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username đã được sử dụng'
      });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Kiểm tra độ dài password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password phải có ít nhất 6 ký tự'
      });
    }

    // Tạo user mới
    const user = await User.create({
      username,
      email,
      password,
      fullName: fullName || '',
      dateCreated: new Date()
    });

    // Tạo JWT token
    const token = generateToken(user._id);

    // Trả về thông tin user và token
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          dateCreated: user.dateCreated,
          settings: user.settings,
          stats: user.stats
        }
      }
    });
  } catch (error) {
    console.error('Register error:', error);

    // Xử lý lỗi validation của Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // Xử lý lỗi duplicate key
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} đã được sử dụng`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng ký',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập user
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation - Có thể đăng nhập bằng username hoặc email
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập password'
      });
    }

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập username hoặc email'
      });
    }

    // Tìm user theo username hoặc email
    // Sử dụng select('+password') để lấy password field
    const query = username ? { username } : { email };
    const user = await User.findOne(query).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Thông tin đăng nhập không chính xác'
      });
    }

    // Kiểm tra password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Thông tin đăng nhập không chính xác'
      });
    }

    // Update lastLogin
    await user.updateLastLogin();

    // Tạo JWT token
    const token = generateToken(user._id);

    // Trả về thông tin user và token
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          lastLogin: user.lastLogin,
          settings: user.settings,
          stats: user.stats
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng nhập',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Đăng xuất user (client-side sẽ xóa token)
 * @access  Private
 */
const logout = async (req, res) => {
  try {
    // Vì JWT là stateless, logout thường được xử lý ở client-side
    // Server chỉ cần confirm logout thành công
    // Có thể implement token blacklist ở đây nếu cần

    res.json({
      success: true,
      message: 'Đăng xuất thành công'
    });
  } catch (error) {
    console.error('Logout error:', error);

    res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng xuất',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Lấy thông tin user hiện tại
 * @access  Private
 */
const getMe = async (req, res) => {
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
          settings: user.settings,
          stats: user.stats
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);

    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thông tin user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe
};

