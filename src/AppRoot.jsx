import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import App from './App.jsx';


window.state = { authenticated: false }

const ProtectedRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={ props => (
                          window.state.authenticated
                          ? (<Component {...props}/>)
                          : (<Redirect to={{pathname: '/', state: { from: props.location}}}/>)
    )}
  />
)


const AppRoot = () => (
  <Router>
    <div>
     <ProtectedRoute path="/protected" component={App}/>
      <div>
        <ul>
          <li><Link to="/protected">About Us</Link></li>
        </ul>
      </div>
    </div>
  </Router>
)

export default AppRoot;