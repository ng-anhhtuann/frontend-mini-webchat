import React from 'react';
import '../../App.scss';
import Navbar from '../../shared/components/Chat/Navbar';
import Messenger from '../../shared/components/Chat/Messenger';
import FriendList from '../../shared/components/Chat/FriendList';
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
