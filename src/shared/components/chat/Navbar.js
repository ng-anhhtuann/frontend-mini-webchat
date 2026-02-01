import React, { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';

const Navbar = ({userData}) => {
    const [notificationCount, setNotificationCount] = useState(0);

    const receiveNotification = () => {
        setNotificationCount(notificationCount + 1);
    };

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
                    src={userData.avatar}
                    alt="Avatar"
                />
                <p>{userData.nameDisplay}</p>
            </div>
        </div>
    );
};
export default Navbar;
