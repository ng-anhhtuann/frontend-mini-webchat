import React from 'react';
import Message from './Message';

const MessageBox = ({ chat }) => {
    return (
        <div id="msg-box">
            <Message />
        </div>
    );
};
export default MessageBox;
