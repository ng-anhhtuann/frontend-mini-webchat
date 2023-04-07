import React from "react";
import "../styles/global.css"
export default function Form({ onSubmit }) {
    return (
      <form onSubmit={onSubmit} className="formContainer">
        <div className="fullWidth">
          <label htmlFor="email" className="formLabel" >email address</label>
          <div className="centerInput">
            <input id="email" name="email" type="email" placeholder="username@gmail.com" autoComplete="email" required className="formInput" />
          </div>
        </div>
        <div className="fullWidth">
          <label htmlFor="password" className="formLabel" >password</label>
          <div className="centerInput">
            <input id="password" name="password" type="password" required className="formInput" />
          </div>
        </div>
        <button className="formButton">
            <p>sign in</p>
        </button>
        <p className="formFooter">don&apos;t have an account?{" sign up "}for free.
        </p>
      </form>
    );
  }