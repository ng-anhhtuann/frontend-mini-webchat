import React, { useEffect, useState } from 'react';
import '../../App.scss';
import Navbar from '../../shared/components/Chat/Navbar';
import Messenger from '../../shared/components/Chat/Messenger';
import FriendList from '../../shared/components/Chat/FriendList';
import { useNavigate } from 'react-router-dom';
import UserService from '../../shared/service/userService';

const Chat = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userIdSession = sessionStorage.user;
        const tokenSession = sessionStorage.token;
        if (userIdSession === null || tokenSession === null) {
            navigate('/');
        } else {
            UserService.userById(userIdSession).then((res) => {
                setUser(res.data)
            });
        }
    }, [navigate]);

    return (
        <div id="chat-container">
            <Navbar userData={user}/>
            <div id="chat-wrap">
                <FriendList />
                <Messenger />
            </div>
        </div>
    );
};

export default Chat;
