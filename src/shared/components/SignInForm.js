import React from "react";
import "../styles/global.scss"
import {Footer, Button, Input, Text} from "./index"
import loginImage from "../../assets/images/login.svg";

export default function SignInForm({onSubmit}) {
    return (
        <header>
            <div className="titleWrapper">
                <div id="auth-card">
                    <div id="image-section">
                        <img src={loginImage} alt="Login"/>
                    </div>

                    <form onSubmit={onSubmit} className="formContainer">
                        <Text isSub={false} text={"sign in"}/>
                        <Text text={"use your email vs password to sign in"}/>
                        <Input label="email address" id="email" name="email" type="email"
                               placeholder="username@gmail.com" autoComplete="email" htmlFor="email"/>
                        <Input label="password" id="password" name="password" type="password" htmlFor="password"/>
                        <Button text="sign in" onClick={() => {
                            alert("sign in!")
                        }}/>
                        <Footer url={"/signup"} embeddedUrl={"sign up"} textLeft="don't have an account? "
                                textRight=" for free"/>
                    </form>
                </div>
            </div>
        </header>
    );
}