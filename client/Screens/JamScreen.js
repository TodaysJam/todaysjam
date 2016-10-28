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
      <View>
        {/* View Image */}
        <View style={styles.header}>
          <Image 
            source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            style={{width: 100, height: 40, marginLeft: 130, marginTop: 30, marginBottom: 10}} 
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

            {/* TextInput */}
            <TextInput
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
      </View> // end view container
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#9e34a7',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 40,
    marginLeft: 110,
    marginTop: 30
  },
  textInputDescription: {
    width: 200,
    height: 40, 
    marginHorizontal: 15,
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 200
  },
  textInputName: {
    width: 200,
    height: 40, 
    marginHorizontal: 15,
    borderColor: 'gray', 
    borderWidth: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 3,
    textAlign: 'center',
    color: 'white'
  },
  inputButton: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 70,
    width: 200,
    marginTop: 25,
    marginBottom: 20,
    paddingTop: 5,
    backgroundColor: '#00b33c',
  },
  inputForm: {
    marginTop: 45
  },
  header: {
    backgroundColor: 'white'
  }
}); // end styles