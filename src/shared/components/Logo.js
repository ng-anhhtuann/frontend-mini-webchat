import React from "react";
import logo from "../../logo.svg"
import "../../App.css"
import "../../shared/styles/global.css"
export default function Logo({isSpin = true}){
    return (
        <img src={logo} className={isSpin ? "logo" : "App-logo"} alt="logo" />
    )
}