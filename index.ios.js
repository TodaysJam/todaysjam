import Exponent from 'exponent';
import React from 'react';
import Main from './client/components/MyScene.js';
import { ListView, TouchableHighlight, NavigatorIOS, Text, View } from 'react-native';

export class App extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([1, 2, 3, 4, 5, 6, 6]),
    };
  }
  render() {
    return (
      <View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, i) => <Text key={i}>{rowData}</Text>}
          />
        </View>
        <View>
          <TouchableHighlight>
            <Text>Find</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text>Create</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}



Exponent.registerRootComponent(App);
