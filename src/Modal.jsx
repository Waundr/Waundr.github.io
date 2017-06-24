import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class ModalForm extends Component{

  render(){
      return(
          <Modal
            header= 'Create a new Map Point'
            bottomSheet
            trigger={
              <Button style={{position: 'absolute', bottom: '2em', right: '2em'}} className="btn-floating btn-large waves-effect waves-light orange blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>add_location</i></Button>
            }
            style= {{overflow: 'visible',
                    zIndex: '1003',
                    backgroundColor: '#546e7a'}}>
            <Row>
              <Input ref='title' s={6} label="Title"  onChange={this._onTitleChange}/>
              <Input ref='desc' label="Description" onChange={this._onDescChange}/>
                <Input ref='type' defaultValue='Food Stand' type='select' label="Select Category" placeholder="Select" data-beloworigin="true" style={{fontfamily: 'FontAwesome'}}>
                  <option value='Food Stand' icon="restaurant" > Food Stand </option>
                  <option value='Street Market' icon="casino">Street Market</option>
                  <option value='Entertainment'>Entertainment </option>
                  <option value='Meet up'>Meet up</option>
                  <option value='Obstacle'>Obstacle</option>
                  <option value='Your friends'>Your friends</option>
                </Input>

                <Input ref="switch" type="switch" onLabel="Private" offLabel="Public"/>
            </Row>

              <Button className="modal-action modal-close btn waves-effect waves-light blue-grey darken-3" type="submit" onClick={this._onSubmit.bind(this)} style = {{color: "#FFD074"}}>SUBMIT
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
    this.props.add(title, desc, type, priv, this.props.loc, true, 'Raymond', [], [])
  }
};

export default ModalForm
