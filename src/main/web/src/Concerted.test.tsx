import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Concerted from './Concerted';

it('renders without crashing', () => {
  const initialState = {
    authenticated: false
  };
  const store = createStore((state: any) => state, initialState);
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><MemoryRouter><Concerted /></MemoryRouter></Provider>, div);
});
