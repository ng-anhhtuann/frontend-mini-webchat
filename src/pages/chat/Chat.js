import React, { useEffect } from 'react';
import '../../App.scss';
import Navbar from '../../shared/components/Chat/Navbar';
import Messenger from '../../shared/components/Chat/Messenger';
import FriendList from '../../shared/components/Chat/FriendList';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userIdSession = sessionStorage.getItem('user');
        const tokenSession = sessionStorage.getItem('token');
        if ( userIdSession === null || tokenSession === null) {
            navigate('/');
        }
    }, [navigate])

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
