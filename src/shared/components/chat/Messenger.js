import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';

const Messenger = ({ currentChat, currentUserId, wsConnected }) => {
    const displayName = currentChat?.nameDisplay || currentChat?.name || 'Unknown User';
    
    return (
        <div id="messenger" className="card-shadow">
            {currentChat ? (
                <div id="messenger-wrap">
                    <ChatHeader nameDisplay={displayName} />
                    <hr />
                    <MessageBox 
                        currentChat={currentChat} 
                        currentUserId={currentUserId} 
                        wsConnected={wsConnected}
                    />
                    <MessageInput 
                        currentChat={currentChat} 
                        currentUserId={currentUserId}
                        wsConnected={wsConnected}
                    />
                </div>
            ) : (
                <div id="centered-none-div">
                    <h1>Welcome to the chat</h1>
                    <h1>Please select a friend to start chatting</h1>
                    <h1>Or add a friend to begin a conversation</h1>
                    <h1>Enjoy ~</h1>
                </div>
            )}
        </div>
    );
};

export default Messenger;
