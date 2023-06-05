import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
const Messenger = () => {
    return (
        <div id="messenger" className="card-shadow">
            <div id="messenger-wrap">
                <ChatHeader />
                <hr />
                <MessageBox />
                <MessageInput />
            </div>
        </div>
    );
};
export default Messenger;
