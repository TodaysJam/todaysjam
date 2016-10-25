import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

export default class DiscoverScreen extends Component {
  constructor() {
    super();
    this.state = {
      jamName: '',
      jamDescription: ''
    };
  }
  render() {
    return (
      <View>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={styles.image} 
        />
        <View style={styles.formContainer}>
          <View style={styles.formy}>
            <Text style={styles.textB}>Create your Jam!</Text>
            <TextInput
              style={styles.textInputDescription}
              placeholder='Jam Description'
              onChangeText={(jamDescription) => this.setState({jamDescription: jamDescription})}
              value={this.state.jamDescription}
            />
            <TextInput
              style={styles.textInputName}
              placeholder='Jam Name'
              onChangeText={(jamName) => this.setState({jamName: jamName})}
              value={this.state.jamName}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 40,
    marginLeft: 110,
    marginTop: 30
  },
  textInputDescription: {
    height: 240, 
    marginHorizontal: -65,
    borderColor: 'gray', 
    borderWidth: 1
  },
  textInputName: {
    height: 40, 
    marginHorizontal: -65,
    borderColor: 'gray', 
    borderWidth: 1
  },
  textB: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 3,
    textAlign: 'center'
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    width: 90,
    height: 36,
    margin: 3
  },
  formy: {
    marginTop: 45
  }
});