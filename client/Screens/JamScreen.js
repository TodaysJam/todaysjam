import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

export default class DiscoverScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: 'Jam Name',
      text1: 'Jam Description'
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={{width: 100, height: 40, marginLeft: 125, marginTop: 30}} 
          />
          <View style={styles.formy}>
            <Text style={styles.textB}>Create your Jam!</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text1) => this.setState({text1: text1})}
              value={this.state.text1}
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text: text})}
              value={this.state.text}
            />
          </View>
        <TouchableOpacity style={styles.addBordy}>
          <Text style={styles.textS}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16
  },
  textB: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textS: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bordy: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
  },
  addBordy: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: 60,
  },
  formy: {
    marginTop: 80
  }
});