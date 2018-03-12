import { createActions } from 'redux-actions';
import { AuthenticationService, AuthenticationToken } from './AuthenticationService';
import { Dispatch } from 'redux';

export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const {authenticationRequest, authenticationSuccess, authenticationFailure} = createActions(
    {},
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
);

export function logout() {
    return (dispatch: Dispatch<any>, state: any) => {
        AuthenticationService.logout()
            .then(result => dispatch(authenticationSuccess(null)));
    };
}

export function login(token: AuthenticationToken) {
    return (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch(authenticationRequest());

        AuthenticationService.authenticate(token)
            .then(principal => dispatch(authenticationSuccess(principal)))
            .catch(reason => dispatch(authenticationFailure(reason)));
    };
}

export function refresh() {
    return (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch(authenticationRequest());

        AuthenticationService.refresh()
            .then(principal => dispatch(authenticationSuccess(principal)))
            .catch(reason => dispatch(authenticationFailure(null)));
    };
}