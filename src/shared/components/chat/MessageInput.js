import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
const MessageInput = ({ chat }) => {
    const [message, setMessage] = useState('');

    return (
        <div id="input-container">
            <div id="message-input">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Message..."
                />
                <BiSend />
            </div>
        </div>
    );
};
export default MessageInput;
