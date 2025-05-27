import React, { useEffect, useState } from 'react';
import '../../App.scss';
import Navbar from '../../shared/components/Chat/Navbar';
import Messenger from '../../shared/components/Chat/Messenger';
import FriendList from '../../shared/components/Chat/FriendList';
import { useNavigate } from 'react-router-dom';
import UserService from '../../shared/service/userService';
import ChatService from '../../shared/service/chatService';
import socketService from '../../shared/service/socketService';

const Chat = () => {
    const [user, setUser] = useState({});
    const [friendList, setFriendList] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wsConnected, setWsConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenSession = sessionStorage.getItem('token');
        
        if (!tokenSession) {
            navigate('/');
            return;
        }

        UserService.getCurrentUserProfile()
            .then((res) => {
                if (res.status && res.data) {
                    const userProfile = res.data;
                    setUser(userProfile);
                    sessionStorage.setItem('user', userProfile.id);
                    sessionStorage.setItem('userProfile', JSON.stringify({
                        id: userProfile.id,
                        userName: userProfile.userName,
                        nameDisplay: userProfile.nameDisplay,
                        avatar: userProfile.avatar,
                        mail: userProfile.mail
                    }));

                    return ChatService.getMsgFriendList(userProfile.id);
                } else {
                    throw new Error('Failed to get user profile');
                }
            })
            .then((friendRes) => {
                if (friendRes) {
                    let friends = [];
                    if (friendRes.status && friendRes.data) {
                        friends = Array.isArray(friendRes.data) ? friendRes.data : [];
                    } else if (Array.isArray(friendRes.data)) {
                        friends = friendRes.data;
                    }
                    
                    setFriendList(friends);
                    
                    const chatIndex = parseInt(sessionStorage.getItem('chatIndex') || '0');
                    if (friends.length > 0 && chatIndex < friends.length) {
                        setCurrentChat(friends[chatIndex]);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading data:', err);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    sessionStorage.clear();
            navigate('/');
        } else {
                    setFriendList([]);
                    setLoading(false);
                }
            });

        const connectWebSocket = () => {
            console.log('[Chat] Attempting to connect WebSocket...');
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('[Chat] No token available for WebSocket connection');
                return;
            }
            
            socketService.connect(
                () => {
                    console.log('[Chat] WebSocket connected successfully');
                    setWsConnected(true);
                },
                (error) => {
                    console.error('[Chat] WebSocket connection failed:', error);
                    setWsConnected(false);
                }
            );
        };

        const wsTimeout = setTimeout(connectWebSocket, 500);
        
        const statusInterval = setInterval(() => {
            const isConnected = socketService.isConnected();
            setWsConnected(isConnected);
            if (!isConnected && !socketService.isConnecting()) {
                console.log('[Chat] WebSocket not connected, attempting reconnect...');
                connectWebSocket();
            }
        }, 5000);

        return () => {
            clearTimeout(wsTimeout);
            clearInterval(statusInterval);
            socketService.disconnect();
        };
    }, [navigate]);

    const handleChatSelect = (chat) => {
        setCurrentChat(chat);
        const index = friendList.findIndex((f) => f.id === chat.id);
        if (index !== -1) {
            sessionStorage.setItem('chatIndex', index.toString());
        }
    };

    if (loading) {
        return (
            <div id="chat-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div id="chat-container">
            <Navbar userData={user} />
            {!wsConnected && (
                <div style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    background: '#ff4444',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    zIndex: 1000,
                    cursor: 'pointer'
                }} onClick={() => {
                    socketService.retryConnection(
                        () => setWsConnected(true),
                        (err) => {
                            console.error('Retry failed:', err);
                            alert(`Connection failed: ${err.message || err}`);
                        }
                    );
                }}>
                    ⚠️ WebSocket Disconnected - Click to Retry
                </div>
            )}
            <div id="chat-wrap">
                <FriendList 
                    friendList={friendList} 
                    onChatSelect={handleChatSelect}
                    currentChatId={currentChat?.id}
                />
                <Messenger 
                    currentChat={currentChat} 
                    currentUserId={user?.id || sessionStorage.getItem('user')}
                    wsConnected={wsConnected}
                />
            </div>
        </div>
    );
};

export default Chat;
