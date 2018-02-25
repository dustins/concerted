import React from 'react';
import App from './App';
import { renderToString } from 'react-dom/server';

declare global {
    interface Window { render(template: String): string; }
}

window.render = (template: string) => template.replace('SERVER_RENDERED_HTML', renderToString(<App />));