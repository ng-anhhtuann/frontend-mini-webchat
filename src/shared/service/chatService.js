import API from './api';

const ChatService = {
    searchFriends: (id, keyWord) => {
        return API.get(`search-by-key?currentUserId=${id}&keyword=${keyWord}`)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.data;
            });
    },

     /**
     * @param {*} msg (content, currentSessionUserId, receiverObjectId) 
     * @returns 
     */
     saveMessage: (msg) => {
        return API.post('save-msg', msg)
            .then(({data}) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err.response.data.data;
            })
    },

    createRoom: (id, roomName) => {
        return API.post(`create-room/${id}/${roomName}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
    
    updateRoomName: (id, roomId, name) => {
        return API.put(`update-room-name/${id}/${roomId}/${name}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
    
    leaveRoom: (id, roomId) => {
        return API.put(`leave-room/${id}/${roomId}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
    
    addToRoom: (id, roomId, idToAdd) => {
        return API.put(`add-to-room/${id}/${roomId}/${idToAdd}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    getRoomById: (id, roomId) => {
        return API.get(`get-room/${id}/${roomId}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
    
    getAllMessageFromUser: (id, userId) => {
        return API.get(`get-all-msg-user/${id}/${userId}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },
    
    getAllMessageFromRoom: (id, roomId) => {
        return API.get(`get-all-msg-room/${id}/${roomId}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    deleteRoom: (id, roomId) => {
        return API.delete(`delete-room/${id}/${roomId}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    },

    getMsgFriendList: (id) => {
        return API.get(`get-msg-friend-list/${id}`)
        .then(({data}) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err.response.data.data;
        })
    }

};

export default ChatService;
