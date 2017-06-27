import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col} from 'react-materialize';

class Login extends Component{



  render(){
      return(
        <div>
          <main id='main' className='main_area'>
            <div className='center'>
              <h1>Go Waundr</h1>
              <button className="loginBtn loginBtn--google">
                <a href='http://localhost:3001/users/auth/google'>Login with Google</a>
              </button>
              <button className="loginBtn loginBtn--facebook">
                <a href='http://localhost:3001/users/auth/facebook'>Login with Facebook</a>
              </button>
            </div>
          </main>
        </div>
      )
    }
  }

export default Login

