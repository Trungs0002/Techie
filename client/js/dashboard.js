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

    showDashboardError("Không thể tải thông tin. Vui lòng thử lại sau.");
  } finally {
    showLoading(false);
  }
}

/**
 * Hiển thị thông tin user
 */
function displayUserInfo(user) {
  console.log("Displaying user info:", user);

  // User name
  const userNameEl = document.getElementById("user-name");
  if (userNameEl) {
    const displayName = user.fullName || user.username || "User";
    userNameEl.textContent = displayName;
    console.log("User name set to:", displayName);
  } else {
    console.error("user-name element not found");
  }

  // User email
  const userEmailEl = document.getElementById("user-email");
  if (userEmailEl) {
    userEmailEl.textContent = user.email || "";
    console.log("User email set to:", user.email);
  } else {
    console.error("user-email element not found");
  }

  // User avatar
  const userAvatarEl = document.getElementById("user-avatar");
  if (userAvatarEl) {
    // Map avatar name to file name (giống như trong settings.js)
    const avatarFileMap = {
      avt1: "avt1.png",
      avt2: "avt2.png",
      avt3: "avt3.avif",
      avt4: "avt4.png",
      avt5: "avt5.jpg",
      avt6: "avt6.png",
    };

    let avatarSrc = null;

    // Ưu tiên: user.avatar (nếu có full path)
    if (user.avatar && user.avatar.trim() !== "") {
      avatarSrc = user.avatar;
      console.log("Using user.avatar:", avatarSrc);
    }
    // Nếu không có user.avatar, kiểm tra selectedAvatar
    else if (user.settings?.selectedAvatar) {
      const selectedAvatar = user.settings.selectedAvatar;
      // Remove extension nếu có
      const avatarName = selectedAvatar.replace(/\.(png|jpg|jpeg|avif)$/i, "");
      // Map to file name
      const avatarFile = avatarFileMap[avatarName] || selectedAvatar;
      avatarSrc = `assets/avatars/${avatarFile}`;
      console.log("Using selectedAvatar:", selectedAvatar, "->", avatarSrc);
    }
    // Default: avt1.png
    else {
      avatarSrc = "assets/avatars/avt1.png";
      console.log("Using default avatar:", avatarSrc);
    }

    // Set avatar source
    userAvatarEl.src = avatarSrc;
    console.log("Avatar src set to:", avatarSrc);

    // Error handler: nếu không load được, dùng placeholder
    userAvatarEl.onerror = function () {
      console.warn(`Failed to load avatar: ${avatarSrc}, using placeholder`);
      this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.username || "User"
      )}&background=6366f1&color=fff&size=48`;
      // Remove onerror để tránh loop nếu placeholder cũng fail
      this.onerror = null;
    };

    // Success handler để confirm avatar loaded
    userAvatarEl.onload = function () {
      console.log("Avatar loaded successfully:", avatarSrc);
    };
  } else {
    console.error("user-avatar element not found");
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
 * Sử dụng showError từ utils.js, nhưng với container cụ thể cho dashboard
 */
function showDashboardError(message) {
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

