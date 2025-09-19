// API configuration
const getApiUrl = () => {
  // Check if we're in production (deployed)
  if (import.meta.env.PROD) {
    // Use production backend URL
    return import.meta.env.VITE_API_URL || 'https://todos-1-cj0v.onrender.com';
  }
  
  // Development mode - use localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const API_BASE_URL = getApiUrl();
export const TODOS_ENDPOINT = `${API_BASE_URL}/todos`;

// API utility functions
export const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};