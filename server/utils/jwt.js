const jwt = require("jsonwebtoken");

/**
 * Tạo JWT token cho user
 * @param {String} userId - ID của user
 * @returns {String} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

/**
 * Verify JWT token
 * @param {String} token - JWT token cần verify
 * @returns {Object} Decoded token
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
