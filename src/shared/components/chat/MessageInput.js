import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import socketService from '../../service/socketService';

const MessageInput = ({ currentChat, currentUserId }) => {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        
        if (!message.trim() || !currentChat || !currentUserId) {
            return;
        }

        if (!socketService.isConnected()) {
            alert('WebSocket not connected. Please refresh the page.');
            return;
        }

        setSending(true);
        const messageContent = message.trim();
        setMessage('');

        try {
            if (!currentUserId) {
                console.error('[MessageInput] No currentUserId provided');
                alert('User ID not found. Please refresh the page.');
                return;
            }

            console.log('[MessageInput] Sending message:', {
                content: messageContent,
                currentUserId: currentUserId,
                receiverId: currentChat.id,
                hasToken: !!sessionStorage.getItem('token')
            });

            const isRoomChat = currentChat.members && currentChat.members.length > 0;
            const receiverId = isRoomChat ? currentChat.id : currentChat.id;

            if (isRoomChat) {
                await socketService.sendToChatRoom(receiverId, messageContent, currentUserId);
            } else {
                await socketService.sendToUser(receiverId, messageContent, currentUserId);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
            setMessage(messageContent);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <div id="input-container">
            <form onSubmit={handleSend} id="message-input">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type="text"
                    placeholder="Message..."
                    disabled={sending || !currentChat}
                />
                <button type="submit" disabled={sending || !message.trim() || !currentChat}>
                <BiSend />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
