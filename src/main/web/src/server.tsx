import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import concertedReducers from './reducers';
import Concerted from './Concerted';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { authenticationSuccess } from './auth/actions';
import { AuthenticationService } from './auth/AuthenticationService';

declare global {
    interface Window {
        render: (template: String, model: Map<string, any>) => string;
        __NASHORN_POLYFILL_TIMER__: any;
    }
}

window.render = (template: string, model: Map<string, any>) => {
    window.__NASHORN_POLYFILL_TIMER__ = model.get('executor');

    const request = model.get('request');
    const initialState = model.get('initialState');
    const state = JSON.parse(initialState);
    const store = createStore(concertedReducers, state, applyMiddleware(
        thunk,
        createLogger()
    ));

    AuthenticationService.refresh().then(principal => store.dispatch(authenticationSuccess(principal)))
        .catch(() => store.dispatch(authenticationSuccess(null)));

    const context = {};
    const markup = renderToString((
        <Provider store={store}>
            <Router context={context} location={request.location}>
                <Concerted/>
            </Router>
        </Provider>
    ));

    return template
        .replace('<!-- SERVER_RENDERED_HTML -->', markup)
        .replace('__PRELOADED_STATE__ = {}', '__PRELOADED_STATE__ = ' + initialState);
};