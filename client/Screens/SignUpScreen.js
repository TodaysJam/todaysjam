import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      errBoxInit: false // this is to hide the hidden view when app first renders
    };
  }

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
  }

  render() {
    // this is the hiddenText that will display if the hidden view is revealed due to ajax call receiving bad response
    var hiddenText = this.state.errBoxInit ? "Username Already Exists" : "";

    return (

      <View style={styles.view}>
        <Text style={styles.title}>SignUp and Jam Out!</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({Username: text})}
          value={this.state.Username}
        />
        <TextInput 
          style={styles.input}
          onChangeText={(text) => this.setState({Password: text})}
          value={this.state.Password}
        />
        <TouchableOpacity
          onPress={this.signupPressHandler.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push(Router.getRoute('Login'));
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}> Already have an Account?</Text>
          </TouchableOpacity>
        </View>
      {/* Hidden error message box for when username is not available */}
        <View style={styles.errorMessageBox}>
          <Text style={styles.errorMessageBoxText}>{hiddenText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  input: {
    fontSize: 36,
    height: 48,
    textAlign: 'center',
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center'
  },
  button: {
    height: 24,
    margin: 3
  },
  buttonText: {
    fontSize: 20
  },
  errorMessageBox: {
    alignItems: 'center',
    marginTop: 25
  },
  errorMessageBoxText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 10
  }
});