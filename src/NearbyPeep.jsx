import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col} from 'react-materialize';

class NearbyPeep extends Component{

  render(){
      return(
        <div>
          <div className="card-panel blue-grey darken-3">
            <Row>
              <Col s={2}>
                <img className="circle responsive-img" src={this.props.image}/>
              </Col>
              <Col s={8}>
                <h2>{this.props.firstName} {this.props.lastName}</h2>
                </Col>
              <Col s={2}>
                <Button className = 'btn-large waves-effect waves-light blue-grey darken-4' style = {{color: "#FFD074"}} onClick={() => {this.props.addFriend(this.props.id); this.props.removeRow(this.props.counter)}}>ADD FRIEND</Button>
              </Col>
            </Row>
          </div>
        </div>
      )
    }
  }

export default NearbyPeep
