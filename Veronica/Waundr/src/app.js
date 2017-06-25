

import React, { Component } from 'react';
import MapView from 'react-native-maps';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
}

render() {
  return (
    <View style={styles.container}>
     <MapView style={styles.map}
     // provider={PROVIDER_GOOGLE}
    initialRegion={this.state.region}
      onRegionChange={this.onRegionChange.bind(this)}
  />
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
});



