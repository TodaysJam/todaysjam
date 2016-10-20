import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../Screens/HomeScreen.js';
import RootNavigation from './RootNavigation';


export default createRouter(() => ({
  home: () => HomeScreen,
  rootNavigation: () => RootNavigation,
}));