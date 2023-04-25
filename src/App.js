import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // const [hasAccount, setHasAccount] = useState(false);

  // const handleYesClick = () => {
  //   setHasAccount(true);
  // }

  // const handleNoClick = () => {
  //   setHasAccount(false);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='Title'>Welcome to this shit</p>
        {/* <p className='subTitle'>Do you have an account?</p> */}
      </header>
    </div>
  );
}

export default App;