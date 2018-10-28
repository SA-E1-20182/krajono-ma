import {
  createStackNavigator,
} from 'react-navigation';
import React from 'react';
import { AppRegistry } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import PageScreen from './screens/PageScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Page: { screen: PageScreen },
  }, 
  {
    initialRouteName: 'Home',
  }
);

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('main', () => Main);