const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware để authenticate JWT token
 * Kiểm tra và xác thực JWT token từ request header
 */
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Không có token, truy cập bị từ chối",
      });
    }

    // Lấy token (bỏ phần "Bearer ")
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token không hợp lệ",
      });
    }

    try {
      // Verify token với JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user từ decoded token (decoded có chứa userId)
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User không tồn tại",
        });
      }

      // Gán user vào request để sử dụng trong controllers
      req.user = user;
      req.userId = decoded.userId;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token đã hết hạn",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Token không hợp lệ",
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi xác thực",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Optional middleware - Chỉ authenticate nếu có token
 * Không bắt buộc phải có token (khác với authenticate middleware)
 */
const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Không có token, tiếp tục mà không set req.user
      return next();
    }

    const token = authHeader.substring(7);

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (user) {
          req.user = user;
          req.userId = decoded.userId;
        }
      } catch (error) {
        // Token không hợp lệ nhưng không throw error, chỉ bỏ qua
        console.log("Optional auth failed:", error.message);
      }
    }

    next();
  } catch (error) {
    // Lỗi không nghiêm trọng, tiếp tục
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuthenticate,
};
