import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

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
    fetch('http://server_ip/api/users/login', {
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

    });
  }

  // console.logs will show up in your exponent desk app
  signupPressHandler() {
    console.log('wireddddd');
  }

  render() {
    return (
      <View>
        <Text>Login and Jam Out!</Text>
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
          onPress={this.loginPressHandler}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity 
            onPress={this.signupPressHandler}
          >
            <Text> Don't have an Account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});