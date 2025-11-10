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
    
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    console.log('API Request:', options.method || 'GET', url);
    if (options.body) {
      console.log('Request body:', JSON.parse(options.body));
    }
    
    try {
      const response = await fetch(url, config);
      console.log('API Response status:', response.status);
      const data = await response.json();
      console.log('API Response data:', data);
      
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
