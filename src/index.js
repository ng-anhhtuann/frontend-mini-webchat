import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from 'react-router-dom';
import './index.scss';
import App from './App';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import reportWebVitals from './reportWebVitals';
import Chat from './pages/chat/Chat';
import ProtectedRoute from './shared/components/Router/ProtectedRoute';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" element={<App />} />
                <Route element={<ProtectedRoute />}>
                    <Route exact path="/chat" element={<Chat />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Switch>
        </Router>
    </React.StrictMode>,
);
reportWebVitals();
