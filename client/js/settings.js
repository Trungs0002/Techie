/**
 * Settings Page JavaScript
 */

const DEFAULT_SETTINGS = Object.freeze({
  backgroundMusic: false,
  soundEffects: false,
  timer: false,
  questionsPerExam: 5,
  examTimer: 60,
  selectedAvatar: "",
});

const NUMBER_LIMITS = Object.freeze({
  questionsPerExam: { min: 1, max: 100 },
  examTimer: { min: 1, max: 300 },
});

const AUDIO_SOURCES = Object.freeze({
  // Placeholder background track – replace file once real soundtrack is ready.
  background: "assets/audio/tick.mp3",
  correct: "assets/audio/correct.mp3",
  wrong: "assets/audio/wrong.mp3",
});

let currentSettings = { ...DEFAULT_SETTINGS };
let currentProfile = null;
let audioController = null;

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

    // Load từ localStorage trước để có fallback
    const cachedSettings = loadSettingsFromCache();
    if (cachedSettings) {
      currentSettings = normalizeSettings(cachedSettings);
      displaySettings(currentSettings);
    }

    // Sau đó load từ server để có data mới nhất
    await Promise.all([loadProfile(), loadUserSettings()]);
  } catch (error) {
    console.error("Load settings error:", error);

    // Nếu không có cached settings, dùng default
    if (!currentSettings || Object.keys(currentSettings).length === 0) {
      currentSettings = { ...DEFAULT_SETTINGS };
      displaySettings(currentSettings);
    }

    // Chỉ hiển thị lỗi nếu không có cached data
    if (!loadSettingsFromCache()) {
      showError("Không thể tải cài đặt. Vui lòng thử lại sau.");
    }
  } finally {
    loadAvatars();
    showLoading(false);
  }
}

function loadSettingsFromCache() {
  try {
    const cached = localStorage.getItem("userSettings");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn("Unable to load cached settings", error);
  }
  return null;
}

async function loadProfile() {
  try {
    const profileResponse = await userAPI.getProfile();
    if (profileResponse.success) {
      currentProfile = profileResponse.data.user;
      displayProfile(currentProfile);
    }
  } catch (error) {
    console.error("Load profile error:", error);
  }
}

async function loadUserSettings() {
  try {
    const settingsResponse = await userAPI.getSettings();
    if (settingsResponse.success) {
      currentSettings = normalizeSettings(settingsResponse.data.settings);
      displaySettings(currentSettings);
    }
  } catch (error) {
    console.error("Load user settings error:", error);
    // Giữ nguyên cached settings nếu load từ server fail
  }
}

function normalizeSettings(settings = {}) {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
  };
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
  const normalized = normalizeSettings(settings);
  currentSettings = normalized;
  cacheSettingsLocally(normalized);

  // Background Music
  const bgMusicCheckbox = document.getElementById("backgroundMusic");
  if (bgMusicCheckbox) {
    bgMusicCheckbox.checked = normalized.backgroundMusic;
  }

  // Sound Effects
  const soundEffectsCheckbox = document.getElementById("soundEffects");
  if (soundEffectsCheckbox) {
    soundEffectsCheckbox.checked = normalized.soundEffects;
  }

  // Timer
  const timerCheckbox = document.getElementById("timer");
  if (timerCheckbox) {
    timerCheckbox.checked = normalized.timer;
  }

  // Questions Per Exam
  const questionsInput = document.getElementById("questionsPerExam");
  if (questionsInput) {
    questionsInput.value = normalized.questionsPerExam;
  }

  // Exam Timer
  const examTimerInput = document.getElementById("examTimer");
  if (examTimerInput) {
    examTimerInput.value = normalized.examTimer;
  }

  // Current Avatar
  const currentAvatar = document.getElementById("current-avatar");
  if (currentAvatar) {
    updateCurrentAvatarPreview(currentAvatar, normalized.selectedAvatar);
  }

  // Apply audio settings ngay lập tức
  // Delay một chút để đảm bảo DOM đã sẵn sàng
  setTimeout(() => {
    applyImmediateSetting("backgroundMusic", normalized.backgroundMusic);
    applyImmediateSetting("soundEffects", normalized.soundEffects);
  }, 100);
}

function cacheSettingsLocally(settings) {
  try {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  } catch (error) {
    console.warn("Unable to cache settings", error);
  }
}

