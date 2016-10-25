import Exponent from 'exponent';
import React from 'react';
import HomeScreen from './client/Screens/HomeScreen.js';
import { 
  ListView, 
  TouchableHighlight, 
  NavigatorIOS, 
  Text, 
  View, 
  StyleSheet 
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';


import Router from './client/Navigation/Router';


export class App extends React.Component {
 
  render() {
    // this sets the initial screen when accessing the app (without a session)
    let initialRoute = Router.getRoute('Login');
    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
          <StackNavigation
            id='root'
            initialRoute={initialRoute}
          />
        </NavigationProvider>
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

Exponent.registerRootComponent(App);
