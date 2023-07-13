import React, { Fragment } from 'react';

const ChatHeader = ({ chat, nameDisplay }) => {
    return (
        <Fragment>
            <div id="chatter">
                <div className="chatter-info">
                    <h3>{nameDisplay}</h3>
                    <div className="chatter-status">
                        <span className={`online-status offline`}></span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ChatHeader;