function updateCurrentAvatarPreview(imgEl, selectedAvatar) {
  if (selectedAvatar) {
    // Map avatar name to file name
    const avatarFileMap = {
      avt1: "avt1.png",
      avt2: "avt2.png",
      avt3: "avt3.avif",
      avt4: "avt4.png",
      avt5: "avt5.jpg",
      avt6: "avt6.png",
    };

    const avatarName = selectedAvatar.replace(/\.(png|jpg|jpeg|avif)$/i, "");
    const avatarFile = avatarFileMap[avatarName] || selectedAvatar;

    imgEl.src = `assets/avatars/${avatarFile}`;
    imgEl.onerror = function () {
      // Fallback nếu không tìm thấy file
      this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        avatarName
      )}&size=120&background=6366f1&color=fff`;
    };
    return;
  }

  // Default avatar (avt1)
  imgEl.src = "assets/avatars/avt1.png";
  imgEl.onerror = function () {
    this.src =
      "https://ui-avatars.com/api/?name=User&size=120&background=6366f1&color=fff";
  };
}

/**
 * Cập nhật setting
 */
async function updateSetting(settingName, value) {
  // Lưu giá trị cũ để có thể revert nếu cần
  const oldValue = currentSettings?.[settingName];

  try {
    const sanitizedValue = sanitizeSettingValue(settingName, value);

    // Cập nhật local state ngay lập tức để UI responsive
    if (currentSettings) {
      currentSettings[settingName] = sanitizedValue;
      cacheSettingsLocally(currentSettings);
    }

    const data = { [settingName]: sanitizedValue };
    const response = await userAPI.updateSettings(data);

    if (response.success) {
      const updatedSettings = normalizeSettings(response.data.settings);
      displaySettings(updatedSettings);
      showSuccess("Cài đặt đã được cập nhật");
    } else {
      // Nếu server không thành công, revert
      if (currentSettings) {
        currentSettings[settingName] = oldValue;
        cacheSettingsLocally(currentSettings);
      }
      revertSettingInput(settingName);
      showError("Không thể cập nhật cài đặt trên server");
    }
  } catch (error) {
    console.error("Update setting error:", error);
    showError(error.message || "Không thể cập nhật cài đặt");

    // Revert về giá trị cũ
    if (currentSettings) {
      currentSettings[settingName] = oldValue;
      cacheSettingsLocally(currentSettings);
    }
    revertSettingInput(settingName);
  }
}

function sanitizeSettingValue(settingName, value) {
  if (NUMBER_LIMITS[settingName]) {
    const { min, max } = NUMBER_LIMITS[settingName];
    let numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      numericValue = min;
    }

    numericValue = Math.min(Math.max(numericValue, min), max);

    return numericValue;
  }

  return value;
}

function revertSettingInput(settingName) {
  const previousValue = currentSettings?.[settingName];

  switch (settingName) {
    case "backgroundMusic":
    case "soundEffects":
    case "timer": {
      const checkbox = document.getElementById(settingName);
      if (checkbox) {
        checkbox.checked = !!previousValue;
      }
      break;
    }
    case "questionsPerExam": {
      const questionsInput = document.getElementById("questionsPerExam");
      if (questionsInput && previousValue !== undefined) {
        questionsInput.value = previousValue;
      }
      break;
    }
    case "examTimer": {
      const examTimerInput = document.getElementById("examTimer");
      if (examTimerInput && previousValue !== undefined) {
        examTimerInput.value = previousValue;
      }
      break;
    }
    default:
      break;
  }
}

function applyImmediateSetting(settingName, value) {
  switch (settingName) {
    case "backgroundMusic":
      toggleBackgroundMusic(value);
      break;
    case "soundEffects":
      toggleSoundEffects(value);
      break;
    default:
      break;
  }
}

function toggleBackgroundMusic(enabled) {
  if (!enabled) {
    // Tắt nhạc ngay lập tức
    if (audioController) {
      audioController.setBackgroundEnabled(false);
    }
    return;
  }

  initAudioController();

  // Thử phát nhạc
  audioController.setBackgroundEnabled(enabled).catch((error) => {
    console.warn("Unable to toggle background music", error);

    // Nếu lỗi do autoplay policy, chỉ cảnh báo nhưng không revert
    // Vì user có thể đã tương tác với trang rồi
    if (
      error.name === "NotAllowedError" ||
      error.name === "NotSupportedError"
    ) {
      showError(
        "Trình duyệt đang chặn nhạc nền. Hãy click vào trang để bật nhạc nền."
      );
      // Không revert checkbox, để user có thể thử lại
    } else {
      // Lỗi khác, revert
      const checkbox = document.getElementById("backgroundMusic");
      if (checkbox) {
        checkbox.checked = false;
      }
      if (currentSettings) {
        currentSettings.backgroundMusic = false;
        cacheSettingsLocally(currentSettings);
      }
      userAPI
        .updateSettings({ backgroundMusic: false })
        .catch((apiError) =>
          console.warn("Không thể revert background music setting", apiError)
        );
    }
  });
}

function toggleSoundEffects(enabled) {
  initAudioController();
  audioController.setEffectsEnabled(enabled);
}

class SettingsAudioController {
  constructor() {
    this.backgroundAudio = this.createAudio(AUDIO_SOURCES.background, {
      loop: true,
      volume: 0.35,
    });

    this.effects = {
      correct: this.createAudio(AUDIO_SOURCES.correct),
      wrong: this.createAudio(AUDIO_SOURCES.wrong),
    };

    this.backgroundEnabled = false;
    this.effectsEnabled = false;
    this.playAttempted = false;
  }

  createAudio(src, options = {}) {
    const audio = new Audio(src);
    audio.preload = "auto";
    if (options.loop) {
      audio.loop = true;
    }
    if (typeof options.volume === "number") {
      audio.volume = options.volume;
    }

    // Log lỗi chi tiết hơn
    audio.addEventListener("error", (e) => {
      console.warn(`Không thể tải file audio: ${src}`, e);
    });

    // Log khi audio sẵn sàng
    audio.addEventListener("canplaythrough", () => {
      console.log(`Audio ready: ${src}`);
    });

    return audio;
  }

  async setBackgroundEnabled(enabled) {
    this.backgroundEnabled = enabled;
    if (!enabled) {
      this.backgroundAudio.pause();
      this.backgroundAudio.currentTime = 0;
      return;
    }

    // Đảm bảo audio đã load
    if (this.backgroundAudio.readyState < 2) {
      try {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Audio load timeout"));
          }, 5000);

          this.backgroundAudio.addEventListener(
            "canplaythrough",
            () => {
              clearTimeout(timeout);
              resolve();
            },
            { once: true }
          );

          this.backgroundAudio.addEventListener(
            "error",
            (e) => {
              clearTimeout(timeout);
              reject(e);
            },
            { once: true }
          );

          this.backgroundAudio.load();
        });
      } catch (error) {
        console.warn("Audio load failed:", error);
        this.backgroundEnabled = false;
        throw error;
      }
    }

    try {
      await this.backgroundAudio.play();
      this.playAttempted = true;
      console.log("Background music started");
    } catch (error) {
      this.backgroundEnabled = false;
      console.warn("Play failed:", error);
      throw error;
    }
  }

  setEffectsEnabled(enabled) {
    this.effectsEnabled = enabled;
  }

  playEffect(effectName) {
    if (!this.effectsEnabled) {
      return;
    }
    const audio = this.effects[effectName];
    if (!audio) {
      console.warn(`Effect not found: ${effectName}`);
      return;
    }

    // Reset và phát
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn(`Không thể phát hiệu ứng âm thanh: ${effectName}`, error);
    });
  }
}

function initAudioController() {
  if (!audioController) {
    audioController = new SettingsAudioController();
  }
}

// Cho phép các trang khác trigger hiệu ứng âm thanh
window.playSoundEffect = function (effectName) {
  initAudioController();
  audioController.playEffect(effectName);
};

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
        cacheSettingsLocally(currentSettings);
      }

      // Cập nhật preview
      const currentAvatar = document.getElementById("current-avatar");
      if (currentAvatar) {
        updateCurrentAvatarPreview(currentAvatar, avatarName);
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

  // Cho phép user tương tác để unlock audio (browser autoplay policy)
  // Khi user click vào trang, thử phát nhạc nền nếu đã bật
  let userInteracted = false;
  const enableAudioOnInteraction = () => {
    if (!userInteracted) {
      userInteracted = true;
      // Nếu background music đã được bật nhưng chưa phát được
      if (currentSettings?.backgroundMusic && audioController) {
        if (
          !audioController.playAttempted ||
          !audioController.backgroundEnabled
        ) {
          toggleBackgroundMusic(true);
        }
      }
    }
  };

  // Lắng nghe các sự kiện user interaction
  document.addEventListener("click", enableAudioOnInteraction, { once: true });
  document.addEventListener("keydown", enableAudioOnInteraction, {
    once: true,
  });
  document.addEventListener("touchstart", enableAudioOnInteraction, {
    once: true,
  });
});
