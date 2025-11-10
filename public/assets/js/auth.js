// Authentication Service
const Auth = {
  // Login
  async login(email, password, rememberMe = false) {
    try {
      const response = await API.post('/auth/login', { email, password });
      const data = response.data || response; // Handle both {data: {...}} and direct response
      
      // Store token and user data
      localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(data.user));
      
      if (rememberMe) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.REMEMBER_ME, 'true');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  // Register
  async register(userData) {
    try {
      const response = await API.post('/auth/register', userData);
      const data = response.data || response; // Handle both {data: {...}} and direct response
      
      // Auto login after registration
      localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout
  logout() {
    const rememberMe = localStorage.getItem(CONFIG.STORAGE_KEYS.REMEMBER_ME);
    
    localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    
    if (!rememberMe) {
      localStorage.clear();
    }
    
    window.location.href = CONFIG.ROUTES.LOGIN;
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    return !!token;
  },
  
  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Get token
  getToken() {
    return localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
  },
  
  // Require authentication (redirect if not logged in)
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = CONFIG.ROUTES.LOGIN;
      return false;
    }
    return true;
  },
  
  // Verify token validity
  async verifyToken() {
    try {
      await API.get('/auth/verify');
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
};
