import { useState, Fragment, useMemo } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Friend from './Friend';
import ChatService from '../../service/chatService';
import UserService from '../../service/userService';
import Toast from '../Toast';

const FriendList = ({friendList}) => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isNotify, setIsNotify] = useState(false);
    const [textNotify, setTextNotify] = useState('');
    const [typeNotify, setTypeNotify] = useState('');

    const id = sessionStorage.user;

    const searchFriends = (e) => {
        ChatService.searchFriends(id, e.target.value).then((res) =>
            setSuggestions(res.data),
        );
    };

    const sendFriendRequest = (idAdd) => {
        UserService.addFriend(id, idAdd).then((res) => {
            setIsNotify(true);
            setTextNotify("Add successfully");
            setTypeNotify("success")
        }).catch((err) => {
            setIsNotify(true);
            setTextNotify(err);
            setTypeNotify("error")
        })
    }

    if (isNotify) {
        setTimeout(() => {
            setIsNotify(false);
        }, 2000);
    }

    const toast = useMemo(() => {
        return (
            <Toast isNotify={isNotify} text={textNotify} type={typeNotify} />
        );
    }, [isNotify, textNotify, typeNotify]);

    return (
        <div id="friends" className="card-shadow">
            {toast}
            <div id="title">
                <h2 className="m-0">Contacts</h2>
                <Button onClick={() => setShowFriendsModal(true)} text="Add" />
            </div>
            <hr />
            <div id="friends-box">
                {friendList.length === 0 
                ? (<p id="no-chat">No friends added</p>)
                : friendList.map((item, index) => {
                return <Friend friend={item} className={"friend-list"} key={index}/> 
                })}
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
                                        <button className="btn-success" onClick={() => sendFriendRequest(user.id)}>
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
