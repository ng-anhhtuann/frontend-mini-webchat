import API from './api';

const ChatService = {
    searchFriends: (id, keyWord) => {
        return API.get(`/api/chat/search-by-key?currentUserId=${id}&keyword=${keyWord}`)
            .then(({ data }) => {
                return data;
            })
            .catch((err) => {
                console.error('Search friends error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Search failed';
            });
    },

     /**
     * @param {*} msg { content, currentSessionUserId, receiverObjectId }
     * @returns 
     */
     saveMessage: (msg) => {
        console.log('[ChatService] Saving message:', msg);
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('[ChatService] No token found in sessionStorage');
            return Promise.reject(new Error('No authentication token found'));
        }
        console.log('[ChatService] Token present, making request to /api/chat/save-msg');
        return API.post('/api/chat/save-msg', msg)
            .then(({ data }) => {
                console.log('[ChatService] Message saved successfully:', data);
                return data;
            })
            .catch((err) => {
                console.error('[ChatService] Save message error:', {
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data,
                    message: err.message
                });
                const errorMessage = err.response?.data?.data || err.response?.data?.message || 'Failed to save message';
                throw new Error(errorMessage);
            });
    },

    createRoom: (id, roomName) => {
        return API.post(`/api/chat/create-room/${id}/${roomName}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Create room error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to create room';
            });
    },
    
    updateRoomName: (id, roomId, name) => {
        return API.put(`/api/chat/update-room-name/${id}/${roomId}/${name}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Update room name error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to update room name';
            });
    },
    
    leaveRoom: (id, roomId) => {
        return API.put(`/api/chat/leave-room/${id}/${roomId}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Leave room error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to leave room';
            });
    },
    
    addToRoom: (id, roomId, idToAdd) => {
        return API.put(`/api/chat/add-to-room/${id}/${roomId}/${idToAdd}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Add to room error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to add user to room';
            });
    },

    getRoomById: (id, roomId) => {
        return API.get(`/api/chat/get-room/${id}/${roomId}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Get room error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get room';
            });
    },
    
    getAllMessageFromUser: (id, userId) => {
        return API.get(`/api/chat/get-all-msg-user/${id}/${userId}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Get messages from user error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get messages';
            });
    },
    
    getAllMessageFromRoom: (id, roomId) => {
        return API.get(`/api/chat/get-all-msg-room/${id}/${roomId}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Get messages from room error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get messages';
            });
    },

    deleteRoom: (id, roomId) => {
        return API.delete(`/api/chat/delete-room/${id}/${roomId}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Delete room error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to delete room';
            });
    },

    getMsgFriendList: (id) => {
        return API.get(`/api/chat/get-msg-friend-list/${id}`)
            .then(({ data }) => {
            return data;
        })
        .catch((err) => {
                console.error('Get friend list error:', err);
                throw err.response?.data?.data || err.response?.data?.message || 'Failed to get friend list';
            });
    }
};

export default ChatService;
