import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Mapstyle';
import ModalForm from './Modal.jsx';
import ReactDOM from 'react-dom';
import {SideNav, SideNavItem, Button, Row, Input} from 'react-materialize';
import RegisterModal from './RegisterModal.jsx'
import UserModal from './UserModal.jsx'
import AddFriendsModal from './AddFriendsModal.jsx'

//options for google maps api
// const infowindow = new google.maps.InfoWindow();

function createMapOptions(maps) {
  //takes away + - zoom, and other defaults
  //applies mapstyles.js
  return {
    disableDefaultUI: true,
    styles: styles
  };
}

let filter = ['Food Stand', 'Street Market', 'Entertainment', 'Meet up', 'Obstacle', 'Your friends']
let currentUser = 'Raymond'
let mapInstance = 0
class App extends Component {

  constructor(props) {
    super(props);
     //keeps track of where user is looking
     //keeps track users current geolocation
     //array of all markers user can see
    this.state = {
      nearbyPeeps: null,
      center: {},
      currentLocation: {lat: this.props.center.lat, lng: this.props.center.lng},
      markers: [],
      firstName: "",
      lastName: "",
      points: "",
      image: "",
      id: ""

    }

  }
  //default center and zoom properties
  static defaultProps = {
    center: {lat: (Math.random() * (43.641541 - 43.670727) + 43.670727).toFixed(6) * 1, lng: (Math.random() * (-79.367466 - -79.404287) + -79.404287).toFixed(6) * 1},
    // center: {lat: 25.761680, lng:-80.19179}, //in miami
    zoom: 15
  };

  componentDidMount() {
    // FETCH CALL
    fetch("http://localhost:3001/users", {credentials: 'include', mode: 'cors', 'Access-Control-Allow-Credentials': true })
    .then((promise) => {
      promise.json().then((user) => {
        this.setState({firstName:user.firstName,
                        lastName:user.lastName,
                        points:user.points,
                        image:user.image,
                        id: user.id})
      })
    })



    //initiate connection to WS server
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = (e) => {
      console.log("Connected to server");
      fetch('http://localhost:3001/events.json')
          .then((res) => {
            return res.json()
          }).then((data) => {
            data.forEach((marker) => {
              marker.loc = {lat: marker.lat, lng: marker.lng};
              this.addMarker(marker.title, marker.description, marker.type, marker.priv, marker.loc, false, marker.creator, marker.confirms, marker.rejects, marker.id)
            })
          }).catch((err) => {
            console.log(err);
          })
    }

    ws.onerror = (e) => {
      console.log("ws error", e)
    }

    ws.onmessage = (e) => {
      let stuff = JSON.parse(e.data);
      if (stuff.type === 'update markers') {
        fetch('http://localhost:3001/events.json')
          .then((res) => {
            return res.json()
          }).then((data) => {
            let newMarker = data[data.length - 1];
            newMarker.loc = {lat: newMarker.lat, lng: newMarker.lng};
            this.addMarker(newMarker.title, newMarker.description, newMarker.type, newMarker.priv, newMarker.loc, false, newMarker.creator, newMarker.confirms, newMarker.rejects, newMarker.id)
          }).catch((err) => {
            console.log(err);
          })
      } else if (stuff.type === 'notification') {
        Materialize.toast(`New ${stuff.data} nearby`, 4000)
      } else if (stuff.type === 'expire') {
        this.removeMarker(stuff.data)
      } else if (stuff.type === 'update specific') {
        fetch('http://localhost:3001/events.json')
          .then((res) => {
            return res.json()
          }).then((data) => {
            let newMarker = data.filter((filtered) => {
              return filtered.id === stuff.data;
            });
            let updatedMarker = newMarker[0];
            updatedMarker.loc = {lat: newMarker.lat, lng: newMarker.lng};
            this.updateMarker(stuff.data, updatedMarker)
          }).catch((err) => {
            console.log(err);
          })
      }


    }
    this.socket = ws; //make globally accessible
  }

