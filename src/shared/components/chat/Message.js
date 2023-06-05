import React from 'react';

const Message = ({ user, chat, index, message }) => {
    return (
        <div>
            <div className={`message mb-10 creator`}>
                <div className={'owner'}>
                    <h6 className="m-0">Dang Nhat</h6>

                    <p className="m-0">Message</p>
                </div>
            </div>
            <div className={`message mb-10`}>
                <div className={'other-person'}>
                    <h6 className="m-0">Tuan Senior</h6>

                    <p className="m-0">Flexing Circle K</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
