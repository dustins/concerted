import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Concerted from './Concerted';

ReactDOM.render(
    <Router>
        <Concerted/>
    </Router>,
    document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
