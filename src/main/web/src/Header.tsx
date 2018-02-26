import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

interface AuthenticatedProps {
    authenticated: boolean;
    login(): void;
    logout(): void;
}

const mapStateToProps = (state: AuthenticatedProps) => {
    return {
        authenticated: state.authenticated
    };
};

const AUTHENTICATION_CHANGE = 'AUTHENTICATION_CHANGE';

const mapDispatchToProps = (dispatch: any) => ({
    login: () => dispatch({type: AUTHENTICATION_CHANGE, authenticated: true}),
    logout: () => dispatch({type: AUTHENTICATION_CHANGE, authenticated: false})
});

const Authenticated = connect(mapStateToProps, mapDispatchToProps)(({ authenticated, login, logout }) => {
    const action = authenticated ? logout : login;
    const href = authenticated ? '/logout' : '/login';
    const text = authenticated ? 'Logout' : 'Log In';
    
    return <NavLink to={href} className="nav-link" onClick={() => action()}>{text}</NavLink>;
});

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
                            <Authenticated/>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}