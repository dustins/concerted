import React from 'react';
import { connect } from 'react-redux';
import { Authentication } from './AuthenticationService';
import { Redirect } from 'react-router';
import { Form, Text } from '../LoadableForm';
import { FormApi } from 'react-form';
import { Email, SameAs, Size } from '../validation/validators';
import { combineValidators } from '../validation/validation';
import _ from 'underscore';

interface RegisterFormProps {
    authentication: Authentication;
}

class RegisterForm extends React.Component<RegisterFormProps, any> {
    formApi: FormApi;

    constructor(props: any, context: any) {
        super(props, context);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values: any, submissionEvent: React.SyntheticEvent<any>, formApi: FormApi): void {
        console.log(values);
    }

    validate(values: any): any {
        const errors = _.omit(combineValidators({
            username: Size(3, 20),
            email: Email,
            password: Size(8),
            password_confirm: SameAs('password', 'Password'),
        })(values), (value: any, key: string) => {
            return !this.formApi.touched.hasOwnProperty(key) || this.formApi.touched[key] === false;
        });

        console.log(errors);
        return errors;
    }

    touched(values: any): void {
        console.log(values);
    }

    render(): React.ReactNode {
        if (this.props.authentication.principal) {
            return (
                <Redirect to="/"/>
            );
        }

        const disabled = false;
        return (
            <Form onSubmit={this.onSubmit} validate={this.validate}>
                {(formApi: FormApi) => {
                    const {errors} = formApi;
                    this.formApi = formApi;

                    const registerEnabled = _.values(formApi.touched).length >= 4 && formApi.errors === undefined;

                    return (
                        <form onSubmit={formApi.submitForm}>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="username">Username</label>
                                    <Text field="username" id="username" disabled={disabled} className="form-control"
                                          minLength={3} maxLength={20}/>

                                    {errors && errors.username &&
                                    <p className="alert-danger">{errors.username}</p>}
                                </div>

                                <div className="form-group col">
                                    <label htmlFor="email">Email Address</label>
                                    <Text field="email" id="email" disabled={disabled} className="form-control"
                                          type="email" placeholder="you@email.com" minLength={3} maxLength={254}/>

                                    {errors && errors.email &&
                                    <p className="alert-danger">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="password">Password</label>
                                    <Text field="password" id="password" disabled={disabled} className="form-control"
                                          type="password" minLength={8}/>

                                    {errors && errors.password &&
                                    <p className="alert-danger">{errors.password}</p>}
                                </div>

                                <div className="form-group col">
                                    <label htmlFor="password_confirm">Confirm Password</label>
                                    <Text field="password_confirm" id="password_confirm" disabled={disabled}
                                          className="form-control"
                                          type="password" minLength={8}/>

                                    {errors && errors.password_confirm &&
                                    <p className="alert-danger">{errors.password_confirm}</p>}
                                </div>
                            </div>

                            <div className="d-flex flex-row-reverse">
                                <button type="submit" disabled={!registerEnabled}
                                        className="btn btn-primary m-1">Register
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Form>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authentication: state.authentication
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);