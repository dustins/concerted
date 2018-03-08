import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from './actions';

const mapStateToProps = (state: any) => ({
    authentication: state.authentication
});

const mapDispatchToProps = {
    doLogout: logout
};

export const LogInOut = connect(mapStateToProps, mapDispatchToProps)(({authentication, doLogout}) => {
    if (authentication.principal) {
        return <NavLink to="/logout" onClick={doLogout} className="nav-link">Logout</NavLink>;
    } else {
        return <NavLink to="/login" className="nav-link">Log In</NavLink>;
    }
});