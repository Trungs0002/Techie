/**
 * Authentication Handler
 * Xử lý logic authentication cho các trang login/register
 */

// Import utility functions (nếu chạy trong môi trường có module)
// Nếu không, các functions sẽ được load từ utils.js trước

/**
 * Xử lý đăng ký
 */
async function handleRegister(event) {
  event.preventDefault();

  const form = event.target;
  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword?.value || "";
  const fullName = form.fullName?.value.trim() || "";

  const errorContainer = document.getElementById("error-message");
  const successContainer = document.getElementById("success-message");

  // Ẩn các thông báo cũ
  if (errorContainer) hideMessage(errorContainer);
  if (successContainer) hideMessage(successContainer);

  // Validation
  if (!username || !email || !password) {
    showError("Vui lòng điền đầy đủ thông tin", errorContainer);
    return;
  }

  if (typeof validateUsername === "function" && !validateUsername(username)) {
    showError(
      "Username phải có 3-30 ký tự và chỉ chứa chữ cái, số, dấu gạch dưới",
      errorContainer
    );
    return;
  }

  if (typeof validateEmail === "function" && !validateEmail(email)) {
    showError("Email không hợp lệ", errorContainer);
    return;
  }

  if (typeof validatePassword === "function" && !validatePassword(password)) {
    showError("Password phải có ít nhất 6 ký tự", errorContainer);
    return;
  }

  if (confirmPassword && password !== confirmPassword) {
    showError("Password và xác nhận password không khớp", errorContainer);
    return;
  }

  // Disable form
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng ký...";
  }

  try {
    const response = await authAPI.register({
      username,
      email,
      password,
      fullName,
    });

    if (response.success) {
      // Lưu token và user info
      if (typeof saveToken === "function") {
        saveToken(response.data.token);
      }
      if (typeof saveUser === "function") {
        saveUser(response.data.user);
      }

      showSuccess("Đăng ký thành công! Đang chuyển hướng...", successContainer);

      // Redirect sau 1 giây
      setTimeout(() => {
        if (typeof redirect === "function") {
          redirect("dashboard.html");
        } else {
          window.location.href = "dashboard.html";
        }
      }, 1000);
    }
  } catch (error) {
    console.error("Register error:", error);
    showError(
      error.message || "Đăng ký thất bại. Vui lòng thử lại.",
      errorContainer
    );

    // Re-enable form
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

/**
 * Xử lý đăng nhập
 */
async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const usernameOrEmail = form.usernameOrEmail.value.trim();
  const password = form.password.value;

  const errorContainer = document.getElementById("error-message");
  const successContainer = document.getElementById("success-message");

  // Ẩn các thông báo cũ
  if (errorContainer) hideMessage(errorContainer);
  if (successContainer) hideMessage(successContainer);

  // Validation
  if (!usernameOrEmail || !password) {
    showError("Vui lòng điền đầy đủ thông tin", errorContainer);
    return;
  }

  // Disable form
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang đăng nhập...";
  }

  try {
    // Xác định là username hay email
    const isEmail = usernameOrEmail.includes("@");
    const credentials = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    const response = await authAPI.login(credentials);

    if (response.success) {
      // Lưu token và user info
      if (typeof saveToken === "function") {
        saveToken(response.data.token);
      }
      if (typeof saveUser === "function") {
        saveUser(response.data.user);
      }

      showSuccess("Đăng nhập thành công! Đang chuyển hướng...", successContainer);

      // Redirect sau 1 giây
      setTimeout(() => {
        if (typeof redirect === "function") {
          redirect("dashboard.html");
        } else {
          window.location.href = "dashboard.html";
        }
      }, 1000);
    }
  } catch (error) {
    console.error("Login error:", error);
    showError(
      error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
      errorContainer
    );

    // Re-enable form
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

/**
 * Xử lý đăng xuất
 */
async function handleLogout() {
  try {
    await authAPI.logout();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Xóa token và user info dù có lỗi hay không
    if (typeof removeToken === "function") {
      removeToken();
    }
    if (typeof removeUser === "function") {
      removeUser();
    }

    // Redirect về trang login
    if (typeof redirect === "function") {
      redirect("login.html");
    } else {
      window.location.href = "login.html";
    }
  }
}

/**
 * Kiểm tra authentication và redirect nếu cần
 * @param {boolean} requireAuth - Có bắt buộc đăng nhập không
 * @param {string} redirectTo - Trang redirect nếu không đăng nhập
 */
function checkAuth(requireAuth = false, redirectTo = "login.html") {
  const isAuth = typeof isAuthenticated === "function" ? isAuthenticated() : !!localStorage.getItem("token");

  if (requireAuth && !isAuth) {
    if (typeof redirect === "function") {
      redirect(redirectTo);
    } else {
      window.location.href = redirectTo;
    }
    return false;
  }

  // Nếu đã đăng nhập và đang ở trang login/register, chỉ redirect nếu token hợp lệ
  // Nhưng để trang login tự xử lý việc validate token, không tự động redirect ở đây
  // Logic redirect sẽ được xử lý trong login.html và register.html

  return true;
}

// Auto check auth khi page load - chỉ cho các trang cần authentication
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Nếu đang ở trang login hoặc register, KHÔNG gọi checkAuth
    // để tránh tự động redirect. Các trang này sẽ tự xử lý logic của mình
    const currentPage = window.location.pathname;
    const isAuthPage = currentPage.includes("login.html") || currentPage.includes("register.html");
    
    if (!isAuthPage) {
      // Chỉ check auth cho các trang khác (dashboard, settings, etc.)
      checkAuth(true);
    }
    // Không làm gì nếu là trang login/register
  });
} else {
  const currentPage = window.location.pathname;
  const isAuthPage = currentPage.includes("login.html") || currentPage.includes("register.html");
  
  if (!isAuthPage) {
    // Chỉ check auth cho các trang khác (dashboard, settings, etc.)
    checkAuth(true);
  }
  // Không làm gì nếu là trang login/register
}

