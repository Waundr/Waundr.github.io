import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Mapstyle'
// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap

function createMapOptions(maps) {
  return {
    disableDefaultUI: true,
    styles: styles
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: [

      ]
  }
}


  static defaultProps = {
    center: {lat: 43.64, lng: -79.39},
    zoom: 15
  };

  componentDidMount() {
    //golocation
  }

  render() {
    const Markers = this.state.markers.map((marker) => (
      <div
        lat={marker.center.lat}
        lng={marker.center.lng}>"MARKER"</div>
    ));
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
        <button type="button" style={{postition: "absolute", left: 0, top: 0}} onClick={this.addMarker}>+</button>
      </GoogleMapReact>
      </div>
    );
  }



  addMarker = () =>{
    const marker = {
      center: this.state.center
    }
    const markers = this.state.markers.concat(marker)
    this.setState({markers:markers})
  }

  onChange = (obj) =>{
    const lat = obj.center.lat;
    const lng = obj.center.lng;
    this.setState({center: {lat, lng}})
  }


}

export default App;




