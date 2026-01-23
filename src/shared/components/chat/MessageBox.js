import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import ChatService from '../../service/chatService';
import socketService from '../../service/socketService';

const MessageBox = ({ currentChat, currentUserId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const subscriptionRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load messages when currentChat changes
    useEffect(() => {
        if (!currentChat || !currentUserId) {
            setMessages([]);
            return;
        }

        const loadMessages = async () => {
            setLoading(true);
            try {
                // Determine if it's a user chat or room chat
                const isRoomChat = currentChat.members && currentChat.members.length > 0;
                let response;

                if (isRoomChat) {
                    response = await ChatService.getAllMessageFromRoom(currentUserId, currentChat.id);
                } else {
                    response = await ChatService.getAllMessageFromUser(currentUserId, currentChat.id);
                }

                if (response.status && response.data) {
                    // Reverse to show oldest first (API returns DESC)
                    setMessages(Array.isArray(response.data) ? response.data.reverse() : []);
                }
            } catch (error) {
                console.error('Error loading messages:', error);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [currentChat, currentUserId]);

    // Subscribe to WebSocket messages
    useEffect(() => {
        if (!currentChat || !currentUserId || !socketService.isConnected()) {
            return;
        }

        // Unsubscribe from previous subscription
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }

        const isRoomChat = currentChat.members && currentChat.members.length > 0;
        const receiverId = currentChat.id;

        // Subscribe to new messages
        const handleNewMessage = (messageData) => {
            // Only add message if it's for this chat
            if (
                messageData.receiverObjectId === receiverId ||
                messageData.currentSessionUserId === receiverId
            ) {
                setMessages((prevMessages) => {
                    // Check if message already exists to avoid duplicates
                    const exists = prevMessages.some(
                        (msg) => msg.id === messageData.id || 
                        (msg.senderId === messageData.currentSessionUserId && 
                         msg.content === messageData.content &&
                         Math.abs(parseInt(msg.time) - Date.now()) < 5000)
                    );
                    if (exists) return prevMessages;
                    return [...prevMessages, messageData];
                });
            }
        };

        if (isRoomChat) {
            subscriptionRef.current = socketService.subscribeToChatRoom(receiverId, handleNewMessage);
        } else {
            subscriptionRef.current = socketService.subscribeToUser(receiverId, handleNewMessage);
        }

        // Cleanup subscription on unmount or chat change
        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
        };
    }, [currentChat, currentUserId]);

    if (loading) {
        return (
            <div id="msg-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading messages...</p>
            </div>
        );
    }

    return (
        <div id="msg-box">
            {messages.length > 0 ? (
                messages.map((message) => (
                    <Message
                        key={message.id || `${message.senderId}-${message.time}`}
                        message={message}
                        currentUserId={currentUserId}
                    />
                ))
            ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                    No messages yet. Start the conversation!
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageBox;
