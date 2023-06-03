import { useState, Fragment } from 'react';
import Modal from '../../../shared/components/Modal';
const FriendList = () => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);

    return (
        <div id="friends" className="card-shadow">
            <div id="title">
                <h3 className="m-0">Contacts</h3>
                <button onClick={() => setShowFriendsModal(true)}>ADD</button>
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
                            <h1>Friend 1</h1>
                        </div>
                    </Fragment>
                </Modal>
            )}
        </div>
    );
};
export default FriendList;
