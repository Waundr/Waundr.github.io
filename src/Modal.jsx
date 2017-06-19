import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class ModalForm extends Component{



  render(){
      return(
          <Modal
            header='Create a new Map Point'
            bottomSheet
            trigger={
              <Button style={{position: 'absolute', bottom: '2em', right: '2em'}} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add_location</i></Button>
            }
            style= {{overflow: 'visible', zIndex: '1003'}}>
            <Row>
              <Input ref='title' s={6} label="Title"  onChange={this._onTitleChange}/>
              <Input ref='desc' label="Description" onChange={this._onDescChange}/>
                <Input ref='type' type='select' label="Select Category" placeholder="Food Stand" data-beloworigin="true" max-height='10' style={{zIndex: "50"}}>
                  <option value='Food Stand'><a>Food Stand<i className="material-icons right">restaurant</i></a></option>
                  <option value='Street Market'><a>Street Market<i className="material-icons right">store</i></a></option>
                  <option value='Entertainment'><a>Entertainment<i className="material-icons right">casino</i></a></option>
                  <option value='Meet up'><a>Meet up<i className="material-icons right">group_add</i></a></option>
                  <option value='Obstacle'><a>Obstacle<i className="material-icons right">nature_people</i></a></option>
                  <option value='Your friends'><a>Your friends<i className="material-icons right">people</i></a></option>
                </Input>

                <Input ref="switch" type="switch" onLabel="Private" offLabel="Public"/>
            </Row>

              <Button className="modal-action modal-close btn waves-effect waves-light" type="submit" onClick={this._onSubmit.bind(this)}>SUBMIT
                <Icon className="material-icons right">send</Icon>
              </Button>
          </Modal>
      );
  }

  propTypes:{
      handleHideModal: React.PropTypes.func.isRequired,
      show: React.PropTypes.bool.isRequired,
  }


  _onSubmit = (e) => {
    console.log("New map point informaiton", this.refs.type)
    let title = this.refs.title.state.value
    let desc = this.refs.desc.state.value
    let type = this.refs.type.state.value
    let priv = this.refs.switch.state.value
    this.props.add(title, desc, type, priv)
  }
};

export default ModalForm
