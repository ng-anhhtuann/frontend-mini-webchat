import axios from 'axios';

// Get the token from session storage
const token = sessionStorage.getItem('token');

// Create an instance of axios with the desired configuration
const API = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: {
        Accept: 'application/json',
        // Authorization: `Bearer ${token || ''}`, // Include the token in the Authorization header if available
    },
});

// Add a response interceptor
API.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        // Check if the response status is not 401 (Unauthorized)
        if (err.response.status !== 401) {
            throw err;
        }
        // Handle TokenExpiredError
        if (typeof err.response.data.error.name !== 'undefined') {
            if (err.response.data.error.name === 'TokenExpiredError') {
                sessionStorage.removeItem('token'); // Remove token from session storage
                throw err;
            }
        }
    },
);

export default API;
