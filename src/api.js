const API_BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function to handle fetch requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // If unauthorized, clear token and redirect to login
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throw the error for the calling function to handle
    throw new Error(error.message || "An error occurred during the request");
  }
};

// Authentication API functions
export const register = (userData) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const login = (credentials) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getMe = () => apiRequest("/auth/me");

// Todo API functions (now require authentication)
export const getTodos = () => apiRequest("/todos");

export const createTodo = (todo) =>
  apiRequest("/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });

export const updateTodo = (id, todo) =>
  apiRequest(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });

export const deleteTodo = (id) =>
  apiRequest(`/todos/${id}`, {
    method: "DELETE",
  });

// Auth utility functions
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getToken();
};
