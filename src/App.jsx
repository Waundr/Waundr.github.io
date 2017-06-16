import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Mapstyle'

//options for google maps api
function createMapOptions(maps) {
  //takes away + - zoom, and other defaults
  //applies mapstyles.js
  return {
    disableDefaultUI: true,
    styles: styles
  };
}

class App extends Component {
  constructor(props) {
    super(props);
     //keeps track of where user is looking
     //keeps track users current geolocation
     //array of all markers user can see
    this.state = {
      center: {},
      currentLocation: {lat: 43.644625, lng: -79.395197},
      markers: []
  }
}
  //default center and zoom properties
  static defaultProps = {
    center: {lat: 43.644625, lng: -79.395197},
    zoom: 15
  };

  componentDidMount() {
    //get current location & setstate
  }

  render() {
    //const maps all markers in state array to div with lat/lng locations
    const Markers = this.state.markers.map((marker) => (
      <div
        lat={marker.loc.lat}
        lng={marker.loc.lng}>"MARKER"</div>
    ));
      //google map react component takes in center/zoom/options/onchange settings
      //child googlemap react componesnts are markers
    return (
      <div style ={{width:'100%', height: '100vh'}}>
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        options={createMapOptions}
        onChange={this.onChange}>
        <div className="marker" lat={this.props.center.lat} lng={this.props.center.lng}>
          <div className="dot"></div>
          <div className="pulse"></div>
        </div>
        {Markers}
        <button className="btn-floating btn-large waves-effect waves-light red" type="button" onClick={this.addMarker}>+</button>
      </GoogleMapReact>
      </div>
    );
  }

  //callback for when +button pressed
  addMarker = () =>{
    const marker = {
      loc: this.state.currentLocation
    }
    const markers = this.state.markers.concat(marker)
    this.setState({markers:markers})
  }

  //callback when any map change occurs, obj param gives lat/lng/zoom/etc..
  onChange = (obj) =>{
    const lat = obj.center.lat;
    const lng = obj.center.lng;
    this.setState({center: {lat, lng}})
  }


}

export default App;
