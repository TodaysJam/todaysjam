import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';

export default class SignOutScreen extends Component {
  constructor() {
    super();
  }

  logOutPressHandler() {
    console.log('wired');
  }

  render() {
    return (
      <View style={styles.view}>
        <TouchableOpacity
          onPress={this.logOutPressHandler.bind(this)}
        >
          <Text>TESTING</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});