import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';

window.render = (template) => template.replace('SERVER_RENDERED_HTML', renderToString(<App/>));