import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text } from 'react-native';

class MyScene extends Component {
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
      </View>
    );
  }
}