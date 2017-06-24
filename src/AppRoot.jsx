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
import Login from './Login.jsx';

class AppRoot extends Component {


  constructor(props) {
    super(props);
     //keeps track of where user is looking
     //keeps track users current geolocation
     //array of all markers user can see
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    // FETCH CALL
    fetch("http://localhost:3001/users", {credentials: 'include', mode: 'cors', 'Access-Control-Allow-Credentials': true })
    .then((promise) => {
      promise.json().then((user) => {
        this.setState({user : {firstName:user.firstName,
                        lastName:user.lastName,
                        points:user.points,
                        image:user.image,
                        id: user.id}})
      })
    })
  }
  render() {
    if(this.state.user) {
      return (
        <Router>
           <Route path="/" component={App} user={this.state.user}/>
        </Router>
      )
    } else {
      return (
        <Router>
          <Route path="/" component={Login}/>
        </Router>
      )
    }
  }
}
export default AppRoot;



