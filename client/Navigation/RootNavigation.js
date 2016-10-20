import React, {
  PropTypes,
  Component
} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import Router from './Router';
import Colors from '../../Constants/Colors';
import { Ionicons } from '@exponent/vector-icons';


export default class RootNavigation extends Component {
  render() {
    return (
       <TabNavigation
        tabBarHeight={56}
        initialTab="home">
        <TabNavigationItem
          id="home">
          <StackNavigation initialRoute={Router.getRoute('home')} />
        </TabNavigationItem>
      </TabNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});