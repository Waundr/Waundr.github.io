import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Mapstyle';
import ModalForm from './Modal.jsx';
import ReactDOM from 'react-dom';
import {SideNav, SideNavItem, Button} from 'react-materialize';

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
      currentLocation: {lat: this.props.center.lat, lng: this.props.center.lng},
      markers: []

  }
}
  //default center and zoom properties
  static defaultProps = {
    center: {lat: (Math.random() * (43.641541 - 43.670727) + 43.670727).toFixed(6) * 1, lng: (Math.random() * (-79.367466 - -79.404287) + -79.404287).toFixed(6) * 1},
    zoom: 15
  };

  componentDidMount() {
    console.log('component did mount')
    //initiate connection to WS server
    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = (e) => {
      console.log("Connected to server");
    }

    ws.onerror = (e) => {
      console.log("ws error", e)
    }


      ws.onmessage = (event) => {
        const newMarker = JSON.parse(event.data)
        console.log("newMarker: ", newMarker)
        let markers = this.state.markers.concat(newMarker)
        console.log("onmessage markers list:= ", markers)
        // Make a pop up that new map has appeared
        Materialize.toast('New Marker is here', 4000)
        this.setState({markers:markers})

      }
    this.socket = ws; //make globally accessible
  }

  render() {

    //const maps all markers in state array to div with lat/lng locations
    const Markers = this.state.markers.map((marker, index) => (
      <div className="marker" onClick={() => this.onClick(marker)}
        lat={marker.loc.lat}
        lng={marker.loc.lng} className="material-icons"
        key={index}>
        {this.typeToIcon(marker.type)}
      </div>
    ));
      //google map react component takes in center/zoom/options/onchange settings
      //child googlemap react componesnts are markers
    return (

      <div style ={{width:'100%', height: '100vh', position: 'relative'}}>
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
      </GoogleMapReact>
      <div className="fixed-action-btn horizontal click-to-toggle" style={{position: 'absolute', bottom: '8em', right: '2em'}}  >
        <a className="btn-floating btn-large red" >
          <i className="material-icons">filter_list</i>
        </a>
        <ul>
          <li><a className="btn-floating red"><i className="material-icons">restaurant</i></a></li>
          <li><a className="btn-floating blue"><i className="material-icons">casino</i></a></li>
          <li><a className="btn-floating green"><i className="material-icons">nature_people</i></a></li>
          <li><a className="btn-floating yellow"><i className="material-icons">store</i></a></li>
          <li><a className="btn-floating purple"><i className="material-icons">group_add</i></a></li>
          <li><a className="btn-floating orange"><i className="material-icons">people</i></a></li>
        </ul>
      </div>
      <SideNav
	     trigger={<Button style={{position: 'absolute', top: '2em', left: '2em'}}><i className="material-icons">menu</i></Button>}
      	options={{ closeOnClick: true }}
      	>
      	<SideNavItem userView
      		user={{
      			background: 'img/office.jpg',
      			image: 'img/yuna.jpg',
      			name: 'John Doe',
      			email: 'jdandturk@gmail.com'
      		}}
      	/>
      	<SideNavItem href='#!icon' icon='cloud'>Login</SideNavItem>
      	<SideNavItem href='#!second'>Logout</SideNavItem>
      	<SideNavItem divider />
      	<SideNavItem subheader>Subheader</SideNavItem>
      	<SideNavItem waves href='#!third'>register</SideNavItem>
      </SideNav>

        <ModalForm add={this.addMarker}/>
      </div>


    );
  }

  setMapInstance = (map) => {
    console.log(map)
    mapInstance = map.map
  }
  //callback for when +button pressed
  addMarker = (title, desc, type, priv) =>{
    console.log(priv)
    const marker = {
      loc: {
        lat: this.state.currentLocation.lat,
        lng: this.state.currentLocation.lng
      },
      title: title,
      description: desc,
      type: type,
      priv: priv ? true: false
    }
    console.log('MARKER', marker)
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

  onClick = (marker) => {
    mapInstance.panTo(marker.loc);
    // let latlng = new google.maps.LatLng(marker.loc.lat, marker.loc.lng);
    const infowindow = new google.maps.InfoWindow({

      content: "Title: " + marker.title + "<br />" + "Descripton: " + marker.description + "<a class='btn-floating blue'><i class='material-icons'>check_cirlce</i></a>" + "<a class='btn-floating red'><i class='material-icons'>event_busy</i></a>",
      position: marker.loc

    });

    // const mark = new google.maps.Marker({
    //   position: marker.loc,
    //   map:mapInstance
    // })
    // mark.addListener('click', function() {
      infowindow.open(mapInstance);
    // });
    // infowindow.open(mapInstance, mark)
    // let showMarker = marker
    // showMarker.popvisible = true
    // let markers = this.state.markers
    // markers[index] = showMarker
    // this.setState({markers: markers})
    // console.log(marker,index)

  }

  typeToIcon = (type) => {

    switch (type) {
      case "Food Stand":
        return "restaurant"
      case "Street Market":
        return "store"
      case "Entertainment":
        return "casino"
      case "Meet up":
        return "group_add"
      case "Obstacle":
        return "nature_people"
      case "Your friends":
        return "people"
      default:
        return "room"
    }
  }
}

export default App;
