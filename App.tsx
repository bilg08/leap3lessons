import React from 'react';
// import {StyleSheet} from 'react-native';
import BottomTabNavigator from './src/navigation/bottomtabnavigator';
import {} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

export default App;
