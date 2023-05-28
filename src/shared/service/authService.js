import API from './api';

const AuthService = {
    login: (data) => {
        return API.post('login', data)
            .then(({ data }) => {
                // setHeadersAndStorage(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.message;
            });
    },

    register: (data) => {
        return API.post('signup', data)
            .then(({ data }) => {
                // setHeadersAndStorage(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.message;
            });
    },
};

const setHeadersAndStorage = ({ user, token }) => {
    // API.defaults.headers['Authorization'] = `Bearer ${token}`;
    // sessionStorage.setItem('user', JSON.stringify(user)); // Set user in session storage
    // sessionStorage.setItem('token', token); // Set token in session storage
};

export default AuthService;
