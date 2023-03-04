import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ImagePicker} from '../screens';

function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="ImagePicker" component={ImagePicker} />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
