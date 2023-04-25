import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" element={<App/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Switch>
    </Router>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
