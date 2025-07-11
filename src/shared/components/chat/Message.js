import React from 'react';

const Message = ({ message, currentUserId }) => {
    if (!message) return null;

    const isOwnMessage = message.senderId === currentUserId || message.currentSessionUserId === currentUserId;
    
    const messageTime = (message.time || message.timestamp)
        ? new Date(parseInt(message.time || message.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className={`message mb-10 ${isOwnMessage ? 'creator' : ''}`}>
            <div className={isOwnMessage ? 'owner' : 'other-person'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h6 className="m-0" style={{ fontSize: '14px', fontWeight: '600' }}>
                        {isOwnMessage ? 'You' : 'Friend'}
                    </h6>
                    {messageTime && (
                        <span style={{ fontSize: '11px', color: '#999', marginLeft: '8px' }}>
                            {messageTime}
                        </span>
                    )}
                </div>
                <p className="m-0" style={{ wordBreak: 'break-word' }}>
                    {message.content}
                </p>
            </div>
        </div>
    );
};

export default Message;
