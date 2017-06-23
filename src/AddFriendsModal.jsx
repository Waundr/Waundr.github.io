import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col, Preloader} from 'react-materialize';
import NearbyPeep from './NearbyPeep.jsx'
class AddFriendsModal extends Component{

  render(){
    console.log(this.props.nearbyPeeps)
    if(this.props.nearbyPeeps ) {
      return(  <Modal
      	header='Friends Nearby'
    	trigger={
    		<Button waves='light'>Add Friends</Button>
    	}>

        {this.props.nearbyPeeps.map(this._eachNearby)}
      </Modal>)
    } else {
      return (
        <Modal header='LOADING'
        trigger={
        <Button waves='light'>Add Friends</Button>
       }>
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
