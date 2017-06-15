import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';



const MapPointsReact = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,
  }}>
    {text}
  </div>
);




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };
  }
  componentDidMount(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      this.state.center.lat = crd.latitude;
      this.state.center.lng = crd.longitude;

    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };


    console.log("componentdidran")
    function getLocation() {
      console.log("getLocation is called")
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
           console.log("Geolocation is not supported by this browser.");
        }
    }
    getLocation()

  }

  render() {
    return (
      <div style ={{width:'100%', height: '400px'}}>
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
      <MapPointsReact
        lat={59.955413}
        lng={30.337844}
        text={'Kreyser Avrora'}
      />
      </GoogleMapReact>
      </div>
    );
  }
}

export default App;
