import React from "react";
import "../../shared/styles/global.css"
export default function Text({isSub = true, text}) {
    return (
        <p className={isSub ? "subTitle" : "title" }>{text}</p>
    )
}