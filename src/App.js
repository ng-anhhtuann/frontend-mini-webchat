import React, { useEffect } from 'react';
import './App.scss';
import './shared/styles/global.scss';
import welcome from './assets/images/welcome.svg';
import Text from './shared/components/Text';
import Logo from './shared/components/Logo';
import Footer from './shared/components/Footer';
import { useNavigate } from 'react-router-dom';
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        const userIdSession = sessionStorage.getItem('user');
        if ( userIdSession !== null){
            navigate('chat');
        }
    }, [navigate])
    
    return (
        <div className="App">
            <p className="App-name">
                Siuuuu Chat<p>app</p>
            </p>
            <div id="logo-container">
                <Logo isSpin={false} />
            </div>
            <img className="image-welcome" src={welcome} alt="Welcome" />
            <Text isSub={false} text="CHAT-VERSE ✨" />
            <Footer
                url="/signup"
                textRight={' to join with us 👋🏼'}
                embeddedUrl={'create account'}
            />
            <Footer
                url="/signin"
                textRight={" to continue if you've already had an account 🔥"}
                embeddedUrl={'sign in'}
            />
        </div>
    );
}

export default App;
