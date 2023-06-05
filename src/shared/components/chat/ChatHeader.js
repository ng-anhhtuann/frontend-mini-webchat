import React, { Fragment, useState } from 'react';

const ChatHeader = ({ chat }) => {
    return (
        <Fragment>
            <div id="chatter">
                <div className="chatter-info">
                    <h3>Dang Cong Nhat</h3>
                    <div className="chatter-status">
                        <span className={`online-status offline`}></span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ChatHeader;
