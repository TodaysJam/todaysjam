import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Image
} from 'react-native';
import { Components } from 'exponent';

//homepage with active groups and find/create button
export default class HomeScreen extends React.Component { 
  constructor() {
    super();
    //generate rows that contain all current jam groups
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        {
          name: '',
          jam: '',
          description: 'You have no Jams!'
        }
      ])
    };
  } // end constructor

  componentWillMount() {
    fetch('https://todaysjam.herokuapp.com/api/users/jams/' + global._globalUserId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((results) => {
      console.log('ressssssssssss', results);
      console.log('response', results._bodyText);
        this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(results._bodyText))});
    })
    .catch((err) => {
      console.log('errorrrr');
      return console.log(JSON.parse(err));
    });
  } // end componentWillMount

  render() {
    return (
      //essentially a div element
      <Components.LinearGradient 
        colors={['#9e34a7', '#ad53b5']} 
        style={styles.viewContainer} >

        {/* View Header Image */}
        <View>
          <Image 
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.brand}
            />
        </View>

        {/* View Header Image Text */}
        <Text style={styles.headerText}>Your Jams</Text>

        {/* ScrollView */}
        <ScrollView style={styles.viewContainer}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the jams dynamically 
          //with input from database
          enableEmptySections={true}
          renderRow={(rowData, i) => (
            <View key={i} style={styles.jamView}>
              <Text style={styles.descriptionText} >Jam Name: {rowData.name}</Text>
              <Text style={styles.descriptionText} >Points: {rowData.score}</Text>
              <Text style={styles.descriptionText} >Description: {rowData.description}</Text>
              <View>
                <TouchableOpacity style={styles.jamCheckinButton}>
                  <Text style={styles.jamCheckinText}>Jam Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        </ScrollView>
        
      </Components.LinearGradient>
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  jamCheckinText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  descriptionText: {
    fontSize: 16,
    marginLeft: 1,
    backgroundColor: 'transparent'
  },
  headerText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent'
  },
  jamView: {
    borderWidth: 1,
    borderRadius: 9,
    height: 110,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'gray'
  },
  jamCheckinButton: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray',
    width: 90,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 1,
    backgroundColor: '#00b33c',
  },
  brand: {
    width: 100,
    height: 40, 
    marginLeft: 110, 
    marginTop: 30, 
    marginBottom: 10
  }
}); // end styles
