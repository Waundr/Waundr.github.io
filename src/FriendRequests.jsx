import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col, Preloader} from 'react-materialize';
import Request from './Request.jsx'


  let stat = true;
class FriendRequests extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pendingRequests: []
    };
  }

  render(){
    return(  <Modal
        header='Friend Requests'
      actions={<Button onClick={()=> stat=true} className="modal-close waves-effect btn-flat">CLOSE</Button>}
      trigger={
        <Button waves='light' className=" btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074"}}>Requests {this.props.pendingRequests.length}</Button>
      }
      style ={{
      backgroundColor: '#546e7a'}}>
        {stat ? this.props.pendingRequests.map(this._eachRequest) : this.state.pendingRequests.map(this._eachRequest) }
      </Modal>)
  }

  _eachRequest = (peep) => {
    let counter = counter ? counter++ : 0;
    return (<Request counter={counter} id={peep.id} firstName={peep.firstName} lastName={peep.lastName} image={peep.image} points={peep.points} acceptFriend={this.props.acceptFriend} denyFriend={this.props.denyFriend} acceptOrDeny={this._acceptOrDeny}/>)
  }

  _acceptOrDeny = (counter) => {
    this.setState({pendingRequests: stat ? this.props.pendingRequests : this.state.pendingRequests}, () => {
      let requestsLeft = stat ? this.props.pendingRequests : this.state.pendingRequests
      requestsLeft.splice(counter, 1)
      this.setState({pendingRequests: requestsLeft})
      stat = false
    })
  }
};
export default FriendRequests
