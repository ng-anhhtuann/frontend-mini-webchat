import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatService from './chatService';

// WebSocket URLs
const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws-native';
const WS_URL = WS_BASE_URL.startsWith('http') ? WS_BASE_URL.replace(/^http/, 'ws') : WS_BASE_URL;
const SOCKJS_URL = process.env.REACT_APP_SOCKJS_URL || 'http://localhost:8080/ws';
const USE_SOCKJS = process.env.REACT_APP_USE_SOCKJS === 'true';

// Polyfill for SockJS in @stomp/stompjs
if (typeof window !== 'undefined') {
    window.SockJS = SockJS;
}

class SocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
        this.subscriptions = new Map();
        this.connecting = false; // Prevent multiple simultaneous connection attempts
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 3;
    }

    connect(onConnected, onError) {
        console.log('[SocketService] connect() called', {
            alreadyConnected: this.connected,
            alreadyConnecting: this.connecting,
            reconnectAttempts: this.reconnectAttempts
        });

        if (this.connected && this.stompClient && this.stompClient.connected) {
            console.log('[SocketService] Already connected, skipping');
            if (onConnected) onConnected();
            return;
        }

        // Prevent multiple simultaneous connection attempts
        if (this.connecting) {
            console.log('[SocketService] Connection already in progress...');
            return;
        }

        // Check if we've exceeded max reconnect attempts
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('[SocketService] Max reconnection attempts reached. Please refresh the page.');
            if (onError) onError(new Error('Max reconnection attempts reached'));
            return;
        }

        this.connecting = true;

        // Disconnect existing client if any
        if (this.stompClient) {
            try {
                console.log('[SocketService] Disconnecting existing client');
                this.disconnect();
            } catch (e) {
                console.warn('[SocketService] Error disconnecting:', e);
            }
        }

        try {
            // Get authorization header
            const token = sessionStorage.getItem('token');
            if (!token) {
                const error = new Error('No authentication token found');
                console.error('[SocketService] WebSocket connection error:', error);
                this.connecting = false;
                if (onError) onError(error);
                return;
            }

            const connectHeaders = { Authorization: `Bearer ${token}` };

            const useSockJS = USE_SOCKJS || typeof WebSocket === 'undefined';
            const connectionLabel = useSockJS ? SOCKJS_URL : WS_URL;

            console.log('[SocketService] Attempting to connect WebSocket:', {
                url: connectionLabel,
                useSockJS: useSockJS,
                hasWebSocket: typeof WebSocket !== 'undefined',
                tokenPresent: !!token
            });

            const clientConfig = {
                connectHeaders: connectHeaders,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => {
                    // Disable debug logging in production
                    if (process.env.NODE_ENV === 'development') {
                        console.log('STOMP:', str);
                    }
                },
                onConnect: (frame) => {
                    this.connected = true;
                    this.connecting = false;
                    this.reconnectAttempts = 0; // Reset on successful connection
                    console.log('[SocketService] WebSocket connected successfully!', frame);
                    if (onConnected) onConnected();
                },
                onStompError: (frame) => {
                    this.connected = false;
                    this.connecting = false;
                    this.reconnectAttempts++;
                    console.error('WebSocket STOMP error:', frame);
                    if (onError) onError(frame);
                },
                onWebSocketError: (error) => {
                    this.connected = false;
                    this.connecting = false;
                    this.reconnectAttempts++;
                    console.error('WebSocket connection error:', error);
                    // Don't auto-reconnect on error - let user retry manually or refresh page
                    if (onError) onError(error);
                },
                onDisconnect: () => {
                    this.connected = false;
                    console.log('WebSocket disconnected');
                },
            };

            if (useSockJS) {
                // For SockJS, use webSocketFactory
                clientConfig.webSocketFactory = () => {
                    try {
                        console.log('[SocketService] Creating SockJS connection to:', SOCKJS_URL);
                        const sock = new SockJS(SOCKJS_URL, null, {
                            transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
                        });

                        // Add comprehensive error handlers for SockJS
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
                // For native WebSocket, @stomp/stompjs v7 uses brokerURL directly
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
            // Unsubscribe from all subscriptions
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

    /**
     * Send message to a specific user (private message)
     * @param {string} receiverId - The receiver's user ID
     * @param {string} content - Message content
     * @param {string} currentUserId - Current user's ID
     */
    sendToUser(receiverId, content, currentUserId) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('[SocketService] WebSocket not connected');
            return Promise.reject(new Error('WebSocket not connected'));
        }

        // Verify token matches user ID
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

        const message = {
            content: content,
            currentSessionUserId: currentUserId,
            receiverObjectId: receiverId,
        };

        console.log('[SocketService] Sending message to user:', message);

        // First save the message via REST API
        return ChatService.saveMessage(message)
            .then(() => {
                // Then send via WebSocket
                const token = sessionStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                this.stompClient.publish({
                    destination: `/app/user/${receiverId}`,
                    body: JSON.stringify(message),
                    headers: headers,
                });
                return message;
            })
            .catch((error) => {
                console.error('Error sending message to user:', error);
                throw error;
            });
    }

    /**
     * Send message to a chat room (broadcast)
     * @param {string} roomId - The chat room ID
     * @param {string} content - Message content
     * @param {string} currentUserId - Current user's ID
     */
    sendToChatRoom(roomId, content, currentUserId) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('WebSocket not connected');
            return Promise.reject(new Error('WebSocket not connected'));
        }

        const message = {
            content: content,
            currentSessionUserId: currentUserId,
            receiverObjectId: roomId,
        };

        // First save the message via REST API
        return ChatService.saveMessage(message)
            .then(() => {
                // Then send via WebSocket
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

    /**
     * Subscribe to user-specific messages for the current session
     * @param {string} userId - User ID (kept for compatibility, not used in destination)
     * @param {function} callback - Callback function to handle incoming messages
     * @returns {object} Subscription object
     */
    subscribeToUser(userId, callback) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('WebSocket not connected');
            return null;
        }

        const subscriptionId = `user-${userId}`;
        
        // Unsubscribe if already subscribed
        if (this.subscriptions.has(subscriptionId)) {
            this.subscriptions.get(subscriptionId).unsubscribe();
        }

        // Subscribe to user-specific messages for this session
        // Backend sends to /user/{userId}/queue/messages, client subscribes to /user/queue/messages
        const subscription = this.stompClient.subscribe(
            `/user/queue/messages`,
            (message) => {
                try {
                    const data = JSON.parse(message.body);
                    if (callback) callback(data);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            }
        );

        this.subscriptions.set(subscriptionId, subscription);
        return subscription;
    }

    /**
     * Subscribe to messages from a chat room
     * @param {string} roomId - Chat room ID to subscribe to
     * @param {function} callback - Callback function to handle incoming messages
     * @returns {object} Subscription object
     */
    subscribeToChatRoom(roomId, callback) {
        if (!this.connected || !this.stompClient || !this.stompClient.connected) {
            console.error('WebSocket not connected');
            return null;
        }

        const subscriptionId = `room-${roomId}`;
        
        // Unsubscribe if already subscribed
        if (this.subscriptions.has(subscriptionId)) {
            this.subscriptions.get(subscriptionId).unsubscribe();
        }

        const subscription = this.stompClient.subscribe(
            `/chatroom/${roomId}`,
            (message) => {
                try {
                    const data = JSON.parse(message.body);
                    if (callback) callback(data);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            }
        );

        this.subscriptions.set(subscriptionId, subscription);
        return subscription;
    }

    /**
     * Unsubscribe from a specific subscription
     * @param {string} subscriptionId - Subscription ID (e.g., 'user-123' or 'room-456')
     */
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

    // Manual retry method
    retryConnection(onConnected, onError) {
        this.reconnectAttempts = 0; // Reset attempts for manual retry
        this.connecting = false; // Reset connecting state
        this.connect(onConnected, onError);
    }
}

// Export a singleton instance
const socketService = new SocketService();
export default socketService;
