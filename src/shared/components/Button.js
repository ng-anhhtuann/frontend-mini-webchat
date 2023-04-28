import React from "react";
import "../styles/global.scss"

export default function Button({text, onClick}) {
    return (
        <button className="formButton" onClick={onClick}>
            <p>{text}</p>
        </button>
    )
}