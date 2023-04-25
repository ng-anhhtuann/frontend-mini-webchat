import React from "react";
import "../styles/global.css"
import { Footer, Button, Input, Text } from "./index"
export default function SignInForm({ onSubmit }) {
    return (
      <header className="formParent">
        <div className="titleWrapper">
          <Text isSub={false} text={"sign in"}/>
          <Text text={"use your email vs password to sign in"}/>
        </div>
        <form onSubmit={onSubmit} className="formContainer">
          <Input label="email address" id="email" name="email" type="email" placeholder="username@gmail.com" autoComplete="email" htmlFor="email"/>
          <Input label="password" id="password" name="password" type="password" htmlFor="password"/>
          <Button text="sign in" onClick={() => {alert("sign in!")}}/>
          <Footer url={"/signup"} embeddedUrl={"sign up"} textLeft="don't have an account? " textRight=" for free"/>
        </form>
      </header>
    );
  }