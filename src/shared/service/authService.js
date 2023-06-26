import API from './api';

const AuthService = {
    login: (e) => {
        return API.post('login', e)
            .then(({ data }) => {
                setHeadersAndStorage(data.data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.data;
            });
    },

    register: (e) => {
        return API.post('signup', e)
            .then(({ data }) => {
                setHeadersAndStorage(data.data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.data;
            });
    },
};

const setHeadersAndStorage = ({ id, token }) => {
    API.defaults.headers['Authorization'] = `Bearer ${token}`;
    sessionStorage.setItem('user', id); // Set user in session storage
    sessionStorage.setItem('token', token); // Set token in session storage
};

export default AuthService;
