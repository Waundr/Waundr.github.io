import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class UserModal extends Component{

  render(){
      return(  <Modal
      	header='LOGIN'
    	trigger={
    		<Button waves='light' className="btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074", width: '171px'}}>Login</Button>
    	}
      style={{
      backgroundColor: '#546e7a'}}>
        <Row>
          <Input ref='email_id' s={6} label="Email ID"/>
          <Input ref='password' label="Password"/>
        </Row>
        <Row>
          <a href='https://cryptic-plains-45907.herokuapp.com/users/auth/google'><Button waves ='light' className="blue-grey darken-4" style = {{color: "#FFD074"}}> Login with google </Button></a>
        </Row>
        <Row>
          <a href='https://cryptic-plains-45907.herokuapp.com/users/auth/facebook'><Button waves ='light' className="blue-grey darken-4" style = {{color: "#FFD074"}}> Login with facebook </Button></a>
        </Row>
        <Button className="modal-action modal-close btn waves-effect waves-light blue-grey darken-3" type="submit" onClick={this._onLogin.bind(this)}>Login
          <Icon className="material-icons right">send</Icon>
        </Button>
      </Modal>
      )
    }
    _onLogin = (e) => {
      console.log(this.refs)
      let email = this.refs.email_id.state.value
      let pass = this.refs.password.state.value
      console.log("Login", email, pass)
  }
}
        export default UserModal
