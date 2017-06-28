import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col, Preloader} from 'react-materialize';
import NearbyPeep from './NearbyPeep.jsx'


let stat = true;
class AddFriendsModal extends Component{

  constructor(props) {
    super(props);
    this.state = {
      nearby: []
    }
  }

  render(){
    if(this.props.nearbyPeeps ) {
      return(  <Modal
      	header='Friends Nearby'
      actions={<Button onClick={this.props.closeNearbyPeeps} className="modal-close waves-effect btn-flat">CLOSE</Button>}
      trigger={
        <Button waves='light' className=" btn waves-effect waves-light blue-grey darken-4" style = {{color: "#FFD074"}}>Add Friends</Button>
      }
      style ={{
      backgroundColor: '#546e7a'}}>
        <div style = {{color: "#FFD074", backgroundColor: '#90a4ae' }} >
          {stat ? this.props.nearbyPeeps.map(this._eachNearby) : this.state.nearby.map(this._eachNearby)}
        </div>
      </Modal>)
    } else {
      return (
        <Modal header='LOADING'
        trigger={
        <Button style = {{color: "#FFD074"}} waves='light' className=" btn waves-effect waves-light blue-grey darken-4">Add Friends</Button>
         }
        >
          <Col s={4}>
            <Preloader size='big'/>
          </Col>
        </Modal>
      )
    }
  }
  _eachNearby = (peep) => {
    let counter = counter ? counter++ : 0;
      return (<NearbyPeep counter={counter} id={peep.id} firstName={peep.firstName} lastName={peep.lastName} image={peep.image} points={peep.points} addFriend={this.props.addFriend} removeRow={this._removeModalRow}/>)
  }

  _removeModalRow = (counter) => {
    this.setState({pendingRequests: stat ? this.props.nearbyPeeps : this.state.nearby}, () => {
      let requestsLeft = stat ? this.props.nearbyPeeps : this.state.nearby
      requestsLeft.splice(counter, 1)
      this.setState({nearby: requestsLeft})
      stat = false
    })
  }
}

export default AddFriendsModal
