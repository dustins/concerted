import React from 'react';
import { connect } from 'react-redux';
import { Form, Text } from '../LoadableForm';
import { FormApi } from 'react-form';
import Loadable from 'react-loadable';
import { combineValidators } from '../validation/validation';
import { NotEmpty } from '../validation/NotEmpty';
import Loading from '../Loading';

interface ProfileProps {
    values: {
        displayName: string;
        email: string;
    };
}

class Profile extends React.Component<any, any> {
    constructor(props: ProfileProps, context: any) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values: any, submissionEvent: React.SyntheticEvent<any>, formApi: FormApi): void {
        console.log(values);
        this.forceUpdate();
    }

    validate(values: any): any {
        return combineValidators({
            displayName: NotEmpty(),
            email: NotEmpty()
        })(values);
    }

    render(): React.ReactNode {
        const disabled = this.props.settings.isRequesting;

        return (
            <Form onSubmit={this.onSubmit} defaultValues={this.props.values} validate={this.validate}>
                {(formApi: FormApi) => {

                    const {errors} = formApi;

                    return (
                        <form onSubmit={formApi.submitForm}>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label htmlFor="displayName">Display Name</label>
                                    <Text field="displayName" id="displayName" disabled={disabled}
                                          className="form-control"/>

                                    {errors && errors.displayName &&
                                    <p className="alert-danger">{errors.displayName}</p>}
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="email">Email Address</label>
                                    <Text field="email" id="email" disabled={disabled} className="form-control"/>

                                    {errors && errors.email &&
                                    <p className="alert-danger">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" disabled={disabled} className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    );
                }}
            </Form>
        );
    }
}

const mapStateToProps = (state: any) => ({
    settings: {
        isRequesting: false
    }
});
const ConnectedProfile = connect<any, any, any, any>(mapStateToProps)(Profile);

export default Loadable.Map({
    timeout: 5000,
    loader: {
        profile: () => fetch('/api/settings/profile', {credentials: 'same-origin'}).then(response => response.json())
    },
    loading: Loading,
    render(loaded: any, props: any) {
        const profile = loaded.profile;
        return <ConnectedProfile values={profile}/>;
    }
});