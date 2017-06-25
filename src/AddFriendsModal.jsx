import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col, Preloader} from 'react-materialize';
import NearbyPeep from './NearbyPeep.jsx'
class AddFriendsModal extends Component{

  render(){
    {this.props.closeNearbyPeeps}
    if(this.props.nearbyPeeps ) {
      return(  <Modal
      	header='Friends Nearby'
      actions={<Button onClick={this.props.closeNearbyPeeps} className="modal-close waves-effect btn-flat">CLOSE</Button>}
      trigger={
        <Button waves='light' className=" btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074"}}>Add Friends</Button>
      }
      style ={{
      backgroundColor: '#546e7a'}}>
        {this.props.nearbyPeeps.map(this._eachNearby)}
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
  _eachNearby = (peep) => {
      return (<NearbyPeep firstName={peep.firstName} lastName={peep.lastName} image={peep.image} points={peep.points}/>)
  }
}

export default AddFriendsModal
