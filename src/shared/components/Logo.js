import React from "react";
import logo from "../../logo.svg"
import "../../App.css"
import "../styles/global.scss"
export default function Logo({isSpin = true}){
    return (
        <div>
            <img src={logo} className={isSpin ? "logo" : "App-logo"} alt="logo" />
        </div>
    )
}