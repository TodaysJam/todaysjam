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
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }
      ])
    };
  }
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
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(res._bodyText))});
    })
    .catch((err) => {
      console.log('errorrrr');
      return console.log(JSON.parse(err));
    });
  }
  render() {
    return (
      //essentially a div element
      <View style={styles.container}>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={{width: 100, height: 40, marginLeft: 125, marginTop: 30}} 
          />
        <Text style={styles.textB}>Your Jams</Text>
        <ScrollView style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the group activities dynamically 
          //with input from database
          renderRow={(rowData, i) => (
          /* Need to figure out how to map touchable elements */
            <View key={i} style={styles.bordy}>
              <Text style={styles.text} >Jam Name: {rowData.jam}</Text>
              <Text style={styles.text} >Points: {rowData.points}</Text>
              <Text style={styles.text} >Description: {rowData.description}</Text>
              <View>
                <TouchableOpacity style={styles.addBordy}>
                  <Text style={styles.textS}>Jam Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e34a7',
  },
  textS: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 16
  },
  textB: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bordy: {
    borderWidth: 1,
    borderRadius: 7,
    height: 110,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  addBordy: {
    borderWidth: 2,
    borderRadius: 5,
    width: 90,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00b33c'
  }
});
