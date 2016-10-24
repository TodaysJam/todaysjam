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
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity>
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