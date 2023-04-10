import React from 'react';
import "../../App.css"
import Logo from '../../shared/components/Logo'
import SignInForm from '../../shared/components/SignInForm';

export default function SignIn() {
    return (
        <div className="App">
            <Logo />
            <SignInForm onSubmit={()=>{}}/>
        </div>
    )
}

