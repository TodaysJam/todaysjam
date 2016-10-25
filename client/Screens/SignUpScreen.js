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
      id: ''
    };
  }

  signupPressHandler() {
    // AJAX request to http://server_ip/api/users/signup
    console.log('username: ', this.state.Username);
    console.log('password: ', this.state.Password);
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

    });
  }

  render() {
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
          onPress={this.signupPressHandler}
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