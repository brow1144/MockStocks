import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

describe("app test", () => {
  global.sessionStorage = {
    getItem: jest.fn(() => {console.error("getting")}),
    setItem: jest.fn(() => {console.error("setting")})
    };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><App /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
});
