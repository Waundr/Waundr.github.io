import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col, Preloader} from 'react-materialize';
import Request from './Request.jsx'


class FriendRequests extends Component{
  render(){
    {this.props.pendingRequests}
    if(this.props.pendingRequests) {
      return(  <Modal
        header='Friend Requests'
      actions={<Button className="modal-close waves-effect btn-flat">CLOSE</Button>}
      trigger={
        <Button waves='light' className=" btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074"}}>Add Friends</Button>
      }
      style ={{
      backgroundColor: '#546e7a'}}>
        {this.props.pendingRequests.map(this._eachRequest)}
      </Modal>)
    } else {
      return (
        <Modal header='LOADING'
        trigger={
        <Button style = {{color: "#FFD074"}} waves='light' className=" btn waves-effect waves-light blue-grey darken-3">Add Friends</Button>
         }
        >
          <Col s={4}>
            <Preloader size='big'/>
          </Col>
        </Modal>
      )
    }
  }
  _eachRequest = (peep) => {
      return (<Request id={peep.id} firstName={peep.firstName} lastName={peep.lastName} image={peep.image} points={peep.points} acceptFriend={this.props.acceptFriend} denyFriend={this.props.denyFriend}/>)
  }
};
export default FriendRequests
