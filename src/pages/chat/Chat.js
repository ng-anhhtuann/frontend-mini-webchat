import React from 'react';
import '../../App.scss';
import Navbar from '../../shared/components/chat/Navbar';
import Messenger from '../../shared/components/chat/Messenger';
import FriendList from '../../shared/components/chat/FriendList';
const Chat = () => {
    return (
        <div id="chat-container">
            <Navbar />
            <div id="chat-wrap">
                <FriendList />
                <Messenger />
            </div>
        </div>
    );
};

export default Chat;
