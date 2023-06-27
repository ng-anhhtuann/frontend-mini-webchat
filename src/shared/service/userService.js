import API from "./api";

/**
 * Take note that all the ${id} params here 
 * stand for current user session
 */

const UserService = {
    updatePassword: (id, pwd) => {
        return API.put(`update-pwd/${id}/${pwd}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    updateNameDisplay: (id, name) => {
        return API.put(`update-name-display/${id}/${name}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    addFriend: (id, idAdd) => {
        return API.put(`add-friend/${id}/${idAdd}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
   
    acpFriend: (id, idPending) => {
        return API.put(`acp-friend/${id}/${idPending}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    userById: (id) => {
        return API.get(`user-by-id/${id}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
    
    roomListById: (id) => {
        return API.get(`get-room-list/${id}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    requestOutById: (id) => {
        return API.get(`get-out-req/${id}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    requestInById: (id) => {
        return API.get(`get-in-req/${id}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    friendListById: (id) => {
        return API.get(`get-friend-list/${id}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
}

export default UserService;
