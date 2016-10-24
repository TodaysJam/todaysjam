import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: ''
    };
  }
  render() {
    return (
      <View>
        <Text>Login and Jam Out!</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({Username: text1})}
          value={this.state.Username}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text: Password})}
          value={this.state.Password}
        />
        <TouchableOpacity>
          Login
        </TouchableOpacity>
        <View>
          <Text> Already have an Account?</Text>
          <TouchableOpacity>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}