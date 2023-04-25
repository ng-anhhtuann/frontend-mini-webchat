import React from "react";
import "../styles/global.css"
import "../../App.css"
import Input from "./Input";
import Button from "./Button";
import Footer from "./Footer";
export default function SignInForm({ onSubmit }) {
    return (
      <header className="formParent">
        <div className="titleWrapper">
          <p className='title'>sign in</p>
          <p className='subTitle'>use your email vs password to sign in</p>
        </div>
        <form onSubmit={onSubmit} className="formContainer">
          <Input label="email address" id="email" name="email" type="email" placeholder="username@gmail.com" autoComplete="email" htmlFor="email"/>
          <Input label="password" id="password" name="password" type="password" htmlFor="password"/>
          <Button text="sign in"/>
          <Footer url={"/signup"} embeddedUrl={"sign up"} textLeft="don't have an account? " textRight=" for free"/>
        </form>
      </header>
    );
  }