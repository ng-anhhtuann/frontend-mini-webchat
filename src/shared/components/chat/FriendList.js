import { useState, Fragment, useMemo } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Friend from './Friend';
import ChatService from '../../service/chatService';
import UserService from '../../service/userService';
import Toast from '../Toast';

const FriendList = ({ friendList, onChatSelect, currentChatId }) => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [isNotify, setIsNotify] = useState(false);
    const [textNotify, setTextNotify] = useState('');
    const [typeNotify, setTypeNotify] = useState('');

    const id = sessionStorage.getItem('user');

    const loadAllUsers = () => {
        if (!id) return;
        UserService.getAllUsers(id)
            .then((res) => {
                if (res.status && res.data) {
                    setAllUsers(Array.isArray(res.data) ? res.data : []);
                    setSuggestions(Array.isArray(res.data) ? res.data : []);
                }
            })
            .catch((err) => {
                console.error('Error loading all users:', err);
            });
    };

    const searchFriends = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        if (!keyword) {
            setSuggestions(allUsers);
            return;
        }
        
        if (keyword.length < 2) {
            setSuggestions([]);
            return;
        }
        
        const filtered = allUsers.filter(user => 
            user.nameDisplay?.toLowerCase().includes(keyword) ||
            user.userName?.toLowerCase().includes(keyword)
        );
        
        if (filtered.length > 0) {
            setSuggestions(filtered);
        } else {
            ChatService.searchFriends(id, keyword)
                .then((res) => {
                    if (res.status && res.data) {
                        setSuggestions(Array.isArray(res.data) ? res.data : []);
                    } else if (Array.isArray(res.data)) {
                        setSuggestions(res.data);
                    } else {
                        setSuggestions([]);
                    }
                })
                .catch((err) => {
                    console.error('Error searching friends:', err);
                    setSuggestions([]);
                });
        }
    };

    const sendFriendRequest = (idAdd) => {
        UserService.addFriend(id, idAdd).then((res) => {
            setIsNotify(true);
            setTextNotify("Friend request was sent successfully");
            setTypeNotify("success");
            setSuggestions(prev => prev.map(u => 
                u.id === idAdd ? { ...u, status: 3 } : u
            ));
            setAllUsers(prev => prev.map(u => 
                u.id === idAdd ? { ...u, status: 3 } : u
            ));
        }).catch((err) => {
            setIsNotify(true);
            setTextNotify(err);
            setTypeNotify("error");
        });
    }

    const acpFriendRequest = (idAcp) => {
        UserService.acpFriend(id, idAcp).then((res) => {
            setIsNotify(true);
            setTextNotify("You can now text each other");
            setTypeNotify("success");
            setSuggestions(prev => prev.map(u => 
                u.id === idAcp ? { ...u, status: 1 } : u
            ));
            setAllUsers(prev => prev.map(u => 
                u.id === idAcp ? { ...u, status: 1 } : u
            ));
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch((err) => {
            setIsNotify(true);
            setTextNotify(err);
            setTypeNotify("error");
        });
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
                <Button onClick={() => {
                    setShowFriendsModal(true);
                    loadAllUsers();
                }} text="Add" />
            </div>
            <hr />
            <div id="friends-box">
                {friendList.length === 0 
                ? (<p id="no-chat">No friends added</p>)
                : friendList.map((item, index) => {
                return (
                    <Friend 
                        friend={item} 
                        className={`friend-list ${currentChatId === item.id ? 'active' : ''}`}
                        key={item.id || index} 
                        click={() => {
                            if (onChatSelect) {
                                onChatSelect(item);
                            } else {
                    sessionStorage.setItem('chatIndex', index);
                            }
                        }}
                    />
                );
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
                            autoFocus
                        />
                        <div id="suggestions">
                            {suggestions.length === 0 ? (
                                <p>No users found. Start typing to search...</p>
                            ) : (
                                suggestions.map((user) => {
                                return (
                                    <div key={user.id} className="suggestion">
                                        <p className="m-0">
                                            {user.nameDisplay}
                                        </p>
                                        {user.status === 0 
                                        ? (<button className="btn-success" onClick={() => {
                                            sendFriendRequest(user.id);
                                            user.status = 2;
                                        }}>
                                            ADD
                                        </button>) 
                                        : user.status === 1 
                                        ? ( <button className="btn-friend">
                                            FRIEND
                                        </button>)
                                        : user.status === 2 
                                        ? ( <button className="btn-wait">
                                            SENT
                                        </button>)
                                        : ( <button className="btn-acp" onClick={() => {
                                            acpFriendRequest(user.id);
                                            user.status = 1;
                                        }}>
                                            ACP
                                        </button>)}
                                    </div>
                                );
                            }))}
                        </div>
                    </Fragment>
                </Modal>
            )}
        </div>
    );
};
export default FriendList;
