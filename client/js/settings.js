/**
 * Settings Page JavaScript
 */

let currentSettings = null;
let currentProfile = null;

/**
 * API endpoints cho users
 */
const userAPI = {
  getProfile: async () => {
    return await apiCall("/users/profile", { method: "GET" });
  },

  updateProfile: async (data) => {
    return await apiCall("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  getSettings: async () => {
    return await apiCall("/users/settings", { method: "GET" });
  },

  updateSettings: async (data) => {
    return await apiCall("/users/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  updateAvatar: async (selectedAvatar) => {
    return await apiCall("/users/avatar", {
      method: "PUT",
      body: JSON.stringify({ selectedAvatar }),
    });
  },
};

/**
 * Load settings và profile khi page load
 */
async function loadSettings() {
  try {
    showLoading(true);

    // Load profile
    const profileResponse = await userAPI.getProfile();
    if (profileResponse.success) {
      currentProfile = profileResponse.data.user;
      displayProfile(currentProfile);
    }

    // Load settings
    const settingsResponse = await userAPI.getSettings();
    if (settingsResponse.success) {
      currentSettings = settingsResponse.data.settings;
      displaySettings(currentSettings);
    }

    // Load avatars
    loadAvatars();
  } catch (error) {
    console.error("Load settings error:", error);
    showError("Không thể tải cài đặt. Vui lòng thử lại sau.");
  } finally {
    showLoading(false);
  }
}

/**
 * Hiển thị profile
 */
function displayProfile(profile) {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");

  if (fullNameInput) {
    fullNameInput.value = profile.fullName || "";
  }
  if (emailInput) {
    emailInput.value = profile.email || "";
  }
}

/**
 * Hiển thị settings
 */
function displaySettings(settings) {
  // Background Music
  const bgMusicCheckbox = document.getElementById("backgroundMusic");
  if (bgMusicCheckbox) {
    bgMusicCheckbox.checked = settings.backgroundMusic || false;
  }

  // Sound Effects
  const soundEffectsCheckbox = document.getElementById("soundEffects");
  if (soundEffectsCheckbox) {
    soundEffectsCheckbox.checked = settings.soundEffects || false;
  }

  // Timer
  const timerCheckbox = document.getElementById("timer");
  if (timerCheckbox) {
    timerCheckbox.checked = settings.timer || false;
  }

  // Questions Per Exam
  const questionsInput = document.getElementById("questionsPerExam");
  if (questionsInput) {
    questionsInput.value = settings.questionsPerExam || 5;
  }

  // Exam Timer
  const examTimerInput = document.getElementById("examTimer");
  if (examTimerInput) {
    examTimerInput.value = settings.examTimer || 60;
  }

  // Current Avatar
  const currentAvatar = document.getElementById("current-avatar");
  if (currentAvatar && settings.selectedAvatar) {
    currentAvatar.src = `assets/avatars/${settings.selectedAvatar}`;
    currentAvatar.onerror = function () {
      this.src = "assets/avatars/default.png";
    };
  }
}

/**
 * Cập nhật setting
 */
async function updateSetting(settingName, value) {
  try {
    const data = { [settingName]: value };
    const response = await userAPI.updateSettings(data);

    if (response.success) {
      // Cập nhật currentSettings
      if (currentSettings) {
        currentSettings[settingName] = value;
      }
      showSuccess("Cài đặt đã được cập nhật");
    }
  } catch (error) {
    console.error("Update setting error:", error);
    showError(error.message || "Không thể cập nhật cài đặt");
    
    // Revert checkbox state
    const checkbox = document.getElementById(settingName);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  }
}

/**
 * Cập nhật profile
 */
async function updateProfile() {
  try {
    showLoading(true);

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!email) {
      showError("Email là bắt buộc");
      return;
    }

    const response = await userAPI.updateProfile({
      fullName,
      email,
    });

    if (response.success) {
      currentProfile = response.data.user;
      showSuccess("Thông tin đã được cập nhật");
      
      // Cập nhật localStorage nếu có
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.fullName = response.data.user.fullName;
        user.email = response.data.user.email;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  } catch (error) {
    console.error("Update profile error:", error);
    showError(error.message || "Không thể cập nhật thông tin");
  } finally {
    showLoading(false);
  }
}

/**
 * Load avatars
 */
function loadAvatars() {
  // Danh sách avatar mẫu (bạn có thể thay đổi theo số lượng avatar thực tế)
  const avatarNames = [
    "avatar1.png",
    "avatar2.png",
    "avatar3.png",
    "avatar4.png",
    "avatar5.png",
    "avatar6.png",
    "default.png",
  ];

  const avatarGrid = document.getElementById("avatar-grid");
  if (!avatarGrid) return;

  avatarGrid.innerHTML = "";

  avatarNames.forEach((avatarName) => {
    const avatarItem = document.createElement("div");
    avatarItem.className = "avatar-item";
    
    // Kiểm tra nếu là avatar đang chọn
    if (currentSettings && currentSettings.selectedAvatar === avatarName) {
      avatarItem.classList.add("selected");
    }

    avatarItem.onclick = () => selectAvatar(avatarName);

    const img = document.createElement("img");
    img.src = `assets/avatars/${avatarName}`;
    img.alt = avatarName;
    img.onerror = function () {
      // Nếu không tìm thấy ảnh, tạo avatar placeholder
      this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&size=100`;
    };

    avatarItem.appendChild(img);

    // Thêm checkmark nếu đang được chọn
    if (currentSettings && currentSettings.selectedAvatar === avatarName) {
      const check = document.createElement("div");
      check.className = "avatar-check";
      check.textContent = "✓";
      avatarItem.appendChild(check);
    }

    avatarGrid.appendChild(avatarItem);
  });
}

/**
 * Chọn avatar
 */
async function selectAvatar(avatarName) {
  try {
    showLoading(true);

    const response = await userAPI.updateAvatar(avatarName);

    if (response.success) {
      // Cập nhật currentSettings
      if (currentSettings) {
        currentSettings.selectedAvatar = avatarName;
      }

      // Cập nhật preview
      const currentAvatar = document.getElementById("current-avatar");
      if (currentAvatar) {
        currentAvatar.src = `assets/avatars/${avatarName}`;
        currentAvatar.onerror = function () {
          this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&size=120`;
        };
      }

      // Reload avatar grid để cập nhật selected state
      loadAvatars();

      showSuccess("Avatar đã được cập nhật");
      
      // Cập nhật localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.avatar = response.data.avatar;
        user.settings = user.settings || {};
        user.settings.selectedAvatar = avatarName;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  } catch (error) {
    console.error("Select avatar error:", error);
    showError(error.message || "Không thể cập nhật avatar");
  } finally {
    showLoading(false);
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

    setTimeout(() => {
      errorEl.style.display = "none";
    }, 5000);
  }
}

/**
 * Hiển thị thông báo thành công
 */
function showSuccess(message) {
  const successEl = document.getElementById("success-message");
  if (successEl) {
    successEl.textContent = message;
    successEl.style.display = "block";

    setTimeout(() => {
      successEl.style.display = "none";
    }, 3000);
  }
}

// Load settings khi page load
document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra authentication
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  loadSettings();
});

