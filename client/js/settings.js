/**
 * Settings Page JavaScript
 */
s;
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
  if (currentAvatar) {
    if (settings.selectedAvatar) {
      // Map avatar name to file name
      const avatarFileMap = {
        avt1: "avt1.png",
        avt2: "avt2.png",
        avt3: "avt3.avif",
        avt4: "avt4.png",
        avt5: "avt5.jpg",
        avt6: "avt6.png",
      };

      const avatarName = settings.selectedAvatar.replace(
        /\.(png|jpg|jpeg|avif)$/i,
        ""
      );
      const avatarFile = avatarFileMap[avatarName] || settings.selectedAvatar;

      currentAvatar.src = `assets/avatars/${avatarFile}`;
      currentAvatar.onerror = function () {
        // Fallback nếu không tìm thấy file
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          avatarName
        )}&size=120&background=6366f1&color=fff`;
      };
    } else {
      // Default avatar (avt1)
      currentAvatar.src = "assets/avatars/avt1.png";
      currentAvatar.onerror = function () {
        this.src =
          "https://ui-avatars.com/api/?name=User&size=120&background=6366f1&color=fff";
      };
    }
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
  // Danh sách các file avatar có sẵn trong folder assets/avatars
  const avatarFiles = [
    { name: "avt1", file: "avt1.png" },
    { name: "avt2", file: "avt2.png" },
    { name: "avt3", file: "avt3.avif" },
    { name: "avt4", file: "avt4.png" },
    { name: "avt5", file: "avt5.jpg" },
    { name: "avt6", file: "avt6.png" },
  ];

  const avatarGrid = document.getElementById("avatar-grid");
  if (!avatarGrid) {
    console.error("Avatar grid element not found");
    return;
  }

  avatarGrid.innerHTML = "";

  avatarFiles.forEach((avatarData) => {
    const avatarName = avatarData.name;
    const avatarFile = avatarData.file;

    // Lấy selectedAvatar (có thể có extension hoặc không)
    const selectedAvatar = currentSettings?.selectedAvatar || "";
    const selectedAvatarName = selectedAvatar.replace(
      /\.(png|jpg|jpeg|avif)$/i,
      ""
    );

    const avatarItem = document.createElement("div");
    avatarItem.className = "avatar-item";
    avatarItem.style.cursor = "pointer";

    // Kiểm tra nếu là avatar đang chọn
    const isSelected =
      selectedAvatarName === avatarName ||
      selectedAvatar === avatarName ||
      selectedAvatar === avatarFile;

    if (isSelected) {
      avatarItem.classList.add("selected");
    }

    // Bind click event
    avatarItem.addEventListener(
      "click",
      (function (name, file) {
        return function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("Avatar clicked:", name, file);
          selectAvatar(name);
        };
      })(avatarName, avatarFile)
    );

    // Tạo image element - load trực tiếp từ file
    const img = document.createElement("img");
    img.src = `assets/avatars/${avatarFile}`;
    img.alt = avatarName;
    img.style.cssText =
      "width: 100%; height: 100%; object-fit: cover; border-radius: 12px; display: block;";

    img.onerror = function () {
      console.error(`Failed to load avatar: ${avatarFile}`);
      // Hiển thị placeholder nếu không load được
      this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        avatarName
      )}&size=100&background=6366f1&color=fff`;
    };

    avatarItem.appendChild(img);

    // Thêm checkmark nếu đang được chọn
    if (isSelected) {
      const check = document.createElement("div");
      check.className = "avatar-check";
      check.textContent = "✓";
      avatarItem.appendChild(check);
    }

    avatarGrid.appendChild(avatarItem);
  });

  console.log(
    "Avatars loaded, current selected:",
    currentSettings?.selectedAvatar
  );
}

/**
 * Chọn avatar
 */
async function selectAvatar(avatarName) {
  console.log("selectAvatar called with:", avatarName);

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
        // Map avatar name to file name
        const avatarFileMap = {
          avt1: "avt1.png",
          avt2: "avt2.png",
          avt3: "avt3.avif",
          avt4: "avt4.png",
          avt5: "avt5.jpg",
          avt6: "avt6.png",
        };

        const avatarFile = avatarFileMap[avatarName] || `${avatarName}.png`;
        currentAvatar.src = `assets/avatars/${avatarFile}`;
        currentAvatar.onerror = function () {
          // Fallback nếu không tìm thấy file
          this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            avatarName
          )}&size=120&background=6366f1&color=fff`;
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

// Đảm bảo hàm selectAvatar có thể được gọi từ global scope
window.selectAvatar = selectAvatar;

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
