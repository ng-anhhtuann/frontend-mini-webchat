import React, { useEffect, useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import UserService from '../../service/userService';

const Navbar = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [user, setUser] = useState({});

    // Function to simulate receiving a new notification
    const receiveNotification = () => {
        setNotificationCount(notificationCount + 1);
    };

    const id = sessionStorage.user;

    useEffect(() => {
        UserService.userById(id).then((res) => {
            setUser(res.data)
        });
    })
    

    return (
        <div id="navbar" className="card-shadow">
            <h2>Serious chat </h2>
            <div id="profile-menu">
                <div
                    className="notification-badge"
                    onClick={receiveNotification}
                >
                    <IoIosNotificationsOutline
                        className="icon"
                        size="40px"
                        color="white"
                    />
                    {notificationCount > 0 && (
                        <span className="badge">{notificationCount}</span>
                    )}
                </div>
                <img
                    width="40"
                    height="40"
                    src={user.avatar}
                    alt="Avatar"
                />
                <p>{user.nameDisplay}</p>
            </div>
        </div>
    );
};
export default Navbar;
