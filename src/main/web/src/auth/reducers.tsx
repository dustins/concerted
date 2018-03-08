import { authenticationFailure, authenticationSuccess, authenticationRequest } from './actions';
import { Action, handleAction, handleActions, combineActions } from 'redux-actions';
import { combineReducers } from 'redux';

const successReducer = handleAction(authenticationSuccess, (state: any, action: Action<any>) => {
    return action.payload;
}, null);

const failureReducer = handleAction(authenticationFailure, (state: any, action: Action<any>) => {
    return action.payload;
}, null);

const requestingReducer = handleActions({
    [combineActions(authenticationSuccess, authenticationFailure)](state: any, action: Action<any>) {
        return false;
    },

    [combineActions(authenticationRequest)](state: any, action: Action<any>) {
        return true;
    }
}, false);

export default combineReducers({
    isRequesting: requestingReducer,
    failure: failureReducer,
    principal: successReducer
});