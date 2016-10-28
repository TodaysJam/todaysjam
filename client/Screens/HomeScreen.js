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
    .then((res) => {
      console.log('ressssssssssss', res);
      console.log('response', res._bodyText);
      if (res._bodyText !== undefined) {
        this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(res._bodyText))});
      }
    })
    .catch((err) => {
      console.log('errorrrr');
      return console.log(JSON.parse(err));
    });
  } // end componentWillMount

  render() {
    return (
      //essentially a div element
      <View style={styles.container}>
        {/* View Header Image */}
        <View style={styles.header}>
          <Image 
            source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            style={{width: 100, height: 40, marginLeft: 130, marginTop: 30, marginBottom: 10}} 
            />
        </View>

        {/* View Header Image Text */}
        <Text style={styles.headerText}>Your Jams</Text>

        {/* ScrollView */}
        <ScrollView style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the jams dynamically 
          //with input from database
          renderRow={(rowData, i) => (
            <View key={i} style={styles.jamView}>
              <Text style={styles.descriptionText} >Jam Name: {rowData.jam}</Text>
              <Text style={styles.descriptionText} >Points: {rowData.points}</Text>
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
        
      </View> // end view container
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e34a7',
  },
  jamCheckinText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  descriptionText: {
    fontSize: 16
  },
  headerText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  jamView: {
    borderWidth: 1,
    borderRadius: 7,
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
    backgroundColor: '#00b33c',
  },
  header: {
    backgroundColor: 'white'
  }
}); // end styles
