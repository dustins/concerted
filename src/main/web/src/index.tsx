import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import Concerted from './Concerted';

declare global {
    interface Window {
        __PRELOADED_STATE__: any;
    }
}

const store = createStore(reducer, window.__PRELOADED_STATE__);

// store.subscribe(() => {
//     console.log(store.getState());
// });

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Concerted/>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
