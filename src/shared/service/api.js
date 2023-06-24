import axios from 'axios';

// Get the token from session storage
const token = sessionStorage.getItem('data');

// Define the base URLs in the order of priority
const baseUrls = [
    'https://miniwebchatapp.fly.dev',
    'https://mini-webchat-app-server.azurewebsites.net',
];

// Find the first available base URL
// const availableBaseUrl = baseUrls.find((url) => url);

// Create an instance of axios with the desired configuration
const API = axios.create({
    baseURL: 'https://mini-webchat-app-server.azurewebsites.net',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token || ''}`, // Include the token in the Authorization header if available
    },
});

// Add a response interceptor
API.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        throw err;
    },
);

export default API;
