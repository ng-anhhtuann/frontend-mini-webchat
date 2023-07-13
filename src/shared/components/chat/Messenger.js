import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
const Messenger = ({currentChat}) => {
    return (
        <div id="messenger" className="card-shadow">
            {currentChat !== undefined 
            ?  (<div id="messenger-wrap">
                    <ChatHeader nameDisplay={currentChat.nameDisplay}/>
                    <hr />
                    <MessageBox />
                    <MessageInput />
                </div>)
            :   (<div id="centered-none-div">
                    <h1>Welcome to the chat</h1>
                    <h1>Please add one more for starting a chat with them</h1>
                    <h1>Once they accept, refresh the page</h1>
                    <h1>Enjoy ~</h1>
                </div>)}
        </div>
    );
};
export default Messenger;
