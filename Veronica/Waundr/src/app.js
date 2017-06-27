

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
  }

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


