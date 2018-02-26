import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {

    render(): React.ReactNode {
        return (
            <header>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/page1">Page 1</NavLink>
                </nav>
            </header>
        );
    }
}