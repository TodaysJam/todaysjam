import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../Screens/HomeScreen';
import RootNavigation from './RootNavigation.js';
import DiscoverScreen from '../Screens/DiscoverScreen.js';
import JamScreen from '../Screens/JamScreen.js';
import LoginScreen from '../Screens/LoginScreen.js';
import SignUpScreen from '../Screens/SignUpScreen.js';
import SignOutScreen from '../Screens/SignOutScreen.js';

export default createRouter(() => ({
  home: () => HomeScreen,
  discover: () => DiscoverScreen,
  jams: () => JamScreen,
  rootNavigation: () => RootNavigation,
  Login: () => LoginScreen,
  SignUp: () => SignUpScreen,
  SignOut: () => SignOutScreen
}));