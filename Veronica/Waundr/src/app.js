

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {events} from './data';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Waundr extends Component {
constructor(props) {
  super(props);
  this.state = {
    region: {
      latitude: 43.644546,
      longitude: -79.395170,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },

  }
  };


onRegionChange(region) {
  this.setState({ region });
};

componentDidMount = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var lat = parseFloat(position.coords.latitude)
      var lng = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({initialPosition: initialRegion});
      this.setState({markerPosition: initialRegion});
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lat = parseFloat(position.coords.latitude)
    var lng = parseFloat(position.coords.longitude)

    var lastRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({initialPosition: lastRegion});
    this.setState({markerPosition: lastRegion});
  });
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchID)
}

render() {
  return (
    <View style={styles.container}>
     <MapView style={styles.map}
     // provider={PROVIDER_GOOGLE}
    initialRegion={this.state.region}
      onRegionChange={this.onRegionChange.bind(this)}
  >
    {events.map((event, index) =>
      <MapView.Marker
        coordinate={{latitude: event.lat,
                    longitude: event.lng}}
        title={event.title}
        description={event.description}/>
        )}

      <MapView.Marker
        coordinate={this.state.markerPosition}
        >
        <View style={styles.radius}>
          <View style={styles.marker}/>
        </View>
      </MapView.Marker>
      </MapView>
    </View>
  );
}



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  radius: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'skyblue',

  },
});



