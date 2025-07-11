import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import ChatService from '../../service/chatService';
import socketService from '../../service/socketService';

const MessageBox = ({ currentChat, currentUserId, wsConnected }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const userSubscriptionRef = useRef(null);
    const roomSubscriptionRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!currentChat || !currentUserId) {
            setMessages([]);
            return;
        }

        const loadMessages = async () => {
            setLoading(true);
            try {
                const isRoomChat = currentChat.members && currentChat.members.length > 0;
                let response;

                if (isRoomChat) {
                    response = await ChatService.getAllMessageFromRoom(currentUserId, currentChat.id);
                } else {
                    response = await ChatService.getAllMessageFromUser(currentUserId, currentChat.id);
                }

                if (response.status && response.data) {
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

    useEffect(() => {
        if (!currentUserId || !wsConnected) {
            console.log('[MessageBox] Cannot subscribe to user: no userId or WebSocket not connected', { currentUserId, wsConnected });
            return;
        }

        if (userSubscriptionRef.current) {
            userSubscriptionRef.current.unsubscribe();
            userSubscriptionRef.current = null;
        }

        const chatPartnerId = currentChat?.id;

        const handleNewMessage = (messageData) => {
            console.log('[MessageBox] ✅ Received WebSocket message:', messageData);
            
            const isForThisChat = chatPartnerId && (
                messageData.receiverObjectId === chatPartnerId ||
                messageData.currentSessionUserId === chatPartnerId
            );

            if (isForThisChat) {
                setMessages((prevMessages) => {
                    const exists = prevMessages.some((msg) => {
                        if (msg.id && messageData.id) {
                            return msg.id === messageData.id;
                        }
                        if (msg.tempId && messageData.tempId && msg.tempId === messageData.tempId) {
                            return true;
                        }
                        const msgTime = msg.timestamp || msg.time || 0;
                        const newMsgTime = messageData.timestamp || Date.now();
                        const timeDiff = Math.abs(newMsgTime - msgTime);
                        
                        return (
                            msg.content === messageData.content &&
                            msg.currentSessionUserId === messageData.currentSessionUserId &&
                            msg.receiverObjectId === messageData.receiverObjectId &&
                            timeDiff < 2000
                        );
                    });
                    
                    if (exists) {
                        console.log('[MessageBox] Duplicate message, skipping');
                        return prevMessages;
                    }
                    
                    const messageWithTimestamp = {
                        ...messageData,
                        timestamp: messageData.timestamp || Date.now(),
                        tempId: messageData.tempId || `ws-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    };
                    
                    console.log('[MessageBox] ✅ Adding new message to UI');
                    return [...prevMessages, messageWithTimestamp];
                });
            } else {
                console.log('[MessageBox] Message not for this chat, ignoring', { chatPartnerId, messageData });
            }
        };

        console.log('[MessageBox] ✅ Subscribing to private messages for user:', currentUserId);
        userSubscriptionRef.current = socketService.subscribeToUser(currentUserId, handleNewMessage);

        return () => {
            if (userSubscriptionRef.current) {
                userSubscriptionRef.current.unsubscribe();
                userSubscriptionRef.current = null;
            }
        };
    }, [currentUserId, currentChat?.id, wsConnected]);

    useEffect(() => {
        if (!currentChat?.id || !wsConnected) {
            return;
        }

        const isRoomChat = currentChat.members && currentChat.members.length > 0;
        if (!isRoomChat) {
            return;
        }

        if (roomSubscriptionRef.current) {
            roomSubscriptionRef.current.unsubscribe();
            roomSubscriptionRef.current = null;
        }

        const handleRoomMessage = (messageData) => {
            console.log('[MessageBox] ✅ Received room message:', messageData);
            setMessages((prevMessages) => {
                const exists = prevMessages.some((msg) => {
                    if (msg.id && messageData.id) {
                        return msg.id === messageData.id;
                    }
                    const msgTime = msg.timestamp || msg.time || 0;
                    const newMsgTime = messageData.timestamp || Date.now();
                    const timeDiff = Math.abs(newMsgTime - msgTime);
                    
                    return (
                        msg.content === messageData.content &&
                        msg.currentSessionUserId === messageData.currentSessionUserId &&
                        timeDiff < 2000
                    );
                });
                
                if (exists) {
                    console.log('[MessageBox] Duplicate room message, skipping');
                    return prevMessages;
                }
                
                const messageWithTimestamp = {
                    ...messageData,
                    timestamp: messageData.timestamp || Date.now(),
                    tempId: messageData.tempId || `ws-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                };
                
                return [...prevMessages, messageWithTimestamp];
            });
        };

        console.log('[MessageBox] ✅ Subscribing to room:', currentChat.id);
        roomSubscriptionRef.current = socketService.subscribeToChatRoom(currentChat.id, handleRoomMessage);

        return () => {
            if (roomSubscriptionRef.current) {
                roomSubscriptionRef.current.unsubscribe();
                roomSubscriptionRef.current = null;
            }
        };
    }, [currentChat?.id, currentChat?.members, wsConnected]);

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
                messages.map((message, index) => (
                    <Message
                        key={message.id || message.tempId || `msg-${index}-${message.timestamp}`}
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
