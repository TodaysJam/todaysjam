import React, {
  PropTypes,
  Component
} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import Router from './Router';
import Colors from '../../Constants/Colors';
import { Entypo, Ionicons, Octicons } from '@exponent/vector-icons';

//navigation bar
  //the items are the individual tabs that lead to screens
export default class RootNavigation extends Component {
  //renders Icon from Entypo Library based on name from Exponent
  _renderEntypo(name, isSelected) {
    return (
      <Entypo
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  //renders Icon from Iconicons Library based on name from Exponent
  _renderIonicons(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  //renders Icon from Octicons Library based on name from Exponent
  _renderOcticons(name, isSelected) {
    return (
      <Octicons 
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  render() {
    return (
       <TabNavigation
        tabBarHeight={56}
        initialTab="home">

        <TabNavigationItem
          id="discover"
          renderIcon={isSelected => this._renderEntypo('compass', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('discover')}/>
        </TabNavigationItem>

        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderEntypo('home', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('home')}/>
        </TabNavigationItem>

        <TabNavigationItem
          id="jams"
          renderIcon={isSelected => this._renderIonicons('ios-bonfire', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('jams')}/>
        </TabNavigationItem>

        <TabNavigationItem 
          id="signout"
          renderIcon={isSelected => this._renderOcticons('log-out', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('SignOut')}/>
        </TabNavigationItem>

      </TabNavigation>
    );
  } // end render
} //end exports default 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
}); // end styles