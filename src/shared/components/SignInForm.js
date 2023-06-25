import React, { useMemo, useState } from 'react';
import '../styles/global.scss';
import { Footer, Button, Input, Text } from './index';
import loginImage from '../../assets/images/login.svg';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/authService';
import Toast from './Toast';

export default function SignInForm({ onSubmit }) {
    const [userName, setUserName] = useState('chienbinh15650');
    const [password, setPassword] = useState('aaa');
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
            .then((data) => {
                setTypeNotify('success'); //Set type for Toast
                setTextNotify(`Login successfully!`); //Set text for Toast
                return setIsNotify(true); //Set turning on Toast
            })
            .catch((err) => {
                setTypeNotify('error');
                setTextNotify(err);
                return setIsNotify(true);
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

    /**
     * Components render preventing
     */

    const userNameInput = useMemo(() => {
        return (
            <Input
                label="email address"
                id="email"
                name="email"
                type="email"
                placeholder="username@gmail.com"
                autoComplete="email"
                htmlFor="email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
        )
    }, [userName])

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
          <Toast
            isNotify={isNotify}
            text={textNotify}
            type={typeNotify}
          />
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
                        <Text text={'use your email vs password to sign in'} />
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
