import API from './api';

const AuthService = {
    login: (credentials) => {
        return API.post('/api/auth/login', credentials)
            .then(({ data }) => {
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
    sessionStorage.setItem('user', id);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('chatIndex', '0');
    API.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export default AuthService;
