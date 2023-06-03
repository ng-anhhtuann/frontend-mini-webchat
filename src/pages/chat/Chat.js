import React from 'react';
import '../../App.scss';
import Navbar from './components/Navbar';
import Messenger from './components/Messenger';
import FriendList from './components/FriendList';
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
