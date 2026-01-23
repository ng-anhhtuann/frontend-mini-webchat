import API from './api';

const AuthService = {
    login: (credentials) => {
        return API.post('/api/auth/login', credentials)
            .then(({ data }) => {
                // Handle response structure: { status: true, data: { token: "...", id: "..." } }
                if (data.status && data.data) {
                    setHeadersAndStorage(data.data);
                }
                return data;
            })
            .catch((err) => {
                console.error('Login error:', err);
                const errorMessage = err.response?.data?.data || err.response?.data?.message || 'Login failed';
                throw errorMessage;
            });
    },

    register: (userData) => {
        return API.post('/api/auth/signup', userData)
            .then(({ data }) => {
                // Handle response structure: { status: true, data: { token: "...", id: "..." } }
                if (data.status && data.data) {
                    setHeadersAndStorage(data.data);
                }
                return data;
            })
            .catch((err) => {
                console.error('Registration error:', err);
                const errorMessage = err.response?.data?.data || err.response?.data?.message || 'Registration failed';
                throw errorMessage;
            });
    },
};

const setHeadersAndStorage = ({ id, token }) => {
    // Token is automatically added via interceptor, but we store it
    sessionStorage.setItem('user', id); // Set user ID in session storage
    sessionStorage.setItem('token', token); // Set token in session storage
    sessionStorage.setItem('chatIndex', '0'); // Set current chat index
    // Update API default headers
    API.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export default AuthService;
