import React, { Component } from 'react';
import { Modal, Button, Row, Input, Icon} from 'react-materialize';

class ModalForm extends Component{


  render(){
      return(
          <Modal
            header='Create a new Map Point'
            bottomSheet
            trigger={
              <Button style={{position: 'absolute', bottom: '2em', right: '2em'}} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Button>
            }>

            <Row>
              <Input ref='title' placeholder="Title" s={6} label="Title"  onChange={this._onTitleChange}/>
              <Input ref='desc' placeholder="Description" label="Description" onChange={this._onDescChange}/>
                <Input ref='type' type='select' label="Select Category" defaultValue='Food Stand'>
                  <option value='Food Stand'>Food Stand</option>
                  <option value='Street Market'>Street Market</option>
                  <option value='Entertainment'>Entertainment</option>
                  <option value='Meet up'>Meet up</option>
                  <option value='Obstacle'>Obstacle</option>
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