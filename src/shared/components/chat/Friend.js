import React from 'react';

const Friend = ({ chat, className, click , friend}) => {
    return (
        <div onClick={click} className={className}>
            <div>
                <img
                    width="40"
                    height="40"
                    src={friend.avatar}
                    alt="Friend avatar"
                />
                <div className="friend-info">
                    <h4 className="m-0">{friend.nameDisplay}</h4>
                    <h5 className="m-0">{friend.lastMsg ? friend.lastMsg : "Click here to start a chat"}</h5>
                </div>
            </div>

            {/* <div className="friend-status">
                <span className={`online-status online`}></span>
            </div> */}
        </div>
    );
};
export default Friend;
