/**
 * API Client
 * Xử lý tất cả các request đến backend API
 */

// Base URL của API
const API_URL = (() => {
  // Có thể override bằng biến môi trường hoặc config
  if (typeof getApiUrl === "function") {
    return getApiUrl();
  }
  return "http://localhost:3000/api";
})();

/**
 * Helper function để gọi API
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>}
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Thêm Authorization header nếu có token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Kiểm tra nếu response không phải JSON
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error(
        `Server trả về lỗi: ${response.status} ${response.statusText}`
      );
    }

    // Nếu response không thành công, throw error
    if (!response.ok) {
      throw new Error(
        data.message || `Lỗi ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    // Xử lý lỗi network
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      const detailedError =
        "Không thể kết nối đến server. " +
        "Vui lòng kiểm tra:\n" +
        "1. Server có đang chạy trên http://localhost:3000?\n" +
        "2. Kiểm tra console để xem lỗi chi tiết";
      console.error("Network error:", error);
      throw new Error(detailedError);
    }
    console.error("API error:", error);
    throw error;
  }
}

/**
 * Authentication API
 */
const authAPI = {
  /**
   * Đăng ký user mới
   * @param {object} userData - { username, email, password, fullName }
   * @returns {Promise<object>}
   */
  register: async (userData) => {
    return await apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
   * Đăng nhập
   * @param {object} credentials - { username hoặc email, password }
   * @returns {Promise<object>}
   */
  login: async (credentials) => {
    return await apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Đăng xuất
   * @returns {Promise<object>}
   */
  logout: async () => {
    return await apiCall("/auth/logout", {
      method: "POST",
    });
  },

  /**
   * Lấy thông tin user hiện tại
   * @returns {Promise<object>}
   */
  getMe: async () => {
    return await apiCall("/auth/me", {
      method: "GET",
    });
  },
};

/**
 * Exam API
 */
const examAPI = {
  saveResult: async (resultData) => {
    return await apiCall("/exams", {
      method: "POST",
      body: JSON.stringify(resultData),
    });
  },
  getHistory: async () => {
    return await apiCall("/exams/history", {
      method: "GET",
    });
  },
};

/**
 * Health check API
 */
const healthAPI = {
  /**
   * Kiểm tra server có đang chạy không
   * @returns {Promise<object>}
   */
  check: async () => {
    return await apiCall("/health", {
      method: "GET",
    });
  },
};

// Export để sử dụng ở các file khác
if (typeof window !== "undefined") {
  window.authAPI = authAPI;
  window.examAPI = examAPI;
  window.healthAPI = healthAPI;
  window.apiCall = apiCall;
}

// User API sẽ được định nghĩa trong settings.js và các file khác
