import React from 'react';
import '../../App.scss';
import Logo from '../../shared/components/Logo';
import SignUpForm from '../../shared/components/SignUpForm';

export default function SignUp() {
    return (
        <div className="AppPadding">
            <Logo />
            <SignUpForm onSubmit={() => {}} />
        </div>
    );
}
