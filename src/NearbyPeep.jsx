import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon, Col} from 'react-materialize';

class NearbyPeep extends Component{

  render(){
      return(
        <div style={{backgroundColor: '#546e7a'}}>
          <div className="card-panel grey lighten-5 z-depth-1">
        <Row>
          <Col s={2}>
            <img className="circle responsive-img" src={this.props.image}/>
          </Col>
          <Col s={8}>
            <h2>{this.props.firstName} {this.props.lastName}</h2>
            </Col>
          <Col s={2}>
            <Button>ADD FRIEND</Button>
          </Col>
        </Row>
          </div>
        </div>
      )
    }
  }

export default NearbyPeep
