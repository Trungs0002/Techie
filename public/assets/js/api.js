// API Service - Fetch wrapper
const API = {
  // Base request method
  async request(endpoint, options = {}) {
    const token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
    
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // GET request
  get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  },
  
  // POST request
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // PUT request
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  // DELETE request
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  },
  
  // PATCH request
  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
};
