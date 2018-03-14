import React from 'react';
import { Form, Text } from '../LoadableForm';
import { FormApi } from 'react-form';
import { connect } from 'react-redux';
import { authenticationFailure, login } from './actions';
import { Authentication } from './AuthenticationService';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

interface LoginFormProperties {
    authentication: Authentication;
    login: Function;
    authenticationFailure: Function;
}

class LoginForm extends React.Component<LoginFormProperties, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values: any, submissionEvent: React.SyntheticEvent<any>, formApi: FormApi): void {
        this.props.login(values);
    }

    render(): React.ReactNode {
        if (this.props.authentication.principal) {
            return (
                <Redirect to="/"/>
            );
        }

        const disabled = this.props.authentication.isRequesting;

        return (
            <Form onSubmit={this.onSubmit}>
                {(formApi: FormApi) => (
                    <form onSubmit={formApi.submitForm}>
                        {this.props.authentication.failure &&
                        <p className="alert alert-danger">{this.props.authentication.failure}</p>}

                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="username">Username</label>
                                <Text field="username" id="username" disabled={disabled} className="form-control"/>
                            </div>

                            <div className="form-group col">
                                <label htmlFor="password">Password</label>
                                <Text field="password" id="password" disabled={disabled} className="form-control"
                                      type="password"/>
                            </div>
                        </div>

                        <div className="d-flex flex-row-reverse">
                            <button type="submit" disabled={disabled} className="btn btn-primary m-1">Log In</button>
                            <Link to="/register" className="btn btn-outline-secondary m-1">Register</Link>
                        </div>
                    </form>
                )}
            </Form>
        );
    }

    componentWillUnmount(): void {
        if (!this.props.authentication.principal) {
            // clear failure message
            this.props.authenticationFailure(null);
        }
    }
}

const mapStateToProps = (state: any) => ({
    authentication: state.authentication
});

const mapDispatchToProps = {
    login,
    authenticationFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);