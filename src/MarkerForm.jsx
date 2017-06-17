import React, {Component} from 'react';

class MarkerForm extends Component {
  render() {
    if(this.props.clicked) {
      return (
          <div className="model">
            TESTEST
          </div>
      );
    } else { //else it is "incomingNotification"
      return (
        <div className="model">
          TESTEST
        </div>
      );
    }
  }
}
export default MarkerForm;
