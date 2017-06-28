

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import Events from './events';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';

import {
  AppRegistry,
} from 'react-native';

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

store.dispatch({type: 'GET_EVENT_DATA'});

const RouteMapper = (route, navigator) => {
  return <Events navigator={navigator} />;
};

export default class App extends Component {

  componentDidMount = () => {

    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (e) => {
        let stuff = JSON.parse(e.data);
        if (stuff.type === 'update markers') {
          store.dispatch({type: 'GET_EVENT_DATA'});
          this.forceUpdate();
        }
    }
    this.socket = ws;
  }

  broadcastMarker = (title, description, lng, lat) => {
    const marker = {
      loc: {lat: lat, lng: lng},
      title: title,
      description: description,
      type: "Obstacle",
      creator: "mobile",
      confirms: [],
      rejects: [],
      priv: false
    }
    this.socket.send(JSON.stringify(marker))
  }

  renderScene(route, navigator) {
  }

  render() {
    return (
      <Provider store={store}>

     <Events saveMarker={this.broadcastMarker} />
      </Provider>
    );
  }
}


