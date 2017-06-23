import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class AddFriendsModal extends Component{

  render(){
      return(  <Modal
      	header='Modal Header'
    	trigger={
    		<Button waves='light' className=" btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074"}}>Add Friends</Button>
    	}>

      <Row>
        <Input ref='password' label="Friend Email ID"/>
      </Row>

      <Button className="modal-action modal-close btn waves-effect waves-light" type="submit" >Add Friend
        <Icon className="material-icons right">send</Icon>
      </Button>

      </Modal>)
    }
  }



        export default AddFriendsModal
