import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface FooterProps {
    authenticated: boolean;
}

const mapStateToProps = (state: FooterProps) => {
    return {
        authenticated: state.authenticated
    };
};

const Footer = connect(mapStateToProps)(({ authenticated}) => {
    return (
        <footer>
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="footer-wrapper col-6">
                    <div className="row">
                        <nav className="navbar col-6">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </li>
                            </ul>
                        </nav>
                        
                        <div className="col-6">
                        isAuthenticated: {authenticated ? 'yes' : 'no'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </footer>
    );
});

export default Footer;