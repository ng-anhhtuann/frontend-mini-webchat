import API from "./api";

const UserService = {
    getCurrentUserProfile: () => {
        return API.get('/api/users/profile')
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get profile';
            });
    },

    getAllUsers: (id) => {
        return API.get(`/api/users/all-users/${id}`)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get all users';
            });
    },

    updatePassword: (id, pwd) => {
        return API.put(`/api/users/update-pwd/${id}/${pwd}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to update password';
            });
    },

    updateNameDisplay: (id, name) => {
        return API.put(`/api/users/update-name-display/${id}/${name}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to update name';
            });
    },

    addFriend: (id, idAdd) => {
        return API.put(`/api/users/add-friend/${id}/${idAdd}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to add friend';
            });
    },
   
    acpFriend: (id, idPending) => {
        return API.put(`/api/users/acp-friend/${id}/${idPending}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to accept friend request';
            });
    },

    userById: (id) => {
        return API.get(`/api/users/user-by-id/${id}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get user';
            });
    },
    
    roomListById: (id) => {
        return API.get(`/api/users/get-room-list/${id}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get room list';
            });
    },

    requestOutById: (id) => {
        return API.get(`/api/users/get-out-req/${id}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get outgoing requests';
            });
    },

    requestInById: (id) => {
        return API.get(`/api/users/get-in-req/${id}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get incoming requests';
            });
    },

    friendListById: (id) => {
        return API.get(`/api/users/get-friend-list/${id}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get friend list';
            });
    },
};

export default UserService;
