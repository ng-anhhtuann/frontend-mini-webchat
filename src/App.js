import React from 'react';
import './App.css';
import './shared/styles/global.scss'
import Text from './shared/components/Text';
import Logo from './shared/components/Logo';
import Footer from "./shared/components/Footer";
function App() {
  return (
    <div className="App">
      <Logo isSpin={false}/>
      <Text isSub={false} text="chat-verse ✨"/>
      <Footer url="/signup" textRight={" to join with us 👋🏼"} embeddedUrl={"create account"}/>
      <Footer url="/signin" textRight={" to continue if you've already had an account 🔥"} embeddedUrl={"sign in"}/>
    </div>
  );
}

export default App;