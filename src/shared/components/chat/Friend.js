import React from 'react';

const Friend = ({ chat, click }) => {
    return (
        <div onClick={click} className={`friend-list`}>
            <div>
                <img
                    width="40"
                    height="40"
                    src="https://us-tuna-sounds-images.voicemod.net/11c6dbb2-c80d-4ed2-a967-7de8e7ef3e0f-1674929671717.jpg"
                    alt="User avatar"
                />
                <div className="friend-info">
                    <h4 className="m-0">Dang Cong Nhat</h4>
                    <h5 className="m-0">last message</h5>
                </div>
            </div>

            <div className="friend-status">
                <span className={`online-status online`}></span>
            </div>
        </div>
    );
};
export default Friend;
