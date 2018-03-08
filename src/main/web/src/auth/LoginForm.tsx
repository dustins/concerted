import React from 'react';
import { Form, Text } from '../LoadableForm';
import { FormApi } from 'react-form';
import { connect } from 'react-redux';
import { authenticationFailure, login } from './actions';
import { Authentication } from './AuthenticationService';

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
                <p>You are already logged in.</p>
            );
        }

        const disabled = this.props.authentication.isRequesting;

        return (
            <Form onSubmit={this.onSubmit}>
                {(formApi: FormApi) => (
                    <form onSubmit={formApi.submitForm}>
                        {this.props.authentication.failure &&
                        <p className="alert alert-danger">{this.props.authentication.failure}</p>}

                        <div>
                            <label htmlFor="username">Username</label>
                            <Text field="username" id="username" disabled={disabled}/>
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Text field="password" id="password" disabled={disabled}/>
                        </div>

                        <div>
                            <button type="submit" disabled={disabled}>Submit</button>
                        </div>
                    </form>
                )}
            </Form>
        );
    }

    componentWillUnmount(): void {
        // clear failure message
        this.props.authenticationFailure(null);
    }
}

const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

const mapDispatchToProps = {
    login,
    authenticationFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);