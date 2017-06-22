// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore } from 'redux';

var store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provide store ={store}>
  <App />
  </Provider>, document.getElementById('react-root'));
