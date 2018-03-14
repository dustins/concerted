import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const RequireAuthentication = (props: any): any => {
    if (props.authenticated) {
        return props.children;
    }

    return <Redirect to="/" />;
};

const mapStateToProps = (state: any) => ({
    authenticated: state.authentication.principal != null
});
export default connect(mapStateToProps)(RequireAuthentication);