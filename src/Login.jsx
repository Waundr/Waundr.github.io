import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col} from 'react-materialize';

class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      discover: 'Meet Ups'
    }
  }

  componentDidMount(prevProps, prevState) {
    let counter = counter ? counter : 0
    setInterval(() => {
      switch (counter) {
        case 0 :
          this.setState({discover: 'Meet Ups'})
          break;
        case 1:
          this.setState({discover: 'Garage Sales'})
          break;
        case 2:
          this.setState({discover: 'Concerts'})
          break;
        case 3:
          this.setState({discover: 'Street Markets'})
          break;
        case 4:
          this.setState({discover: 'Obstacles'})
          break;
        case 5:
          this.setState({discover: 'Concerts'})
          break;
        case 6:
          counter = -1;
      }
      counter++;
    }, 1500)
  }

  render(){

      return(
        <div>
          <main id='main' className='main_area'>
            <div className='center'>
              <div style={{'backgroundColor':'black'}}>
              <img src="../styles/Waundr-logo (wht).png"/>
              <div style={{'marginTop': '-4em'}}>
              <h4>The real time social walking experience</h4>
              <h5 style={{'color':'white'}} >Discover {this.state.discover}</h5>
              </div>
              </div>
              <div style={{'margin-top':'2em'}}>
              <button className="loginBtn loginBtn--google">
                <a href='http://localhost:3001/users/auth/google'>Login with Google</a>
              </button>
              <button className="loginBtn loginBtn--facebook">
                <a href='http://localhost:3001/users/auth/facebook'>Login with Facebook</a>
              </button>
              </div>
            </div>
          </main>
        </div>
      )
    }
  }

export default Login

