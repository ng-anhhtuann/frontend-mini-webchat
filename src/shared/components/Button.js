import React from "react";
import "../styles/global.css"

export default function Button({text}) {
    return (
        <button className="formButton">
            <p>{text}</p>
        </button>
    )
}