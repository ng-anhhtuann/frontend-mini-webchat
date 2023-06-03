import API from './api';

const AuthService = {
    login: (data) => {
        return API.post('login', data)
            .then(({ data }) => {
                setHeadersAndStorage(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.data;
            });
    },

    register: (data) => {
        return API.post('signup', data)
            .then(({ data }) => {
                setHeadersAndStorage(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.data;
            });
    },
};

const setHeadersAndStorage = ({ user, data }) => {
    API.defaults.headers['Authorization'] = `Bearer ${data}`;
    sessionStorage.setItem('user', JSON.stringify(user)); // Set user in session storage
    sessionStorage.setItem('token', data); // Set token in session storage
};

export default AuthService;
