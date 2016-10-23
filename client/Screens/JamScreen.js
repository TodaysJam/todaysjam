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
      <View>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={{width: 100, height: 40, marginLeft: 125, marginTop: 30}} 
          />
        <ScrollView style={styles.container} >
          <TouchableOpacity >
            <Text style={styles.text}>Create your Job</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text1) => this.setState({text1: text1})}
              value={this.state.text1}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text: text})}
              value={this.state.text}
            />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity>
          <Text>Submit</Text>
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
  bordy: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
  }

});