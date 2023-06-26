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
};

export default ChatService;
