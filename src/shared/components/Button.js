import React from 'react';
import '../styles/global.scss';

export default function Button({ text, onClick }) {
    return (
        <button className="formButton mt-1" onClick={onClick}>
            <p>{text}</p>
        </button>
    );
}
