import React from "react";
import "../styles/global.css"
import "../../App.css"
import Input from "./Input";
import Button from "./Button";
import Footer from "./Footer";
export default function SignUpForm({ onSubmit }) {
    return (
      <header className="formParent">
        <div className="titleWrapper">
          <p className='title'>sign up</p>
          <p className='subTitle'>please provide all required details below</p>
        </div>
        <form onSubmit={onSubmit} className="formContainer">
          <Input label="email address" id="email" name="email" type="email" placeholder="username@gmail.com" autoComplete="email" htmlFor="email"/>
          <Input label="username" id="username" name="username" type="text" placeholder="Username_123" autoComplete="username" htmlFor="username"/>
          <Input label="password" id="password" name="password" type="password" htmlFor="password"/>
          <Input label="retype password" id="re-password" name="re-password" type="password" htmlFor="re-password"/>
          <Button text="sign up"/>
          <Footer url="/signin" embeddedUrl="sign in" textLeft="already had an account? " textRight=" now"/>
        </form>
      </header>
    );
  }