  render() {

    //const maps all markers in state array to div with lat/lng locations
    const filteredMarkers = this.state.markers.filter((marker) => {
      return filter.includes(marker.type)
    })
    const Markers = filteredMarkers.map((marker, index) => { return (
      <div className="marker" onClick={() => this.onClick(marker)}
        lat={marker.loc.lat}
        lng={marker.loc.lng} className="material-icons md-48" style={{fontSize: "30px"}}
        key={index}>
        {this.typeToIcon(marker.type)}
      </div>
    )});

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
        <a className="btn-floating btn-large waves-effect waves-light blue-grey darken-3" >
          <i className="material-icons" style = {{color: "#FFD074"}}>filter_list</i>
        </a>
        <ul>
          <li><a onClick={() => {if(this.infowindow){this.infowindow.close()};filter = []; this.forceUpdate();}} className="btn-floating waves-effect waves-light orange blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>clear</i></a></li>
          <li><a onClick={() => this.toggleFilter('Food Stand')} className="btn-floating waves-effect waves-light red blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>restaurant</i></a></li>
          <li><a onClick={() => this.toggleFilter('Entertainment')} className="btn-floating waves-effect waves-light blue blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>casino</i></a></li>
          <li><a onClick={() => this.toggleFilter('Obstacle')} className="btn-floating waves-effect waves-light green blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>nature_people</i></a></li>
          <li><a onClick={() => this.toggleFilter('Street Market')} className="btn-floating waves-effect waves-light yellow blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>store</i></a></li>
          <li><a onClick={() => this.toggleFilter('Meet up')} className="btn-floating waves-effect waves-light purple blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>group_add</i></a></li>
          <li><a onClick={() => this.toggleFilter('Your friends')} className="btn-floating waves-effect waves-light orange blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>people</i></a></li>
        </ul>
      </div>
      <SideNav
	     trigger={<Button style={{position: 'absolute', top: '2em', left: '2em'}} className="btn-floating btn-large waves-effect waves-light blue-grey darken-3"><i className="material-icons" style = {{color: "#FFD074"}}>menu</i></Button>}
      	options={{ closeOnClick: true }}
        style={{backgroundColor: "#546e7a"}}>
      	<SideNavItem userView
      		user={{
      			background: 'img/office.jpg',
      			image: this.state.image,
      			name: this.state.firstName + " " + this.state.lastName,
      			email: "Points: " + this.state.points
      		}}
          style={{backgroundColor: "#37474f",
                  color: "#FFD074",
                  position: "center"}}
      	/>
      	<SideNavItem href='#!icon' style = {{color: "#FFD074"}} icon='person'><UserModal /></SideNavItem>
      	<SideNavItem href='http://localhost:3001/users/logout' style = {{color: "#FFD074"}} icon ='person_outline'><Button className="btn waves-effect waves-light blue-grey darken-3" style = {{color: "#FFD074", width: '171px'}}> Logout </Button></SideNavItem>
      	<SideNavItem waves href='#!third' style = {{color: "#FFD074"}} icon='person_add'><RegisterModal /></SideNavItem>
        <SideNavItem divider />
      	<SideNavItem icon ='plus_one' onClick={() => this.nearbyPeeps(this.state.currentLocation)} style = {{color: "#FFD074"}}><AddFriendsModal nearbyPeeps={this.state.nearbyPeeps} closeNearbyPeeps={this.closeNearbyPeeps}/></SideNavItem>

      </SideNav>

        <ModalForm loc={this.state.currentLocation} id={this.state.id} add={this.addMarker}/>
      </div>


    );

  }

  setMapInstance = (map) => {
    console.log(map)
    mapInstance = map.map
  }


  //callback for when +button pressed
  addMarker = (title, desc, type, priv, loc, selfAdd, creator, confirms, rejects, id) =>{
    const marker = {
      id: id,
      loc: loc,
      title: title,
      description: desc,
      type: type,
      creator: creator,
      confirms: confirms,
      rejects: rejects,
      priv: priv ? true: false
    }

    if (selfAdd === true) {
      this.socket.send(JSON.stringify(marker))
    } else {
      const markers = this.state.markers;
      markers.push(marker);
      this.setState({markers:markers})
    }

    //post request to redis
    // fetch("http://localhost:3001/markers/info/3", {
    //   method: "get"
    //   // headers: {
    //   //   "Content-Type": "application/json"
    //   // },
    //   // body: {
    //   //   test: "POOPOO"
    //   // }
    // }).then ((response) =>  {
    //   console.log("response")
    // })
  }

  removeMarker = (id) => {
    const markers = this.state.markers;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].id === id) {
        markers.splice(i, 1)
      }
    }
    this.setState({markers:markers})
    if (this.infowindow) {
      this.infowindow.close()
    }
  }

  updateMarker = (id, updatedMarker) => {
    const markers = this.state.markers;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].id === id) {
        markers[i].rejects = updatedMarker.rejects;
        markers[i].confirms = updatedMarker.confirms;
      }
    }
    this.setState({markers:markers})
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
    if (this.infowindow) {
      this.infowindow.close()
    }
    this.infowindow = new google.maps.InfoWindow({

      content: "<div id='iw-container'>" + "<div class='iw-title'>"+ marker.title +"</div>" + "<br /><div class='iw-content'>" + marker.description +  "</div><div class='confirmbtns'>" +
      "<a onclick='$.ajax({url: `http://localhost:3001/events`, method: `POST`, data: {id:`"+ marker.id + "`, user:`"+ this.state.id + "`, confirm:`confirm`}, success: (data)=>{if (data === `plus`){let num = parseInt($(`.markercount`).text(), 10);num++;$(`.markercount`).text(num)}else if(data === `minus`){let num = parseInt($(`.markercount`).text(), 10);num--;$(`.markercount`).text(num)}},failure: ()=>{console.log(`confirm failed`)}})' class='btn-floating blue-grey darken-3'><p class='markercount'>" + marker.confirms.length + "</p></a>" +
      "<a onclick='$.ajax({url: `http://localhost:3001/events`, method: `POST`, data: {id:`"+ marker.id + "`, user:`"+ this.state.id + "`, confirm:`reject`}, success: (data)=>{console.log(`worked!`)},failure: ()=>{console.log(`reject failed`)}})' class='btn-floating blue-grey darken-3'><i class='material-icons' style='color:#FFD074'>clear</i></a>" + "<br/>" + "</div></div>",
      position: marker.loc

    });

    // const mark = new google.maps.Marker({
    //   position: marker.loc,
    //   map:mapInstance
    // })
    // mark.addListener('click', function() {
      this.infowindow.open(mapInstance);
    // });
    // infowindow.open(mapInstance, mark)
    // let showMarker = marker
    // showMarker.popvisible = true
    // let markers = this.state.markers
    // markers[index] = showMarker
    // this.setState({markers: markers})
    // console.log(marker,index)

  }

  toggleFilter(filterType) {
    if (this.infowindow) {
      this.infowindow.close()
    }

    if (filter.includes(filterType)) {
      filter.splice(filter.indexOf(filterType), 1)
    } else {
      filter.push(filterType)
    }
    this.forceUpdate();
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

  nearbyPeeps = (loc) => {
    console.log(loc)
    //hard code nearby values for testing
    let lat = 43.644625
    let lng = -79.395197
    let id = 3
    fetch("http://localhost:3001/users/nearby/" + lat + "/" + lng + "/" + id)
    .then((promise) => {
      promise.json().then((users) => {
        this.setState({nearbyPeeps:users})
      })
    })

  }

  closeNearbyPeeps = () => {
    this.setState({nearbyPeeps:null})
  }

}

export default App;
