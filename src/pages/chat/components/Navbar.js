import React, { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
const Navbar = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    // Function to simulate receiving a new notification
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
                    src="https://us-tuna-sounds-images.voicemod.net/11c6dbb2-c80d-4ed2-a967-7de8e7ef3e0f-1674929671717.jpg"
                    alt="Avatar"
                />
                <p>User</p>
            </div>
        </div>
    );
};
export default Navbar;
