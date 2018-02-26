import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import Concerted from './Concerted';

declare global {
    interface Window {
        render(template: String, model: Map<string, any>): string;
    }
}

window.render = (template: string, model: Map<string, any>) => {
    const request = model.get('request');
    const markup = renderToString((
        <Router location={request.location}>
            <Concerted/>
        </Router>
    ));

    return template.replace('SERVER_RENDERED_HTML', markup);
};