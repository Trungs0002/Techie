/**
 * Dashboard JavaScript
 * Xử lý logic cho trang dashboard
 */

let currentUser = null;

/**
 * Load user information và stats
 */
async function loadUserInfo() {
  try {
    showLoading(true);

    // Lấy token từ localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Không có token, redirect về login
      window.location.href = "login.html";
      return;
    }

    // Gọi API để lấy thông tin user
    const response = await authAPI.getMe();

    if (response.success && response.data.user) {
      currentUser = response.data.user;
      displayUserInfo(currentUser);
      displayStats(currentUser.stats || {});
    } else {
      throw new Error("Không thể lấy thông tin user");
    }
  } catch (error) {
    console.error("Load user info error:", error);

    // Nếu token không hợp lệ, xóa token và redirect về login
    if (error.message.includes("token") || error.message.includes("401")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "login.html";
      return;
    }

    showError("Không thể tải thông tin. Vui lòng thử lại sau.");
  } finally {
    showLoading(false);
  }
}

/**
 * Hiển thị thông tin user
 */
function displayUserInfo(user) {
  // User name
  const userNameEl = document.getElementById("user-name");
  if (userNameEl) {
    userNameEl.textContent = user.fullName || user.username;
  }

  // User email
  const userEmailEl = document.getElementById("user-email");
  if (userEmailEl) {
    userEmailEl.textContent = user.email;
  }

  // User avatar
  const userAvatarEl = document.getElementById("user-avatar");
  if (userAvatarEl) {
    if (user.avatar) {
      userAvatarEl.src = user.avatar;
    } else if (user.settings?.selectedAvatar) {
      userAvatarEl.src = `assets/avatars/${user.settings.selectedAvatar}`;
    } else {
      // Default avatar
      userAvatarEl.src = "assets/avatars/default.png";
      userAvatarEl.onerror = function () {
        // Nếu không tìm thấy avatar, sử dụng placeholder
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=6366f1&color=fff&size=48`;
      };
    }
  }
}

/**
 * Hiển thị thống kê
 */
function displayStats(stats) {
  // Tổng số bài thi
  const totalExamsEl = document.getElementById("total-exams");
  if (totalExamsEl) {
    totalExamsEl.textContent = stats.totalExams || 0;
  }

  // Tổng câu trả lời đúng
  const totalCorrectEl = document.getElementById("total-correct");
  if (totalCorrectEl) {
    totalCorrectEl.textContent = stats.totalCorrect || 0;
  }

  // Tổng câu hỏi
  const totalQuestionsEl = document.getElementById("total-questions");
  if (totalQuestionsEl) {
    totalQuestionsEl.textContent = stats.totalQuestions || 0;
  }

  // Điểm trung bình
  const averageScoreEl = document.getElementById("average-score");
  if (averageScoreEl) {
    const avgScore = stats.averageScore || 0;
    averageScoreEl.textContent = `${avgScore.toFixed(1)}%`;
  }

  // Điểm cao nhất
  const bestScoreEl = document.getElementById("best-score");
  if (bestScoreEl) {
    const bestScore = stats.bestScore || 0;
    bestScoreEl.textContent = `${bestScore.toFixed(1)}%`;
  }
}

/**
 * Xử lý đăng xuất
 */
async function handleLogout() {
  try {
    // Gọi API logout
    await authAPI.logout();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Xóa token và user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect về trang login
    window.location.href = "login.html";
  }
}

/**
 * Hiển thị loading overlay
 */
function showLoading(show) {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.style.display = show ? "flex" : "none";
  }
}

/**
 * Hiển thị thông báo lỗi
 */
function showError(message) {
  const errorEl = document.getElementById("error-message");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = "block";

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
      errorEl.style.display = "none";
    }, 5000);
  }
}

// Check authentication trước khi load dashboard
function checkAuthBeforeLoad() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Không có token, redirect về login
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// Load user info khi page load
document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra authentication trước
  if (checkAuthBeforeLoad()) {
    loadUserInfo();
  }
});

