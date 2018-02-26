import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import Concerted from './Concerted';

declare global {
    interface Window {
        render(template: String, model: Map<string, any>): string;
    }
}

window.render = (template: string, model: Map<string, any>) => {
    const request = model.get('request');
    const initialState = model.get('initialState');
    const state = JSON.parse(initialState);
    const store = createStore(reducer, state);
    
    const markup = renderToString((
        <Provider store={store}>
            <Router location={request.location}>
                <Concerted/>
            </Router>
        </Provider>
    ));

    return template
        .replace('SERVER_RENDERED_HTML', markup)
        .replace('SERVER_RENDERED_STATE', initialState);
};