import React, { useState } from 'react';
import '../styles/global.scss';
import { Footer, Button, Input, Text } from './index';
import loginImage from '../../assets/images/login.svg';
import AuthService from '../service/authService';
export default function SignInForm({ onSubmit }) {
    const [userName, setUserName] = useState('chienbinh15650');
    const [password, setPassword] = useState('aaa');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userName,
            password,
        };
        AuthService.login(data)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div id="auth-card">
            <div>
                <div id="image-section">
                    <img src={loginImage} alt="Login" />
                </div>

                <div id="form-section">
                    <form onSubmit={onSubmit} className="formContainer">
                        <Text isSub={false} text={'sign in'} />
                        <Text text={'use your email vs password to sign in'} />
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
                        <Input
                            label="password"
                            id="password"
                            name="password"
                            type="password"
                            htmlFor="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
