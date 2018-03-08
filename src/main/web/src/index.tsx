import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import concertedReducers from './reducers';
import Concerted from './Concerted';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { AuthenticationService } from './auth/AuthenticationService';
import { authenticationSuccess } from './auth/actions';

declare global {
    interface Window {
        __PRELOADED_STATE__: any;
    }
}

const store = createStore(concertedReducers, window.__PRELOADED_STATE__, applyMiddleware(
    thunk,
    createLogger()
));

AuthenticationService.refresh().then(principal => store.dispatch(authenticationSuccess(principal)))
    .catch(() => store.dispatch(authenticationSuccess(null)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Concerted/>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
