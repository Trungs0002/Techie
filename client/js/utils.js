/**
 * Utility Functions
 * Các hàm tiện ích dùng chung
 */

/**
 * Lưu token vào localStorage
 * @param {string} token - JWT token
 */
const saveToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Lấy token từ localStorage
 * @returns {string|null} JWT token hoặc null
 */
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Xóa token khỏi localStorage
 */
const removeToken = () => {
  localStorage.removeItem("token");
};

/**
 * Lưu thông tin user vào localStorage
 * @param {object} user - User object
 */
const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Lấy thông tin user từ localStorage
 * @returns {object|null} User object hoặc null
 */
const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Xóa thông tin user khỏi localStorage
 */
const removeUser = () => {
  localStorage.removeItem("user");
};

/**
 * Kiểm tra user đã đăng nhập chưa
 * @returns {boolean}
 */
const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Redirect đến trang khác
 * @param {string} url - URL cần redirect
 */
const redirect = (url) => {
  window.location.href = url;
};

/**
 * Hiển thị thông báo lỗi
 * @param {string} message - Thông báo lỗi
 * @param {HTMLElement} container - Container để hiển thị lỗi
 */
const showError = (message, container) => {
  if (container) {
    container.textContent = message;
    container.classList.add("error");
    container.style.display = "block";

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
      container.style.display = "none";
      container.classList.remove("error");
    }, 5000);
  }
};

/**
 * Hiển thị thông báo thành công
 * @param {string} message - Thông báo
 * @param {HTMLElement} container - Container để hiển thị
 */
const showSuccess = (message, container) => {
  if (container) {
    container.textContent = message;
    container.classList.add("success");
    container.style.display = "block";

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      container.style.display = "none";
      container.classList.remove("success");
    }, 3000);
  }
};

/**
 * Ẩn thông báo
 * @param {HTMLElement} container - Container cần ẩn
 */
const hideMessage = (container) => {
  if (container) {
    container.style.display = "none";
    container.classList.remove("error", "success");
  }
};

/**
 * Validate email format
 * @param {string} email - Email cần validate
 * @returns {boolean}
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate username (3-30 ký tự, chỉ chữ cái, số, _)
 * @param {string} username - Username cần validate
 * @returns {boolean}
 */
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

/**
 * Validate password (ít nhất 6 ký tự)
 * @param {string} password - Password cần validate
 * @returns {boolean}
 */
const validatePassword = (password) => {
  return password.length >= 6;
};

/**
 * Format date
 * @param {Date|string} date - Date cần format
 * @returns {string}
 */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN");
};

/**
 * Get API base URL
 * @returns {string}
 */
const getApiUrl = () => {
  // Trong development, sử dụng localhost:3000
  // Trong production, có thể override bằng biến môi trường
  return "http://localhost:3000/api";
};

// Export functions để sử dụng ở các file khác
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    saveToken,
    getToken,
    removeToken,
    saveUser,
    getUser,
    removeUser,
    isAuthenticated,
    redirect,
    showError,
    showSuccess,
    hideMessage,
    validateEmail,
    validateUsername,
    validatePassword,
    formatDate,
    getApiUrl,
  };
}
