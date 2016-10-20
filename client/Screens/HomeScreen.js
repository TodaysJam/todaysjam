import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
} from 'react-native';

export default class HomeScreen extends React.Component { 
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([1, 2, 3, 4, 5, 6, 6]),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View>
             <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData, i) => (
              //* Need to figure out how to map touchable elements */
                  <Text key={i}>{rowData}</Text>
              )}
            />
          </View>
        </ScrollView>
          <View>
            <TouchableOpacity>
              <Text>Find</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
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