import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class UserModal extends Component{

  render(){
      return(  <Modal
      	header='LOGIN'
    	trigger={
    		<Button waves='light'>Login</Button>
    	}>
      <Row>
        <Input ref='email_id' s={6} label="Email ID"/>
        <Input ref='password' label="Password"/>
      </Row>
      <Row>
        <Button waves ='light'> Login with google </Button>
      </Row>
        <Button className="modal-action modal-close btn waves-effect waves-light" type="submit" onClick={this._onLogin.bind(this)}>Login
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



        export default UserModal
