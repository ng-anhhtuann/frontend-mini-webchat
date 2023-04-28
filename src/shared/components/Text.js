import React from "react";
import "../styles/global.scss"
export default function Text({isSub = true, text}) {
    return (
        <p className={isSub ? "subTitle" : "title" }>{text}</p>
    )
}