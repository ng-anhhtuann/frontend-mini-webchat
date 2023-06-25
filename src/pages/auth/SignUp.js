import React, {useEffect} from 'react';
import '../../App.scss';
import Logo from '../../shared/components/Logo';
import SignUpForm from '../../shared/components/SignUpForm';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const navigate = useNavigate();
    useEffect(() => {
        const userIdSession = sessionStorage.getItem('user');
        const tokenSession = sessionStorage.getItem('token');
        if ( userIdSession !== null && tokenSession !== null ) {
            navigate('chat');
        }
    }, [navigate])

    return (
        <div id="auth-container">
            <div className="logo-container">
                <Logo />
            </div>
            <SignUpForm onSubmit={() => {}} />
        </div>
    );
}
