import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col, Preloader} from 'react-materialize';
import Request from './Request.jsx'


class FriendRequests extends Component{

  constructor(props) {
    super(props);
    this.state = {
      pendingRequests: this.props
    };
  }

  render(){
    return(  <Modal
        header='Friend Requests'
      actions={<Button className="modal-close waves-effect btn-flat">CLOSE</Button>}
      trigger={
        <Button waves='light' className=" btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074"}}>Requests {this.props.pendingRequests.length}</Button>
      }
      style ={{
      backgroundColor: '#546e7a'}}>
        {this.props.pendingRequests.map(this._eachRequest)}
      </Modal>)
  }
  _eachRequest = (peep) => {
    let counter = counter ? counter++ : 0;

    return (<Request counter={counter} id={peep.id} firstName={peep.firstName} lastName={peep.lastName} image={peep.image} points={peep.points} acceptFriend={this.props.acceptFriend} denyFriend={this.props.denyFriend} acceptOrDeny={this._acceptOrDeny}/>)
  }

  _acceptOrDeny = (counter) => {
    console.log('counter', counter)
    // let requestsLeft = this.state.requests.splice(counter, this.state.pendingRequests.length)
    console.log("current prosp", this.props.pendingRequests)
    console.log("current state", this.state.pendingRequests)
    console.log("new state", requestsLeft)
  }
};
export default FriendRequests
