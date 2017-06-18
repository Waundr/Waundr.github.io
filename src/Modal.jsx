import React, { Component } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';

class ModalForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    }
  };

  render(){
      return(
          <Modal
            header='Modal Header'
            bottomSheet
            trigger={
              <Button waves='light'><i className="material-icons">add</i></Button>
            }>
            <Row>
              <Input placeholder="Title" s={6} label="Title" value={this.state.title} onChange={this._onTitleChange}/>
              <Input placeholder="Descrition" label="Descritption" value={this.state.description} onChange={this._onDescChange}/>
              <Input type="submit" value="submit" onClick={this._onSubmit}/>
            </Row>
            <p>Lorem ipsum dolor sit amet</p>
          </Modal>
      );
  }

  propTypes:{
      handleHideModal: React.PropTypes.func.isRequired,
      show: React.PropTypes.bool.isRequired,
  }

  _onTitleChange = (e) => {
    this.setState({title: e.target.value})
  }
  _onDescChange = (e) => {
    this.setState({description: e.target.value})
  }

  _onSubmit = (e) => {
    console.log("ONSUBMIT")
    this.props.add(this.state.title, this.state.description)
  }
};

export default ModalForm