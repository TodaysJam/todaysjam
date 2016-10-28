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
export default class DiscoverScreen extends React.Component { 
  constructor() {
    super();
    //generate rows that contain all current jam groups
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:  this.ds.cloneWithRows([{
          user: 'name',
          name: 'jam name',
          score: '0'
        }])
    };
  } // end constructor

  componentWillMount() {
    fetch('https://todaysjam.herokuapp.com/api/jams', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(res._bodyText))});
    })
  } // end componentWillMount

  addJamPressHandler () {
    fetch('https://todaysjam.herokuapp.com/api/jams/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        description: this.description,
        public: true,
        score: 0,
        lastCheckin: undefined,
        userId: global._globalUserId
      })
    })
    .then((res) =>  {
      var self = this;
      this.setState({
        className: 'fading'
      });
      setTimeout(function() {
        self.setState({
          className: 'none'
        });
      }, 1000);
      console.log(this.state);
    })
  } // end addJamPressHandler

  render() {
    return (
      //a view is essentially a div element
      <View style={styles.container}>
        {/* View Header Image */}
        <View style={styles.header}>
          <Image 
            source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            style={{width: 100, height: 40, marginLeft: 130, marginTop: 30, marginBottom: 10}} 
            />
        </View>

        {/* View Header Text */}
        <Text style={styles.headerText}>Global Jamz</Text>

        {/* ScrollView */}
        <ScrollView style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the group activities dynamically 
          //with input from database
          renderRow={(rowData, i) => (
          /* Need to figure out how to map touchable elements */
            <View key={i} style={styles.jamView} className="jamView">
              <View style={styles.jamDescription}>
                <Text style={styles.descriptionText} >Jam Name: {rowData.name}</Text>
                <Text style={styles.descriptionText} >Description: {rowData.description}</Text>
                <Text style={styles.descriptionText} >Score: {rowData.score}</Text>
              </View>
              <TouchableOpacity style={styles.addJamButton}>
                <Text style={styles.addJamText} onPress={this.addJamPressHandler.bind(rowData)}>Add Me to Your Jamz!</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        </ScrollView>

      </View> // end View Container
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e34a7',
    borderRadius: 7,
  },
  jamDescription: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  headerText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  descriptionText: {
    fontSize: 16,
    borderRadius: 7
  },
  addJamText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    borderRadius: 7
  },
  jamView: {
    borderWidth: 1,
    borderRadius: 7,
    height: 100,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  addJamButton: {
    borderWidth: 2,
    borderRadius: 7,
    width: 130,
    borderColor: 'gray',
    backgroundColor: '#00b33c',
    alignSelf: 'flex-end',
    flex: 10
  },
  header: {
    backgroundColor: 'white'
  },
}); // end styles