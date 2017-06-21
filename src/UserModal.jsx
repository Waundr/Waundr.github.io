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
        <a href='http://localhost:3001/users/auth/google'><Button waves ='light'> Login with google </Button></a>
      </Row>
        <Button className="modal-action modal-close btn waves-effect waves-light" type="submit" >Login
          <Icon className="material-icons right">send</Icon>
        </Button>
      </Modal>)
    }
  }



        export default UserModal
