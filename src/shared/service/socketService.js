import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatService from './chatService';

const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws-native';
const WS_URL = WS_BASE_URL.startsWith('http') ? WS_BASE_URL.replace(/^http/, 'ws') : WS_BASE_URL;
const SOCKJS_URL = process.env.REACT_APP_SOCKJS_URL || 'http://localhost:8080/ws';
const USE_SOCKJS = process.env.REACT_APP_USE_SOCKJS === 'true';

if (typeof window !== 'undefined') {
    window.SockJS = SockJS;
}

class SocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.subscriptions = new Map();
        this.connecting = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 3;
    }

    connect(onConnected, onError) {
        if (this.connected && this.stompClient && this.stompClient.connected) {
            if (onConnected) onConnected();
            return;
        }

        if (this.connecting) {
            return;
        }

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            if (onError) onError(new Error('Max reconnection attempts reached'));
            return;
        }

        this.connecting = true;

        if (this.stompClient) {
            try {
                this.disconnect();
            } catch (e) {
            }
        }

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                const error = new Error('No authentication token found');
                this.connecting = false;
                if (onError) onError(error);
                return;
            }

            const connectHeaders = { Authorization: `Bearer ${token}` };

            const useSockJS = USE_SOCKJS || typeof WebSocket === 'undefined';
            const connectionLabel = useSockJS ? SOCKJS_URL : WS_URL;

            const clientConfig = {
                connectHeaders: connectHeaders,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log(str);
                    }
                },
                onConnect: (frame) => {
                    this.connected = true;
                    this.connecting = false;
                    this.reconnectAttempts = 0;
                    if (onConnected) onConnected();
                },
                onStompError: (frame) => {
                    this.connected = false;
                    this.connecting = false;
                    this.reconnectAttempts++;
                    if (onError) onError(frame);
                },
                onWebSocketError: (error) => {
                    this.connected = false;
                    this.connecting = false;
                    this.reconnectAttempts++;
                    if (onError) onError(error);
                },
                onDisconnect: () => {
                    this.connected = false;
                },
            };

            if (useSockJS) {
                clientConfig.webSocketFactory = () => {
                    try {
                        const sock = new SockJS(SOCKJS_URL, null, {
                            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
                        });

                        sock.onopen = () => {
                            console.log('[SocketService] SockJS connection opened');
                        };

                        sock.onmessage = (e) => {
                            console.log('[SocketService] SockJS message received:', e);
                        };

                        sock.onclose = (e) => {
                            console.log('[SocketService] SockJS connection closed:', e.code, e.reason);
                            this.connected = false;
                        };

                        sock.onerror = (error) => {
                            console.error('[SocketService] SockJS error:', error);
                            this.connected = false;
                        };

                        return sock;
                    } catch (err) {
                        console.error('[SocketService] Failed to create SockJS instance:', err);
                        throw err;
                    }
                };
            } else {
                console.log('[SocketService] Using native WebSocket with brokerURL:', WS_URL);
                clientConfig.brokerURL = WS_URL;
            }

            this.stompClient = new Client(clientConfig);
            
            console.log('[SocketService] STOMP client created, activating...');
            this.stompClient.activate();
            console.log('[SocketService] STOMP client activation called');
        } catch (error) {
            console.error('[SocketService] Failed to create WebSocket connection:', error);
            this.connected = false;
            this.connecting = false;
            this.reconnectAttempts++;
            if (onError) onError(error);
        }
    }

    disconnect() {
        if (this.stompClient) {
            this.subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
            this.subscriptions.clear();

            if (this.stompClient.connected) {
                this.stompClient.deactivate();
            }
            this.connected = false;
            this.stompClient = null;
        }
    }

    sendToUser(receiverId, content, currentUserId) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('[SocketService] WebSocket not connected');
            return Promise.reject(new Error('WebSocket not connected'));
        }

        const token = sessionStorage.getItem('token');
        const storedUserId = sessionStorage.getItem('user');
        
        if (!token) {
            console.error('[SocketService] No token found');
            return Promise.reject(new Error('No authentication token found'));
        }
        
        if (!currentUserId) {
            console.error('[SocketService] No currentUserId provided');
            return Promise.reject(new Error('User ID not found'));
        }
        
        if (currentUserId !== storedUserId) {
            console.warn('[SocketService] User ID mismatch:', {
                currentUserId: currentUserId,
                storedUserId: storedUserId
            });
        }

        const timestamp = Date.now();
        const tempId = `msg-${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
        
        const message = {
            content: content,
            currentSessionUserId: currentUserId,
            receiverObjectId: receiverId,
            timestamp: timestamp,
            tempId: tempId,
        };

        console.log('[SocketService] Sending message to user:', message);

        return ChatService.saveMessage(message)
            .then(() => {
                const token = sessionStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                this.stompClient.publish({
                    destination: `/app/private/${receiverId}`,
                    body: JSON.stringify(message),
                    headers: headers,
                });
                return message;
            })
            .catch((error) => {
                console.error('[SocketService] Error sending message to user:', error);
                throw error;
            });
    }

    sendToChatRoom(roomId, content, currentUserId) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('WebSocket not connected');
            return Promise.reject(new Error('WebSocket not connected'));
        }

        const timestamp = Date.now();
        const tempId = `msg-${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
        
        const message = {
            content: content,
            currentSessionUserId: currentUserId,
            receiverObjectId: roomId,
            timestamp: timestamp,
            tempId: tempId,
        };

        return ChatService.saveMessage(message)
            .then(() => {
                const token = sessionStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                this.stompClient.publish({
                    destination: `/app/chatRoom/${roomId}`,
                    body: JSON.stringify(message),
                    headers: headers,
                });
                return message;
            })
      .catch((error) => {
                console.error('Error sending message to chat room:', error);
                throw error;
      });
    }

    subscribeToUser(userId, callback) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('[SocketService] WebSocket not connected, cannot subscribe');
            return null;
        }

        if (!userId) {
            console.error('[SocketService] No userId provided for subscription');
            return null;
        }

        const subscriptionId = `private-${userId}`;
        
        if (this.subscriptions.has(subscriptionId)) {
            console.log('[SocketService] Unsubscribing from existing subscription:', subscriptionId);
            this.subscriptions.get(subscriptionId).unsubscribe();
        }

        const destination = `/topic/private/${userId}`;
        console.log('[SocketService] Subscribing to private messages:', destination);
        
        const subscription = this.stompClient.subscribe(
            destination,
            (message) => {
                try {
                    console.log('[SocketService] ✅ Received private message:', message.body);
                    const data = JSON.parse(message.body);
                    if (callback) callback(data);
                } catch (error) {
                    console.error('[SocketService] Error parsing message:', error);
                }
            }
        );

        this.subscriptions.set(subscriptionId, subscription);
        console.log('[SocketService] ✅ Successfully subscribed to', destination);
        return subscription;
    }

    subscribeToChatRoom(roomId, callback) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('[SocketService] WebSocket not connected, cannot subscribe to room');
            return null;
        }

        const subscriptionId = `room-${roomId}`;
        
        if (this.subscriptions.has(subscriptionId)) {
            this.subscriptions.get(subscriptionId).unsubscribe();
        }

        const destination = `/chatroom/${roomId}`;
        console.log('[SocketService] Subscribing to room:', destination);

        const subscription = this.stompClient.subscribe(
            destination,
            (message) => {
                try {
                    console.log('[SocketService] ✅ Received room message:', message.body);
                    const data = JSON.parse(message.body);
                    if (callback) callback(data);
                } catch (error) {
                    console.error('[SocketService] Error parsing room message:', error);
                }
            }
        );

        this.subscriptions.set(subscriptionId, subscription);
        console.log('[SocketService] ✅ Successfully subscribed to room', destination);
        return subscription;
    }

    unsubscribe(subscriptionId) {
        if (this.subscriptions.has(subscriptionId)) {
            this.subscriptions.get(subscriptionId).unsubscribe();
            this.subscriptions.delete(subscriptionId);
        }
    }

    isConnected() {
        return this.connected && this.stompClient && this.stompClient.connected;
    }

    isConnecting() {
        return this.connecting;
    }

    retryConnection(onConnected, onError) {
        this.reconnectAttempts = 0;
        this.connecting = false;
        this.connect(onConnected, onError);
    }
}

const socketService = new SocketService();
export default socketService;
