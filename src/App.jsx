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
let mapInstance = 0
class App extends Component {

  constructor(props) {
    super(props);
     //keeps track of where user is looking
     //keeps track users current geolocation
     //array of all markers user can see
    this.state = {
      center: {},
      currentLocation: {lat: 43.644625, lng: -79.395197},
      markers: [],

  }
}
  //default center and zoom properties
  static defaultProps = {
    center: {lat: 43.644625, lng: -79.395197},
    zoom: 15
  };

  componentDidMount() {
    //initiate connection to WS server
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = (e) => {
      console.log("Connected to server");
    }
      const send = (message) => {
        ws.send(JSON.stringify(message));
      }

      ws.onmessage = (event) => {

      }
    this.socket = ws; //make globally accessible
  }

  render() {

    //const maps all markers in state array to div with lat/lng locations
    const Markers = this.state.markers.map((marker, index) => (
      <div onClick={this.onClick(marker, index)}
        lat={marker.loc.lat}
        lng={marker.loc.lng} className="material-icons"
        key={index}>
        room
        <div>
          {(marker.popvisible ? <div value={marker.description} /> : null)}
        </div>
      </div>
    ));
      //google map react component takes in center/zoom/options/onchange settings
      //child googlemap react componesnts are markers
    return (
      <div style ={{width:'100%', height: '100vh'}}>
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        options={createMapOptions}
        onChange={this.onChange}
        onGoogleApiLoaded={this.setMapInstance}>
        <div className="marker" lat={this.props.center.lat} lng={this.props.center.lng}>
          <div className="dot"></div>
          <div className="pulse"></div>
        </div>
        {Markers}
        <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addMarker}><i className="material-icons">add</i></a>
      </GoogleMapReact>
      </div>
    );
  }

  setMapInstance = (map) => {
    console.log(map)
    mapInstance = map.map
  }
  //callback for when +button pressed
  addMarker = () =>{
    const marker = {
      loc: this.state.currentLocation,
      popvisible: false,
      title: "POO",
      description: "This is a piece of POO"
    }
    const markers = this.state.markers.concat(marker)
    this.setState({markers:markers})
    this.socket.send(JSON.stringify(marker))
  }

  //callback when any map change occurs, obj param gives lat/lng/zoom/etc..
  onChange = (obj) =>{
    const lat = obj.center.lat;
    const lng = obj.center.lng;
    this.setState({center: {lat, lng}})
  }

  onClick = (marker, index) => {
    // console.log(marker.loc.lat, marker.loc.lng)
    // const latlng = new google.maps.LatLng(marker.loc.lat, marker.loc.lng)
    // console.log(latlng)
    const infowindow = new google.maps.InfoWindow({
      content: "Title: " + marker.title + "<br />" + "Descripton: " + marker.description,
    });
    const mark = new google.maps.Marker({
      position: marker.loc,
      map: mapInstance
      })
    mark.addListener('click', function() {
      infowindow.open(mapInstance,mark);
    });
    // infowindow.open(mapInstance, mark)
    // let showMarker = marker
    // showMarker.popvisible = true
    // let markers = this.state.markers
    // markers[index] = showMarker
    // this.setState({markers: markers})
    // console.log(marker,index)

  }


}

export default App;
