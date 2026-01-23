import axios from 'axios';

// Define the base URL - use localhost for development, or environment variable for production
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create an instance of axios with the desired configuration
const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor to add token dynamically
API.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
API.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        // Handle 401/403 unauthorized - clear session and redirect to login
        if (err.response?.status === 401 || err.response?.status === 403) {
            console.error('API request failed with', err.response?.status, ':', err.response?.data);
            // Only redirect if it's a real auth error, not just a validation error
            if (err.response?.status === 401 || 
                (err.response?.status === 403 && err.response?.data?.data?.includes('session') || 
                 err.response?.data?.data?.includes('token'))) {
                console.error('Authentication failed, clearing session and redirecting to login');
                sessionStorage.clear();
                window.location.href = '/';
            }
        }
        throw err;
    },
);

export default API;
