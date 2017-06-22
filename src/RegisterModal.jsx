import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';
import axios from 'axios';

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
        e.preventDefault();
        console.log(this.refs)
        let email = this.refs.email_id.state.value
        let pass = this.refs.password.state.value
        let conf = this.refs.confirm_password.state.value
        console.log("New Register", email, pass, conf)
        axios.post('http://localhost:3001/users/', {"email": email, "pass": pass, "conf": conf});
    }
  };
export default RegisterModal
