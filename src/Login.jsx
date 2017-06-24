import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col} from 'react-materialize';

class Login extends Component{

  render(){
      return(
        <div>
          <a href='http://localhost:3001/users/auth/google'><Button waves ='light' className="blue-grey darken-3" style = {{color: "#FFD074"}}> Login with google </Button></a>
          <a href='http://localhost:3001/users/auth/facebook'><Button waves ='light' className="blue-grey darken-3" style = {{color: "#FFD074"}}> Login with facebook </Button></a>
        </div>
      )
    }
  }

export default Login

