// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './AppRoot.jsx';

ReactDOM.render(<AppRoot />, document.getElementById('react-root'));
