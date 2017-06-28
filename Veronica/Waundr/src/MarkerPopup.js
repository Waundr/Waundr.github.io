import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { MKButton, MKColor } from 'react-native-material-kit';

const RaisedButton = MKButton.button()
  .withStyle({width: 100, left: 260})
  .withBackgroundColor(MKColor.BlueGrey)
  .withText('Submit')
  .build();

const { width, height } = Dimensions.get('window');

export default class MoviePopup extends Component {

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // height: height / 2,
    visible: this.props.isOpen,
  };

  // Handle isOpen changes to either open or close popup
  componentWillReceiveProps(nextProps) {
    // isOpen prop changed to true from false
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    // isOpen prop changed to false from true
    else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  // Open popup
  animateOpen() {
    // Update state first
    this.setState({ visible: true }, () => {
      // And slide up
      Animated.timing(
        this.state.position, { toValue: 0 }     // top of the screen
      ).start();
    });
  }

  // Close popup
  animateClose() {
    // Slide down
    Animated.timing(
      this.state.position, { toValue: height }  // bottom of the screen
    ).start(() => this.setState({ visible: false }));
  }

  render() {
    const { onCreate, setDesc, setTitle} = this.props;
    // Render nothing if not visible
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        {/* Closes popup if user taps on semi-transparent backdrop */}
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={styles.backdrop}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, {
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
        >
          <View>
            <Text>Title:</Text>
            <TextInput
              style={{margin: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => setTitle(text)}
              value={this.state.titleText}
            />
            <Text>Description:</Text>
            <TextInput
              style={{margin: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => setDesc(text)}
              value={this.state.descText}
            />
            <RaisedButton
              onPress={() => { onCreate()
              }}
            />
          </View>
        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    justifyContent: 'flex-end',         // align popup at the bottom
    backgroundColor: 'transparent',     // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    backgroundColor: 'black',
    opacity: 0.5,
  },
  // Popup
  modal: {
    height: height / 2,                 // take half of screen height
    backgroundColor: 'white',
  },
});