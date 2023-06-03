import React, { useState } from 'react';
import '../styles/global.scss';
import signUpImage from '../../assets/images/sign_up.svg';
import { Input, Text, Button, Footer } from './index';
import AuthService from '../service/authService';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

export default function SignUpForm({ onSubmit }) {
    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [nameDisplay, setNameDisplay] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [isNotify, setIsNotify] = useState(false);
    const [textNotify, setTextNotify] = useState('');
    const [typeNotify, setTypeNotify] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            mail,
            userName,
            nameDisplay,
            password,
        };

        if (password !== retypePassword) {
            console.log('Wrong password !!!');
            return;
        }

        AuthService.register(data)
            .then((data) => {
                setTypeNotify('success');
                setTextNotify(data.message);
                return setIsNotify(true);
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

    return (
        <div id="auth-card">
            <div>
                <div id="image-section">
                    <img className="mt-3" src={signUpImage} alt="SignUp" />
                </div>
                <Toast
                    isNotify={isNotify}
                    text={textNotify}
                    type={typeNotify}
                />
                <div id="form-section">
                    <form onSubmit={onSubmit} className="formContainer">
                        <Text isSub={false} text={'sign up'} />
                        <Text
                            text={'please provide all required details below'}
                        />
                        <Input
                            label="email"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="username@gmail.com"
                            autoComplete="email"
                            htmlFor="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <Input
                            label="username"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            htmlFor="username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Input
                            label="name display"
                            id="name-display"
                            name="name-display"
                            type="text"
                            placeholder="Username_123"
                            autoComplete="name-display"
                            htmlFor="name-display"
                            value={nameDisplay}
                            onChange={(e) => setNameDisplay(e.target.value)}
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
                        <Input
                            label="retype password"
                            id="re-password"
                            name="re-password"
                            type="password"
                            htmlFor="re-password"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                        <Button text="sign up" onClick={handleSubmit} />
                        <Footer
                            url="/signin"
                            embeddedUrl="sign in"
                            textLeft="already had an account? "
                            textRight=" now"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
