

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import Events from './events';
import MapView from 'react-native-maps';
// import { events } from './data';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';

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

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

store.dispatch({type: 'GET_EVENT_DATA'});

const RouteMapper = (route, navigator) => {
  return <Events navigator={navigator} />;
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{ name: 'events' }}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
          renderScene={RouteMapper}
        />
      </Provider>
    );
  }
}


