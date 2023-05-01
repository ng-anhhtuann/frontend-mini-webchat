import React from 'react';
import logo from '../../logo.svg';
import '../../App.scss';
import '../styles/global.scss';
import { Link } from 'react-router-dom';
export default function Logo({ isSpin = true }) {
    return (
        <Link to="/">
            <div>
                <img
                    src={logo}
                    className={isSpin ? 'logo' : 'App-logo'}
                    alt="Logo"
                />
            </div>
        </Link>
    );
}
