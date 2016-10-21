import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../Screens/HomeScreen';
import RootNavigation from './RootNavigation.js';
import DiscoverScreen from '../Screens/DiscoverScreen.js';
import JamScreen from '../Screens/JamScreen.js';

export default createRouter(() => ({
  home: () => HomeScreen,
  discover: () => DiscoverScreen,
  jams: () => JamScreen,
  rootNavigation: () => RootNavigation,
}));