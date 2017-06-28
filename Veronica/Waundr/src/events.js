

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import MapView from 'react-native-maps';
import { events } from './data';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware, reducer } from './redux';
import { MKButton, MKColor } from 'react-native-material-kit';

import Entertainment from '../assets/Entertainment.png';
import FoodStand from '../assets/FoodStand.png';
import Obstacle from '../assets/Obstacle.png';
import Yourfriends from '../assets/Yourfriends.png';
import StreetMarket from '../assets/StreetMarket.png';
import Meetup from '../assets/Meetup.png';
import MarkerPopup from './MarkerPopup';

import {
  ActivityIndicator,
  RefreshControl,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const markerIcons = {
  'Entertainment': Entertainment,
  'Food Stand': FoodStand,
  'Obstacle': Obstacle,
  'Your friends': Yourfriends,
  'Street Market': StreetMarket,
  'Meet up': Meetup
}

const ColoredFab = MKButton.plainFab()
  .withStyle({top: (height-400), left: (width-250)})
  .withBackgroundColor(MKColor.BlueGrey)
  .build();

@connect(
  state => ({
    events: state.events,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_EVENT_DATA'}),
  }),
)

export default class Events extends Component {
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

  state = {
    popupIsOpen: false,
    markerTitle: "",
    markerDescription: "",
  }

  openNewMarker = () => {
    this.setState({
      popupIsOpen: true,
    });
  }

  closeNewMarker = () => {
    this.setState({
      popupIsOpen: false,
      markerTitle: "",
      markerDescription: "",
    })
  }

  setNewTitle = (title) => {
    this.setState({
      newMarkerTitle: title
    })
  }

  setNewDescription = (desc) => {
    this.setState({
      newMarkerDescription: desc
    })
  }

  createNewMarker = () => {
    if (!this.state.newMarkerTitle || !this.state.newMarkerDescription) {
      alert('Empty Field!');
    } else {
      this.closeNewMarker();
      this.props.saveMarker(this.state.newMarkerTitle, this.state.newMarkerDescription, this.state.markerPosition.longitude, this.state.markerPosition.latitude)
    }
  }


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
    const { events, loading, refresh } = this.props;
    console.log('events here: ',events);
    return (
       <View style={styles.container}>
      {events
       ? <MapView style={styles.map}
       // provider={PROVIDER_GOOGLE}
      initialRegion={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
    >
      {events.map((event, index) =>
        <MapView.Marker
          image={markerIcons[event.type]}
          coordinate={{latitude: event.lat,
                      longitude: event.lng}}
          title={event.title}
          description={event.description}
          onPress={() => this.onCalloutPressed(index)}
          ref={`callout-${index}`}
          zIndex={this.state.selectedCalloutIndex === index ? 999 : 0}
          style={styles.markerIcons}/>
          )}

        <MapView.Marker
          coordinate={this.state.markerPosition}
          >
          <View style={styles.radius}>
            <View style={styles.marker}/>
          </View>
        </MapView.Marker>
        </MapView>
        : <ActivityIndicator
        animating={loading}
        style={styles.loader}
        size="large"
        />
      }
        <ColoredFab
          onPress={() => {
            this.openNewMarker();
          }}
          >
          <Text pointerEvents="none"
                style={{color: 'white', fontSize: 30}}>
            +
          </Text>
        </ColoredFab>

        <MarkerPopup
            // marker={this.state.newMarker}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeNewMarker}
            markerTitle={this.state.newMarkerTitle}
            markerDescription={this.state.newMarkerDescription}
            setTitle={this.setNewTitle}
            setDesc={this.setNewDescription}
            onCreate={this.createNewMarker}
          />

      </View>
    );
  }

  onCalloutPressed (index) {
      let calloutRef = `callout-${index}`
      let item = this.refs[calloutRef]
      this.setState({ selectedCalloutIndex: index })

    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    flex: 1,
    paddingTop: 20,
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIcons: {
    flex: 1,
  },
  fab: {
    // flex: 1,
    // position: 'absolute',
    // right: 10,
    // bottom: 10,
    // width: 200,
    // height: 200,
    // borderRadius: 100,
  },
});



