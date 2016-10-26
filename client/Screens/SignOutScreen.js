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
    // not redirecting correctly
    this.props.navigator.replace(Router.getRoute('Login'));
  }

  render() {
    return (
      <View style={styles.view}>
        <TouchableOpacity
          onPress={this.logOutPressHandler.bind(this)}
          style = {styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
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
  },
  button: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 60,
    width: 200,
    paddingTop: 5
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  }
});