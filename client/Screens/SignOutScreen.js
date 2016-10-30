import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';
import { Components } from 'exponent';

export default class SignOutScreen extends Component {
  constructor() {
    super();
  } // end constructor

  // verify if user really wants to log out
  signOutPressHandler() {
    //use getNavigator to get to the root level
    global._globalUsername = undefined;
    this.props.navigation.getNavigator('root').push(Router.getRoute('Login'));
  } // end signoutPressHandler

  // returns users to homepage if logout icon was accidentally clicked, they can also use the navbar this is just a convenience
  goBackPressHandler() {
    console.log('goback wired');
    this.props.navigation.getNavigator('root').push(Router.getRoute('rootNavigation'));
  } // end goBackPressHandler

  render() {
    return (
      <Components.LinearGradient 
        colors={['#9e34a7', '#ad53b5']} 
        style={styles.viewContainer} >

        {/* Image Header */}
        <Image 
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.brand} 
        />
        <View style={styles.btnContainer}>
        {/* Touchable */}
        <TouchableOpacity 
          onPress={this.goBackPressHandler.bind(this)}
          style = {styles.button}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>

        {/* Touchable */}
        <TouchableOpacity
          onPress={this.signOutPressHandler.bind(this)}
          style = {styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        </View>

      </Components.LinearGradient> // end viewContainer
    )
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flex: 1
  },
  button: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 70,
    width: 200,
    marginTop: 25,
    marginBottom: 20,
    paddingTop: 9,
    backgroundColor: '#00b33c',
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  brand: {
    width: 100,
    height: 40, 
    marginBottom: 90,
    marginTop: 30
  }
}); // end styles