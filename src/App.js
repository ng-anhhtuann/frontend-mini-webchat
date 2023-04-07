import React from 'react';
import logo from './logo.svg';
import './App.css';
import './shared/styles/global.css'
import Form from './shared/components/Form';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <header className="formParent">
        <div className="titleWrapper">
          <p className='title'>sign in</p>
          <p className='subTitle'>use your email vs password to sign in</p>
        </div>
        <Form onSubmit={()=>{}}/>
      </header>
    </div>
  );
}

export default App;