import React from 'react';

const Modal = (props) => {
    const findByKey = (name) =>
        props.children.map((child) => {
            if (child.key === name) return child;
        });

    const closeModal = (e) => {
        e.stopPropagation();

        if (e.target.classList.contains('modal-close')) {
            return props.click();
        }
    };

    return (
        <div className="modal-mask modal-close" onClick={closeModal}>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-header">{findByKey('header')}</div>

                    <div className="modal-body">{findByKey('body')}</div>

                    <div className="modal-footer">
                        <button className="modal-close" onClick={closeModal}>
                            CLOSE
                        </button>
                        {findByKey('footer')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
