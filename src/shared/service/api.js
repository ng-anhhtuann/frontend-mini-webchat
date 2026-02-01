import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

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

API.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            console.error('API request failed with', err.response?.status, ':', err.response?.data);
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
