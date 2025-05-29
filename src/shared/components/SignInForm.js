import React, { useMemo, useState } from 'react';
import '../styles/global.scss';
import { Footer, Button, Input, Text } from './index';
import loginImage from '../../assets/images/login.svg';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/authService';
import UserService from '../service/userService';
import Toast from './Toast';

export default function SignInForm({ onSubmit }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isNotify, setIsNotify] = useState(false);
    const [textNotify, setTextNotify] = useState('');
    const [typeNotify, setTypeNotify] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userName,
            password,
        };
        AuthService.login(data)
            .then((response) => {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not stored after login');
                }
                
                return UserService.getCurrentUserProfile()
                    .then((profileResponse) => {
                        if (profileResponse.status && profileResponse.data) {
                            const userProfile = profileResponse.data;
                            sessionStorage.setItem('userProfile', JSON.stringify({
                                id: userProfile.id,
                                userName: userProfile.userName,
                                nameDisplay: userProfile.nameDisplay,
                                avatar: userProfile.avatar,
                                mail: userProfile.mail
                            }));
                        }
                        setTypeNotify('success');
                        setTextNotify(`Login successfully!`);
                        setIsNotify(true);
                    });
            })
            .catch((err) => {
                setTypeNotify('error');
                setTextNotify(err);
                setIsNotify(true);
            });
    };

    if (isNotify) {
        setTimeout(() => {
            setIsNotify(false);
            if (typeNotify === 'success') {
                navigate('/chat');
            }
        }, 2000);
    }

    const userNameInput = useMemo(() => {
        return (
            <Input
                label="username"
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
                htmlFor="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
        );
    }, [userName]);

    const passwordInput = useMemo(() => {
        return (
            <Input
                label="password"
                id="password"
                name="password"
                type="password"
                htmlFor="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        );
    }, [password]);

    const toast = useMemo(() => {
        return (
            <Toast isNotify={isNotify} text={textNotify} type={typeNotify} />
        );
    }, [isNotify, textNotify, typeNotify]);

    return (
        <div id="auth-card">
            <div>
                <div id="image-section">
                    <img src={loginImage} alt="Login" />
                </div>
                {toast}
                <div id="form-section">
                    <form onSubmit={onSubmit} className="formContainer">
                        <Text isSub={false} text={'sign in'} />
                        <Text text={'use your username and password to sign in'} />
                        {userNameInput}
                        {passwordInput}
                        <Button text="sign in" onClick={handleSubmit} />
                        <Footer
                            url={'/signup'}
                            embeddedUrl={'sign up'}
                            textLeft="don't have an account? "
                            textRight=" for free"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
