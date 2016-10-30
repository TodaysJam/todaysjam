import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { Components } from 'exponent';

export default class DiscoverScreen extends Component {
  constructor() {
    super();
    this.state = {
      jamName: '',
      jamDescription: ''
    };
  } // end constructor

  createPressHandler() {
    fetch('https://todaysjam.herokuapp.com/api/jams/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.jamName,
        description: this.state.jamDescription,
        public: true,
        userId: global._globalUserId
      })
    })
    .then((res) => {
      if(res.status === 200) {
        console.log('New Jam Has Been Saved.');
      }
        //add a message
      //if(res.status === xxx)
        //if something wrong happen in the database
        //post a error message
    })
    .catch((err) => {
      console.log('error message: ', err);
    });
  } // end createPressHandler

  /* information needed to 
  name: String,
  description: String,
  public: {type: Boolean, default: true},
  score: Number,
  lastCheckin: Date,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
  */

  render() {
    return (
      <Components.LinearGradient 
        colors={['#9e34a7', '#ad53b5']} >
        <ScrollView>
        {/* View Image */}
        <View style={styles.header}>
          <Image 
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.image} 
            />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputForm}>

            {/* View Image text */}
            <Text style={styles.headerText}>Create your Jam!</Text>

            {/* TextInput */}
            <TextInput
              style={styles.textInputName}
              placeholder='Jam Name'
              onChangeText={(jamName) => this.setState({jamName: jamName})}
              value={this.state.jamName}
            />

            {/* AutoGrowingTextInput: allow multiple lines input*/}
            <AutoGrowingTextInput
              style={styles.textInputDescription}
              placeholder='Jam Description'
              onChangeText={(jamDescription) => this.setState({jamDescription: jamDescription})}
              value={this.state.jamDescription}
            /> 
            
          </View>

          {/* Touchable */}
          <TouchableOpacity
            onPress={this.createPressHandler.bind(this)}
            style={styles.inputButton}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </Components.LinearGradient> // end view container
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent'
  },
  image: {
    width: 100,
    height: 40,
    marginLeft: 110,
    marginTop: 30,
    marginBottom: 10
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  inputForm: {
    marginTop: 45,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  textInputName: {
    fontSize: 18,
    width: 300,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    color: 'white',
  },
  textInputDescription: {
    fontSize: 18,
    width: 300,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 200,
    color: 'white'
  },
  inputButton: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 48,
    width: 160,
    marginBottom: 30,
    paddingTop: 5,
    backgroundColor: '#00b33c',
  }, 
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 3,
    textAlign: 'center',
    color: 'white'
  }
}); // end styles