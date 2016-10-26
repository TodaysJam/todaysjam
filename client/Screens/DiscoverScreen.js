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
  }

  render() {
    return (
      //essentially a div element
      <View style={styles.container}>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={{width: 100, height: 40, marginLeft: 125, marginTop: 30}} 
          />
        <Text style={styles.textB}>Global Jamz</Text>
        <ScrollView style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the group activities dynamically 
          //with input from database
          renderRow={(rowData, i) => (
          /* Need to figure out how to map touchable elements */
            <View key={i} style={styles.bordy}>
            {console.log('rowdata', rowData)}
              <Text style={styles.text} >Jam Name: {rowData.name}</Text>
              <View style={styles.horiContainer}>
                <Text style={styles.text} >Description: {rowData.description}</Text>
                <Text style={styles.text} >Score: {rowData.score}</Text>
              </View>
              <TouchableOpacity style={styles.addBordy}>
                <Text style={styles.textS}>Add me to Your Jamz!</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    fetch('https://todaysjam.herokuapp.com/api/jams', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log('response', res._bodyText)
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(res._bodyText))});
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horiContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  textB: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16
  },
  textS: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bordy: {
    borderWidth: 1,
    borderRadius: 7,
    height: 110,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2
  },
  addBordy: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: 130
  }
});