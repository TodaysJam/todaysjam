import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity, ListView } from 'react-native';

export default class DiscoverScreen extends Component {
  constructor() {
    super();
    //generate rows that contain all current jam groups
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['1PUBLICGROUP', '2PUBLICGROUP', '3PUBLICGROUP', '4PUBLICGROUP', '5PUBLICGROUP', '6PUBLICGROUP', '6PUBLICGROUP', '6PUBLICGROUP', '6PUBLICGROUP', '6PUBLICGROUP', '6PUBLICGROUP']),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
          style={{width: 100, height: 40, marginLeft: 125, marginTop: 30}} 
          />
        <Text style={styles.text}>DISCOVERY</Text>
        <ScrollView style={styles.container} >
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
    backgroundColor: '#fff'
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