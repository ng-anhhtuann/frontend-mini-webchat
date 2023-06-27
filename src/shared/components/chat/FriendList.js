import { useState, Fragment } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Friend from './Friend';
import ChatService from '../../service/chatService';

const FriendList = () => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const id = sessionStorage.user;

    const searchFriends = (e) => {
        ChatService.searchFriends(id, e.target.value).then((res) =>
            setSuggestions(res.data),
        );
    };

    const friend = {
        name: "bảy chọ",
        avatar: "https://www.theportugalnews.com/uploads/news/1200/Cristiano_Ronaldo_2018__cropped_.jpg",
        lastMsg: "chào em anh là bảy chọ đến từ bồ đào nha"
    }

    return (
        <div id="friends" className="card-shadow">
            <div id="title">
                <h2 className="m-0">Contacts</h2>
                <Button onClick={() => setShowFriendsModal(true)} text="Add" />
            </div>
            <hr />
            <div id="friends-box">
                <Friend friend={friend}/>
                <p id="no-chat">No friends added</p>
            </div>
            {showFriendsModal && (
                <Modal click={() => setShowFriendsModal(false)}>
                    <Fragment key="header">
                        <h3 className="m-0">Create new chat</h3>
                    </Fragment>

                    <Fragment key="body">
                        <p>Find friends by typing their name below</p>
                        <input
                            type="text"
                            onInput={(e) => searchFriends(e)}
                            placeholder="Search..."
                        />
                        <div id="suggestions">
                            {suggestions.map((user) => {
                                return (
                                    <div key={user.id} className="suggestion">
                                        <p className="m-0">
                                            {user.nameDisplay}
                                        </p>
                                        <button className="btn-success">
                                            ADD
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </Fragment>
                </Modal>
            )}
        </div>
    );
};
export default FriendList;
