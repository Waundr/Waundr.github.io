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
          <Button className="modal-action modal-close btn waves-effect waves-light" type="submit" onClick={this._onRegister.bind(this)} >Register
            <Icon className="material-icons right">send</Icon>
          </Button>
        </Modal>

      )

      }
      _onRegister = (e) => {
        console.log(this.refs)
        let email = this.refs.email_id.state.value
        let pass = this.refs.password.state.value
        let conf = this.refs.confirm_password.state.value
        console.log("New Register", email, pass, conf)
    }
  };
export default RegisterModal
