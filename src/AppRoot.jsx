import React, { Component } from 'react';
import {SideNav, SideNavItem, Button, Row, Input} from 'react-materialize';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import App from './App.jsx';



const AppRoot = () => (
  <Router>
    <div>
     <Route path="/app" component={App}/>
      <div>
        <ul>
          <a href='http://localhost:3001/users/auth/google'><Button waves ='light' className="blue-grey darken-3" style = {{color: "#FFD074"}}> Login with google </Button></a>
          <a href='http://localhost:3001/users/auth/facebook'><Button waves ='light' className="blue-grey darken-3" style = {{color: "#FFD074"}}> Login with facebook </Button></a>

          <li><Link to="/protected">About Us</Link></li>
          <li><Link to="/signin">About Us</Link></li>
        </ul>
      </div>
    </div>
  </Router>
)

export default AppRoot;



