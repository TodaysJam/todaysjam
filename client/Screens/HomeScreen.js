import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
} from 'react-native';

//homepage with active groups and find/create button
export default class HomeScreen extends React.Component { 
  constructor() {
    super();
    //generate rows that contain all current jam groups
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([1, 2, 3, 4, 5, 6, 6]),
    };
  }
  render() {
    return (
      //essentially a div element
      <View style={styles.container}>
        <Text>Your Groujkhvps</Text>
        <ScrollView style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          //creates all the group activities dynamically 
          //with input from database
          renderRow={(rowData, i) => (
          /* Need to figure out how to map touchable elements */
            <TouchableOpacity>
              <Text key={i}>{rowData}</Text>
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
  }
});