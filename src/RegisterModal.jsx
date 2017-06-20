import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class RegisterModal extends Component{

  render(){
      return(
        <Modal
      	header='Register'
    	trigger={
    		<Button waves='light'>Register</Button>
      	}>
          <Row>
            <Input ref='email_id'  label="Email ID"/>
            <Input ref='password' label="Password"/>
            <Input ref='confirm_password' label="Confirm Password"/>
          </Row>
          <Button className="modal-action modal-close btn waves-effect waves-light" type="submit">Register
            <Icon className="material-icons right">send</Icon>
          </Button>
        </Modal>

      )
    }
  }



        export default RegisterModal
