import React from 'react';
import "../../App.css"
import Logo from '../../shared/components/Logo'
import SignInForm from '../../shared/components/SignInForm';

export default function SignIn() {
    return (
        <div id="auth-container">
            <div className="logo-container">
                <Logo />
            </div>
            <SignInForm onSubmit={()=>{}}/>
        </div>
    )
}

