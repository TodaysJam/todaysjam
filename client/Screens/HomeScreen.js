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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }, {
          name: 'name',
          jam: 'jam name',
          description: 'this is a jam description'
        }
      ])
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
    backgroundColor: '#fff',
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
    marginBottom: 10
  }
});
