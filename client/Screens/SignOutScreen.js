import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';

export default class SignOutScreen extends Component {
  constructor() {
    super();
  }

  // verify if user really wants to log out
  signOutPressHandler() {
    console.log('signout wired');
    // not redirecting correctly, it just replaces the screen with the newly routed screen, doesnt actually redirect
    // this.props.navigator.push(Router.getRoute('Login'));
    
    // var routeOfLogin = {
    //   title: 'Login',
    //   component: Router.getRoute('Login'),
    //   navigationBarHidden: true
    // };
    // this.props.navigator.push(Router.goToView(routeOfLogin));

  }

  // returns users to homepage if logout icon was accidentally clicked, they can also use the navbar this is just a convenience
  goBackPressHandler() {
    console.log('goback wired');
  }

  render() {
    return (
      <View style={styles.view}>
        <Image 
            source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            style={{width: 100, height: 40, marginBottom: 212}} 
            />
        <TouchableOpacity 
          onPress={this.goBackPressHandler.bind(this)}
          style = {styles.button}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.signOutPressHandler.bind(this)}
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
    height: 70,
    width: 200,
    marginTop: 25,
    marginBottom: 20,
    paddingTop: 5,
    backgroundColor: '#00b33c',
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  }
});