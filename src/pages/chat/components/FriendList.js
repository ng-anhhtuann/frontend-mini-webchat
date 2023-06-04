import { useState, Fragment } from 'react';
import Modal from '../../../shared/components/Modal';
import Button from '../../../shared/components/Button';
import Friend from './Friend';
const FriendList = () => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [suggestions, setSuggestions] = useState([
        'Cristano Ronaldo',
        'Cristiano Rosiudo',
        'CR7',
    ]);

    return (
        <div id="friends" className="card-shadow">
            <div id="title">
                <h2 className="m-0">Contacts</h2>
                <Button onClick={() => setShowFriendsModal(true)} text="Add" />
            </div>
            <hr />
            <div id="friends-box">
                <Friend />
                <p id="no-chat">No friends added</p>
            </div>
            {showFriendsModal && (
                <Modal click={() => setShowFriendsModal(false)}>
                    <Fragment key="header">
                        <h3 className="m-0">Create new chat</h3>
                    </Fragment>

                    <Fragment key="body">
                        <p>Find friends by typing their name below</p>
                        <input type="text" placeholder="Search..." />
                        <div id="suggestions">
                            {suggestions.map((user) => {
                                return (
                                    <div className="suggestion">
                                        <p className="m-0">{user}</p>
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
