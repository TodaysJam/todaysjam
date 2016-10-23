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
      dataSource: ds.cloneWithRows([1, 2, 3, 4, 5, 6, 6, 7, 9])
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
        <Text style={styles.text}>Your Groups</Text>
        <ScrollView style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the group activities dynamically 
          //with input from database
          renderRow={(rowData, i) => (
          /* Need to figure out how to map touchable elements */
            <TouchableOpacity style={styles.bordy}>
              <Text style={styles.text} key={i}>{rowData}</Text>
            </TouchableOpacity>
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
  text: {
    fontSize: 16
  },
  bordy: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
  }

});
