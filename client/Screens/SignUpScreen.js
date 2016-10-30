import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';
import { Components } from 'exponent';

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      errBoxInit: false // this is to hide the hidden view when app first renders
    };
  } // end constructor

  signupPressHandler() {
    // AJAX request to http://server_ip/api/users/signup
    fetch('https://todaysjam.herokuapp.com/api/users/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.Username,
        password: this.state.Password
      })
    })
    .then((res) => {
      if (res.status === 200) {
        global._globalUserId = JSON.parse(res._bodyInit)._id;
        global._globalUsername = JSON.parse(res._bodyInit).username;
        console.log('account successfully created');
        // on successful account creation redirect user to login page
        this.props.navigator.push(Router.getRoute('Login'));
      } else if (res.status !== 200) {
        // console.error('username already exists');
        // if res.status is no good (i.e. 404) then review the hidden view
        this.setState({errBoxInit: true});
      }
    });
  } // end signupPressHandler

  render() {
    // this is the hiddenText that will display if the hidden view is revealed due to ajax call receiving bad response
    var hiddenText = this.state.errBoxInit ? "Username Already Exists" : "";

    return (
      // Components.LinearGradient doubles as the top level view container in addition to applying a gradient effect
      <Components.LinearGradient 
        colors={['#9e34a7', '#ad53b5']} 
        style={styles.viewContainer} >
       
        {/* View Image */}
        <View>
          <Image 
            // source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.brand} 
            />
        </View>

        {/* View Image Text */}
        <Text style={styles.title}>SignUp and Jam Out!</Text>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({Username: text})}
          value={this.state.Username}
          placeholder='username'
        />

        {/* Text Input */}
        <TextInput 
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => this.setState({Password: text})}
          value={this.state.Password}
          placeholder='password'
        />

        {/* Touchable */}
        <TouchableOpacity
          onPress={this.signupPressHandler.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Touchable */}
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push(Router.getRoute('Login'));
            }}
          >
            <Text style={styles.buttonText2}> Already have an Account?</Text>
          </TouchableOpacity>
        </View>

        {/* Hidden error message box for when username is not available */}
        <View style={styles.errorMessageBox}>
          <Text style={styles.errorMessageBoxText}>{hiddenText}</Text>
        </View>

      </Components.LinearGradient> // end Components.LinearGradient
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9e34a7'
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent' // this is very important when working with component.lineargradient
  },
  input: {
    fontSize: 16,
    height: 48,
    width: 200,
    textAlign: 'center',
    marginHorizontal: 10,
    alignItems: 'center',
    color: 'white',
    borderColor: 'white'
  },
  button: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 48,
    width: 160,
    marginTop: 25,
    paddingTop: 5,
    backgroundColor: '#00b33c'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  buttonText2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: 20
  },
  errorMessageBox: {
    alignItems: 'center',
    marginTop: 25
  },
  errorMessageBoxText: {
    color: '#ff0000',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontStyle: 'italic'
  },
  brand: {
    width: 175,
    height: 85, 
    marginBottom: 50
  }
}); // end styles