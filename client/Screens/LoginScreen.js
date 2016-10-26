import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: ''
    };
  }

  loginPressHandler() {
    // AJAX request to http://server_ip/api/users/login
    fetch('https://todaysjam.herokuapp.com/api/users/login', {
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
        //redirect into index, --> do something within session/token
        global._globalUsername = this.state.Username
        console.log(global._globalUsername)
        this.props.navigator.push(Router.getRoute('rootNavigation'));
      } else if (res.status === 404) {
        // username doesn't exist
        console.log('incorect information');
      } else if (res.status === 409) {
        // incorrect password
        console.log('incorect information');
      }
    });
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>Login and Jam Out!</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({Username: text}); 
          }}
          value={this.state.Username}
        />
        <TextInput 
          style={styles.input}
          onChangeText={(text) => this.setState({Password: text})}
          value={this.state.Password}
        />
        <TouchableOpacity
          onPress={this.loginPressHandler.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
          //the navigator of the react native works like a stack
          //by pushing in a route, the view will switch to that page
            onPress={() => {
              this.props.navigator.push(Router.getRoute('SignUp'));
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}> Don't have an Account?</Text>
          </TouchableOpacity>
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
  }
});