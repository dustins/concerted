import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogInOut } from './auth/LogInOut';

export default class Header extends React.Component {

    render(): React.ReactNode {
        return (
            <header>
                <nav className="container navbar navbar-expand-md sticky-top">
                    <NavLink to="/" className="navbar-brand brand">Concerted</NavLink>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link">About</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <LogInOut/>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}